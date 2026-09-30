import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App.jsx';
import { LanguageProvider } from '../i18n/LanguageContext.jsx';
import { translations } from '../content/translations.js';

beforeEach(() => { localStorage.clear(); document.body.style.overflow = ''; });
const mount = () => render(<LanguageProvider><App /></LanguageProvider>);

describe('recruiter portfolio journeys', () => {
  it('preserves an expanded case study when switching to Turkish', async () => {
    const user = userEvent.setup();
    mount();
    await user.click(screen.getAllByRole('button', { name: translations.en.ui.caseStudy })[0]);
    expect(screen.getByRole('button', { name: translations.en.ui.closeCaseStudy })).toHaveAttribute('aria-expanded', 'true');
    await user.click(screen.getByRole('button', { name: 'TR — Türkçeye geç' }));
    expect(screen.getByRole('button', { name: translations.tr.ui.closeCaseStudy })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(translations.tr.hero.titleFirst);
    expect(window.scrollTo).not.toHaveBeenCalled();
  });
  it('supports gallery navigation, language switching, closing, and focus restoration', async () => {
    const user = userEvent.setup();
    mount();
    const caption = translations.en.projects.matte.captions[0];
    const trigger = screen.getAllByRole('button', { name: new RegExp(translations.en.ui.viewScreenshot.replace('{caption}', caption)) })[0];
    await user.click(trigger);
    let dialog = screen.getByRole('dialog');
    expect(document.body.style.overflow).toBe('hidden');
    const close = within(dialog).getByRole('button', { name: translations.en.ui.closeGallery });
    expect(close).toHaveFocus();
    await user.click(within(dialog).getByRole('button', { name: translations.en.ui.next }));
    expect(dialog).toHaveAttribute('aria-label', translations.en.projects.matte.captions[1]);
    await user.click(within(dialog).getByRole('button', { name: 'TR — Türkçeye geç' }));
    dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-label', translations.tr.projects.matte.captions[1]);
    fireEvent.keyDown(dialog, { key: 'ArrowLeft' });
    expect(dialog).toHaveAttribute('aria-label', translations.tr.projects.matte.captions[0]);
    fireEvent(dialog, new Event('cancel', { bubbles: false, cancelable: true }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe('');
    expect(trigger).toHaveFocus();
  });
  it('opens and dismisses mobile navigation with keyboard and section links', async () => {
    const user = userEvent.setup();
    mount();
    const button = screen.getByRole('button', { name: translations.en.nav.openMenu });
    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'true');
    await user.keyboard('{Escape}');
    expect(button).toHaveAttribute('aria-expanded', 'false');
    await user.click(button);
    const mobile = document.getElementById('mobile-navigation');
    await user.click(within(mobile).getByRole('link', { name: /Contact/ }));
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
  it('expands Android work independently and retains it across languages', async () => {
    const user = userEvent.setup(); mount();
    const finance = screen.getByRole('button', { name: /FinanceApp/ });
    const book = screen.getByRole('button', { name: /BookManager/ });
    await user.click(finance); await user.click(book);
    expect(finance).toHaveAttribute('aria-expanded', 'true');
    expect(book).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(translations.en.projects.finance.decisions[0])).toBeVisible();
    expect(screen.getByText(translations.en.projects.book.decisions[0])).toBeVisible();
    await user.click(screen.getByRole('button', { name: 'TR — Türkçeye geç' }));
    expect(finance).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(translations.tr.projects.finance.decisions[0])).toBeVisible();
    await user.click(finance); expect(finance).toHaveAttribute('aria-expanded', 'false');
    expect(book).toHaveAttribute('aria-expanded', 'true');
  });
  it('wraps gallery navigation and contains keyboard focus', async () => {
    const user = userEvent.setup(); mount();
    await user.click(screen.getAllByRole('button', { name: /^View screenshot:/ })[0]);
    const dialog = screen.getByRole('dialog');
    const close = within(dialog).getByRole('button', { name: translations.en.ui.closeGallery });
    const next = within(dialog).getByRole('button', { name: translations.en.ui.next });
    const english = within(dialog).getByRole('button', { name: 'EN — Switch to English' });
    await user.click(within(dialog).getByRole('button', { name: translations.en.ui.previous }));
    expect(dialog).toHaveAttribute('aria-label', translations.en.projects.matte.captions.at(-1));
    fireEvent.keyDown(dialog, { key: 'ArrowRight' });
    expect(dialog).toHaveAttribute('aria-label', translations.en.projects.matte.captions[0]);
    next.focus(); await user.tab(); expect(english).toHaveFocus();
    await user.tab({ shift: true }); expect(next).toHaveFocus();
    await user.click(close); expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
  it('closes the gallery only when clicking its backdrop', async () => {
    const user = userEvent.setup(); mount();
    await user.click(screen.getAllByRole('button', { name: /^View screenshot:/ })[0]);
    const dialog = screen.getByRole('dialog');
    await user.click(within(dialog).getByRole('img'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    await user.click(dialog); expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});

