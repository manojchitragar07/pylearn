/**
 * Sidebar Navigation Component
 */
import { useProgressStore } from '../../store/progressStore';
import type { Page } from '../../types';

interface NavItem {
  id: Page;
  icon: string;
  label: string;
}

const MAIN_ITEMS: NavItem[] = [
  { id: 'dashboard', icon: '🏠', label: 'Dashboard' },
  { id: 'roadmap', icon: '🗺️', label: 'Learning Roadmap' },
];

const PRACTICE_ITEMS: NavItem[] = [
  { id: 'playground', icon: '🐍', label: 'Playground' },
  { id: 'exercises', icon: '🏋️', label: 'Practice' },
];

const ACCOUNT_ITEMS: NavItem[] = [
  { id: 'progress', icon: '📊', label: 'Progress' },
  { id: 'settings', icon: '⚙️', label: 'Settings' },
];

interface SidebarProps {
  currentPage: Page;
  isOpen: boolean;
  onNavigate: (page: string) => void;
  onClose: () => void;
}

export default function Sidebar({ currentPage, isOpen, onNavigate, onClose }: SidebarProps) {
  const { totalXP } = useProgressStore();
  const level = Math.floor(totalXP / 200) + 1;
  const levelProgress = ((totalXP % 200) / 200) * 100;

  const isActive = (item: NavItem) =>
    currentPage === item.id ||
    (item.id === 'roadmap' && currentPage === 'lesson');

  const renderGroup = (label: string, items: NavItem[]) => (
    <>
      <div className="sidebar-section-label">{label}</div>
      {items.map((item) => (
        <button
          key={item.id}
          className={`sidebar-nav-item ${isActive(item) ? 'active' : ''}`}
          onClick={() => { onNavigate(item.id); onClose(); }}
          id={`nav-${item.id}`}
        >
          <span className="nav-icon">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </>
  );

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Logo */}
      <div className="sidebar-logo" onClick={() => { onNavigate('dashboard'); onClose(); }} style={{ cursor: 'pointer' }}>
        <div className="sidebar-logo-icon">🐍</div>
        <div className="sidebar-logo-text">Py<span>Learn</span></div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {renderGroup('Main', MAIN_ITEMS)}
        <div style={{ marginTop: 16 }} />
        {renderGroup('Practice', PRACTICE_ITEMS)}
        <div style={{ marginTop: 16 }} />
        {renderGroup('Account', ACCOUNT_ITEMS)}
      </nav>

      {/* XP bar */}
      <div className="sidebar-xp">
        <div className="xp-label">
          <span>⚡ {totalXP} XP</span>
          <span>Level {level}</span>
        </div>
        <div className="xp-bar">
          <div className="xp-fill" style={{ width: `${levelProgress}%` }} />
        </div>
      </div>
    </aside>
  );
}
