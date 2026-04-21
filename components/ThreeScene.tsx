"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { BasicShadowMap, type Group, type Mesh } from "three";

type ThreeSceneProps = {
  /**
   * ASSET SLOT: Place your 3D model at /public/models/sculpture.glb
   * If not present, this will render a procedural icosahedron as fallback.
   * Recommended: abstract organic shape, matte finish, under 500KB, decimated.
   * Export from Blender with Draco compression.
   */
  modelUrl?: string;
};

/**
 * Responsive sculpture placement — we can't use CSS on r3f meshes, so we read
 * the canvas viewport and place/scale the sculpture accordingly. Below a
 * portrait aspect ratio (typical on phones) the mesh floats to upper-right and
 * shrinks so the text copy underneath stays readable.
 */
function useSculpturePlacement() {
  const { viewport } = useThree();
  const aspect = viewport.width / viewport.height;
  const isNarrow = aspect < 1;
  if (isNarrow) {
    return {
      position: [0.9, 0.8, 0] as [number, number, number],
      scale: 0.7,
    };
  }
  return {
    position: [1.6, -0.4, 0] as [number, number, number],
    scale: 1,
  };
}

function GLTFSculpture({ url }: { url: string }) {
  const ref = useRef<Group>(null);
  const reduce = useReducedMotion() ?? false;
  const { scene } = useGLTF(url);
  const { position, scale } = useSculpturePlacement();
  useFrame((_, dt) => {
    if (!ref.current || reduce) return;
    ref.current.rotation.y += dt * 0.15;
  });
  return <primitive ref={ref} object={scene} position={position} scale={scale} />;
}

function ProceduralSculpture() {
  const ref = useRef<Mesh>(null);
  const reduce = useReducedMotion() ?? false;
  const { position, scale } = useSculpturePlacement();
  useFrame((_, dt) => {
    if (!ref.current || reduce) return;
    ref.current.rotation.y += dt * 0.15;
    ref.current.rotation.x += dt * 0.04;
  });
  return (
    <mesh ref={ref} position={position} scale={scale} rotation={[0.3, 0, 0]}>
      <icosahedronGeometry args={[1.1, 1]} />
      <meshPhysicalMaterial
        color="#D8D6CE"
        roughness={0.7}
        clearcoat={0.1}
        clearcoatRoughness={0.4}
        metalness={0}
      />
    </mesh>
  );
}

function Sculpture({ modelUrl }: { modelUrl?: string }) {
  if (modelUrl) return <GLTFSculpture url={modelUrl} />;
  return <ProceduralSculpture />;
}

export function ThreeScene({ modelUrl }: ThreeSceneProps) {
  return (
    <section
      className="relative w-full overflow-hidden bg-[#1A1B15] text-[#F7F5F0]"
      aria-label="A calmer way to decide"
    >
      <div className="relative h-[440px] w-full sm:h-[500px] md:h-[580px] lg:h-[620px]">
        <Suspense
          fallback={
            <div className="flex h-full items-center justify-center">
              <span className="mono text-[11px] uppercase tracking-[0.16em] text-white/50">
                Loading
              </span>
            </div>
          }
        >
          <Canvas
            camera={{ position: [0, 0.1, 6.5], fov: 38 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
            shadows={false}
            onCreated={({ gl }) => {
              gl.shadowMap.enabled = false;
              gl.shadowMap.type = BasicShadowMap;
            }}
          >
            <color attach="background" args={["#1A1B15"]} />
            <ambientLight intensity={0.35} color="#2A2B25" />
            <directionalLight
              position={[3.5, 4, 2]}
              intensity={1.5}
              color="#FFE8C7"
            />
            <directionalLight
              position={[-3, -2, -1]}
              intensity={0.5}
              color="#B8D4E0"
            />
            <Suspense fallback={null}>
              <Sculpture modelUrl={modelUrl} />
            </Suspense>
          </Canvas>
        </Suspense>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(26,27,21,0.6) 0%, rgba(26,27,21,0.1) 40%, rgba(26,27,21,0.85) 100%), radial-gradient(70% 60% at 30% 60%, rgba(26,27,21,0.55) 0%, rgba(26,27,21,0) 70%)",
          }}
        />

        <div className="pointer-events-none absolute inset-0 flex items-end px-5 pb-10 sm:items-center sm:px-6 sm:pb-0 md:px-10 lg:px-16">
          <div className="flex max-w-[520px] flex-col gap-3 sm:gap-4">
            <h2 className="display text-[34px] leading-[1.05] sm:text-[44px] md:text-[56px] lg:text-[68px]">
              A calmer way to decide.
            </h2>
            <p className="max-w-[440px] text-[15px] leading-relaxed text-white/70 sm:text-[17px]">
              Colado is the quiet second brain for people building things that
              matter.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

