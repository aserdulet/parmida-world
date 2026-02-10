import React, { useState } from 'react';
import { Float } from '@react-three/drei';
import { Text } from '@react-three/drei'
export function ClinicReviewButton({ onClick }) {
    const [hovered, setHovered] = useState(false);

    return (
        <group position={[3, 1.5, 1.2]}> 
            <mesh
                scale={hovered ? 1.1 : 1}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                }}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={() => {
                    setHovered(false);
                    document.body.style.cursor = 'auto';
                }}
            >
                {/* Design tip "Glass Pill" */}
                <boxGeometry args={[2, 0.6, 0.1]} />
                <meshStandardMaterial
                    color={hovered ? "#3498db" : "#2980b9"}
                    emissive={hovered ? "#3498db" : "#2980b9"}
                    emissiveIntensity={hovered ? 2 : 1}
                    transparent
                    opacity={0.8}
                />

                {/* Efect de strălucire pe margini */}
                <mesh position={[0, 0, -0.05]}>
                    <boxGeometry args={[2.1, 0.7, 0.05]} />
                    <meshStandardMaterial color="white" transparent opacity={0.2} />
                </mesh>

                <Text
                    position={[0, 0, 0.08]}
                    fontSize={0.2}
                    color="#2563eb"
                    anchorX="center"
                    anchorY="middle"
                >
                    ⭐ Reviews
                </Text>
            </mesh>
            <Float speed={3} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* Visual anchor for the floating effect - optional, but let's just keep it simple */}
            </Float>
        </group>
    );
}