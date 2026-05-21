import { ReactNode } from 'react';
import { AuthUser } from '../../services/authService';
import { Theme } from '../../hooks/useTheme';
import { Icon } from '../ui/Icon';
import './AppShell.css';

export type AppView = 'dashboard' | 'opportunities';

interface AppShellProps {
  activeView: AppView;
  children: ReactNode;
  onLogout: () => void;
  onNavigate: (view: AppView) => void;
  onSearchChange: (query: string) => void;
  onToggleTheme: () => void;
  searchQuery: string;
  theme: Theme;
  user: AuthUser;
}

const navItems: Array<{ view: AppView; label: string; icon: 'dashboard' | 'briefcase' }> = [
  { view: 'dashboard', label: 'Nastenka', icon: 'dashboard' },
  { view: 'opportunities', label: 'Stagnace', icon: 'briefcase' }
];

export function AppShell({
  activeView,
  children,
  onLogout,
  onNavigate,
  onSearchChange,
  onToggleTheme,
  searchQuery,
  theme,
  user
}: AppShellProps) {
  return (
    <div className="shell">
      <aside className="shell-sidebar" aria-label="Hlavni navigace">
        <div className="shell-brand">
          <span className="shell-brand-mark">R</span>
          <div>
            <strong>Raynet</strong>
            <span>Sales desk</span>
          </div>
        </div>

        <nav className="shell-nav">
          {navItems.map((item) => (
            <button
              key={item.view}
              className={activeView === item.view ? 'shell-nav-item active' : 'shell-nav-item'}
              onClick={() => onNavigate(item.view)}
              title={item.label}
              type="button"
            >
              <Icon name={item.icon} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="shell-main">
        <header className="shell-topbar">
          <label className="shell-search">
            <Icon name="search" size={17} />
            <input
              aria-label="Vyhladat prilezitost, firmu alebo obchodnika"
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Vyhladat prilezitost, firmu alebo obchodnika"
              type="search"
              value={searchQuery}
            />
          </label>

          <div className="shell-actions">
            <button className="icon-button" onClick={onToggleTheme} type="button" aria-label="Prepnout tema">
              <Icon name={theme === 'light' ? 'moon' : 'sun'} />
            </button>
            <div className="shell-user">
              <span>{user.name}</span>
              <small>{user.role}</small>
            </div>
            <button className="ghost-button" onClick={onLogout} type="button">
              Odhlasit
            </button>
          </div>
        </header>

        <main className="shell-content">{children}</main>
      </div>
    </div>
  );
}
