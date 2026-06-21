import React, { useLayoutEffect, useRef } from 'react';
import { Environment, OrbitControls, PerspectiveCamera, useGLTF, useHelper } from '@react-three/drei'
import { Planeb2 } from './Planeb2'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DirectionalLightHelper } from 'three';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Scenes() {

  const redlight = useRef();
  const whitelight = useRef();
  const isMobile = window.innerWidth < 768;
  // useHelper(redlight, DirectionalLightHelper, 1, 'red');
  // useHelper(whitelight, DirectionalLightHelper, 1, 'white');

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
    });

    tl.to(whitelight.current.position, {
      x: -1,
      y: 0,
    });
  
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
  
    ScrollTrigger.refresh();
    
  }, []);

  return (
    <>
        {/* <OrbitControls
        enableZoom={false} enablePan={false}
        target={[0, 0, 0]} /> */}
        <ambientLight intensity={0.1} />
        <directionalLight ref={redlight} castShadow position={[0, 1, -5]} intensity={1} color="red" />
        <directionalLight ref={whitelight} castShadow position={[0, 1, -8]} intensity={5} color="white"/>
        <PerspectiveCamera fov={45} near={.1} far={1000} makeDefault position={[0, 0, isMobile ? 8 : 4]}/>
        <Environment preset="night" />
        <Planeb2 />
        {/* <axesHelper args={[500]}/> */}
    </>
  )
}