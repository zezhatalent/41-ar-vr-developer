import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

export type Theme = {
  bg: string;
  surface: string;
  surface2: string;
  border: string;
  text: string;
  muted: string;
  accent: string;
  accent2: string;
  font: string;
  mono?: string;
};

export type ThemePair = { dark: Theme; light: Theme };

type ThemeContextValue = {
  theme: Theme;
  isDark: boolean;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  pair,
  children,
}: {
  pair: ThemePair;
  children: ReactNode;
}) {
  const [isDark, setIsDark] = useState<boolean>(
    () => (typeof window !== 'undefined' && localStorage.getItem('portfolio-mode') === 'light') === false
  );

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-mode');
    if (saved === 'light' || saved === 'dark') setIsDark(saved === 'dark');
  }, []);

  const theme = isDark ? pair.dark : pair.light;

  useEffect(() => {
    localStorage.setItem('portfolio-mode', isDark ? 'dark' : 'light');
    const root = document.documentElement;
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');
    root.style.setProperty('--bg', theme.bg);
    root.style.setProperty('--surface', theme.surface);
    root.style.setProperty('--surface2', theme.surface2);
    root.style.setProperty('--border', theme.border);
    root.style.setProperty('--text', theme.text);
    root.style.setProperty('--muted', theme.muted);
    root.style.setProperty('--accent', theme.accent);
    root.style.setProperty('--accent2', theme.accent2);
  }, [theme, isDark]);

  const value = useMemo(
    () => ({ theme, isDark, toggle: () => setIsDark((d) => !d) }),
    [theme, isDark]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
