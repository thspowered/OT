export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface LoginResult {
  token: string;
  user: AuthUser;
}

export async function login(email: string, password: string): Promise<LoginResult> {
  await new Promise((resolve) => {
    window.setTimeout(resolve, 250);
  });

  if (email !== 'demo@raynet.cz' || password !== 'raynet') {
    throw new Error('Prihlasenie sa nepodarilo. Skontroluj e-mail a heslo.');
  }

  return {
    token: 'local-demo-session-token',
    user: {
      id: 'demo-user',
      name: 'Petra Novakova',
      email,
      role: 'Sales manager'
    }
  };
}
