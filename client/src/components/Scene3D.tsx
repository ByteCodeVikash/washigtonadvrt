import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera, MeshDistortMaterial } from '@react-three/drei';
import { useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

function MovingStars() {
  const ref = useRef<any>();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.01) * 0.05;
    }
  });
  return (
    <group ref={ref}>
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
    </group>
  );
}

function ArchitecturalLines() {
  const group = useRef<THREE.Group>(null!);
  
  // Create abstract pillar-like structures
  const lines = useMemo(() => {
    const items = [];
    for (let i = 0; i < 20; i++) {
      items.push({
        position: [
          (Math.random() - 0.5) * 40,
          -15,
          -Math.random() * 100
        ] as [number, number, number],
        height: 20 + Math.random() * 40,
        width: 0.1 + Math.random() * 0.5
      });
    }
    return items;
  }, []);

  return (
    <group ref={group}>
      {lines.map((line, i) => (
        <mesh key={i} position={line.position}>
          <boxGeometry args={[line.width, line.height, line.width]} />
          <meshStandardMaterial color="#4A90E2" transparent opacity={0.1} />
        </mesh>
      ))}
    </group>
  );
}

function GridFloor() {
  const gridRef = useRef<THREE.Group>(null);
  const { scrollYProgress } = useScroll();
  const zPos = useTransform(scrollYProgress, [0, 1], [0, 50]);
  
  useFrame(() => {
    if (gridRef.current) {
      gridRef.current.position.z = zPos.get() % 10;
    }
  });

  return (
    <group ref={gridRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -12, 0]}>
      <gridHelper args={[200, 100, 0x1e3a8a, 0x0f172a]} />
    </group>
  );
}

function FloatingParticles({ count = 200 }) {
  const points = useRef<THREE.Points>(null!);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 150;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.z += 0.0005;
      points.current.position.z += 0.02;
      if (points.current.position.z > 30) points.current.position.z = -70;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#ffffff"
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CameraController() {
  const { camera } = useThree();
  const { scrollYProgress } = useScroll();
  
  // Camera Z-movement based on scroll
  const zMovement = useTransform(scrollYProgress, [0, 1], [15, -50]);
  const yMovement = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const xRotation = useTransform(scrollYProgress, [0, 1], [0, -0.1]);

  useFrame((state) => {
    // Cinematic drift based on mouse
    const x = state.pointer.x * 0.2;
    const y = state.pointer.y * 0.2;
    
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, zMovement.get(), 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, y + yMovement.get(), 0.05);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, x, 0.05);
    
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, xRotation.get(), 0.05);
    camera.lookAt(0, 0, camera.position.z - 50);
  });

  return null;
}

export function Scene3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#020617]">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: false }} powerPreference="high-performance">
        <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={60} />
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 10, 60]} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[20, 20, 20]} intensity={2} color="#1e40af" />
        <pointLight position={[-20, -20, -20]} intensity={1} color="#1e3a8a" />
        
        <MovingStars />
        <GridFloor />
        <ArchitecturalLines />
        <FloatingParticles count={400} />
        
        <CameraController />
      </Canvas>
      
      {/* Cinematic Dark Blue Wash */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 via-transparent to-[#020617] pointer-events-none" />
      <div className="absolute inset-0 bg-[#020617]/20 pointer-events-none backdrop-blur-[2px]" />
    </div>
  );
}

