import React, { useRef } from 'react';
import { Environment, PerspectiveCamera, useHelper } from '@react-three/drei'
import { Planeb2 } from './Planeb2'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Scenes() {

  const redlight = useRef();
  const whitelight = useRef();
  const redlight2 = useRef();
  const isMobile = window.innerWidth < 768;

    useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#projects",
        start: "top bottom",
        end: "top top",
        scrub: 1,
      },
    });
  
    tl.to(redlight.current.position, {
      x: 2,
      y: 1.3, //1.5
    }, 0);

    tl.to(whitelight.current.position, {
      x: -1,
      y: 0,
    }, 0);
    tl.to(redlight2.current.position, {
      x: 1,
      y: 2,
      z: 0,
    }, 0)
  
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top bottom",
        end: "top top",
        scrub: 1,
      },
    });
  
    tl2.to(redlight.current.position, {
      x: 2,
      y: 1.2, //2
      z: -1,
    });
    tl2.to(whitelight.current.position, {
      x: -2,
      y: -1,
      z: 0.3,
    });
    tl2.to(redlight2.current.position, {
      x: 2,
      y: -1,
      z: 0.3,
    })
  
    ScrollTrigger.refresh();
    
  }, []);

  return (
    <>
        <ambientLight intensity={0.6} />
        <directionalLight ref={redlight} castShadow position={[0, 1, -5]} intensity={1} color="red" />
        <directionalLight ref={whitelight} castShadow position={[0, 1, -8]} intensity={5} color="white"/>
        <directionalLight ref={redlight2} castShadow position={[0, -5, -10]} intensity={1} color="red"/>
        <PerspectiveCamera fov={45} near={.1} far={1000} makeDefault position={[0, 0, isMobile ? 8 : 4]}/>
        <Planeb2 />
    </>
  )
}