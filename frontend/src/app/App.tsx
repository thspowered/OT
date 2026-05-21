import { useState } from 'react';
import { AppShell, AppView } from '../components/layout/AppShell';
import { AuthUser, login } from '../services/authService';
import { useTheme } from '../hooks/useTheme';
import { LoginPage } from '../features/auth/LoginPage';
import { DashboardPage } from '../features/dashboard/DashboardPage';
import { OpportunityBoard } from '../features/opportunities/OpportunityBoard';
import './App.css';

function App() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [activeView, setActiveView] = useState<AppView>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const { theme, toggleTheme } = useTheme();

  const handleLogin = async (email: string, password: string) => {
    const result = await login(email, password);
    window.localStorage.setItem('raynet-crm-token', result.token);
    setUser(result.user);
  };

  const handleLogout = () => {
    window.localStorage.removeItem('raynet-crm-token');
    setUser(null);
    setActiveView('dashboard');
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} theme={theme} onToggleTheme={toggleTheme} />;
  }

  return (
    <AppShell
      activeView={activeView}
      onNavigate={setActiveView}
      onLogout={handleLogout}
      onSearchChange={setSearchQuery}
      onToggleTheme={toggleTheme}
      searchQuery={searchQuery}
      theme={theme}
      user={user}
    >
      {activeView === 'dashboard' ? (
        <DashboardPage onOpenOpportunities={() => setActiveView('opportunities')} />
      ) : (
        <OpportunityBoard searchQuery={searchQuery} />
      )}
    </AppShell>
  );
}

export default App;
