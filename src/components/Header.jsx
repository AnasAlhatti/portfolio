import { useEffect, useState } from 'react';
import { motion, useReducedMotion, useScroll } from 'framer-motion';
import { useLanguage } from '../i18n/useLanguage';
import { Icon } from './Icons';

export function LanguageSwitch() {
  const { language, setLanguage, t } = useLanguage();
  return <div className="language-switch" role="group" aria-label={t('nav.language')}>
    <button type="button" lang="en" aria-label="EN — Switch to English" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
    <span aria-hidden="true">/</span>
    <button type="button" lang="tr" aria-label="TR — Türkçeye geç" aria-pressed={language === 'tr'} onClick={() => setLanguage('tr')}>TR</button>
  </div>;
}

const links = ['work', 'capabilities', 'about', 'contact'];

export default function Header() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: '-15% 0px -55% 0px' });
    links.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const mobile = window.matchMedia('(max-width: 600px)');
    const onResize = () => { if (!mobile.matches) setMenuOpen(false); };
    mobile.addEventListener('change', onResize);
    const dismiss = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        document.getElementById('menu-toggle')?.focus();
      }
    };
    window.addEventListener('keydown', dismiss);
    return () => {
      window.removeEventListener('keydown', dismiss);
      mobile.removeEventListener('change', onResize);
    };
  }, [menuOpen]);

  return <>
    <a className="skip-link" href="#main">{t('ui.skipContent')}</a>
    <header className="site-header">
      <div className="header-inner">
        <a className="wordmark" href="#top" aria-label={`Anas Alhatti — ${t('ui.backToTop')}`} onClick={() => setMenuOpen(false)}>
          <img className="monogram" src={`${import.meta.env.BASE_URL}favicon.svg`} alt="" width="36" height="36" />
          <span className="wordmark-name">Anas Alhatti</span>
        </a>
        <nav className="desktop-nav" aria-label={t('nav.mainNavigation')}>
          {links.map((id) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}>{t(`nav.${id}`)}</a>)}
        </nav>
        <div className="header-actions">
          <LanguageSwitch />
          <button id="menu-toggle" className="icon-button menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={t(menuOpen ? 'nav.closeMenu' : 'nav.openMenu')} onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
      <nav id="mobile-navigation" className={`mobile-nav ${menuOpen ? 'is-open' : ''}`} aria-label={t('nav.mainNavigation')} hidden={!menuOpen}>
        {links.map((id, index) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}><span className="mono">0{index + 1}</span>{t(`nav.${id}`)}</a>)}
      </nav>
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} transition={{ duration: reduced ? 0 : 0.1 }} aria-hidden="true" />
    </header>
  </>;
}
