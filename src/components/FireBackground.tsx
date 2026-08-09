'use client';

import { useReducedMotion } from 'motion/react';
import type { CSSProperties } from 'react';
import { useMemo } from 'react';

const FireBackground = () => {
  const prefersReducedMotion = useReducedMotion();
  const embers = useMemo(
    () =>
      Array.from({ length: prefersReducedMotion ? 0 : 30 }, (_, id) => ({
        id,
        delay: `${(id % 13) * 0.55}s`,
        duration: `${8 + (id % 8) * 0.75}s`,
        drift: `${id % 2 === 0 ? 1 : -1}${10 + (id % 4) * 8}px`,
        left: `${(id * 31) % 100}%`,
        opacity: 0.25 + (id % 4) * 0.12,
        size: `${id % 5 === 0 ? 4 : 2 + (id % 2)}px`,
      })),
    [prefersReducedMotion],
  );

  return (
    <div
      className="fire-field pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {embers.map((ember) => (
        <span
          key={ember.id}
          className="absolute bottom-[-1rem] rounded-full bg-primary"
          style={
            {
              animation: `ember-rise ${ember.duration} linear infinite`,
              animationDelay: ember.delay,
              boxShadow: '0 0 14px rgba(245, 129, 72, 0.9)',
              height: ember.size,
              left: ember.left,
              width: ember.size,
              '--ember-drift': ember.drift,
              '--ember-opacity': ember.opacity,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
};

export default FireBackground;
