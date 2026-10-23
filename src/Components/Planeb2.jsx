import React, { useRef, useState, useEffect } from 'react';
import { useGLTF, useProgress } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MODEL = `${import.meta.env.BASE_URL}B-2.glb`;

export function Planeb2(props) {
  const { nodes, materials } = useGLTF(MODEL);
  const introRef = useRef();
  const scrollRef = useRef();

  // wait until the loader overlay has finished
  const { active, progress } = useProgress();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!active && progress === 100) {
      const t = setTimeout(() => setReady(true), 600);
      return () => clearTimeout(t);
    }
  }, [active, progress]);

  const mats = [materials.Material, materials['Material.001']].filter(Boolean);

  // start invisible
  useEffect(() => {
    mats.forEach((m) => { m.transparent = true; m.opacity = 0; });
  }, []);

  // 1) INTRO – only after loading
  useGSAP(() => {
    if (!ready) return;
    const tl = gsap.timeline();
    tl.to(introRef.current.position, { x: 0, y: 0, z: 0, duration: 1.8, ease: 'power3.out' }, 0);
    tl.to(introRef.current.scale, { x: 0.5, y: 0.5, z: 0.5, duration: 1.8, ease: 'power3.out' }, 0);
    mats.forEach((m) =>
      tl.to(m, {
        opacity: 1, duration: 1.5, ease: 'power2.inOut',
        onComplete: () => { m.transparent = false; }, // avoids sorting artifacts
      }, 0.2)
    );
  }, { dependencies: [ready] });

  // 2) SCROLL – independent of the intro, explicit start values
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({ isMobile: '(max-width: 767px)', isDesktop: '(min-width: 768px)' }, (ctx) => {
      const { isMobile } = ctx.conditions;
      const obj = scrollRef.current;

      gsap.timeline({
        scrollTrigger: { trigger: '#projects', start: 'top bottom', end: 'top top', scrub: 1, invalidateOnRefresh: true },
      })
        .fromTo(obj.position, { x: 0, y: 0 }, { x: 3, y: 2 }, 0)
        .fromTo(obj.scale, { x: 1, y: 1, z: 1 }, { x: 0.6, y: 0.6, z: 0.6 }, 0)
        .fromTo(obj.rotation, { y: 0 }, { y: Math.PI * 0.15 }, 0);

      gsap.timeline({
        immediateRender: false,
        scrollTrigger: { trigger: '#about', start: 'top bottom', end: 'top top', scrub: 1, invalidateOnRefresh: true },
      })
        .fromTo(obj.position, { x: 3, y: 2 }, { x: 0, y: isMobile ? 0 : 0.5, immediateRender: false }, 0)
        .fromTo(obj.scale, { x: 0.6, y: 0.6, z: 0.6 }, { x: 0.5, y: 0.5, z: 0.5, immediateRender: false }, 0)
        .fromTo(obj.rotation, { x: 0, y: Math.PI * 0.15 }, { x: Math.PI * 0.5, y: 0, immediateRender: false }, 0);
    });
  }, []);

  return (
    // intro group starts small, low and behind; the final intro scale is 1 and the 0.5 below is the base size
    <group ref={introRef} position={[0, -0.5, -1]} scale={0.3} {...props}>
      <group ref={scrollRef}>
        <group dispose={null}>
          <mesh castShadow receiveShadow geometry={nodes.Plano.geometry} material={materials.Material}>
            <mesh castShadow receiveShadow geometry={nodes.Plano001.geometry} material={materials['Material.001']} scale={0.508} />
            <mesh castShadow receiveShadow geometry={nodes.Plano003.geometry} material={materials['Material.001']} position={[0.758, -0.012, -0.156]} scale={0.508} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
// useGLTF.preload(MODEL);
useGLTF.preload(`${import.meta.env.BASE_URL}B-2.glb`);