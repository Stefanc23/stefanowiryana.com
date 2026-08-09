'use client';

import { useEffect, useRef } from 'react';

const CursorGlow = () => {
  const glow = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);
  const position = useRef({ x: 50, y: 35 });

  useEffect(() => {
    const updatePosition = (event: PointerEvent) => {
      position.current = {
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      };

      if (frame.current !== null) return;

      frame.current = window.requestAnimationFrame(() => {
        glow.current?.style.setProperty('--glow-x', `${position.current.x}%`);
        glow.current?.style.setProperty('--glow-y', `${position.current.y}%`);
        frame.current = null;
      });
    };

    window.addEventListener('pointermove', updatePosition, { passive: true });
    return () => {
      window.removeEventListener('pointermove', updatePosition);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div
      ref={glow}
      className="cursor-glow pointer-events-none fixed inset-0 z-[1]"
      aria-hidden
    />
  );
};

export default CursorGlow;
