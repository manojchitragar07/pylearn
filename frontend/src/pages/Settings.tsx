import { useProgressStore } from '../store/progressStore';

export default function Settings() {
  const { theme, fontSize, setTheme, setFontSize, totalXP, getCompletedLessonsCount, resetProgress } = useProgressStore();

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <div className="page animate-fade" style={{ maxWidth: '640px' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ marginBottom: '8px' }}>Settings</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
          Customize your learning experience.
        </p>
      </div>

      {/* Appearance */}
      <div className="settings-group">
        <div className="settings-title">🎨 Appearance</div>
        <div className="card" style={{ padding: '0' }}>
          <div className="settings-item" style={{ padding: '16px 20px' }}>
            <div>
              <div className="settings-item-label">Theme</div>
              <div className="settings-item-desc">Choose between light and dark mode</div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                className={`btn btn-sm ${theme === 'light' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => handleThemeChange('light')}
                id="btn-theme-light"
              >
                ☀️ Light
              </button>
              <button
                className={`btn btn-sm ${theme === 'dark' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => handleThemeChange('dark')}
                id="btn-theme-dark"
              >
                🌙 Dark
              </button>
            </div>
          </div>
          <div className="settings-item" style={{ padding: '16px 20px' }}>
            <div>
              <div className="settings-item-label">Font Size</div>
              <div className="settings-item-desc">Adjust text size for better readability</div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {(['small', 'medium', 'large'] as const).map(size => (
                <button
                  key={size}
                  className={`btn btn-sm ${fontSize === size ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => setFontSize(size)}
                  id={`btn-font-${size}`}
                >
                  {size === 'small' ? 'S' : size === 'medium' ? 'M' : 'L'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Learning Preferences */}
      <div className="settings-group">
        <div className="settings-title">📚 Learning</div>
        <div className="card" style={{ padding: '0' }}>
          <div className="settings-item" style={{ padding: '16px 20px' }}>
            <div>
              <div className="settings-item-label">Total XP</div>
              <div className="settings-item-desc">Experience points earned</div>
            </div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-accent)' }}>
              ⚡ {totalXP} XP
            </div>
          </div>
          <div className="settings-item" style={{ padding: '16px 20px' }}>
            <div>
              <div className="settings-item-label">Lessons Completed</div>
              <div className="settings-item-desc">Your lesson completion count</div>
            </div>
            <div style={{ fontWeight: 700, color: 'var(--color-success)' }}>
              ✅ {getCompletedLessonsCount()}
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="settings-group">
        <div className="settings-title">ℹ️ About</div>
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>🐍 PyLearn</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '12px' }}>
            An interactive Python learning platform designed to take you from absolute beginner to advanced Python programmer.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
            <div>⚡ Python 3.11 (Pyodide)</div>
            <div>📝 CodeMirror 6 Editor</div>
            <div>⚛️ React + TypeScript</div>
            <div>💾 Local Storage Persistence</div>
            <div>🎨 Custom Design System</div>
            <div>📱 Fully Responsive</div>
          </div>
        </div>
      </div>

      {/* Data */}
      <div className="settings-group">
        <div className="settings-title">🗄️ Data & Privacy</div>
        <div className="card">
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
            All your progress is stored locally in your browser using localStorage. No data is sent to any server. You can clear it at any time.
          </p>
          <button
            className="btn btn-danger"
            onClick={() => {
              if (confirm('Reset all learning progress? This cannot be undone.')) {
                resetProgress();
              }
            }}
            id="btn-settings-reset"
          >
            🗑️ Clear All Progress
          </button>
        </div>
      </div>
    </div>
  );
}
