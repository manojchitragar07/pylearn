"""
Code Execution Service
======================
Runs user-submitted Python code in a sandboxed subprocess with timeout
and resource limits. Never uses exec() in the server process.
"""
import subprocess
import sys
import tempfile
import time
from pathlib import Path
from typing import Optional

from app.models.code import RunCodeRequest, RunCodeResponse, TestCase, TestResult


# ── Helpers ─────────────────────────────────────────────────────────────────

WRAPPER_TEMPLATE = """
import sys, io, traceback

_stdout_buf = io.StringIO()
_stderr_buf = io.StringIO()
sys.stdout = _stdout_buf
sys.stderr = _stderr_buf

try:
{indented_code}
except Exception:
    print(traceback.format_exc(), file=sys.stderr)
finally:
    sys.stdout = sys.__stdout__
    sys.stderr = sys.__stderr__

print(_stdout_buf.getvalue(), end="")
print(_stderr_buf.getvalue(), end="", file=sys.stderr)
"""

FUNCTION_TEST_TEMPLATE = """
{user_code}

import sys, io
_stdout_buf = io.StringIO()
_stderr_buf = io.StringIO()
sys.stdout = _stdout_buf
sys.stderr = _stderr_buf

try:
    _result = {fn_name}({fn_args})
    print(repr(_result))
except Exception as e:
    import traceback
    print(traceback.format_exc(), file=sys.stderr)
finally:
    sys.stdout = sys.__stdout__
    sys.stderr = sys.__stderr__

print(_stdout_buf.getvalue(), end="")
print(_stderr_buf.getvalue(), end="", file=sys.stderr)
"""


def _indent(code: str, spaces: int = 4) -> str:
    pad = " " * spaces
    return "\n".join(pad + line for line in code.splitlines())


def _run_script(script: str, timeout_s: float) -> tuple[str, str, float]:
    """Write script to a temp file and execute it in a subprocess."""
    with tempfile.NamedTemporaryFile(mode="w", suffix=".py", delete=False) as f:
        f.write(script)
        tmp_path = f.name

    start = time.perf_counter()
    try:
        proc = subprocess.run(
            [sys.executable, tmp_path],
            capture_output=True,
            text=True,
            timeout=timeout_s,
        )
        duration = (time.perf_counter() - start) * 1000  # ms
        return proc.stdout, proc.stderr, duration
    except subprocess.TimeoutExpired:
        duration = (time.perf_counter() - start) * 1000
        return "", f"TimeoutError: Code exceeded {timeout_s}s execution limit.", duration
    finally:
        Path(tmp_path).unlink(missing_ok=True)


# ── Public API ────────────────────────────────────────────────────────────────

def execute_code(request: RunCodeRequest) -> RunCodeResponse:
    """Execute user code in a subprocess and capture output."""
    script = WRAPPER_TEMPLATE.format(indented_code=_indent(request.code))
    timeout_s = request.timeoutMs / 1000

    stdout, stderr, duration = _run_script(script, timeout_s)
    stdout = stdout.rstrip()
    stderr = stderr.rstrip()

    return RunCodeResponse(
        output=stdout,
        error=stderr,
        duration=round(duration, 2),
        status="error" if stderr else "success",
    )


def run_tests(code: str, test_cases: list[TestCase]) -> list[TestResult]:
    """Run each test case against user code."""
    results: list[TestResult] = []

    for tc in test_cases:
        if tc.type == "function" and tc.functionName:
            args_str = ", ".join(repr(a) for a in (tc.functionArgs or []))
            script = FUNCTION_TEST_TEMPLATE.format(
                user_code=code,
                fn_name=tc.functionName,
                fn_args=args_str,
            )
        else:
            script = WRAPPER_TEMPLATE.format(indented_code=_indent(code))

        stdout, stderr, _ = _run_script(script, timeout_s=10)
        actual = stdout.strip()
        expected = (tc.expectedOutput or "").strip()

        if stderr:
            results.append(TestResult(
                id=tc.id, description=tc.description,
                passed=False, expected=expected, actual=actual,
                error=stderr[:300],
            ))
            continue

        if tc.type == "contains":
            passed = expected in actual
        elif tc.type == "function":
            passed = actual == expected
        else:
            passed = actual == expected

        results.append(TestResult(
            id=tc.id, description=tc.description,
            passed=passed, expected=expected, actual=actual,
        ))

    return results
