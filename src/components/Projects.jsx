import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../i18n/useLanguage';
import { projects } from '../content/projects';
import { Arrow, Icon } from './Icons';
import { Reveal } from './Motion';
import Screenshot from './Screenshot';

function ProjectLinks({ project }) {
  const { t } = useLanguage();
  return <div className="project-links">
    {project.demo && <a className="text-link" href={project.demo} target="_blank" rel="noreferrer">{t('ui.liveDemo')}<Arrow diagonal /></a>}
    {project.github && <a className="text-link" href={project.github} target="_blank" rel="noreferrer">{t('ui.github')}<Arrow diagonal /></a>}
  </div>;
}

function GalleryStrip({ project, onOpenGallery }) {
  const { t } = useLanguage();
  return <div className="screenshot-grid">
    {project.screenshots.map((screenshot, index) => {
      const caption = t(`projects.${project.id}.captions.${index}`);
      return <button className="screenshot-tile" key={`${project.id}-${index}`} onClick={() => onOpenGallery(project.id, index)} aria-label={t('ui.viewScreenshot', { caption })}>
        <Screenshot screenshot={screenshot} alt={caption} sizes="(max-width: 600px) 80vw, (max-width: 900px) 40vw, 28vw" />
        <span>{caption}<Arrow diagonal /></span>
      </button>;
    })}
  </div>;
}

function CaseStudy({ project, onOpenGallery, open }) {
  const { t } = useLanguage();
  const content = t(`projects.${project.id}`);
  const reduced = useReducedMotion();
  return <motion.div id={`${project.id}-study`} className={`case-study ${open ? 'is-open' : ''}`} aria-hidden={!open} inert={!open}
    initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
    transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}>
    <div className="case-study-inner">
    <div className="case-study-text">
      <div><p className="eyebrow">{t('ui.problem')}</p><p>{content.problem}</p></div>
      <div><p className="eyebrow">{t('ui.approach')}</p><p>{content.approach}</p></div>
      <div><p className="eyebrow">{t('ui.decisions')}</p><ul>{content.decisions.map((item) => <li key={item}>{item}</li>)}</ul></div>
    </div>
    <h4 className="gallery-heading">{t('ui.screenshots')} <span className="mono">({project.screenshots.length.toString().padStart(2, '0')})</span></h4>
    <GalleryStrip project={project} onOpenGallery={onOpenGallery} />
    </div>
  </motion.div>;
}

function FeaturedProject({ project, index, onOpenGallery }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const content = t(`projects.${project.id}`);
  return <article id={`project-${project.id}`} className={`featured-project ${index % 2 ? 'project-reverse' : ''}`} aria-labelledby={`${project.id}-title`}>
    <div className="project-layout">
      <Reveal className="project-image-wrap">
        <button className={`project-cover cover-${project.id}`} onClick={() => onOpenGallery(project.id, 0)}>
          <span className="sr-only">{t('ui.viewScreenshot', { caption: content.captions[0] })} — </span>
          <span className="cover-topline mono"><span>{content.title}</span><Arrow diagonal /></span>
          <div className="project-window"><Screenshot screenshot={project.screenshots[0]} alt={content.captions[0]} /></div>
          <span className="cover-bottomline mono">{project.tags.slice(0, 3).join(' / ')}</span>
        </button>
      </Reveal>
      <Reveal className="project-copy" delay={0.08}>
        <p className="project-kicker"><span className="mono">0{index + 1}</span><span className="eyebrow">{content.subtitle}</span></p>
        <h3 id={`${project.id}-title`}>{content.title}</h3>
        <p className="project-description">{content.description}</p>
        <div className="tags">{project.tags.slice(0, 5).map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="project-actions">
          <button className="case-toggle text-link" aria-expanded={open} aria-controls={`${project.id}-study`} onClick={() => setOpen(!open)}>{t(open ? 'ui.closeCaseStudy' : 'ui.caseStudy')}<Icon name={open ? 'close' : 'plus'} /></button>
          <ProjectLinks project={project} />
        </div>
      </Reveal>
    </div>
    <CaseStudy project={project} open={open} onOpenGallery={onOpenGallery} />
  </article>;
}

function AndroidProject({ project, index, onOpenGallery }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const content = t(`projects.${project.id}`);
  return <article id={`project-${project.id}`} className="android-project">
    <button className="android-heading" aria-expanded={open} aria-controls={`${project.id}-gallery`} onClick={() => setOpen(!open)}>
      <span className="mono android-index">0{index + 3}</span>
      <span className="android-name"><span>{content.title}</span><span className="android-subtitle">{content.subtitle}</span></span>
      <span className="android-tag mono">{project.tags[1] ?? project.tags[0]}</span>
      <span className={`android-plus ${open ? 'is-open' : ''}`}><Icon name="plus" /></span>
    </button>
    <div className="android-details" id={`${project.id}-gallery`} hidden={!open}>
      <p>{content.description}</p>
      <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      <div className="android-engineering"><h4 className="eyebrow">{t('ui.decisions')}</h4><ul>{content.decisions.map((item) => <li key={item}>{item}</li>)}</ul></div>
      <ProjectLinks project={project} />
      {open && <GalleryStrip project={project} onOpenGallery={onOpenGallery} />}
    </div>
  </article>;
}

export default function Projects({ onOpenGallery }) {
  const { t } = useLanguage();
  return <section id="work" className="work section-shell" aria-labelledby="work-heading">
    <Reveal className="section-heading">
      <p className="eyebrow"><span className="section-number mono">01 /</span>{t('sections.workEyebrow')}</p>
      <div className="heading-row"><h2 id="work-heading">{t('sections.workTitle').replace(/\.$/, '')}<span className="accent-dot">.</span></h2><p>{t('sections.workIntro')}</p></div>
    </Reveal>
    {projects.slice(0, 2).map((project, index) => <FeaturedProject key={project.id} project={project} index={index} onOpenGallery={onOpenGallery} />)}
    <div className="android-section">
      <Reveal className="android-intro"><div><p className="eyebrow">{t('sections.androidEyebrow')}</p><h3>{t('sections.androidTitle')}</h3></div><p>{t('sections.androidIntro')}</p></Reveal>
      {projects.slice(2).map((project, index) => <AndroidProject key={project.id} project={project} index={index} onOpenGallery={onOpenGallery} />)}
    </div>
  </section>;
}
