'use client';

import type { CSSProperties } from 'react';
import { useEffect, useState } from 'react';

const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 50, y: 35 });

  useEffect(() => {
    const updatePosition = (event: PointerEvent) => {
      setPosition({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('pointermove', updatePosition, { passive: true });
    return () => window.removeEventListener('pointermove', updatePosition);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1]"
      style={
        {
          background: `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(245, 129, 72, 0.13), transparent 12rem)`,
        } as CSSProperties
      }
      aria-hidden
    />
  );
};

export default CursorGlow;
