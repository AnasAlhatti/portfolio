import { beforeEach, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App.jsx';
import { LanguageProvider } from '../i18n/LanguageContext.jsx';

vi.mock('framer-motion', async (importOriginal) => ({ ...(await importOriginal()), useReducedMotion: () => false }));

beforeEach(() => { localStorage.clear(); });

it('keeps project and gallery controls usable with full motion enabled', async () => {
  const user = userEvent.setup();
  render(<LanguageProvider><App /></LanguageProvider>);
  await user.click(screen.getAllByRole('button', { name: 'Read case study' })[0]);
  expect(screen.getByRole('button', { name: 'Close case study' })).toHaveAttribute('aria-expanded', 'true');
  await user.click(screen.getAllByRole('button', { name: /^View screenshot:/ })[0]);
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Close screenshot viewer' }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
