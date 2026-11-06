'use client';

/**
 * Light/dark toggle, rendered quietly in the header next to the main button.
 *
 * The chosen theme lives on <html data-oss-theme>, set before first paint by
 * THEME_BOOT (rendered inline in the root layout) so there is no flash.
 * localStorage holds only this per-viewer preference, wrapped in try/catch:
 * it can be unavailable, and the page must still render correctly without it.
 */
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type OssTheme = 'light' | 'dark';
const KEY = 'oss-theme';


const Ctx = createContext<{ theme: OssTheme; setTheme: (t: OssTheme) => void }>({
  theme: 'light',
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<OssTheme>('light');

  useEffect(() => {
    const t = document.documentElement.dataset.ossTheme;
    setThemeState(t === 'dark' ? 'dark' : 'light');
  }, []);

  const setTheme = useCallback((t: OssTheme) => {
    document.documentElement.dataset.ossTheme = t;
    setThemeState(t);
    try {
      localStorage.setItem(KEY, t);
    } catch {
      /* preference simply is not remembered */
    }
  }, []);

  return <Ctx.Provider value={{ theme, setTheme }}>{children}</Ctx.Provider>;
}

export const useOssTheme = () => useContext(Ctx);

export function ThemeToggle() {
  const { theme, setTheme } = useOssTheme();
  return (
    <div role="radiogroup" aria-label="Color theme" className="inline-flex rounded-full border border-[var(--oss-line-strong)] bg-[var(--oss-surface)] p-0.5 text-xs font-medium">
      {(['light', 'dark'] as const).map((t) => (
        <button
          key={t}
          role="radio"
          aria-checked={theme === t}
          onClick={() => setTheme(t)}
          className={
            'rounded-full px-3 py-1 capitalize transition-colors ' +
            (theme === t
              ? 'bg-[var(--oss-ink)] text-[var(--oss-bg)]'
              : 'text-[var(--oss-muted)] hover:text-[var(--oss-ink)]')
          }
        >
          {t}
        </button>
      ))}
    </div>
  );
}
