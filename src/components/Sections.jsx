import { useLanguage } from '../i18n/useLanguage';
import { profile } from '../content/projects';
import { Reveal } from './Motion';
import { Arrow, Icon } from './Icons';

export function Capabilities() {
  const { t } = useLanguage();
  const capabilities = t('capabilities');
  const evidence = ['matte', 'hospital', 'finance'];
  const tags = [['Python', 'FastAPI', 'RAG', 'Langflow'], ['React', 'Next.js', 'Spring Boot', 'MySQL'], ['Kotlin', 'Jetpack Compose', 'Room', 'MVVM']];
  return <section id="capabilities" className="capabilities section-shell" aria-labelledby="capabilities-heading">
    <Reveal className="section-heading"><p className="eyebrow"><span className="section-number mono">02 /</span>{t('sections.capabilitiesEyebrow')}</p><h2 id="capabilities-heading">{t('sections.capabilitiesTitle').replace(/\.$/, '')}<span className="accent-dot">.</span></h2></Reveal>
    <div className="capability-grid">{capabilities.map((item, index) => <Reveal className="capability" key={evidence[index]} delay={index * 0.06}>
      <div className="capability-top"><Icon name={['sparkle', 'code', 'layers'][index]} /><span className="mono">0{index + 1}</span></div>
      <h3>{item.title}</h3><p>{item.description}</p>
      <div className="capability-tags mono">{tags[index].join(' · ')}</div>
      <a className="text-link" href={`#project-${evidence[index]}`}>{item.linkLabel}<Arrow diagonal /></a>
    </Reveal>)}</div>
    <Reveal className="workflow-note">
      <div className="workflow-title"><p className="eyebrow">{t('workflow.eyebrow')}</p><h3>{t('workflow.title')}</h3></div>
      <div><p>{t('workflow.description')}</p><div className="tags"><span>{t('workflow.browserTools')}</span><span>Antigravity</span><span>Codex</span></div></div>
    </Reveal>
  </section>;
}

export function About() {
  const { t } = useLanguage();
  return <section id="about" className="about section-shell" aria-labelledby="about-heading">
    <Reveal className="about-label"><p className="eyebrow"><span className="section-number mono">03 /</span>{t('sections.aboutEyebrow')}</p><div className="about-mark" aria-hidden="true">a<span>.</span></div></Reveal>
    <Reveal className="about-copy"><h2 id="about-heading">{t('sections.aboutTitle')}</h2><p>{t('sections.aboutBody')}</p><p>{t('sections.aboutBody2')}</p><a className="text-link" href={profile.cv} download="Anas_Alhatti_CV_EN.pdf">{t('hero.cv')}<Icon name="download" /></a></Reveal>
  </section>;
}

export function Contact() {
  const { t } = useLanguage();
  return <section id="contact" className="contact section-shell" aria-labelledby="contact-heading">
    <Reveal><p className="eyebrow"><span className="section-number mono">04 /</span>{t('sections.contactEyebrow')}</p>
      <div className="contact-heading"><h2 id="contact-heading">{t('sections.contactTitle').replace(/\.$/, '')}<span className="accent-dot">.</span></h2><Arrow diagonal className="contact-arrow" /></div>
      <div className="contact-bottom"><p>{t('sections.contactBody')}</p><a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}<Arrow diagonal /></a></div>
      <div className="contact-links"><a className="text-link" href={profile.github} target="_blank" rel="noreferrer">GitHub<Arrow diagonal /></a><a className="text-link" href={profile.cv} download="Anas_Alhatti_CV_EN.pdf">{t('hero.cv')}<Icon name="download" /></a></div>
    </Reveal>
  </section>;
}

export function Footer() {
  const { t } = useLanguage();
  return <footer className="footer section-shell"><span>© {new Date().getFullYear()} Anas Alhatti</span><span>{t('ui.footer')}</span><a href="#top">{t('ui.backToTop')}<span aria-hidden="true">↑</span></a></footer>;
}
