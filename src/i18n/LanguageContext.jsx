import { useCallback, useEffect, useMemo, useState } from 'react';
import { translations } from '../content/translations';
import { LanguageContext } from './context';

const STORAGE_KEY = 'portfolio-language';

function initialLanguage() {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'tr' ? 'tr' : 'en';
  } catch {
    return 'en';
  }
}

export function LanguageProvider({ children }) {
  const [language, updateLanguage] = useState(initialLanguage);
  const setLanguage = useCallback((next) => {
    if (next !== 'en' && next !== 'tr') return;
    updateLanguage(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be blocked; the in-memory preference still works.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = translations[language].meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', translations[language].meta.description);
  }, [language]);

  const t = useCallback((path, values = {}) => {
    const value = path.split('.').reduce((node, key) => node?.[key], translations[language]);
    if (typeof value !== 'string') return value ?? path;
    return value.replace(/\{(\w+)\}/g, (match, key) => values[key] ?? match);
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
