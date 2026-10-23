import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

export default function SceneLoader({ onDone }) {
  const { active, progress } = useProgress();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!active && progress === 100) {
      const t = setTimeout(() => { setHidden(true); onDone?.(); }, 500);
      return () => clearTimeout(t);
    }
  }, [active, progress, onDone]);

  if (hidden) return null;

  return (
    <div className="scene-loader-container">
      <div className="loader-scanner"></div>
      <p>INITIALIZING... {Math.round(progress)}%</p>
    </div>
  );
}