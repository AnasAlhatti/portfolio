import { useCallback, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Gallery from './components/Gallery';
import { About, Capabilities, Contact, Footer } from './components/Sections';
import { projects } from './content/projects';

export default function App() {
  const [gallery, setGallery] = useState(null);
  const openGallery = useCallback((projectId, index) => setGallery({ projectId, index }), []);
  const closeGallery = useCallback(() => setGallery(null), []);
  const stepGallery = useCallback((direction) => setGallery((current) => {
    if (!current) return current;
    const length = projects.find((project) => project.id === current.projectId).screenshots.length;
    return { ...current, index: (current.index + direction + length) % length };
  }), []);

  return <MotionConfig reducedMotion="user">
    <Header />
    <main id="main" tabIndex="-1">
      <Hero onOpenGallery={openGallery} />
      <Projects onOpenGallery={openGallery} />
      <Capabilities />
      <About />
      <Contact />
    </main>
    <Footer />
    {gallery && <Gallery gallery={gallery} onClose={closeGallery} onStep={stepGallery} />}
  </MotionConfig>;
}
