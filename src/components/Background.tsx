import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

export default function Background() {
  return (
    <div className="fixed inset-0 z-0 bg-white dark:bg-black">
      <div className="absolute inset-0 opacity-50 dark:opacity-40">
        <Canvas camera={{ fov: 50, position: [0, 0, 8] }} gl={{ antialias: false }}>
          <PixelatedSphere />
          <Birds />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
    </div>
  );
}

function PixelatedSphere() {
  const sphereRef = useRef();

  useFrame(({ clock }: { clock: any }) => {
    if (sphereRef.current) {
      (sphereRef.current as any).rotation.y = clock.getElapsedTime() * 0.15;
      (sphereRef.current as any).rotation.z = clock.getElapsedTime() * 0.08;
    }
  });

  return (
    <points ref={sphereRef as any} position={[0, 0, -2]}>
      <icosahedronGeometry args={[2.5, 6]} />
      <pointsMaterial color="gray" size={0.03} opacity={0.8} transparent />
    </points>
  );
}

function Birds() {
  const groupRef = useRef();

  useFrame(({ clock }: { clock: any }) => {
    if (!groupRef.current) return;
    const elapsedTime = clock.getElapsedTime();
    (groupRef.current as any).children.forEach(
      (
        bird: { position: { x: number; y: number; z: number } },
        index: number,
      ) => {
        const angle = (elapsedTime * 0.3 + index * 0.15) % (2 * Math.PI);
        const radius = 4 + Math.sin(index) * 0.5;
        bird.position.x =
          radius * Math.cos(angle) - Math.sin(elapsedTime * 0.2 + index);
        bird.position.y =
          radius * Math.sin(angle) * Math.sin(elapsedTime * 0.2 + index);
        bird.position.z = radius * Math.cos(elapsedTime * 0.2 + index) - 3;
      },
    );
  });

  const birds = [...Array(60)].map((_, i) => {
    const size = i % 2 === 0 ? 0.04 : 0.06;
    return (
      <points key={i} position={[1, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={1}
            array={new Float32Array([0, 0, 0])}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color="gray" size={size} opacity={0.8} transparent sizeAttenuation />
      </points>
    );
  });

  return <group ref={groupRef as any}>{birds}</group>;
}

