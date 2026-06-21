import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useRef } from 'react';
import { MdArrowRightAlt } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

function Projects() {

  const sectionRef = useRef();

  useGSAP(() => {
    if (!sectionRef.current) return;

    const cards = gsap.utils.toArray(".projects", sectionRef.current);
    const h2Title = sectionRef.current.querySelector(".project-title");
    const h4Title = sectionRef.current.querySelector(".featured-title");
    const hrLine = sectionRef.current.querySelector(".featured-hr");

    gsap.set(h2Title, { y: 50, opacity: 0 });
    gsap.set(h4Title, { y: 50, opacity: 0 });
    gsap.set(hrLine, { x: 100, opacity: 0 });
    gsap.set(gsap.utils.toArray(".redline", sectionRef.current), { x: -100, opacity: 0 });
    gsap.set(gsap.utils.toArray(".desc", sectionRef.current), { y: 50, opacity: 0 });
    gsap.set(cards, { y: 50, opacity: 0 });

    const projectTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#projects",
        start: "top bottom-=100px",
        end: "bottom bottom",
        scrub: 1.5,
        invalidateOnRefresh: true,
      }
    });

    projectTl.to(h2Title, { y: 0, opacity: 1, ease: "none" })
             .to(".redline", { x: 0, opacity: 1, ease: "none" }, "-=0.2")
             .to(".desc", { y: 0, opacity: 1, ease: "none" }, "-=0.2")
             .to(h4Title, { y: 0, opacity: 1, ease: "none" })
             .to(hrLine, { x: 0, opacity: 1, ease: "none" }, "-=0.3")
             .to(cards, { y: 0, opacity: 1, ease: "none", stagger: 0.3 });

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    
  }, []);

  return (
    <>
      <div className='project-section' ref={sectionRef}>
        <div className='project-header'>
          <span className='checked-bg'></span>
          <h2 className='project-title'>PROJECTS</h2>
          <hr className='redline'/>
          <span className='desc'>A collection of personal, academic and extracurricular projects that reflect my passion for aerospace engineering and problem solving.</span>
        </div>
        
        <div className='featured-projects'>
          <h4 className='featured-title'>Featured Projects</h4>
          <hr className='featured-hr'/>
        </div>

        <div className='project-container'>
            <div className="projects" id='project1'>
              <div className='transparent-window'>
                <h3>Project 1</h3>
                <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                <br/>
                <div className='view-btn'>
                  <button>VIEW PROJECT
                    <span className='arrow-icon'>
                      <MdArrowRightAlt />
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="projects" id='project2'>
              <div className='transparent-window'>
                <h3>Project 2</h3>
                <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                <br/>
                <div className='view-btn'>
                  <button>VIEW PROJECT
                    <span className='arrow-icon'>
                      <MdArrowRightAlt />
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="projects" id='project3'>
              <div className='transparent-window'>
                <h3>Project 3</h3>
                <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                <br/>
                <div className='view-btn'>
                  <button>VIEW PROJECT
                    <span className='arrow-icon'>
                      <MdArrowRightAlt />
                    </span>
                  </button>
                </div>
              </div>
            </div>

        </div>
      </div>
        
    </>
  )
}

export default Projects