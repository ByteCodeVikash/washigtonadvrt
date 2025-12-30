import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function MovingStars() {
  const ref = useRef<any>();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.1;
    }
  });
  return (
    <group ref={ref}>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
    </group>
  );
}

function GridFloor() {
  const gridRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (gridRef.current) {
      // Create an infinite scrolling floor effect
      const t = state.clock.getElapsedTime();
      gridRef.current.position.z = (t * 2) % 10;
    }
  });

  return (
    <group ref={gridRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]}>
      <gridHelper args={[100, 50, 0x4444ff, 0x111122]} />
    </group>
  );
}

function FloatingParticles({ count = 100 }) {
  const points = useRef<THREE.Points>(null!);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;     // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100; // z
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.z += 0.001;
      points.current.position.z += 0.05;
      
      // Reset position to create infinite loop effect without complex logic
      if (points.current.position.z > 20) {
        points.current.position.z = -20;
      }
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
        size={0.15}
        color="#4A90E2"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function CameraController() {
  const { camera } = useThree();
  const vec = new THREE.Vector3();

  useFrame((state) => {
    // Basic camera movement based on mouse
    const x = state.pointer.x * 0.5;
    const y = state.pointer.y * 0.5;
    
    // Smooth interpolation
    camera.position.lerp(vec.set(x, y, camera.position.z), 0.05);
    camera.lookAt(0, 0, -50); // Look towards the horizon
  });

  return null;
}

export function Scene3D() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-slate-950">
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: false }}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
        <color attach="background" args={['#020617']} />
        <fog attach="fog" args={['#020617', 5, 40]} />
        
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#4A90E2" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#A855F7" />
        
        <MovingStars />
        <GridFloor />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <FloatingParticles count={300} />
        </Float>
        
        <CameraController />
      </Canvas>
      
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-slate-950/80 pointer-events-none" />
    </div>
  );
}
