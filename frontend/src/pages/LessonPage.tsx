/**
 * Lesson Page
 *
 * Full-screen lesson view with:
 * - In-page lesson list sidebar
 * - LessonViewer for content
 * - Module quiz toggle
 */
import { useState } from 'react';
import { curriculum } from '../data/curriculum';
import { useProgressStore } from '../store/progressStore';
import { LessonViewer } from '../components/lesson';
import { Quiz } from '../components/quiz';

interface LessonPageProps {
  lessonId: string;
  moduleId: string;
  onNavigate: (page: string, lessonId?: string, moduleId?: string) => void;
}

export default function LessonPage({ lessonId, moduleId, onNavigate }: LessonPageProps) {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizDone, setQuizDone] = useState(false);
  const { setActiveLesson, getLessonProgress } = useProgressStore();

  const module = curriculum.find((m) => m.id === moduleId);
  const lessonIndex = module?.lessons.findIndex((l) => l.id === lessonId) ?? 0;
  const lesson = module?.lessons[lessonIndex];
  const nextLesson = module?.lessons[lessonIndex + 1];
  const isLastInModule = lessonIndex === (module?.lessons.length ?? 0) - 1;

  if (!lesson || !module) {
    return (
      <div className="page">
        <div className="empty-state">
          <div className="empty-state-icon">😕</div>
          <h3>Lesson not found</h3>
          <p>This lesson doesn't exist yet.</p>
          <button className="btn btn-primary" onClick={() => onNavigate('roadmap')}>Back to Roadmap</button>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    if (nextLesson) {
      setActiveLesson(nextLesson.id, module.id);
      onNavigate('lesson', nextLesson.id, module.id);
    } else {
      setShowQuiz(true);
    }
  };

  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      {/* Lesson list sidebar */}
      <div style={{
        width: 260, flexShrink: 0,
        background: 'var(--color-surface)',
        borderRight: '1px solid var(--color-border)',
        overflowY: 'auto', padding: '20px 0',
      }}>
        {/* Module title */}
        <div style={{ padding: '0 16px 12px', borderBottom: '1px solid var(--color-border)', marginBottom: 8 }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-text-muted)', marginBottom: 4 }}>
            {module.icon} {module.title}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{module.lessons.length} lessons</div>
        </div>

        {/* Lesson list */}
        {module.lessons.map((l, i) => {
          const p = getLessonProgress(l.id);
          const isCurrent = l.id === lessonId;
          return (
            <button
              key={l.id}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 16px', width: '100%',
                background: isCurrent ? 'var(--color-accent-light)' : 'transparent',
                border: 'none',
                borderLeft: isCurrent ? '3px solid var(--color-accent)' : '3px solid transparent',
                cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
              }}
              onClick={() => { setActiveLesson(l.id, module.id); onNavigate('lesson', l.id, module.id); }}
            >
              <span style={{ fontSize: '0.75rem', color: p?.completed ? 'var(--color-success)' : isCurrent ? 'var(--color-accent)' : 'var(--color-text-muted)', flexShrink: 0 }}>
                {p?.completed ? '✅' : isCurrent ? '▶' : `${i + 1}.`}
              </span>
              <span style={{ fontSize: '0.83rem', color: isCurrent ? 'var(--color-accent)' : 'var(--color-text-primary)', fontWeight: isCurrent ? 600 : 400, lineHeight: 1.4 }}>
                {l.title}
              </span>
            </button>
          );
        })}

        {/* Quiz button */}
        <div style={{ padding: '12px 16px', marginTop: 8, borderTop: '1px solid var(--color-border)' }}>
          <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'flex-start', gap: 8, fontSize: '0.82rem' }} onClick={() => setShowQuiz(true)}>
            🧠 Module Quiz
          </button>
        </div>
        <div style={{ padding: '0 16px 12px' }}>
          <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'flex-start', gap: 8, fontSize: '0.82rem' }} onClick={() => onNavigate('roadmap')}>
            ← All Modules
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '32px 40px' }}>
        {showQuiz ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowQuiz(false)}>← Back</button>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>{module.icon} {module.title} — Module Quiz</h2>
            </div>
            {quizDone ? (
              <div className="completion-banner">
                <div style={{ fontSize: '3rem', marginBottom: 12 }}>🏆</div>
                <h2 style={{ color: 'white' }}>Module Complete!</h2>
                <p>You've finished the {module.title} module. Well done!</p>
                <button className="btn btn-lg" style={{ background: 'white', color: '#059669' }} onClick={() => onNavigate('roadmap')}>
                  Continue to Next Module →
                </button>
              </div>
            ) : (
              <Quiz questions={module.quiz} moduleId={module.id} onComplete={() => setQuizDone(true)} />
            )}
          </div>
        ) : (
          <LessonViewer
            lesson={lesson}
            onComplete={() => {}}
            onNext={handleNext}
            hasNext={!!nextLesson || !isLastInModule}
          />
        )}
      </div>
    </div>
  );
}
