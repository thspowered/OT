import { FormEvent, useState } from 'react';
import { Theme } from '../../hooks/useTheme';
import { Icon } from '../../components/ui/Icon';
import './LoginPage.css';

interface LoginPageProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onToggleTheme: () => void;
  theme: Theme;
}

export function LoginPage({ onLogin, onToggleTheme, theme }: LoginPageProps) {
  const [email, setEmail] = useState('demo@raynet.cz');
  const [password, setPassword] = useState('raynet');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await onLogin(email, password);
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Prihlasenie sa nepodarilo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-intro" aria-label="Raynet CRM">
        <div className="login-brand">
          <span className="login-brand-mark">R</span>
          <span>Raynet Sales Desk</span>
        </div>
        <div className="login-message">
          <p className="login-eyebrow">Pipeline control</p>
          <h1>Prehlad obchodnych prilezitosti bez zbytocneho sumu.</h1>
          <p className="login-copy">
            Minimalisticka pracovna plocha pre obchodnikov: rychly login, cista nastenka a zoznam
            stagnujucich prilezitosti pripraveny na backend data.
          </p>
        </div>
      </section>

      <section className="login-panel" aria-label="Prihlasenie">
        <button className="login-theme" onClick={onToggleTheme} type="button" aria-label="Prepnout tema">
          <Icon name={theme === 'light' ? 'moon' : 'sun'} />
        </button>

        <form className="login-card" onSubmit={handleSubmit}>
          <div className="login-card-header">
            <p>Vitaj spat</p>
            <h2>Prihlasenie</h2>
          </div>

          <label>
            E-mail
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" />
          </label>

          <label>
            Heslo
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" />
          </label>

          {error && <p className="login-error">{error}</p>}

          <button className="login-submit" disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Prihlasujem...' : 'Vstupit do appky'}
            <Icon name="arrow" />
          </button>

          <p className="login-hint">Demo pristup: demo@raynet.cz / raynet</p>
        </form>
      </section>
    </main>
  );
}
