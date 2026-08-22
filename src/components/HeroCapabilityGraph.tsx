'use client';

import { motion, useReducedMotion } from 'motion/react';
import dynamic from 'next/dynamic';
import {
  type MouseEvent,
  useCallback,
  useRef,
  useSyncExternalStore,
} from 'react';

import type { HeroContent, HeroNode, HeroNodeSlot } from '@/types/content';

// The callback parameter names document the two-part selection contract.
// eslint-disable-next-line no-unused-vars
type HeroNodeSelect = (node: HeroNode, trigger: HTMLButtonElement) => void;

const VerificationOrbit = dynamic(
  () => import('@/components/VerificationOrbit'),
  {
    ssr: false,
    loading: () => <div className="aspect-square" aria-hidden />,
  },
);

interface HeroCapabilityGraphProps {
  activeNodeId?: string;
  data: HeroContent;
  onSelect: HeroNodeSelect;
}

const nodePositionClasses: Record<HeroNodeSlot, string> = {
  'inner-north': 'left-1/2 top-[7%] -translate-x-1/2',
  'inner-east': 'right-0 top-1/2 -translate-y-1/2',
  'inner-south': 'bottom-[5%] left-1/2 -translate-x-1/2',
  'inner-west': 'left-0 top-1/2 -translate-y-1/2',
  'outer-northwest': 'left-0 top-[5%]',
  'outer-northeast': 'right-0 top-[5%]',
  'outer-southeast': 'right-0 bottom-[3%]',
  'outer-southwest': 'left-0 bottom-[3%]',
};

const connectorCoordinates: Record<HeroNodeSlot, { x: number; y: number }> = {
  'inner-north': { x: 500, y: 78 },
  'inner-east': { x: 900, y: 425 },
  'inner-south': { x: 500, y: 760 },
  'inner-west': { x: 100, y: 425 },
  'outer-northwest': { x: 118, y: 92 },
  'outer-northeast': { x: 882, y: 92 },
  'outer-southeast': { x: 882, y: 758 },
  'outer-southwest': { x: 118, y: 758 },
};

const orderedSlots = Object.keys(nodePositionClasses) as HeroNodeSlot[];
const graphWidth = 736;

const NodeButton = ({
  active,
  node,
  onSelect,
}: {
  active: boolean;
  node: HeroNode;
  onSelect: HeroNodeSelect;
}) => (
  <button
    type="button"
    className={`group relative flex min-h-20 w-[9.5rem] flex-col items-center justify-center overflow-hidden rounded-xl border px-3.5 py-3 text-center shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-secondary ${
      active
        ? 'border-primary/85 bg-primary/15 text-light shadow-[0_0_30px_rgba(245,129,72,0.2)]'
        : 'border-light/12 bg-dark/82 text-light hover:border-primary/60 hover:bg-obsidian/95'
    }`}
    aria-haspopup="dialog"
    aria-expanded={active}
    onClick={(event: MouseEvent<HTMLButtonElement>) =>
      onSelect(node, event.currentTarget)
    }
  >
    <span
      className={`absolute inset-y-0 left-0 w-px bg-primary transition-opacity ${
        active ? 'opacity-100' : 'opacity-0 group-hover:opacity-70'
      }`}
      aria-hidden
    />
    <span className="text-[0.67rem] leading-4 font-semibold tracking-[0.12em] text-light/45 uppercase">
      {node.category}
    </span>
    <span className="mt-1 text-sm leading-5 font-semibold text-light">
      {node.title}
    </span>
    <span className="mt-0.5 text-[0.67rem] leading-4 text-light/48">
      {node.subtitle}
    </span>
  </button>
);

const HeroCapabilityGraph = ({
  activeNodeId,
  data,
  onSelect,
}: HeroCapabilityGraphProps) => {
  const prefersReducedMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const hasMounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const subscribeToStage = useCallback((notify: () => void) => {
    const stage = stageRef.current;

    if (!stage || typeof ResizeObserver === 'undefined') {
      return () => undefined;
    }

    const observer = new ResizeObserver(notify);
    observer.observe(stage);

    return () => observer.disconnect();
  }, []);
  const getStageScale = useCallback(() => {
    const stageWidth = stageRef.current?.getBoundingClientRect().width;
    return stageWidth ? Math.min(1, stageWidth / graphWidth) : 1;
  }, []);
  const graphScale = useSyncExternalStore(
    subscribeToStage,
    getStageScale,
    () => 1,
  );
  const animateEntrance = hasMounted && !prefersReducedMotion;
  const nodesBySlot = new Map(data.nodes.map((node) => [node.slot, node]));
  const orderedNodes = orderedSlots
    .map((slot) => nodesBySlot.get(slot))
    .filter((node): node is HeroNode => Boolean(node));

  const selectOverview = (event: MouseEvent<HTMLButtonElement>) =>
    onSelect(data.overview, event.currentTarget);

  return (
    <div
      id="capability-system"
      className="relative w-full"
      aria-labelledby="capability-system-title"
    >
      <h2 id="capability-system-title" className="sr-only">
        Stefano&apos;s capability system
      </h2>
      <p className="sr-only">
        Drag the three-dimensional security core with a pointer, or select any
        capability to read its details.
      </p>

      <div
        ref={stageRef}
        className="relative mx-auto aspect-[20/17] w-full max-w-[46rem]"
      >
        <div
          className="absolute top-0 left-1/2 h-[39.1rem] w-[46rem] origin-top"
          style={{ transform: `translateX(-50%) scale(${graphScale})` }}
        >
          <motion.div
            className="hero-capability-map relative size-full"
            initial={animateEntrance ? { opacity: 0, scale: 0.96 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
          >
            <svg
              className="pointer-events-none absolute inset-0 size-full overflow-visible"
              viewBox="0 0 1000 850"
              aria-hidden
            >
              <ellipse
                className="hero-graph-ring"
                cx="500"
                cy="425"
                rx="365"
                ry="285"
              />
              <ellipse
                className="hero-graph-ring hero-graph-ring--inner"
                cx="500"
                cy="425"
                rx="250"
                ry="205"
              />
              {orderedNodes.map((node) => {
                const coordinate = connectorCoordinates[node.slot!];
                return (
                  <line
                    key={node.id}
                    className={`hero-graph-connector ${
                      activeNodeId === node.id
                        ? 'hero-graph-connector--active'
                        : ''
                    }`}
                    x1="500"
                    y1="425"
                    x2={coordinate.x}
                    y2={coordinate.y}
                  />
                );
              })}
            </svg>

            <div
              className="pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[47%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,129,72,0.12),transparent_68%)]"
              aria-hidden
            />
            <div className="absolute top-1/2 left-1/2 aspect-square w-[47%] -translate-x-1/2 -translate-y-1/2">
              <VerificationOrbit isHighlighted={Boolean(activeNodeId)} />
            </div>

            {orderedNodes.map((node, index) => (
              <motion.div
                key={node.id}
                className={`absolute z-10 ${nodePositionClasses[node.slot!]}`}
                initial={animateEntrance ? { opacity: 0, scale: 0.9 } : false}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: animateEntrance ? 0.12 + index * 0.055 : 0,
                  duration: 0.42,
                  ease: 'easeOut',
                }}
              >
                <NodeButton
                  node={node}
                  active={activeNodeId === node.id}
                  onSelect={onSelect}
                />
              </motion.div>
            ))}

            <button
              type="button"
              className={`absolute top-[58%] left-1/2 z-20 w-[9.5rem] -translate-x-1/2 rounded-xl border px-3.5 py-3 text-center shadow-2xl backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-secondary ${
                activeNodeId === data.overview.id
                  ? 'border-primary bg-primary/20'
                  : 'border-primary/55 bg-dark/90 hover:border-primary'
              }`}
              aria-haspopup="dialog"
              aria-expanded={activeNodeId === data.overview.id}
              onClick={selectOverview}
            >
              <span className="block text-[0.62rem] font-semibold tracking-[0.16em] text-primary uppercase">
                Security + Engineering
              </span>
              <span className="mt-1 block text-sm font-semibold text-light">
                Stefano Wiryana
              </span>
            </button>

            <p className="absolute inset-x-0 bottom-[-0.35rem] text-center text-[0.65rem] font-medium tracking-[0.2em] text-light/38 uppercase">
              Drag the core · select a capability
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroCapabilityGraph;
