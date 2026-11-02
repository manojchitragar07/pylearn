import { curriculum } from '../data/curriculum';
import { useProgressStore } from '../store/progressStore';

interface DashboardProps {
  onNavigate: (page: string, lessonId?: string, moduleId?: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const {
    lessons,
    streak,
    totalXP,
    activeLessonId,
    activeModuleId,
    getCompletedLessonsCount,
    dailyChallengeCompleted
  } = useProgressStore();

  const totalLessons = curriculum.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = getCompletedLessonsCount();
  const progress = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Find active lesson info
  const activeModule = curriculum.find(m => m.id === activeModuleId);
  const activeLesson = activeModule?.lessons.find(l => l.id === activeLessonId);

  // Recent completed lessons
  const recentLessons = Object.values(lessons)
    .filter(l => l.completed && l.completedAt)
    .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime())
    .slice(0, 3);

  // Bookmarks
  const bookmarkedLessons = Object.values(lessons)
    .filter(l => l.bookmarked)
    .slice(0, 4);

  // Stats
  const _totalAttempts = Object.values(lessons).reduce((acc, l) => acc + l.exerciseAttempts, 0);
  const passedExercises = Object.values(lessons).filter(l => l.exercisePassed).length;

  const dailyChallenge = {
    title: 'Print numbers 1 to 10 using a loop',
    difficulty: 'beginner',
    description: 'Use a for loop with range() to print numbers 1 through 10, each on its own line.'
  };

  return (
    <div className="page animate-fade">
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #a855f7 100%)',
        borderRadius: '20px',
        padding: '32px 36px',
        marginBottom: '32px',
        position: 'relative',
        overflow: 'hidden',
        color: 'white'
      }}>
        <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-40px', right: '80px', width: '140px', height: '140px', background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }} />
        <div style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.75, marginBottom: '8px' }}>
          🐍 Python Learning Platform
        </div>
        <h1 style={{ color: 'white', fontSize: '1.8rem', marginBottom: '12px', letterSpacing: '-0.03em' }}>
          Welcome back, Python learner! 👋
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', margin: 0, fontSize: '0.95rem', maxWidth: '480px' }}>
          {completedCount === 0
            ? "Ready to start your Python journey? Begin with Module 1: Getting Started!"
            : `You've completed ${completedCount} lesson${completedCount !== 1 ? 's' : ''} so far. Keep going — you're doing amazing!`}
        </p>
        <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            className="btn btn-lg"
            style={{ background: 'white', color: '#4f46e5', fontWeight: 700 }}
            onClick={() => onNavigate('lesson', activeLessonId, activeModuleId)}
            id="btn-continue-learning"
          >
            {completedCount === 0 ? '🚀 Start Learning' : '▶ Continue Learning'}
          </button>
          <button
            className="btn btn-lg"
            style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)' }}
            onClick={() => onNavigate('roadmap')}
            id="btn-view-roadmap"
          >
            📚 View Roadmap
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="dashboard-grid stagger" style={{ marginBottom: '32px' }}>
        {[
          {
            icon: '📘',
            value: `${completedCount}/${totalLessons}`,
            label: 'Lessons Completed',
            bg: 'var(--color-accent-light)',
            color: 'var(--color-accent)'
          },
          {
            icon: '⚡',
            value: totalXP,
            label: 'Total XP Earned',
            bg: '#fef3c7',
            color: '#d97706'
          },
          {
            icon: '🔥',
            value: streak,
            label: 'Day Streak',
            bg: '#fce7f3',
            color: '#db2777'
          },
          {
            icon: '✅',
            value: passedExercises,
            label: 'Exercises Passed',
            bg: 'var(--color-success-light)',
            color: 'var(--color-success)'
          }
        ].map((stat, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon" style={{ background: stat.bg, color: stat.color }}>
              {stat.icon}
            </div>
            <div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Overall Progress */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Overall Course Progress</h3>
          <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-accent)' }}>{progress}%</span>
        </div>
        <div className="progress-bar" style={{ height: '10px' }}>
          <div className="progress-fill" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #4f46e5, #7c3aed)' }} />
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '8px', marginBottom: 0 }}>
          {completedCount} of {totalLessons} lessons completed
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {/* Current Lesson */}
        <div className="card">
          <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}>📍 Continue Where You Left Off</h3>
          {activeLesson ? (
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '6px' }}>
                {activeModule?.icon} {activeModule?.title}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '12px' }}>
                {activeLesson.title}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '16px', display: 'flex', gap: '8px' }}>
                <span>⏱ {activeLesson.estimatedMinutes} min</span>
                <span>·</span>
                <span>{activeLesson.tags.slice(0, 2).join(', ')}</span>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => onNavigate('lesson', activeLesson.id, activeModule?.id)}
                id="btn-resume-lesson"
              >
                Resume Lesson →
              </button>
            </div>
          ) : (
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>No active lesson. Start from the roadmap!</p>
          )}
        </div>

        {/* Daily Challenge */}
        <div className="card" style={{ borderColor: dailyChallengeCompleted ? 'var(--color-success-border)' : 'var(--color-warning-border)', background: dailyChallengeCompleted ? 'var(--color-success-light)' : 'var(--color-warning-light)' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '12px' }}>
            ⚡ Daily Challenge
            {dailyChallengeCompleted && <span style={{ marginLeft: '8px', fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 600 }}>✓ Done!</span>}
          </h3>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-warning)', marginBottom: '8px' }}>
            {dailyChallenge.difficulty}
          </div>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', marginBottom: '16px', fontWeight: 500 }}>
            {dailyChallenge.title}
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            {dailyChallenge.description}
          </p>
          {!dailyChallengeCompleted ? (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => onNavigate('playground')}
              id="btn-daily-challenge"
            >
              Accept Challenge (+30 XP) →
            </button>
          ) : (
            <div style={{ fontSize: '0.875rem', color: 'var(--color-success)', fontWeight: 600 }}>
              🏆 +30 XP earned today!
            </div>
          )}
        </div>

        {/* Module Overview */}
        <div className="card" style={{ gridColumn: 'span 1' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}>📚 Learning Modules</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {curriculum.slice(0, 6).map(module => {
              const completed = module.lessons.filter(l => lessons[l.id]?.completed).length;
              const pct = module.lessons.length > 0 ? Math.round((completed / module.lessons.length) * 100) : 0;
              return (
                <div
                  key={module.id}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '8px', borderRadius: '8px', transition: 'background 0.15s' }}
                  onClick={() => onNavigate('module', module.lessons[0]?.id, module.id)}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-surface-2)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{module.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' as const }}>
                      {module.title}
                    </div>
                    <div style={{ height: '4px', background: 'var(--color-surface-3)', borderRadius: '9999px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: module.color, borderRadius: '9999px', transition: 'width 0.6s ease' }} />
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', flexShrink: 0 }}>{pct}%</span>
                </div>
              );
            })}
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => onNavigate('roadmap')}
              style={{ marginTop: '4px' }}
            >
              View all modules →
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        {recentLessons.length > 0 && (
          <div className="card">
            <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}>🕐 Recent Activity</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {recentLessons.map(l => {
                const allLessons = curriculum.flatMap(m => m.lessons);
                const lessonData = allLessons.find(al => al.id === l.lessonId);
                const moduleData = curriculum.find(m => m.id === l.moduleId);
                if (!lessonData) return null;
                return (
                  <div
                    key={l.lessonId}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.15s' }}
                    onClick={() => onNavigate('lesson', l.lessonId, l.moduleId)}
                    onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-surface-2)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ width: '32px', height: '32px', background: 'var(--color-success-light)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      ✅
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>{lessonData.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{moduleData?.icon} {moduleData?.title}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bookmarks */}
        {bookmarkedLessons.length > 0 && (
          <div className="card">
            <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}>🔖 Bookmarked Lessons</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {bookmarkedLessons.map(l => {
                const allLessons = curriculum.flatMap(m => m.lessons);
                const lessonData = allLessons.find(al => al.id === l.lessonId);
                if (!lessonData) return null;
                return (
                  <button
                    key={l.lessonId}
                    className="btn btn-ghost"
                    style={{ justifyContent: 'flex-start', gap: '8px', textAlign: 'left' }}
                    onClick={() => onNavigate('lesson', l.lessonId, l.moduleId)}
                  >
                    <span>🔖</span>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {lessonData.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
