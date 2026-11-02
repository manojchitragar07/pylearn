import { curriculum } from '../data/curriculum';
import { useProgressStore } from '../store/progressStore';

interface RoadmapProps {
  onNavigate: (page: string, lessonId?: string, moduleId?: string) => void;
}

export default function Roadmap({ onNavigate }: RoadmapProps) {
  const { lessons, setActiveLesson } = useProgressStore();

  const handleStartLesson = (moduleId: string, lessonId: string) => {
    setActiveLesson(lessonId, moduleId);
    onNavigate('lesson', lessonId, moduleId);
  };

  return (
    <div className="page animate-fade">
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ marginBottom: '8px' }}>Learning Roadmap</h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', maxWidth: '560px' }}>
          A structured path from Python basics to advanced concepts. Complete each module in order to build a strong foundation.
        </p>
      </div>

      <div className="roadmap-grid stagger">
        {curriculum.map((module, moduleIndex) => {
          const completedLessons = module.lessons.filter(l => lessons[l.id]?.completed).length;
          const total = module.lessons.length;
          const pct = total > 0 ? Math.round((completedLessons / total) * 100) : 0;
          const started = module.lessons.some(l => lessons[l.id]?.started);
          const completed = completedLessons === total && total > 0;
          const firstLesson = module.lessons[0];

          // Find next incomplete lesson
          const nextLesson = module.lessons.find(l => !lessons[l.id]?.completed) || firstLesson;

          return (
            <div
              key={module.id}
              className="module-card"
              style={{ '--module-color': module.color } as React.CSSProperties}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: module.color, borderRadius: '14px 14px 0 0' }} />

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div className="module-icon">{module.icon}</div>
                <div>
                  {completed ? (
                    <span className="module-badge badge-completed">✓ Completed</span>
                  ) : started ? (
                    <span className="module-badge badge-in-progress">◐ In Progress</span>
                  ) : (
                    <span className="module-badge" style={{ background: 'var(--color-surface-2)', color: 'var(--color-text-muted)' }}>
                      Module {moduleIndex + 1}
                    </span>
                  )}
                </div>
              </div>

              <div className="module-title">{module.title}</div>
              <div className="module-description">{module.description}</div>

              {/* Progress bar */}
              <div className="progress-bar" style={{ marginBottom: '12px' }}>
                <div className="progress-fill" style={{ width: `${pct}%`, background: module.color }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="module-lessons">
                  📝 {completedLessons}/{total} lessons · {pct}%
                </div>
                <button
                  className="btn btn-sm"
                  style={{ background: module.color, color: 'white', fontSize: '0.78rem' }}
                  onClick={() => handleStartLesson(module.id, nextLesson?.id || firstLesson?.id)}
                  id={`btn-module-${module.id}`}
                >
                  {completed ? 'Review' : started ? 'Continue' : 'Start'} →
                </button>
              </div>

              {/* Lesson list */}
              <div style={{ marginTop: '16px', borderTop: '1px solid var(--color-border)', paddingTop: '12px' }}>
                {module.lessons.map(lesson => {
                  const lp = lessons[lesson.id];
                  return (
                    <div
                      key={lesson.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '6px 8px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'background 0.15s',
                        marginBottom: '2px'
                      }}
                      onClick={() => handleStartLesson(module.id, lesson.id)}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-surface-2)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    >
                      <span style={{ fontSize: '0.75rem', width: '16px', textAlign: 'center', flexShrink: 0, color: lp?.completed ? 'var(--color-success)' : 'var(--color-text-muted)' }}>
                        {lp?.completed ? '✓' : `${lesson.order}.`}
                      </span>
                      <span style={{ fontSize: '0.82rem', color: lp?.completed ? 'var(--color-text-muted)' : 'var(--color-text-secondary)', flex: 1, textDecoration: lp?.completed ? 'line-through' : 'none' }}>
                        {lesson.title}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>{lesson.estimatedMinutes}m</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
