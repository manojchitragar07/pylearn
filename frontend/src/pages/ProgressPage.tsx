import { curriculum } from '../data/curriculum';
import { useProgressStore } from '../store/progressStore';

interface ProgressPageProps {
  onNavigate: (page: string, lessonId?: string, moduleId?: string) => void;
}

export default function ProgressPage({ onNavigate }: ProgressPageProps) {
  const {
    lessons,
    totalXP,
    streak,
    resetProgress,
    getLessonProgress: _getLessonProgress
  } = useProgressStore();

  const allLessons = curriculum.flatMap(m => m.lessons);
  const totalLessons = allLessons.length;
  const completedLessons = Object.values(lessons).filter(l => l.completed).length;
  const passedExercises = Object.values(lessons).filter(l => l.exercisePassed).length;
  const totalAttempts = Object.values(lessons).reduce((acc, l) => acc + l.exerciseAttempts, 0);
  const bookmarks = Object.values(lessons).filter(l => l.bookmarked);
  const notes = Object.values(lessons).filter(l => l.notes);

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      resetProgress();
    }
  };

  const level = Math.floor(totalXP / 200) + 1;
  const levelXP = totalXP % 200;

  return (
    <div className="page animate-fade">
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ marginBottom: '8px' }}>Progress Dashboard</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
          Track your learning journey and celebrate your achievements.
        </p>
      </div>

      {/* XP and Level */}
      <div style={{
        background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
        borderRadius: '18px',
        padding: '28px 32px',
        marginBottom: '28px',
        color: 'white'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '0.78rem', opacity: 0.75, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
              Your Level
            </div>
            <div style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1, marginBottom: '4px' }}>
              Level {level}
            </div>
            <div style={{ opacity: 0.8, fontSize: '0.9rem' }}>
              {totalXP} XP total · {200 - levelXP} XP to Level {level + 1}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '4px' }}>🔥</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{streak}</div>
            <div style={{ fontSize: '0.8rem', opacity: 0.75 }}>Day Streak</div>
          </div>
        </div>
        <div style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', opacity: 0.75, marginBottom: '6px' }}>
            <span>Level {level}</span>
            <span>{levelXP}/200 XP</span>
          </div>
          <div style={{ height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(levelXP / 200) * 100}%`, background: 'white', borderRadius: '999px', transition: 'width 0.6s ease' }} />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="dashboard-grid stagger" style={{ marginBottom: '28px' }}>
        {[
          { icon: '📚', value: `${completedLessons}/${totalLessons}`, label: 'Lessons Completed', color: 'var(--color-accent)', bg: 'var(--color-accent-light)' },
          { icon: '✅', value: passedExercises, label: 'Exercises Passed', color: 'var(--color-success)', bg: 'var(--color-success-light)' },
          { icon: '🎯', value: totalAttempts, label: 'Total Attempts', color: '#d97706', bg: '#fef3c7' },
          { icon: '🔖', value: bookmarks.length, label: 'Bookmarks', color: '#7c3aed', bg: '#f3e8ff' }
        ].map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
            <div>
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Per-module progress */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '20px' }}>📊 Module Progress</h3>
        {curriculum.map(module => {
          const done = module.lessons.filter(l => lessons[l.id]?.completed).length;
          const total = module.lessons.length;
          const pct = total > 0 ? Math.round((done / total) * 100) : 0;
          return (
            <div key={module.id} className="progress-module-bar">
              <div className="progress-module-name">
                {module.icon} {module.title}
              </div>
              <div className="progress-module-bar-wrap">
                <div className="progress-fill" style={{ width: `${pct}%`, background: module.color }} />
              </div>
              <div className="progress-module-pct">{pct}%</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', width: '60px', textAlign: 'right' }}>
                {done}/{total}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bookmarked lessons */}
      {bookmarks.length > 0 && (
        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}>🔖 Bookmarked Lessons</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {bookmarks.map(b => {
              const lessonData = allLessons.find(l => l.id === b.lessonId);
              const moduleData = curriculum.find(m => m.id === b.moduleId);
              if (!lessonData) return null;
              return (
                <div
                  key={b.lessonId}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '10px', cursor: 'pointer', transition: 'background 0.15s' }}
                  onClick={() => onNavigate('lesson', b.lessonId, b.moduleId)}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-surface-2)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <span>🔖</span>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>{lessonData.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{moduleData?.icon} {moduleData?.title}</div>
                  </div>
                  <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--color-accent)' }}>Review →</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Notes */}
      {notes.length > 0 && (
        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}>📓 My Notes</h3>
          {notes.map(n => {
            const lessonData = allLessons.find(l => l.id === n.lessonId);
            if (!lessonData || !n.notes) return null;
            return (
              <div key={n.lessonId} style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--color-border-light)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px', color: 'var(--color-text-primary)' }}>
                  {lessonData.title}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', whiteSpace: 'pre-wrap', background: 'var(--color-surface-2)', padding: '10px 14px', borderRadius: '8px' }}>
                  {n.notes}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Danger Zone */}
      <div className="card" style={{ borderColor: 'var(--color-error-border)', background: 'var(--color-error-light)' }}>
        <h3 style={{ fontSize: '1rem', marginBottom: '8px', color: 'var(--color-error)' }}>⚠️ Reset Progress</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
          This will permanently delete all your learning progress, XP, bookmarks, and notes. This action cannot be undone.
        </p>
        <button className="btn btn-danger" onClick={handleReset} id="btn-reset-progress">
          🗑️ Reset All Progress
        </button>
      </div>
    </div>
  );
}
