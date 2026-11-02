/**
 * Python Runtime Hook
 *
 * Manages code execution with two strategies:
 *  1. Backend API (FastAPI) — preferred, sandboxed execution
 *  2. Browser Pyodide — fallback when backend is unavailable
 */
import { useState, useCallback, useRef, useEffect } from 'react';
import type { ExecutionStatus, ExecutionResult, TestResult, TestCase } from '../types';
import { checkBackendHealth, executeCode, executeTests } from '../services/api';

// ──────────────────────────────────────────────
// Pyodide globals
// ──────────────────────────────────────────────

declare global {
  interface Window {
    pyodide: {
      runPythonAsync: (code: string) => Promise<unknown>;
      runPython: (code: string) => unknown;
      loadPackage: (packages: string[]) => Promise<void>;
      globals: { set: (k: string, v: unknown) => void; get: (k: string) => unknown };
    };
    loadPyodide: (cfg: { indexURL: string }) => Promise<Window['pyodide']>;
  }
}

let pyodideInstance: Window['pyodide'] | null = null;
let isLoadingPyodide = false;
let pyodideCallbacks: Array<(py: Window['pyodide']) => void> = [];

async function loadPyodideRuntime(): Promise<Window['pyodide']> {
  if (pyodideInstance) return pyodideInstance;

  if (isLoadingPyodide) {
    return new Promise((resolve) => { pyodideCallbacks.push(resolve); });
  }

  isLoadingPyodide = true;

  if (!window.loadPyodide) {
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js';
      script.onload = () => resolve();
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  pyodideInstance = await window.loadPyodide({
    indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/',
  });

  isLoadingPyodide = false;
  pyodideCallbacks.forEach((cb) => cb(pyodideInstance!));
  pyodideCallbacks = [];

  return pyodideInstance;
}

// ──────────────────────────────────────────────
// Pyodide executor (browser-side fallback)
// ──────────────────────────────────────────────

async function runCodeWithPyodide(code: string, timeoutMs: number): Promise<ExecutionResult> {
  const start = Date.now();
  try {
    const pyodide = await loadPyodideRuntime();

    const wrapped = `
import sys, io
_stdout = io.StringIO()
_stderr = io.StringIO()
sys.stdout = _stdout
sys.stderr = _stderr
try:
${code.split('\n').map((l) => '    ' + l).join('\n')}
except Exception as _e:
    import traceback
    print(traceback.format_exc(), file=sys.stderr)
finally:
    sys.stdout = sys.__stdout__
    sys.stderr = sys.__stderr__
_out = _stdout.getvalue()
_err = _stderr.getvalue()
`;

    const timeout = new Promise<never>((_, rej) =>
      setTimeout(() => rej(new Error('Execution timed out (10s). Check for infinite loops.')), timeoutMs),
    );

    await Promise.race([pyodide.runPythonAsync(wrapped), timeout]);

    const output = String(pyodide.runPython('_out') || '').trimEnd();
    const error = String(pyodide.runPython('_err') || '').trimEnd();
    const duration = Date.now() - start;

    return { output, error, duration, status: error ? 'error' : 'success' };
  } catch (err) {
    return {
      output: '',
      error: err instanceof Error ? err.message : String(err),
      duration: Date.now() - start,
      status: 'error',
    };
  }
}

// ──────────────────────────────────────────────
// Hook
// ──────────────────────────────────────────────

export function usePythonRuntime() {
  const [status, setStatus] = useState<ExecutionStatus>('idle');
  const [isRuntimeReady, setIsRuntimeReady] = useState(false);
  const [useBackend, setUseBackend] = useState(false);
  const checkedBackend = useRef(false);

  // Probe backend on first mount
  useEffect(() => {
    if (checkedBackend.current) return;
    checkedBackend.current = true;
    checkBackendHealth().then((ok) => {
      setUseBackend(ok);
      if (ok) setIsRuntimeReady(true);
    });
  }, []);

  /** Eagerly load Pyodide (only needed if backend unavailable) */
  const initRuntime = useCallback(async () => {
    if (isRuntimeReady || isLoadingPyodide) return;
    setStatus('loading');
    try {
      if (useBackend) {
        setIsRuntimeReady(true);
        setStatus('idle');
      } else {
        await loadPyodideRuntime();
        setIsRuntimeReady(true);
        setStatus('idle');
      }
    } catch {
      setStatus('error');
    }
  }, [isRuntimeReady, useBackend]);

  /** Run user code and return captured output + errors */
  const runCode = useCallback(
    async (code: string, timeoutMs = 10000): Promise<ExecutionResult> => {
      setStatus('running');

      try {
        if (useBackend) {
          const res = await executeCode({ code, timeoutMs });
          const st = res.status === 'error' ? 'error' : 'success';
          setStatus(st as ExecutionStatus);
          return { output: res.output, error: res.error, duration: res.duration, status: st as ExecutionStatus };
        }

        // Pyodide fallback
        const result = await runCodeWithPyodide(code, timeoutMs);
        setIsRuntimeReady(true);
        setStatus(result.status);
        return result;
      } catch (err) {
        setStatus('error');
        return { output: '', error: err instanceof Error ? err.message : String(err), duration: 0, status: 'error' };
      }
    },
    [useBackend],
  );

  /** Run test cases against user code */
  const runTests = useCallback(
    async (userCode: string, testCases: TestCase[]): Promise<TestResult[]> => {
      if (useBackend) {
        try {
          const res = await executeTests({ code: userCode, testCases });
          return res.results;
        } catch {
          // Fall through to local testing
        }
      }

      // Local Pyodide test runner
      const results: TestResult[] = [];
      for (const tc of testCases) {
        try {
          const result = await runCodeWithPyodide(userCode, 10000);
          const actual = (result.output + (result.error ? '\n' + result.error : '')).trim();

          if (tc.type === 'contains' && tc.expectedOutput) {
            results.push({
              id: tc.id,
              description: tc.description,
              passed: actual.includes(tc.expectedOutput.trim()),
              expected: tc.expectedOutput,
              actual,
              error: result.error || undefined,
            });
          } else if (tc.type === 'output' && tc.expectedOutput) {
            const exp = tc.expectedOutput.trim().replace(/\r\n/g, '\n');
            const act = actual.replace(/\r\n/g, '\n');
            results.push({ id: tc.id, description: tc.description, passed: act === exp, expected: tc.expectedOutput, actual, error: result.error || undefined });
          } else {
            results.push({ id: tc.id, description: tc.description, passed: !result.error && result.output.length > 0, expected: tc.expectedOutput || 'Any output', actual });
          }
        } catch (err) {
          results.push({ id: tc.id, description: tc.description, passed: false, expected: tc.expectedOutput || '', actual: '', error: err instanceof Error ? err.message : String(err) });
        }
      }
      return results;
    },
    [useBackend],
  );

  return { runCode, runTests, initRuntime, status, isRuntimeReady, useBackend };
}
