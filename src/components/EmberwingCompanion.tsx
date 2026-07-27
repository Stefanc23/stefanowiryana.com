'use client';

import { useReducedMotion } from 'motion/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const animations = {
  idle: {
    row: 0,
    durations: [280, 110, 110, 140, 140, 320],
  },
  waving: {
    row: 3,
    durations: [140, 140, 140, 280],
  },
} as const;

type AnimationName = keyof typeof animations;

interface EmberwingCompanionProps {
  greetingActive?: boolean;
}

const EmberwingCompanion = ({
  greetingActive = false,
}: EmberwingCompanionProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [animation, setAnimation] = useState<AnimationName>(
    greetingActive ? 'waving' : 'idle',
  );
  const [frame, setFrame] = useState(0);
  const activeAnimation = animations[animation];

  useEffect(() => {
    if (prefersReducedMotion) return;

    const timer = window.setTimeout(() => {
      const isLastFrame = frame === activeAnimation.durations.length - 1;

      if (isLastFrame && animation === 'waving') {
        if (greetingActive) return;
        setAnimation('idle');
        setFrame(0);
        return;
      }

      setFrame((currentFrame) => (isLastFrame ? 0 : currentFrame + 1));
    }, activeAnimation.durations[frame]);

    return () => window.clearTimeout(timer);
  }, [activeAnimation, animation, frame, greetingActive, prefersReducedMotion]);

  const startWave = () => {
    if (prefersReducedMotion || animation === 'waving') return;
    setAnimation('waving');
    setFrame(0);
  };

  const visibleFrame = prefersReducedMotion ? 0 : frame;
  const visibleRow = prefersReducedMotion ? 0 : activeAnimation.row;

  return (
    <div
      className="emberwing-companion"
      role="img"
      aria-label="Emberwing, a small ember-colored dragon guardian."
      onPointerEnter={startWave}
      onFocus={startWave}
      tabIndex={0}
    >
      <Image
        className="emberwing-companion__atlas"
        src="/emberwing-spritesheet.webp"
        alt=""
        width={1536}
        height={2288}
        unoptimized
        draggable={false}
        style={{
          transform: `translate3d(-${visibleFrame * 12.5}%, -${visibleRow * (100 / 11)}%, 0)`,
        }}
      />
    </div>
  );
};

export default EmberwingCompanion;
