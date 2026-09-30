import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../i18n/useLanguage';
import { projects, profile } from '../content/projects';
import Screenshot from './Screenshot';
import { Arrow, Icon } from './Icons';
import { useDesktopPointer } from '../hooks/useDesktopPointer';

export default function Hero({ onOpenGallery }) {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const desktopPointer = useDesktopPointer();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const matte = projects[0];
  const primary = matte.screenshots[0];
  const secondary = matte.screenshots[1];
  const enter = (delay) => ({ initial: reduced ? false : { y: 16 }, animate: { y: 0 }, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } });

  return <section id="top" className="hero section-shell" ref={ref} aria-labelledby="hero-heading">
    <div className="hero-copy">
      <motion.p className="eyebrow" {...enter(0)}><span className="status-dot" />{t('hero.eyebrow')}</motion.p>
      <motion.h1 id="hero-heading" {...enter(0.08)}>{t('hero.titleFirst')}<br /><span>{t('hero.titleAccent')}</span><span className="hero-period" aria-hidden="true">.</span></motion.h1>
      <motion.p className="hero-description" {...enter(0.16)}>{t('hero.description')}</motion.p>
      <motion.div className="hero-actions" {...enter(0.24)}>
        <a className="button button-primary" href="#work">{t('hero.viewWork')}<Arrow /></a>
        <a className="button button-secondary" href={profile.cv} download="Anas_Alhatti_CV_EN.pdf">{t('hero.cv')}<Icon name="download" /></a>
        <a className="text-link hero-contact" href="#contact">{t('hero.contact')}<Arrow diagonal /></a>
      </motion.div>
      <motion.div className="hero-footnote" {...enter(0.32)}><span className="availability-dot" />{t('hero.availability')}</motion.div>
    </div>
    <motion.div className="hero-visual" style={reduced || !desktopPointer ? undefined : { y }} {...enter(0.12)}>
      <div className="visual-orbit" aria-hidden="true" />
      <div className="visual-cross cross-top" aria-hidden="true">+</div>
      <div className="visual-cross cross-bottom" aria-hidden="true">+</div>
      <div className="visual-label mono"><span className="status-dot" />{t('hero.visualLabel')}<span>01 / 05</span></div>
      <button className="hero-screen hero-screen-main" onClick={() => onOpenGallery(matte.id, 0)} aria-label={`${t('ui.viewScreenshot', { caption: t('projects.matte.captions.0') })}. ${t('hero.workspace')}`}>
        <div className="window-chrome" aria-hidden="true"><span /><span /><span /><div>{t('hero.workspace')}</div><Icon name="sparkle" /></div>
        <Screenshot screenshot={primary} alt={t('projects.matte.captions.0')} eager sizes="(max-width: 600px) 85vw, (max-width: 1100px) 65vw, 44vw" />
      </button>
      <button className="hero-screen hero-screen-secondary" onClick={() => onOpenGallery(matte.id, 1)} aria-label={t('ui.viewScreenshot', { caption: t('projects.matte.captions.1') })}>
        <Screenshot screenshot={secondary} alt={t('projects.matte.captions.1')} sizes="(max-width: 600px) 45vw, 22vw" />
        <span className="floating-caption"><Icon name="layers" />RAG Studio<Arrow diagonal /></span>
      </button>
      <span className="visual-tech mono">Next.js <span>×</span> FastAPI <span>×</span> Langflow</span>
    </motion.div>
    <div className="hero-baseline"><span className="mono">Anas Alhatti / {new Date().getFullYear()}</span><a href="#work">{t('hero.viewWork')}<span aria-hidden="true">↓</span></a></div>
  </section>;
}
