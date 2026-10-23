import React, { useEffect, useState, useCallback, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Home from './Components/Home';
import Projects from './Components/Projects';
import About from './Components/About';
import Navigation from './Components/Navigation';
import SceneLoader from './Components/SceneLoader';

gsap.registerPlugin(ScrollTrigger);

const ThreeCanvas = lazy(() => import('./ThreeCanvas'));

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [loaded, setLoaded] = useState(false);

  const handleLoaded = useCallback(() => setLoaded(true), []);

  // KEPT: section tracking for the nav
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // NEW: recalculate all ScrollTrigger positions once loading is done
  useEffect(() => {
    if (!loaded) return;
    const refresh = () => ScrollTrigger.refresh();
    refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => window.removeEventListener('load', refresh);
  }, [loaded]);

  return (
    <>
      <SceneLoader onDone={handleLoaded} />

      <Suspense fallback={null}>
        <ThreeCanvas />
      </Suspense>

      <main style={{ visibility: loaded ? 'visible' : 'hidden' }}>
        <Navigation activeSection={activeSection} />

        <section className="section" id="home"><Home /></section>
        <section className="section" id="projects"><Projects /></section>
        <section className="section" id="about"><About /></section>
      </main>
    </>
  );
}