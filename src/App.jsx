import { Canvas } from '@react-three/fiber';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Scenes  from './Scenes';
import Home from './Components/Home';
import Projects from './Components/Projects';
import About from './Components/About';
import Navigation from './Components/Navigation';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function App() {

  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if(entry.isIntersecting){
            setActiveSection(entry.target.id);
          }
        });
      }, {
        threshold: 0.5,
      }
    );

    console.log(activeSection); 

    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navigation activeSection={activeSection} />

      <div className='canvas-container'>
        <Canvas style={{ pointerEvents: "none" }}>
          <Scenes/>
        </Canvas>
      </div>
      <section className="section" id='home'>
        <Home/>
      </section>

      <section className="section" id='projects'>
        <Projects/>
      </section>

      <section className="section" id='about'>
        <About/>
      </section>

    </>
  )
}