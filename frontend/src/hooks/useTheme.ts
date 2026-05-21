import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const storageKey = 'raynet-crm-theme';

function getInitialTheme(): Theme {
  const savedTheme = window.localStorage.getItem(storageKey);
  return savedTheme === 'dark' ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(storageKey, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
}
