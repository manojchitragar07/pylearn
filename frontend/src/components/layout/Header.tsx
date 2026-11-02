/**
 * Header Component
 *
 * Shows breadcrumbs, streak counter, and a quick Playground link.
 */
import { useProgressStore } from '../../store/progressStore';
import type { Page } from '../../types';

const BREADCRUMB: Record<Page, string> = {
  dashboard: 'Dashboard',
  roadmap: 'Learning Roadmap',
  lesson: 'Lesson',
  playground: 'Playground',
  exercises: 'Practice Exercises',
  progress: 'Progress',
  settings: 'Settings',
  module: 'Module',
};

interface HeaderProps {
  currentPage: Page;
  onMenuToggle: () => void;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onMenuToggle, onNavigate }: HeaderProps) {
  const { streak } = useProgressStore();

  return (
    <header className="header">
      <div className="header-left">
        {/* Hamburger */}
        <button className="menu-btn" onClick={onMenuToggle} aria-label="Toggle menu" id="btn-toggle-menu">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Breadcrumb */}
        <div className="header-breadcrumb">
          <span>PyLearn</span>
          <span>/</span>
          <span className="current">{BREADCRUMB[currentPage] ?? 'Dashboard'}</span>
        </div>
      </div>

      <div className="header-right">
        {streak > 0 && (
          <div className="header-streak">
            🔥 {streak} day{streak !== 1 ? 's' : ''}
          </div>
        )}
        <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('playground')} id="btn-header-editor">
          🐍 Editor
        </button>
      </div>
    </header>
  );
}
