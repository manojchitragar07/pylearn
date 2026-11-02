/**
 * LessonViewer Component
 *
 * Renders a full lesson with Learn / Practice tabs.
 * Includes: markdown explanation, analogy, syntax box, live example,
 * line-by-line breakdown, common mistakes, notes, bookmarking,
 * and an exercise with the CodeEditor.
 */
import { useState, useEffect } from 'react';
import type { Lesson } from '../../types';
import { useProgressStore } from '../../store/progressStore';
import CodeEditor from '../editor/CodeEditor';

// ── Inline Markdown helpers ────────────────────────────────────────────

function InlineMarkdown({ text }: { text: string }) {
  const parts = text.split(/(\*\*.*?\*\*|`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**'))
          return <strong key={i} style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>{part.slice(2, -2)}</strong>;
        if (part.startsWith('`') && part.endsWith('`'))
          return (
            <code key={i} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.87em', background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', borderRadius: 5, padding: '1px 6px', color: 'var(--color-accent)' }}>
              {part.slice(1, -1)}
            </code>
          );
        return part;
      })}
    </>
  );
}

function MarkdownContent({ text }: { text: string }) {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('```')) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) { codeLines.push(lines[i]); i++; }
      elements.push(
        <pre key={`code-${i}`} style={{ background: '#1e1e2e', borderRadius: 10, padding: '16px 20px', overflowX: 'auto', marginBottom: 16 }}>
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: '#cdd6f4', whiteSpace: 'pre' }}>{codeLines.join('\n')}</code>
        </pre>
      );
    } else if (line.startsWith('| ')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].startsWith('|')) { tableLines.push(lines[i]); i++; }
      const headers = tableLines[0].split('|').filter(Boolean).map((h) => h.trim());
      const rows = tableLines.slice(2).map((r) => r.split('|').filter(Boolean).map((c) => c.trim()));
      elements.push(
        <div key={`table-${i}`} style={{ overflowX: 'auto', marginBottom: 16 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead><tr>{headers.map((h, j) => <th key={j} style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', padding: '10px 14px', textAlign: 'left', fontWeight: 600, color: 'var(--color-text-primary)' }}>{h}</th>)}</tr></thead>
            <tbody>{rows.map((row, ri) => <tr key={ri} style={{ background: ri % 2 === 0 ? 'var(--color-surface)' : 'var(--color-surface-2)' }}>{row.map((cell, ci) => <td key={ci} style={{ border: '1px solid var(--color-border)', padding: '10px 14px', color: 'var(--color-text-secondary)' }}><InlineMarkdown text={cell} /></td>)}</tr>)}</tbody>
          </table>
        </div>
      );
      continue;
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={`h3-${i}`} style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 16 }}><InlineMarkdown text={line.slice(4)} /></h3>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={`h2-${i}`} style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 10, marginTop: 20 }}><InlineMarkdown text={line.slice(3)} /></h2>);
    } else if (line.startsWith('# ')) {
      elements.push(<h1 key={`h1-${i}`} style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: 12, marginTop: 4 }}><InlineMarkdown text={line.slice(2)} /></h1>);
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      const items: string[] = [];
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) { items.push(lines[i].slice(2)); i++; }
      elements.push(
        <ul key={`ul-${i}`} style={{ paddingLeft: 20, marginBottom: 12, color: 'var(--color-text-secondary)' }}>
          {items.map((item, j) => <li key={j} style={{ marginBottom: 4, lineHeight: 1.6 }}><InlineMarkdown text={item} /></li>)}
        </ul>
      );
      continue;
    } else if (line === '') {
      elements.push(<div key={`sp-${i}`} style={{ height: 8 }} />);
    } else {
      elements.push(<p key={`p-${i}`} style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: 8 }}><InlineMarkdown text={line} /></p>);
    }
    i++;
  }
  return <div>{elements}</div>;
}

// ── Props ───────────────────────────────────────────────────────────────

interface LessonViewerProps {
  lesson: Lesson;
  onComplete: () => void;
  onNext: () => void;
  hasNext: boolean;
}

// ── Component ───────────────────────────────────────────────────────────

export default function LessonViewer({ lesson, onComplete, onNext, hasNext }: LessonViewerProps) {
  const [activeTab, setActiveTab] = useState<'learn' | 'practice'>('learn');
  const [showNotes, setShowNotes] = useState(false);
  const [noteText, setNoteText] = useState('');

  const { startLesson, completeLesson, toggleBookmark, updateNotes, getLessonProgress } = useProgressStore();

  const progress = getLessonProgress(lesson.id);

  // Side-effect: mark lesson as started when it mounts
  useEffect(() => {
    startLesson(lesson.id, lesson.moduleId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson.id]);

  // Populate notes from saved progress
  useEffect(() => {
    if (progress?.notes) setNoteText(progress.notes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson.id]);

  const handleSaveNotes = () => { updateNotes(lesson.id, noteText); setShowNotes(false); };

  const handleMarkComplete = () => { completeLesson(lesson.id); onComplete(); };

  // ── Render ───────────────────────────────────────────────────────────

  return (
    <div className="lesson-content animate-fade">
      {/* Lesson header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)' }}>Lesson {lesson.order}</span>
          <div className="tag-list">{lesson.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
          <span style={{ marginLeft: 'auto', fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>⏱ {lesson.estimatedMinutes} min</span>
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>{lesson.title}</h1>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, background: 'var(--color-surface-2)', padding: 4, borderRadius: 10, marginTop: 16, width: 'fit-content' }}>
          {(['learn', 'practice'] as const).map((tab) => (
            <button
              key={tab}
              className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-ghost'}`}
              style={{ border: 'none', padding: '6px 16px' }}
              onClick={() => setActiveTab(tab)}
              id={`tab-${tab}`}
            >
              {tab === 'learn' ? '📖 Learn' : '💻 Practice'}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Learn tab ─────────────────────────────────────────────────── */}
      {activeTab === 'learn' && (
        <div className="stagger">
          {/* Objective */}
          <div className="lesson-objective">
            <div className="lesson-objective-label">🎯 Learning Objective</div>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-accent)', fontWeight: 500 }}>{lesson.objective}</p>
          </div>

          {/* Explanation */}
          <div className="lesson-section">
            <div className="lesson-section-title"><span className="section-icon">💡</span> Explanation</div>
            <div className="lesson-explanation"><MarkdownContent text={lesson.explanation} /></div>
          </div>

          {/* Analogy */}
          {lesson.analogy && (
            <div className="lesson-section">
              <div className="lesson-section-title"><span className="section-icon">🌍</span> Real-World Analogy</div>
              <div className="analogy-box"><p>{lesson.analogy}</p></div>
            </div>
          )}

          {/* Syntax */}
          {lesson.syntax && (
            <div className="lesson-section">
              <div className="lesson-section-title"><span className="section-icon">📐</span> Syntax</div>
              <div className="syntax-box">{lesson.syntax}</div>
            </div>
          )}

          {/* Example code */}
          <div className="lesson-section">
            <div className="lesson-section-title"><span className="section-icon">🧑‍💻</span> Example Code</div>
            <CodeEditor initialCode={lesson.exampleCode} showSubmit={false} height="200px" />
          </div>

          {/* Expected output */}
          <div className="lesson-section">
            <div className="lesson-section-title"><span className="section-icon">📤</span> Expected Output</div>
            <div style={{ background: '#0d0d17', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '16px 20px', fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: '#a6e3a1', whiteSpace: 'pre' }}>
              {lesson.expectedOutput.replace(/\\n/g, '\n')}
            </div>
          </div>

          {/* Line-by-line */}
          {lesson.lineByLine.length > 0 && (
            <div className="lesson-section">
              <div className="lesson-section-title"><span className="section-icon">🔍</span> Line-by-Line Explanation</div>
              <div className="line-explanation">
                {lesson.lineByLine.map((item, i) => (
                  <div key={i} className="line-item">
                    <div className="line-code">{item.line}</div>
                    <div className="line-desc">{item.explanation}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Common mistakes */}
          {lesson.commonMistakes.length > 0 && (
            <div className="lesson-section">
              <div className="lesson-section-title"><span className="section-icon">⚠️</span> Common Mistakes</div>
              <div className="mistake-list">
                {lesson.commonMistakes.map((m, i) => (
                  <div key={i} className="mistake-item">
                    <div className="mistake-bad">❌ {m.mistake}</div>
                    <div className="mistake-body">
                      <p>{m.explanation}</p>
                      <div className="mistake-fix">✅ Fix: {m.fix}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="lesson-section">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div className="lesson-section-title" style={{ marginBottom: 0 }}><span className="section-icon">📓</span> My Notes</div>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowNotes(!showNotes)}>
                {showNotes ? 'Cancel' : progress?.notes ? 'Edit Notes' : '+ Add Notes'}
              </button>
            </div>
            {showNotes && (
              <div className="animate-fade">
                <textarea className="notes-textarea" value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder="Write your personal notes here…" />
                <button className="btn btn-primary btn-sm" style={{ marginTop: 8 }} onClick={handleSaveNotes}>Save Notes</button>
              </div>
            )}
            {!showNotes && progress?.notes && (
              <div style={{ background: 'var(--color-warning-light)', border: '1px solid var(--color-warning-border)', borderRadius: 10, padding: '14px 16px', fontSize: '0.875rem', color: 'var(--color-text-secondary)', whiteSpace: 'pre-wrap' }}>
                {progress.notes}
              </div>
            )}
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
            <button className="btn btn-ghost" onClick={() => toggleBookmark(lesson.id, lesson.moduleId)} id="btn-bookmark-lesson">
              {progress?.bookmarked ? '🔖 Bookmarked' : '☆ Bookmark this lesson'}
            </button>
            <button className="btn btn-primary" onClick={() => setActiveTab('practice')} id="btn-go-practice">
              Go to Practice →
            </button>
          </div>
        </div>
      )}

      {/* ─── Practice tab ────────────────────────────────────────────────── */}
      {activeTab === 'practice' && (
        <div className="animate-fade">
          {/* Try it yourself */}
          <div className="lesson-section">
            <div className="lesson-section-title"><span className="section-icon">✏️</span> Try It Yourself</div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: 12 }}>
              Edit and run the starter code:
            </p>
            <CodeEditor initialCode={lesson.starterCode} showSubmit={false} height="180px" />
          </div>

          {/* Practice challenge */}
          <div className="lesson-section">
            <div className="lesson-section-title"><span className="section-icon">🏋️</span> Practice Challenge</div>
            <div className="exercise-card">
              <div className="exercise-header">
                <div>
                  <div className="exercise-title">{lesson.exercise.title}</div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: 8, marginBottom: 0, whiteSpace: 'pre-line' }}>
                    {lesson.exercise.description}
                  </p>
                </div>
                <span className={`difficulty-badge difficulty-${lesson.exercise.difficulty}`}>{lesson.exercise.difficulty}</span>
              </div>
              <div style={{ padding: '0 16px 16px' }}>
                <CodeEditor initialCode={lesson.exercise.starterCode} exercise={lesson.exercise} height="220px" />
              </div>
            </div>
          </div>

          {/* Mark complete */}
          {!progress?.completed && (
            <div style={{ textAlign: 'center', marginTop: 24, padding: 24, background: 'var(--color-surface-2)', borderRadius: 14 }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: 12 }}>Finished exploring this lesson?</p>
              <button className="btn btn-success btn-lg" onClick={handleMarkComplete} id="btn-complete-lesson">
                ✓ Mark Lesson Complete
              </button>
            </div>
          )}

          {/* Completion banner */}
          {progress?.completed && (
            <div className="completion-banner animate-scale">
              <div style={{ fontSize: '3rem', marginBottom: 12 }}>🎉</div>
              <h2>Lesson Complete!</h2>
              <p>You've successfully finished "{lesson.title}". Keep up the great work!</p>
              {hasNext && (
                <button className="btn btn-primary btn-lg" onClick={onNext} id="btn-next-lesson"
                  style={{ background: 'white', color: '#059669' }}>
                  Next Lesson →
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
