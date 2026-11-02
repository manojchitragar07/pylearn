"""
Pydantic models for the code execution API.
"""
from typing import Any, Literal, Optional
from pydantic import BaseModel, Field


class TestCase(BaseModel):
    id: str
    description: str
    input: Optional[str] = None
    expectedOutput: Optional[str] = None
    expectedReturn: Optional[Any] = None
    functionName: Optional[str] = None
    functionArgs: Optional[list[Any]] = None
    type: Literal["output", "function", "contains"] = "output"


class RunCodeRequest(BaseModel):
    code: str = Field(..., description="Python source code to execute")
    timeoutMs: int = Field(10_000, ge=100, le=30_000, description="Max execution time in ms")


class RunCodeResponse(BaseModel):
    output: str
    error: str
    duration: float  # milliseconds
    status: Literal["success", "error"]


class TestResult(BaseModel):
    id: str
    description: str
    passed: bool
    expected: str
    actual: str
    error: Optional[str] = None


class RunTestsRequest(BaseModel):
    code: str
    testCases: list[TestCase]


class RunTestsResponse(BaseModel):
    results: list[TestResult]
    allPassed: bool
    passedCount: int
    totalCount: int
