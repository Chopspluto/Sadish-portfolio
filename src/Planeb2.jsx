import React, { useLayoutEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gapSize } from 'three/src/nodes/core/PropertyNode.js';
import { context } from '@react-three/fiber';

gsap.registerPlugin(ScrollTrigger);

export function Planeb2(props) {

  const { nodes, materials } = useGLTF('./B-2.glb');
  const planeRef = useRef();

  useGSAP(() => {
    if (!planeRef.current) return;

    const isMobile = window.innerWidth < 768;

    const targetMaterials = [];
    if(materials.Material) targetMaterials.push(materials.Material);
    if(materials['Material.001']) targetMaterials.push(materials['Material.001']);

    targetMaterials.forEach((material) => {
      material.transparent = true;
      material.opacity = 0;
    });

    gsap.set(planeRef.current.position, {x:0, y:-0.5, z:-1});
    gsap.set(planeRef.current.scale, {x:0.3, y:0.3, z:0.3});

    let mm = gsap.matchMedia();

    const entryTl = gsap.timeline({
      onComplete: () => {
        mm.add({
          isMobile: "(max-width: 768px)",
          isDesktop: "(min-width: 768px)"},
        (context) => {
          let {isMobile} = context.conditions;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: "#projects",
              start: "top bottom",
              end: "top top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
          
          tl.to(planeRef.current.position, {x: 2, y: 1.2});
          tl.to(planeRef.current.scale, {x: 0.2, y: 0.2, z: 0.2}, 0);
          tl.to(planeRef.current.rotation, {y: Math.PI * 0.15}, 0);

          const tl2 = gsap.timeline({
            scrollTrigger: {
              trigger: "#about",
              start: "top bottom",
              end: "top top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
          
          tl2.to(planeRef.current.position, {x: 0, y: isMobile ? -0.53 : 0.25});
          tl2.to(planeRef.current.scale,{x: 0.25, y: 0.25, z: 0.25}, 0);
          tl2.to(planeRef.current.rotation,{y: Math.PI * 0, x: Math.PI * 0.5}, 0);

        });
        ScrollTrigger.refresh();
      }
    });

    entryTl.to(planeRef.current.position, {x: 0, y: 0, z: 0, duration: 1.8, ease: "power3.out"}, 0);
    entryTl.to(planeRef.current.scale, { x: 0.5, y: 0.5, z: 0.5, duration: 1.8, ease: "power3.out" }, 0);

    targetMaterials.forEach((material) => {
      entryTl.to(material, {opacity: 1, duration: 1.5, ease: "power2.inOut"}, 0.2)
    });

    return() => mm.revert();

}, []);

  return (
    <group ref={planeRef} scale={[0.5,0.5,0.5]} rotation={[0, 0, 0]} {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Plano.geometry} material={materials.Material}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plano001.geometry}
          material={materials['Material.001']}
          scale={0.508}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Plano003.geometry}
          material={materials['Material.001']}
          position={[0.758, -0.012, -0.156]}
          scale={0.508}
        />
      </mesh>
    </group>
  )
}

useGLTF.preload('/B-2.glb')