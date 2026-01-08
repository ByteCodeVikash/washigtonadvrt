import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Image, Sparkles, Cloud } from '@react-three/drei';
import * as THREE from 'three';

interface SceneProps {
    theme: 'dark' | 'light';
}

function BackgroundScene({ theme }: SceneProps) {
    const { viewport } = useThree();
    const bgRef = useRef<any>(null);
    const fgRef = useRef<any>(null);
    const cloudRef = useRef<any>(null);
    const lightRef = useRef<any>(null);

    useFrame((state) => {
        // Mouse & Scroll values
        const mouseX = state.pointer.x;
        const mouseY = state.pointer.y;
        const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1);

        // Aggressive Animation Settings
        const zMovement = -scrollPercent * 15; // Move WAY back
        const yMovement = scrollPercent * 2; // Pan up

        // 1. Interactive Light follows mouse
        if (lightRef.current) {
            lightRef.current.position.x = mouseX * 5;
            lightRef.current.position.y = mouseY * 5;
            lightRef.current.position.z = 2; // Slightly in front
        }

        if (bgRef.current) {
            // BG moves slowly (Far away)
            bgRef.current.position.x = THREE.MathUtils.lerp(bgRef.current.position.x, mouseX * 0.5, 0.05);
            bgRef.current.position.y = THREE.MathUtils.lerp(bgRef.current.position.y, (mouseY * 0.5) + yMovement, 0.05);
            bgRef.current.position.z = THREE.MathUtils.lerp(bgRef.current.position.z, zMovement, 0.05);

            // BG Rotation
            bgRef.current.rotation.x = THREE.MathUtils.lerp(bgRef.current.rotation.x, -mouseY * 0.2, 0.05);
            bgRef.current.rotation.y = THREE.MathUtils.lerp(bgRef.current.rotation.y, mouseX * 0.2, 0.05);
        }

        if (fgRef.current) {
            // FG (Sparkles) moves faster (Closer) - standard Parallax rule
            fgRef.current.position.x = THREE.MathUtils.lerp(fgRef.current.position.x, mouseX * 1.5, 0.1);
            fgRef.current.position.y = THREE.MathUtils.lerp(fgRef.current.position.y, mouseY * 1.5, 0.1);
            fgRef.current.position.z = THREE.MathUtils.lerp(fgRef.current.position.z, scrollPercent * 5, 0.1);
        }

        if (cloudRef.current) {
            // Clouds draft slowly across screen + mouse parallax
            cloudRef.current.rotation.y += 0.001; // Slow spin
            cloudRef.current.position.x = THREE.MathUtils.lerp(cloudRef.current.position.x, mouseX * 0.2, 0.02);
        }
    });

    // Theme Variables
    const sparkleColor = theme === 'dark' ? '#4FA3FF' : '#2563EB'; // Light Blue vs Digital Blue
    const cloudColor = theme === 'dark' ? '#8cbaff' : '#E2E8F0'; // White/Blueish clouds
    // Light Mode: Image should be very subtle watermark (0.15)
    // Dark Mode: Image is the main feature (0.5)
    const bgOpacity = theme === 'dark' ? 0.5 : 0.15;

    return (
        <group>
            {/* Interactive Mouse Light */}
            <pointLight ref={lightRef} intensity={theme === 'dark' ? 2 : 1} color="#4FA3FF" distance={10} decay={2} />
            <ambientLight intensity={theme === 'dark' ? 0.5 : 1.5} />

            {/* Washington DC Image Plane */}
            <Image
                ref={bgRef}
                url="/dc-bg.jpg"
                scale={[viewport.width * 1.5, viewport.height * 1.5, 1]}
                opacity={bgOpacity}
                transparent
                toneMapped={false}
                color="white"
            />

            {/* Atmospheric Fog/Clouds - "Kahi kahi aaye" */}
            <group ref={cloudRef} position={[0, 0, 1]}>
                <Cloud opacity={0.3} speed={0.4} width={10} depth={1.5} segments={10} position={[-4, 2, -2]} color={cloudColor} />
                <Cloud opacity={0.3} speed={0.4} width={10} depth={1.5} segments={10} position={[4, -2, -5]} color={cloudColor} />
            </group>

            {/* Atmospheric Particles - Foreground Depth */}
            <Sparkles
                ref={fgRef}
                count={300}
                scale={[viewport.width * 2, viewport.height * 2, 10]}
                size={6}
                speed={0.5}
                opacity={theme === 'dark' ? 0.8 : 1}
                color={sparkleColor}
            />
        </group>
    );
}

export default function ThreeBackground({ theme = 'dark' }: { theme?: 'dark' | 'light' }) {
    return (
        <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
            <Canvas gl={{ antialias: true }} camera={{ position: [0, 0, 5], fov: 75 }}>
                <BackgroundScene theme={theme} />
            </Canvas>
        </div>
    );
}
