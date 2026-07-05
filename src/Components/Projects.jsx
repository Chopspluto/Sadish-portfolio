import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React, { useEffect, useRef, useState } from 'react';
import { MdArrowRightAlt } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { RiExternalLinkFill } from "react-icons/ri";
import { PROJECTS } from '../data/projects';
import useSound from 'use-sound';
import clickSound from '../sounds/clickSound.mp3';
import closeSound from '../sounds/closeSound.mp3';

gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(PROJECTS[0]);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const sectionRef = useRef();

  const [click] = useSound(clickSound, { volume: 0.6 });
  const [close] = useSound(closeSound, {volume: 0.6});
 
    // Close modal when pressing ESC key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Prevent background scrolling when modal is active
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleOpenProject = (project) => {
    setActiveProject(project);
    setActiveGalleryIndex(0);
    setIsModalOpen(true);
    click();
  };

  const closeProject = () => {
    close();
    setIsModalOpen(false)
  };

  useGSAP(() => {
    if (!sectionRef.current) return;

    const cards = gsap.utils.toArray(".project-card", sectionRef.current);
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

        <div className="projects-grid" id="projects-grid-container">
          {PROJECTS.map((project) => (
            <div 
              className="project-card" 
              id={`project-card-${project.id}`}
              key={project.id}
              onClick={() => handleOpenProject(project)}
            >
              {/* Background Zoom Image */}
              <div className="project-card-image-wrapper" id={`project-card-img-wrapper-${project.id}`}>
                <img 
                  src={project.cardImage} 
                  alt={`${project.title} background`} 
                  className="project-card-img"
                  id={`project-card-img-${project.id}`}
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Gradient Mask Overlay */}
              <div className="project-card-overlay" id={`project-card-overlay-${project.id}`}></div>

              {/* Content Overlays */}
              <div className="project-card-content" id={`project-card-content-${project.id}`}>
                <h2 className="project-card-title" id={`project-card-title-text-${project.id}`}>
                  {project.title}
                </h2>
                <p className="project-card-description" id={`project-card-desc-text-${project.id}`}>
                  {project.description}
                </p>
                <button 
                  className="project-card-btn" id={`project-card-action-${project.id}`}
                  onClick={(e) => {
                    click();
                    e.stopPropagation();
                    handleOpenProject(project);
                  }}
                >
                  View Project <span className="project-card-btn-arrow" id={`project-card-arrow-${project.id}`}>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div 
        className={`modal-overlay ${isModalOpen ? 'open' : ''}`} 
        id="project-detail-modal-overlay"
        onClick={() => setIsModalOpen(false)}
      >
          <div 
            className="modal-container" 
            id="project-detail-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Column: Image Gallery Viewport & Thumbnails */}
            <div className="modal-gallery-pane" id="modal-gallery-pane-container">
              <div className="gallery-main-viewport" id="gallery-main-viewport">
                <img 
                  src={activeProject.gallery[activeGalleryIndex]} 
                  alt={`${activeProject.title} detail view ${activeGalleryIndex + 1}`}
                  className="gallery-main-img"
                  id="gallery-main-active-img"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              {/* Thumbnail Navigation Row */}
              <div className="gallery-thumbnails-row" id="gallery-thumbnails-navigation">
                {activeProject.gallery.map((image, index) => (
                  <button
                    key={index}
                    className={`gallery-thumbnail-btn ${activeGalleryIndex === index ? 'active' : ''}`}
                    id={`gallery-thumb-btn-${index}`}
                    onClick={() => setActiveGalleryIndex(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${activeProject.title} thumbnail ${index + 1}`} 
                      className="gallery-thumbnail-img"
                      id={`gallery-thumb-img-${index}`}
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Descriptions & Detailed Engineering Parameters */}
            <div className="modal-details-pane" id="modal-details-pane-container">
              {/* Close Button */}
              <button 
                className="modal-close-btn" 
                id="modal-close-button"
                onClick={() => closeProject()}
                aria-label="Close project modal"
              >
                <AiOutlineClose size={24} />
              </button>

              {/* Headers */}
              <h2 className="modal-project-title" id="modal-project-title">{activeProject.title}</h2>
              <h3 className="modal-project-subtitle" id="modal-project-subtitle">{activeProject.subtitle}</h3>
              
              {/* Detailed Description */}
              <p className="modal-project-desc" id="modal-project-description">
                {activeProject.detailedDescription}
              </p>

              {/* Specifications Section */}
              <h4 className="modal-specs-title" id="modal-specs-section-title">Performance Metrics</h4>
              <div className="modal-specs-grid" id="modal-specifications-grid">
                {activeProject.specs.map((spec, index) => (
                  <div className="spec-card" id={`spec-card-${index}`} key={index}>
                    <div className="spec-label" id={`spec-label-${index}`}>{spec.label}</div>
                    <div className="spec-value" id={`spec-value-${index}`}>{spec.value}</div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="modal-actions-container" id="modal-actions-container">
                {/* PDF button opens in a new tab */}
                <a 
                  href={activeProject.pdfUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary-action"
                  id="modal-pdf-download-btn"
                  onClick={click}>
                  <RiExternalLinkFill size={16} />
                  View Full Project [PDF]
                </a>
                
                <button 
                  className="btn-secondary-action" 
                  id="modal-close-cancel-btn"
                  onClick={() => closeProject()}>
                  Close Details
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