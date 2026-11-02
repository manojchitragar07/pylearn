/**
 * API service layer for communicating with the backend.
 *
 * When the backend is available, code execution and test running go
 * through the API. When it's unavailable, the app falls back to
 * browser-based Pyodide execution (see usePythonRuntime hook).
 */
import type {
  RunCodeRequest,
  RunCodeResponse,
  RunTestsRequest,
  RunTestsResponse,
  Module,
  Exercise,
} from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// ──────────────────────────────────────────────
// Health
// ──────────────────────────────────────────────

/** Check if the backend API is reachable */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/api/health`, { signal: AbortSignal.timeout(3000) });
    return res.ok;
  } catch {
    return false;
  }
}

// ──────────────────────────────────────────────
// Code Execution
// ──────────────────────────────────────────────

/** Execute Python code on the backend */
export async function executeCode(request: RunCodeRequest): Promise<RunCodeResponse> {
  const res = await fetch(`${API_BASE}/api/code/run`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Backend error: ${res.status} - ${text}`);
  }
  return res.json();
}

/** Run test cases against user code on the backend */
export async function executeTests(request: RunTestsRequest): Promise<RunTestsResponse> {
  const res = await fetch(`${API_BASE}/api/code/test`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Backend error: ${res.status} - ${text}`);
  }
  return res.json();
}

// ──────────────────────────────────────────────
// Curriculum (optional — can serve curriculum from backend)
// ──────────────────────────────────────────────

/** Fetch the full curriculum from the backend */
export async function fetchCurriculum(): Promise<Module[]> {
  const res = await fetch(`${API_BASE}/api/curriculum`);
  if (!res.ok) throw new Error('Failed to fetch curriculum');
  return res.json();
}

/** Fetch practice exercises from the backend */
export async function fetchExercises(): Promise<Exercise[]> {
  const res = await fetch(`${API_BASE}/api/exercises`);
  if (!res.ok) throw new Error('Failed to fetch exercises');
  return res.json();
}
