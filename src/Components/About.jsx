import React, { useRef } from 'react';
import HUD from '../Hud';
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function About() {
  
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const centerRef = useRef(null);
  const rightRef = useRef(null);

  useGSAP(() => {

    const leftElements = leftRef.current.querySelectorAll('.about-header, .about-block');
    const rightElements = rightRef.current.querySelectorAll('.contact-header, .contact-item');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: "bottom bottom",
        scrub: 1,
        toggleActions: 'play none none reverse',
      }
    });

    tl.from(leftElements, {
      x: -100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
      immediateRender: false
    }, 0)
    .from(centerRef.current, {
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.7)',
      immediateRender: false
    }, 0)
    .from(rightElements, {
      x: 100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
      immediateRender: false,
    }, 0);

  }, { scope: containerRef });

  return (
    <>
    <div className="about-section" id="about" ref={containerRef}>
       <div className="about-content" ref={leftRef}>
        <div className='about-header'>
          <h2 className='about-title'>ABOUT ME</h2>
          <hr className='redline'/>
          <span className="desc">
          I am an Aerospace Engineering student passionate about aircraft design, aerodynamics, propulsion systems, and computational analysis. I enjoy
          transforming complex engineering concepts into practical and innovative
          solutions.
          </span>
        </div>
        <div className="about-block">
          <h3>Education</h3>
          <div className="timeline-item">
            <span className="dot"></span>
            <div>
              <h4>Emirates Aviation University</h4>
              <p>BSc Aerospace Engineering</p>
              <span>2021 - 2025</span>
            </div>
          </div>
        </div>

      <div className="about-block">
        <h3>Skills</h3>
        <div className="skill">
          <span>Aerodynamics</span>
          <div className="skill-bar">
            <div className="skill-fill w90"></div>
          </div>
        </div>
        <div className="skill">
          <span>CAD Design</span>
          <div className="skill-bar">
            <div className="skill-fill w85"></div>
          </div>
        </div>

        <div className="skill">
          <span>CFD Analysis</span>
          <div className="skill-bar">
            <div className="skill-fill w80"></div>
          </div>
        </div>

        <div className="skill">
          <span>Programming</span>
          <div className="skill-bar">
            <div className="skill-fill w75"></div>
          </div>
        </div>
      </div>

      <div className="about-block">
        <h3>TOOLS</h3>
        <div className="tools-grid">
          <span>CATIA</span>
          <span>ANSYS</span>
          <span>MATLAB</span>
          <span>SolidWorks</span>
          <span>Python</span>
        </div>
      </div>

    </div>

    <div className='about-center' ref={centerRef}>
      <HUD/>
    </div>

  
    <div className="contact-content" ref={rightRef}>
      <div className="contact-header">
        <h2>GET IN TOUCH</h2>
        <hr className='redline contact-hr'/>
        <span className='desc contact-desc'>
          I am currently open to opportunities and collaborations in aerospace engineering, simulation, and design.
        </span>
      </div>

      <div className="contact-info">
        <div className="contact-item">
          <span className="contact-label">EMAIL<MdEmail /></span>
          <span>sadishpieris@gmail.com</span>
        </div>

        <div className="contact-item">
          <span className="contact-label">LINKEDIN<FaLinkedin /></span>
          <span>linkedin.com/in/sadish-pieris
          </span>
        </div>

        <div className="contact-item">
          <span className="contact-label">LOCATION<FaLocationDot /></span>
          <span>Dubai, UAE</span>
        </div>
      </div>
    </div>
  </div>
  {/* <div className='vh-20'></div> */}
    <div className='about-footer'>
      Designed and Developed by @kanishkajayani
    </div>

    </>
  )
}

export default About