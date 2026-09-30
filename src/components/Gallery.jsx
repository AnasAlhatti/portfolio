import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/useLanguage';
import { projects } from '../content/projects';
import { Icon } from './Icons';
import { LanguageSwitch } from './Header';

export default function Gallery({ gallery, onClose, onStep }) {
  const { t } = useLanguage();
  const reduced = useReducedMotion();
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const project = projects.find((item) => item.id === gallery.projectId);
  const screenshot = project.screenshots[gallery.index];
  const caption = t(`projects.${project.id}.captions.${gallery.index}`);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;
    if (!dialog.open) dialog.showModal();
    closeRef.current?.focus();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) previouslyFocused.focus({ preventScroll: true });
    };
  }, []);

  const onKeyDown = (event) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); onStep(1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); onStep(-1); }
    if (event.key === 'Tab') {
      const focusable = [...dialogRef.current.querySelectorAll('button, [href], [tabindex="0"]')];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  };

  return <dialog ref={dialogRef} className="gallery-dialog" aria-modal="true" aria-label={caption}
    onCancel={(event) => { event.preventDefault(); onClose(); }} onKeyDown={onKeyDown}
    onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="gallery-toolbar">
      <div><span className="mono">{t(`projects.${project.id}.title`)}</span><p id="gallery-caption" aria-live="polite">{caption}</p></div>
      <div className="gallery-toolbar-actions"><LanguageSwitch /><button ref={closeRef} className="icon-button" aria-label={t('ui.closeGallery')} onClick={onClose}><Icon name="close" /></button></div>
    </div>
    <div className="gallery-stage" onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <button className="gallery-prev icon-button" onClick={() => onStep(-1)} aria-label={t('ui.previous')}><Icon name="previous" /></button>
      <motion.img key={`${project.id}-${gallery.index}`} src={screenshot.src} alt={caption}
        initial={reduced ? false : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduced ? 0 : 0.18 }}
        drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={reduced ? 0 : 0.15}
        onDragEnd={(_, info) => { if (info.offset.x < -50) onStep(1); if (info.offset.x > 50) onStep(-1); }} draggable="false" />
      <button className="gallery-next icon-button" onClick={() => onStep(1)} aria-label={t('ui.next')}><Icon name="next" /></button>
    </div>
    <p className="gallery-count mono" aria-live="polite">{t('ui.imageCount', { current: gallery.index + 1, total: project.screenshots.length })}</p>
  </dialog>;
}
