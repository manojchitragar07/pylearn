"""
Code Execution Router — POST /api/code/run  |  POST /api/code/test
"""
from fastapi import APIRouter

from app.models.code import RunCodeRequest, RunCodeResponse, RunTestsRequest, RunTestsResponse
from app.services.executor import execute_code, run_tests

router = APIRouter(tags=["Code"])


@router.post("/run", response_model=RunCodeResponse)
async def run_code(request: RunCodeRequest) -> RunCodeResponse:
    """Execute user Python code and return stdout/stderr."""
    return execute_code(request)


@router.post("/test", response_model=RunTestsResponse)
async def test_code(request: RunTestsRequest) -> RunTestsResponse:
    """Run automated test cases against user code."""
    results = run_tests(request.code, request.testCases)
    passed = sum(1 for r in results if r.passed)
    return RunTestsResponse(
        results=results,
        allPassed=passed == len(results),
        passedCount=passed,
        totalCount=len(results),
    )
