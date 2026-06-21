import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Home() {

    const ringRef = useRef();
    const heroTextRef = useRef();
    const name = useRef();
    const portfolio  = useRef();

    useGSAP(() => {
      if (!ringRef.current) return;

      gsap.set(ringRef.current, {opacity: 0, scale: 0.4, xPercent: -50, yPercent: -50});

      gsap.to(ringRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.6,
        ease: "power3.out"
      });

      gsap.to(ringRef.current, {
        scale: 0.1,
        opacity: 0,
        immediateRender: false,
        scrollTrigger: {
          trigger: "#projects",
          start: "top bottom",
          end: "top top",
          scrub: 1,
        }
      });

      gsap.to(heroTextRef.current, {
        yPercent: -200,
        opacity: 0,
        filter: "blur(10px)",
        immediateRender: false,
        scrollTrigger: {
          trigger: "#projects",
          start: "top bottom",
          end: "top top",
          scrub: true,
        }
      });

      gsap.to(name.current, {
        xPercent: 200,
        opacity: 0,
        immediateRender: false,
        scrollTrigger: { trigger: "#projects", start: "top bottom", end: "top top", scrub: true }
      });

      gsap.to(portfolio.current, {
        xPercent: -200,
        opacity: 0,
        immediateRender: false,
        scrollTrigger: { trigger: "#projects", start: "top bottom", end: "top top", scrub: true }
      });

    }, []);

  return (
    <>
        <div className='header animate-entry delay-1'>
            <span ref={portfolio}>Aerospace Engineer Portfolio</span>
            <span className='name' ref={name}>Sadish Pieris</span>
        </div>
        <div className='center'>
            <div className='ring' ref={ringRef}></div>
            <div className='hero-text animate-entry delay-2' ref={heroTextRef}>
                <h1>SADISH</h1>
            </div>
        </div>
    </>
  )
}

export default Home