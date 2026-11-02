/**
 * App — root component
 *
 * Manages global navigation state and renders the
 * Sidebar + Header + page router layout.
 */
import { useState, useEffect } from 'react';
import { useProgressStore } from './store/progressStore';
import { Sidebar, Header } from './components/layout';
import Dashboard from './pages/Dashboard';
import Roadmap from './pages/Roadmap';
import LessonPage from './pages/LessonPage';
import Playground from './pages/Playground';
import Exercises from './pages/Exercises';
import ProgressPage from './pages/ProgressPage';
import Settings from './pages/Settings';
import type { Page, NavState } from './types';

export default function App() {
  const [nav, setNav] = useState<NavState>({ page: 'dashboard' });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme } = useProgressStore();

  // Sync theme attribute on <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // ── Navigation handler ───────────────────────────────────────────────

  const handleNavigate = (page: string, lessonId?: string, moduleId?: string) => {
    const targetPage = page === 'module' ? 'lesson' : (page as Page);
    setNav({ page: targetPage, lessonId, moduleId });
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ── Page renderer ────────────────────────────────────────────────────

  const renderPage = () => {
    switch (nav.page) {
      case 'dashboard':  return <Dashboard onNavigate={handleNavigate} />;
      case 'roadmap':    return <Roadmap onNavigate={handleNavigate} />;
      case 'lesson':
        return (
          <LessonPage
            lessonId={nav.lessonId || 'lesson-1-1'}
            moduleId={nav.moduleId || 'module-1'}
            onNavigate={handleNavigate}
          />
        );
      case 'playground': return <Playground />;
      case 'exercises':  return <Exercises onNavigate={handleNavigate} />;
      case 'progress':   return <ProgressPage onNavigate={handleNavigate} />;
      case 'settings':   return <Settings />;
      default:           return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  // ── Render ───────────────────────────────────────────────────────────

  return (
    <div className="app-layout">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 99, backdropFilter: 'blur(2px)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        currentPage={nav.page}
        isOpen={sidebarOpen}
        onNavigate={handleNavigate}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-content">
        <Header
          currentPage={nav.page}
          onMenuToggle={() => setSidebarOpen((o) => !o)}
          onNavigate={handleNavigate}
        />
        {renderPage()}
      </div>
    </div>
  );
}
