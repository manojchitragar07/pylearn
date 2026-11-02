/**
 * CodeEditor Component
 * 
 * A full-featured Python code editor built on CodeMirror 6.
 * Supports: syntax highlighting, run/submit/reset/copy, output panel,
 * test results display, hint system, and solution reveal.
 */
import { useEffect, useRef, useState, useCallback } from 'react';
import { EditorView, keymap, lineNumbers, highlightActiveLine, drawSelection } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { python } from '@codemirror/lang-python';
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands';
import { syntaxHighlighting, defaultHighlightStyle, bracketMatching, foldGutter } from '@codemirror/language';
import { autocompletion, closeBrackets } from '@codemirror/autocomplete';
import { usePythonRuntime } from '../../hooks/usePythonRuntime';
import { analyzeError } from '../../utils/errorAnalysis';
import type { Exercise, TestResult } from '../../types';

// ── Catppuccin Mocha theme ──────────────────────────────────────────────
const catppuccinTheme = EditorView.theme(
  {
    '&': { backgroundColor: '#1e1e2e', color: '#cdd6f4', fontSize: '14px', fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace" },
    '.cm-content': { caretColor: '#f5c2e7', padding: '12px 0' },
    '.cm-cursor': { borderLeftColor: '#f5c2e7', borderLeftWidth: '2px' },
    '&.cm-focused .cm-cursor': { borderLeftColor: '#cba6f7' },
    '.cm-activeLine': { backgroundColor: 'rgba(205,214,244,0.04)' },
    '.cm-gutters': { backgroundColor: '#181825', borderRight: '1px solid rgba(255,255,255,0.06)', color: '#45475a', minWidth: '40px' },
    '.cm-lineNumbers .cm-gutterElement': { padding: '0 12px 0 8px', fontSize: '12px' },
    '.cm-activeLineGutter': { backgroundColor: 'rgba(205,214,244,0.06)', color: '#585b70' },
    '.cm-selectionBackground, ::selection': { backgroundColor: 'rgba(203,166,247,0.2) !important' },
    '&.cm-focused .cm-selectionBackground': { backgroundColor: 'rgba(203,166,247,0.25) !important' },
    '.cm-matchingBracket': { backgroundColor: 'rgba(166,227,161,0.2)', color: '#a6e3a1 !important', fontWeight: 'bold' },
    '.cm-tooltip': { backgroundColor: '#313244', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px' },
    '.cm-foldGutter .cm-gutterElement': { color: '#45475a' },
  },
  { dark: true },
);

const syntaxTheme = syntaxHighlighting(defaultHighlightStyle, { fallback: true });

// ── Props ────────────────────────────────────────────────────────────────
interface CodeEditorProps {
  initialCode: string;
  exercise?: Exercise;
  onCodeChange?: (code: string) => void;
  onRunResult?: (output: string, error: string) => void;
  showSubmit?: boolean;
  height?: string;
}

// ── Component ───────────────────────────────────────────────────────────
export default function CodeEditor({
  initialCode,
  exercise,
  onCodeChange,
  onRunResult,
  showSubmit = true,
  height = '280px',
}: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [duration, setDuration] = useState<number | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [showTests, setShowTests] = useState(false);
  const [hintIndex, setHintIndex] = useState(-1);
  const [showSolution, setShowSolution] = useState(false);
  const [errorAnalysis, setErrorAnalysis] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { runCode, runTests, initRuntime, status, isRuntimeReady } = usePythonRuntime();

  // Initialise Pyodide eagerly
  useEffect(() => { initRuntime(); }, [initRuntime]);

  // Initialise CodeMirror
  useEffect(() => {
    if (!editorRef.current) return;

    const view = new EditorView({
      state: EditorState.create({
        doc: initialCode,
        extensions: [
          lineNumbers(),
          highlightActiveLine(),
          drawSelection(),
          history(),
          bracketMatching(),
          closeBrackets(),
          foldGutter(),
          autocompletion(),
          python(),
          catppuccinTheme,
          syntaxTheme,
          keymap.of([...defaultKeymap, ...historyKeymap]),
          EditorView.updateListener.of((u) => {
            if (u.docChanged) {
              const next = u.state.doc.toString();
              setCode(next);
              onCodeChange?.(next);
            }
          }),
          EditorView.lineWrapping,
        ],
      }),
      parent: editorRef.current,
    });

    viewRef.current = view;
    return () => view.destroy();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Actions ───────────────────────────────────────────────────────────

  const handleRun = useCallback(async () => {
    setOutput(''); setError(''); setErrorAnalysis(''); setTestResults([]); setShowTests(false);
    const result = await runCode(code);
    setOutput(result.output);
    setError(result.error);
    setDuration(result.duration);
    if (result.error) setErrorAnalysis(analyzeError(result.error, code));
    onRunResult?.(result.output, result.error);
  }, [code, runCode, onRunResult]);

  const handleSubmit = useCallback(async () => {
    if (!exercise) return;
    setHasSubmitted(true);
    setOutput(''); setError(''); setErrorAnalysis('');
    const results = await runTests(code, exercise.testCases);
    setTestResults(results);
    setShowTests(true);
    const passed = results.filter((r) => r.passed).length;
    setOutput(`${passed}/${results.length} test${results.length !== 1 ? 's' : ''} passed`);
  }, [code, exercise, runTests]);

  const handleReset = useCallback(() => {
    if (!viewRef.current) return;
    viewRef.current.dispatch({ changes: { from: 0, to: viewRef.current.state.doc.length, insert: initialCode } });
    setCode(initialCode);
    setOutput(''); setError(''); setTestResults([]);
    setShowTests(false); setHintIndex(-1); setShowSolution(false);
    setErrorAnalysis(''); setHasSubmitted(false);
  }, [initialCode]);

  const handleCopy = useCallback(() => { navigator.clipboard.writeText(code); }, [code]);

  const loadSolution = useCallback(() => {
    if (!exercise || !viewRef.current) return;
    viewRef.current.dispatch({ changes: { from: 0, to: viewRef.current.state.doc.length, insert: exercise.solution } });
    setCode(exercise.solution);
  }, [exercise]);

  const allPassed = testResults.length > 0 && testResults.every((r) => r.passed);
  const passedCount = testResults.filter((r) => r.passed).length;

  // ── Render ────────────────────────────────────────────────────────────
  return (
    <div className="editor-container animate-fade">
      {/* Toolbar */}
      <div className="editor-toolbar">
        <div className="editor-title">
          <span className="editor-dot dot-red" />
          <span className="editor-dot dot-yellow" />
          <span className="editor-dot dot-green" />
          <span style={{ marginLeft: 8 }}>{exercise ? exercise.title : 'Python Editor'} — main.py</span>
        </div>
        <div className="editor-actions">
          <button
            className="editor-btn editor-btn-run"
            onClick={handleRun}
            disabled={status === 'running' || status === 'loading'}
            id="btn-run-code"
          >
            {status === 'running' ? '⏳ Running…' : status === 'loading' ? '⏳ Loading…' : '▶ Run'}
          </button>
          {showSubmit && exercise && (
            <button className="editor-btn editor-btn-submit" onClick={handleSubmit} disabled={status === 'running'} id="btn-submit-solution">
              ✓ Submit
            </button>
          )}
          <button className="editor-btn editor-btn-ghost" onClick={handleCopy} id="btn-copy-code">📋 Copy</button>
          <button className="editor-btn editor-btn-ghost" onClick={handleReset} id="btn-reset-code">↺ Reset</button>
          {exercise && !showSolution && (
            <button className="editor-btn editor-btn-ghost" onClick={loadSolution} id="btn-load-solution">💡 Solution</button>
          )}
        </div>
      </div>

      {/* Editor */}
      <div ref={editorRef} style={{ minHeight: height, maxHeight: '500px', overflowY: 'auto' }} />

      {/* Status bar */}
      <div className="editor-status-bar">
        <div className="status-indicator">
          <div className={`status-dot ${status}`} />
          <span>
            {status === 'idle' ? 'Ready'
              : status === 'loading' ? 'Loading Python runtime…'
              : status === 'running' ? 'Executing…'
              : status === 'success' ? `Completed in ${duration}ms`
              : 'Error occurred'}
          </span>
          {!isRuntimeReady && status === 'idle' && (
            <span style={{ color: '#fbbf24', marginLeft: 8 }}>Click Run to initialise Python</span>
          )}
        </div>
        <span>Python 3.11 (Pyodide)</span>
      </div>

      {/* Output panel */}
      <div className="output-panel">
        <div className="output-header">
          <span className="output-label">{showTests ? '🧪 Test Results' : '📤 Output'}</span>
          <div style={{ display: 'flex', gap: 8 }}>
            {showTests && (
              <button className="editor-btn editor-btn-ghost" style={{ fontSize: '0.7rem', padding: '2px 8px' }} onClick={() => setShowTests(false)}>Show Output</button>
            )}
            {(output || error) && (
              <button className="editor-btn editor-btn-ghost" style={{ fontSize: '0.7rem', padding: '2px 8px' }} onClick={() => { setOutput(''); setError(''); setTestResults([]); setShowTests(false); }}>Clear</button>
            )}
          </div>
        </div>

        {showTests ? (
          <div style={{ padding: '12px 16px' }}>
            <div className={`test-summary ${allPassed ? 'all-passed' : 'some-failed'}`} style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              {allPassed ? '🎉' : '❌'} <span>{passedCount}/{testResults.length} tests passed</span>
              {allPassed && <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>Excellent!</span>}
            </div>
            {testResults.map((r) => (
              <div key={r.id} className={`test-item ${r.passed ? 'passed' : 'failed'}`}>
                <span className="test-icon">{r.passed ? '✅' : '❌'}</span>
                <div>
                  <div className="test-desc">{r.description}</div>
                  {!r.passed && (
                    <div className="test-detail">
                      Expected: <span style={{ color: '#4ade80' }}>{r.expected}</span>
                      {' · '}Got: <span style={{ color: '#f87171' }}>{r.actual || '(no output)'}</span>
                    </div>
                  )}
                  {r.error && <div className="test-detail" style={{ color: '#f87171' }}>{r.error.slice(0, 120)}</div>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="output-content">
            {status === 'loading' ? <span className="output-loading">⏳ Loading Python 3.11 runtime (first run only)…</span>
              : status === 'running' ? <span className="output-loading">⚡ Running your code…</span>
              : output ? <span className="output-stdout">{output}</span>
              : !error ? <span className="output-empty">Output will appear here when you run your code.</span>
              : null}
            {error && <span className="output-stderr">{'\n'}{error}</span>}
          </div>
        )}
      </div>

      {/* Error analysis */}
      {errorAnalysis && !showTests && (
        <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', background: '#0d0d17' }}>
          <div style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 8, color: '#fca5a5', padding: '10px 14px' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#f87171', marginBottom: 6 }}>🔍 What went wrong</div>
            <div style={{ fontSize: '0.82rem', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{errorAnalysis}</div>
          </div>
        </div>
      )}

      {/* Hint panel (visible after a failed submit) */}
      {exercise && hasSubmitted && !allPassed && (
        <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', background: '#0d0d17', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {exercise.hints.map((_, i) => (
              <button key={i} className="editor-btn editor-btn-ghost" style={{ fontSize: '0.75rem' }} onClick={() => setHintIndex(i)} id={`btn-hint-${i + 1}`}>
                💡 Hint {i + 1}
              </button>
            ))}
            <button className="editor-btn editor-btn-ghost" style={{ fontSize: '0.75rem', color: '#a78bfa' }} onClick={() => setShowSolution(!showSolution)} id="btn-show-solution">
              {showSolution ? '🙈 Hide Solution' : '🔓 Show Solution'}
            </button>
          </div>
          {hintIndex >= 0 && hintIndex < exercise.hints.length && (
            <div style={{ background: 'rgba(186,230,253,0.06)', border: '1px solid rgba(186,230,253,0.15)', borderRadius: 8, padding: '10px 14px', fontSize: '0.82rem', color: '#7dd3fc' }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#38bdf8', marginBottom: 4 }}>Hint {hintIndex + 1}</div>
              {exercise.hints[hintIndex]}
            </div>
          )}
          {showSolution && (
            <div style={{ background: 'rgba(203,166,247,0.06)', border: '1px solid rgba(203,166,247,0.2)', borderRadius: 8, padding: '10px 14px' }}>
              <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#cba6f7', marginBottom: 8 }}>✅ Reference Solution</div>
              <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: '#a6e3a1', whiteSpace: 'pre-wrap', margin: 0 }}>{exercise.solution}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
