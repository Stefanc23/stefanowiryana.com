'use client';

import type { ThreeEvent } from '@react-three/fiber';
import { Canvas, useFrame } from '@react-three/fiber';
import { useReducedMotion } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

const ORANGE = '#f58148';
const PULSE_DURATION = 0.86;
const PULSE_GAP = 0.44;
const PULSE_SLOT = PULSE_DURATION + PULSE_GAP;
const VERIFICATION_CYCLE = PULSE_SLOT * 3;

interface RingProps {
  delay: number;
  highlighted: boolean;
  radius: number;
  rotation: [number, number, number];
  speed: number;
}

const createSurfaceTexture = (seed: number, repeatX = 5, repeatY = 1) => {
  const size = 64;
  const data = new Uint8Array(size * size);
  let state = seed * 9301 + 49297;

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      state = (state * 1664525 + 1013904223) >>> 0;
      const noise = (state >>> 24) / 255;
      const brushed = Math.sin((x / size) * Math.PI * 22) * 0.16;
      data[y * size + x] = Math.round(
        THREE.MathUtils.clamp(118 + noise * 72 + brushed * 255, 0, 255),
      );
    }
  }

  const texture = new THREE.DataTexture(
    data,
    size,
    size,
    THREE.RedFormat,
    THREE.UnsignedByteType,
  );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  texture.needsUpdate = true;

  return texture;
};

const createObsidianTexture = (seed: number) => {
  const size = 128;
  const data = new Uint8Array(size * size * 4);
  let state = seed * 214013 + 2531011;

  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      state = (state * 1664525 + 1013904223) >>> 0;
      const noise = (state >>> 24) / 255;
      const grain = Math.sin(x * 0.34 + Math.sin(y * 0.12) * 2.4) * 0.5 + 0.5;
      const veinWave =
        Math.sin((x + y * 0.68) * 0.16 + Math.sin(y * 0.09) * 2.2) * 0.5 + 0.5;
      const vein = Math.pow(veinWave, 15);
      const base = 24 + noise * 23 + grain * 8 + vein * 34;
      const offset = (y * size + x) * 4;

      data[offset] = Math.round(base * 0.82 + vein * 8);
      data[offset + 1] = Math.round(base * 0.9 + vein * 5);
      data[offset + 2] = Math.round(base + vein * 3);
      data[offset + 3] = 255;
    }
  }

  const texture = new THREE.DataTexture(
    data,
    size,
    size,
    THREE.RGBAFormat,
    THREE.UnsignedByteType,
  );
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1.6, 1.6);
  texture.needsUpdate = true;

  return texture;
};
const VerificationRing = ({
  delay,
  highlighted,
  radius,
  rotation,
  speed,
}: RingProps) => {
  const movingTrack = useRef<THREE.Group>(null);
  const pulseMaterial = useRef<THREE.MeshBasicMaterial>(null);
  const surfaceTexture = useMemo(
    () => createSurfaceTexture(delay + 2),
    [delay],
  );

  useEffect(() => () => surfaceTexture.dispose(), [surfaceTexture]);

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    const phase = (elapsed % VERIFICATION_CYCLE) - delay * PULSE_SLOT;
    const pulse =
      phase >= 0 && phase <= PULSE_DURATION
        ? Math.sin((phase / PULSE_DURATION) * Math.PI)
        : 0;

    if (movingTrack.current) {
      movingTrack.current.rotation.z = elapsed * speed;
    }

    if (pulseMaterial.current) {
      pulseMaterial.current.opacity =
        (highlighted ? 0.16 : 0.06) + pulse * (highlighted ? 1 : 0.9);
    }
  });

  const gateAngles = [0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2];
  const markerAngles = Array.from(
    { length: 8 },
    (_, index) => (index * Math.PI) / 4 + Math.PI / 8,
  );

  return (
    <group rotation={rotation}>
      <group ref={movingTrack}>
        {[-0.032, 0.032].map((offset) => (
          <mesh key={offset}>
            <torusGeometry args={[radius + offset, 0.025, 10, 144]} />
            <meshPhysicalMaterial
              color="#343b44"
              roughnessMap={surfaceTexture}
              bumpMap={surfaceTexture}
              bumpScale={0.012}
              metalness={0.86}
              roughness={0.3}
              clearcoat={0.3}
              clearcoatRoughness={0.25}
            />
          </mesh>
        ))}

        {gateAngles.map((angle) => (
          <group
            key={angle}
            position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}
            rotation={[0, 0, angle]}
          >
            <mesh>
              <boxGeometry args={[0.19, 0.115, 0.115]} />
              <meshPhysicalMaterial
                color="#1b2027"
                roughnessMap={surfaceTexture}
                metalness={0.82}
                roughness={0.26}
                clearcoat={0.4}
              />
            </mesh>
            <mesh position={[0, 0, 0.066]}>
              <boxGeometry args={[0.105, 0.135, 0.025]} />
              <meshStandardMaterial
                color="#303843"
                metalness={0.78}
                roughness={0.28}
              />
            </mesh>
            <mesh position={[0, 0, 0.081]}>
              <boxGeometry args={[0.055, 0.016, 0.012]} />
              <meshBasicMaterial color={ORANGE} toneMapped={false} />
            </mesh>
          </group>
        ))}

        {markerAngles.map((angle) => (
          <mesh
            key={angle}
            position={[
              Math.cos(angle) * radius,
              Math.sin(angle) * radius,
              0.04,
            ]}
            rotation={[0, 0, angle]}
          >
            <boxGeometry args={[0.042, 0.018, 0.018]} />
            <meshBasicMaterial
              color={ORANGE}
              transparent
              opacity={0.78}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>

      <mesh>
        <torusGeometry args={[radius, 0.014, 8, 144]} />
        <meshBasicMaterial
          ref={pulseMaterial}
          color={ORANGE}
          transparent
          opacity={0.06}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
};

const ObsidianCore = ({ highlighted }: { highlighted: boolean }) => {
  const core = useRef<THREE.Group>(null);
  const pulseRefs = useRef<(THREE.Mesh | null)[]>([]);
  const dragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0.18, y: 0 });
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(0.54, 0), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);
  const surfaceTexture = useMemo(() => createSurfaceTexture(19, 2, 2), []);
  const obsidianTexture = useMemo(() => createObsidianTexture(37), []);
  const edgePairs = useMemo(() => {
    const positions = edges.attributes.position;

    return Array.from({ length: positions.count / 2 }, (_, index) => ({
      start: new THREE.Vector3().fromBufferAttribute(positions, index * 2),
      end: new THREE.Vector3().fromBufferAttribute(positions, index * 2 + 1),
    }));
  }, [edges]);

  useEffect(() => {
    const moveCore = (event: PointerEvent) => {
      if (!dragging.current) return;

      const deltaX = event.clientX - lastPointer.current.x;
      const deltaY = event.clientY - lastPointer.current.y;
      targetRotation.current.y += deltaX * 0.009;
      targetRotation.current.x = THREE.MathUtils.clamp(
        targetRotation.current.x + deltaY * 0.009,
        -Math.PI * 0.48,
        Math.PI * 0.48,
      );
      lastPointer.current = { x: event.clientX, y: event.clientY };
    };

    const releaseCore = () => {
      if (!dragging.current) return;
      dragging.current = false;
      document.body.style.cursor = 'auto';
    };

    window.addEventListener('pointermove', moveCore, { passive: true });
    window.addEventListener('pointerup', releaseCore);
    window.addEventListener('pointercancel', releaseCore);

    return () => {
      window.removeEventListener('pointermove', moveCore);
      window.removeEventListener('pointerup', releaseCore);
      window.removeEventListener('pointercancel', releaseCore);
      document.body.style.cursor = 'auto';
      geometry.dispose();
      edges.dispose();
      surfaceTexture.dispose();
      obsidianTexture.dispose();
    };
  }, [edges, geometry, obsidianTexture, surfaceTexture]);

  useFrame(({ clock }, delta) => {
    const elapsed = clock.getElapsedTime();

    if (core.current) {
      core.current.rotation.x = THREE.MathUtils.damp(
        core.current.rotation.x,
        targetRotation.current.x,
        12,
        delta,
      );
      core.current.rotation.y = THREE.MathUtils.damp(
        core.current.rotation.y,
        targetRotation.current.y,
        12,
        delta,
      );
    }

    pulseRefs.current.forEach((pulse, index) => {
      if (!pulse) return;

      const edge = edgePairs[(index * 7) % edgePairs.length];
      const progress = (elapsed * 0.36 + index / pulseRefs.current.length) % 1;
      pulse.position.lerpVectors(edge.start, edge.end, progress);
      pulse.scale.setScalar(0.55 + Math.sin(progress * Math.PI) * 0.65);
    });
  });

  const startDragging = (event: ThreeEvent<PointerEvent>) => {
    event.stopPropagation();
    dragging.current = true;
    lastPointer.current = {
      x: event.nativeEvent.clientX,
      y: event.nativeEvent.clientY,
    };
    document.body.style.cursor = 'grabbing';
  };

  return (
    <group
      ref={core}
      rotation={[0.18, 0, -0.12]}
      onPointerDown={startDragging}
      onPointerOver={() => {
        if (!dragging.current) document.body.style.cursor = 'grab';
      }}
      onPointerOut={() => {
        if (!dragging.current) document.body.style.cursor = 'auto';
      }}
    >
      <mesh geometry={geometry}>
        <meshPhysicalMaterial
          map={obsidianTexture}
          flatShading
          roughnessMap={surfaceTexture}
          bumpMap={surfaceTexture}
          bumpScale={0.024}
          metalness={0.68}
          roughness={0.34}
          clearcoat={0.76}
          clearcoatRoughness={0.14}
        />
      </mesh>
      <lineSegments geometry={edges}>
        <lineBasicMaterial
          color={ORANGE}
          transparent
          opacity={highlighted ? 0.9 : 0.58}
          toneMapped={false}
        />
      </lineSegments>
      {[0, 1, 2].map((index) => (
        <mesh
          key={index}
          ref={(node) => {
            pulseRefs.current[index] = node;
          }}
        >
          <sphereGeometry args={[0.03, 10, 10]} />
          <meshBasicMaterial color={ORANGE} toneMapped={false} />
        </mesh>
      ))}
      <pointLight
        color={ORANGE}
        intensity={highlighted ? 4 : 2.4}
        distance={highlighted ? 2.8 : 2.2}
      />
    </group>
  );
};
const OrbitScene = ({ highlighted }: { highlighted: boolean }) => (
  <>
    <hemisphereLight args={['#dce3ed', '#0b0d11', 1.1]} />
    <ambientLight intensity={0.58} />
    <directionalLight position={[3.5, 3, 4]} intensity={3.4} color="#fff0e7" />
    <directionalLight
      position={[-3, -1.5, 2]}
      intensity={1.2}
      color="#7d8998"
    />
    <pointLight
      position={[-2.5, -1, 2]}
      intensity={5.5}
      color={ORANGE}
      distance={6}
    />
    <ObsidianCore highlighted={highlighted} />
    <VerificationRing
      delay={0}
      highlighted={highlighted}
      radius={1.56}
      rotation={[1.02, 0.08, -0.18]}
      speed={0.19}
    />
    <VerificationRing
      delay={1}
      highlighted={highlighted}
      radius={1.46}
      rotation={[0.5, 0.72, 0.56]}
      speed={-0.16}
    />
    <VerificationRing
      delay={2}
      highlighted={highlighted}
      radius={1.36}
      rotation={[-0.58, 0.68, -0.5]}
      speed={0.14}
    />
  </>
);

const OrbitFallback = () => (
  <div className="orbit-fallback" aria-hidden>
    <span className="orbit-fallback__ring orbit-fallback__ring--outer" />
    <span className="orbit-fallback__ring orbit-fallback__ring--middle" />
    <span className="orbit-fallback__ring orbit-fallback__ring--inner" />
    <span className="orbit-fallback__core" />
  </div>
);

interface VerificationOrbitProps {
  isHighlighted?: boolean;
}

interface NetworkInformationWithSaveData extends EventTarget {
  saveData?: boolean;
}

const VerificationOrbit = ({
  isHighlighted = false,
}: VerificationOrbitProps) => {
  const prefersReducedMotion = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [saveDataEnabled, setSaveDataEnabled] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const element = root.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '120px' },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const connection = (
      navigator as Navigator & { connection?: NetworkInformationWithSaveData }
    ).connection;
    if (!connection) return;

    const updateSaveDataPreference = () =>
      setSaveDataEnabled(Boolean(connection.saveData));
    updateSaveDataPreference();
    connection.addEventListener('change', updateSaveDataPreference);

    return () =>
      connection.removeEventListener('change', updateSaveDataPreference);
  }, []);

  const shouldUseFallback =
    Boolean(prefersReducedMotion) || saveDataEnabled || webglFailed;

  return (
    <div
      ref={root}
      className="relative aspect-square w-full"
      role="img"
      aria-label="A rotating obsidian icosahedron protected by three verification layers."
    >
      {shouldUseFallback ? (
        <OrbitFallback />
      ) : (
        <Canvas
          className="verification-orbit-canvas absolute inset-0"
          camera={{ fov: 34, position: [0, 0, 6.25] }}
          dpr={[1, 1.5]}
          fallback={<OrbitFallback />}
          frameloop={isVisible ? 'always' : 'demand'}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
          }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener(
              'webglcontextlost',
              () => setWebglFailed(true),
              { once: true },
            );
          }}
        >
          <OrbitScene highlighted={isHighlighted} />
        </Canvas>
      )}
    </div>
  );
};

export default VerificationOrbit;
