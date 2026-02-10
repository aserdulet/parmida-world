import { useState } from 'react';
import { Float } from '@react-three/drei';

export function MallPortalButton({ onClick }) {
    const [hovered, setHovered] = useState(false);

    const colors = {
        diamond: "#ffdeeb",
        gold: "#d4af37",
        pedestal: "#ffffff"
    };

    return (
        <group position={[3.2, 0.6, 2.5]}>
            <group position-y={0.1}>
                {/* 1. Support */}
                <mesh position-y={-0.4} castShadow>
                    <boxGeometry args={[0.6, 0.4, 0.6]} />
                    <meshStandardMaterial color={colors.pedestal} roughness={0} />
                </mesh>
                {/* Border diamond*/}
                <mesh position-y={-0.2}>
                    <boxGeometry args={[0.65, 0.05, 0.65]} />
                    <meshStandardMaterial color={colors.gold} metalness={1} roughness={0.2} />
                </mesh>

                {/* 2. diamond */}
                <mesh
                    onClick={onClick}
                    onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
                    onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
                    scale={hovered ? 1.15 : 1}
                >
                    <icosahedronGeometry args={[0.4, 0]} />
                    <meshPhysicalMaterial
                        color={colors.diamond}
                        metalness={0.5}
                        roughness={0}
                        transmission={0.9} 
                        thickness={2}      
                        emissive={colors.diamond}
                        emissiveIntensity={hovered ? 2 : 0.8} 
                    />

                </mesh>

                <pointLight position={[0, 0.5, 0.5]} intensity={hovered ? 5 : 2} color={colors.diamond} />
            </group>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            </Float>
        </group>
    );
}