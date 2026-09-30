import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider } from '../i18n/LanguageContext.jsx';
import { useLanguage } from '../i18n/useLanguage';
import { translations } from '../content/translations.js';
function Probe() {
 const { language, setLanguage, t } = useLanguage();
 return <><output aria-label="language">{language}</output><output aria-label="interpolation">{t('ui.imageCount', { current: 2, total: 8 })}</output><output aria-label="unknown">{t('unknown.key')}</output><button onClick={() => setLanguage('tr')}>Turkish</button><button onClick={() => setLanguage('en')}>English</button><button onClick={() => setLanguage('de')}>Invalid</button></>;
}
const mount = () => render(<LanguageProvider><Probe /></LanguageProvider>);
beforeEach(() => { localStorage.clear(); document.documentElement.lang = 'en'; });
describe('language preference', () => {
 it('defaults to English for a first visit', () => { mount(); expect(screen.getByLabelText('language')).toHaveTextContent('en'); expect(document.documentElement).toHaveAttribute('lang', 'en'); });
 it('switches language, updates document language, and remembers selection', async () => {
  const user = userEvent.setup(); const view = mount();
  await user.click(screen.getByRole('button', { name: 'Turkish' }));
  expect(document.documentElement).toHaveAttribute('lang', 'tr');
  expect(document.title).toContain('Anas Alhatti');
  view.unmount(); mount(); expect(screen.getByLabelText('language')).toHaveTextContent('tr');
 });
 it('works when preference storage is blocked', async () => {
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Storage unavailable'); });
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Storage unavailable'); });
  const user = userEvent.setup(); mount(); await user.click(screen.getByRole('button', { name: 'Turkish' }));
  expect(screen.getByLabelText('language')).toHaveTextContent('tr');
 });
 it('loads a saved Turkish preference', () => { localStorage.setItem('portfolio-language', 'tr'); mount(); expect(screen.getByLabelText('language')).toHaveTextContent('tr'); });
 it('ignores invalid preferences and language requests', async () => {
  localStorage.setItem('portfolio-language', 'de'); mount();
  await userEvent.setup().click(screen.getByRole('button', { name: 'Invalid' }));
  expect(screen.getByLabelText('language')).toHaveTextContent('en');
 });
 it('interpolates translated values and preserves unknown keys', () => {
  mount(); expect(screen.getByLabelText('interpolation')).toHaveTextContent('Image 2 of 8');
  expect(screen.getByLabelText('unknown')).toHaveTextContent('unknown.key');
 });
 it('updates both title and description when switching in either direction', async () => {
  const meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta);
  const user = userEvent.setup(); mount();
  await user.click(screen.getByRole('button', { name: 'Turkish' }));
  expect(meta.content).toBe(translations.tr.meta.description); expect(document.title).toBe(translations.tr.meta.title);
  await user.click(screen.getByRole('button', { name: 'English' }));
  expect(meta.content).toBe(translations.en.meta.description); expect(document.documentElement.lang).toBe('en');
  meta.remove();
 });
 it('reports a clear error when used outside its provider', () => {
  vi.spyOn(console, 'error').mockImplementation(() => {});
  expect(() => render(<Probe />)).toThrow('useLanguage must be used within LanguageProvider');
 });
});
