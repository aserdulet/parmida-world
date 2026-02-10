import { useState } from 'react'
import { Text } from '@react-three/drei'

export function FashionMall({ onClick, ...props }) {
    const [hovered, setHovered] = useState(false)

    const colors = {
        obsidian: "#1a1a1b",   // Matte black for contrast
        gold: "#d4af37",      // Genuine Gold
        marble: "#ffffff",     // Pure White
        accent: "#4834d4",    // Royal Indigo
        glass: "#e3f2fd",
        emissive: "#fff9c4",  // Warm interior light
        pink: "#ff79c6"       // Fashion accent
    }

    return (
        <group 
            {...props}
            onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
            onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
            onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}
        >
            <pointLight position={[0, 2, 2]} intensity={hovered ? 10 : 0} distance={5} color={colors.gold} />

            {/* 1. TIERED BASE FOUNDATION */}
            <group>
                {/* Base Layer - Black Marble */}
                <mesh position-y={0.025} receiveShadow>
                    <boxGeometry args={[5, 0.05, 5]} />
                    <meshStandardMaterial color={colors.obsidian} roughness={0.1} />
                </mesh>
                {/* Gold Border */}
                <mesh position-y={0.075} receiveShadow castShadow>
                    <boxGeometry args={[4.8, 0.05, 4.8]} />
                    <meshStandardMaterial color={colors.gold} metalness={1} roughness={0.2} />
                </mesh>
                {/* Main Floor */}
                <mesh position-y={0.1} receiveShadow>
                    <boxGeometry args={[4.6, 0.05, 4.6]} />
                    <meshStandardMaterial color={colors.marble} />
                </mesh>
            </group>

            {/* 2. FACADE WITH "VERTICAL SLATS" (Luxury vertical slats) */}
            <group position-y={1.5}>
                {/* Recessed central body */}
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[4, 2.8, 3]} />
                    <meshStandardMaterial color={colors.marble} />
                </mesh>

                {/* SKETCH FAB DETAIL: Gold slats on the edges */}
                {[...Array(12)].map((_, i) => (
                    <group key={i} position={[-2 + i * 0.36, 0, 1.55]}>
                        {i < 3 || i > 8 ? (
                            <mesh castShadow receiveShadow>
                                <boxGeometry args={[0.05, 2.8, 0.1]} />
                                <meshStandardMaterial color={colors.gold} metalness={0.8} />
                            </mesh>
                        ) : null}
                    </group>
                ))}
            </group>

            {/* 3. "THE SHOWCASE" VITRINE (Depth and Niches) */}
            <group position={[0, 1.1, 1.55]}>
                {/* Massive black frame */}
                <mesh>
                    <boxGeometry args={[2.5, 1.8, 0.2]} />
                    <meshStandardMaterial color={colors.obsidian} />
                </mesh>
                {/* High reflection glass */}
                <mesh position={[0, 0, 0.1]}>
                    <boxGeometry args={[2.3, 1.6, 0.02]} />
                    <meshStandardMaterial color={colors.glass} transparent opacity={hovered ? 0.1 : 0.3} metalness={1} roughness={0} />
                </mesh>

                {/* VITRINE INTERIOR (Mini cubic scene) */}
                <group position={[0, -0.4, -0.05]}>
                    {/* Central display for luxury hat */}
                    <mesh position={[0, 0.2, 0]}>
                        <boxGeometry args={[0.4, 0.1, 0.4]} />
                        <meshStandardMaterial color={colors.gold} />
                    </mesh>
                    {/* Voxel Hat (Top Hat) */}
                    <group position={[0, 0.4, 0]}>
                        <mesh><boxGeometry args={[0.3, 0.02, 0.3]} /><meshStandardMaterial color={colors.obsidian} /></mesh>
                        <mesh position-y={0.12}><boxGeometry args={[0.18, 0.2, 0.18]} /><meshStandardMaterial color={colors.obsidian} /></mesh>
                        <mesh position-y={0.05}><boxGeometry args={[0.19, 0.05, 0.19]} /><meshStandardMaterial color={colors.accent} /></mesh>
                    </group>

                    {/* Additional luxury items */}
                    <mesh position={[-0.6, 0.1, 0]} castShadow>
                        <boxGeometry args={[0.2, 0.3, 0.2]} />
                        <meshStandardMaterial color={colors.pink} />
                    </mesh>
                    <mesh position={[0.6, 0.1, 0]} castShadow>
                        <boxGeometry args={[0.2, 0.4, 0.2]} />
                        <meshStandardMaterial color={colors.gold} metalness={1} />
                    </mesh>
                </group>
            </group>

            {/* 4. "MODERNIST" LOGO (Volumetric letters & Lighting) */}
            <group position={[0, 3.1, 1.6]} scale={hovered ? 1.05 : 1}>
                {/* "Blade" style logo support */}
                <mesh castShadow>
                    <boxGeometry args={[3.2, 0.6, 0.1]} />
                    <meshStandardMaterial color={colors.obsidian} />
                </mesh>
                {/* Detail: LED strip underneath */}
                <mesh position={[0, -0.32, 0]}>
                    <boxGeometry args={[3.2, 0.05, 0.1]} />
                    <meshStandardMaterial emissive={colors.gold} emissiveIntensity={hovered ? 5 : 2} />
                </mesh>

                <MallBanner colors={colors}/>
            </group>

            {/* 5. LATERAL COLUMNS (Complex Structure) */}
            {[[-2.1, 1.5], [2.1, 1.5]].map((pos, i) => (
                <group key={i} position={[pos[0], 1.4, pos[1]]}>
                    {/* Marble Pillar */}
                    <mesh><boxGeometry args={[0.3, 2.8, 0.3]} /><meshStandardMaterial color={colors.marble} /></mesh>
                    {/* Gold Rings (Detailing) */}
                    {[0.8, 0, -0.8].map((y, j) => (
                        <mesh key={j} position-y={y}>
                            <boxGeometry args={[0.35, 0.05, 0.35]} />
                            <meshStandardMaterial color={colors.gold} metalness={1} />
                        </mesh>
                    ))}
                    {/* Cubic lamp on top */}
                    <mesh position-y={1.5}>
                        <boxGeometry args={[0.2, 0.2, 0.2]} />
                        <meshStandardMaterial emissive={colors.emissive} emissiveIntensity={1} />
                    </mesh>
                </group>
            ))}

            {/* 6. THE ROOF (Tiered cornice) */}
            <group position-y={2.9}>
                {/* Layer 1 */}
                {/* Layer 2 - Helipad or Sky Garden pattern */}
                <mesh position-y={0.15}><boxGeometry args={[4, 0.2, 3]} /><meshStandardMaterial color={colors.obsidian} /></mesh>

                {/* Added Luxury Garden on a roof */}
                <group position={[1.2, 0.3, 0.8]}>
                    <mesh castShadow><boxGeometry args={[0.6, 0.3, 0.6]} /><meshStandardMaterial color={colors.marble} /></mesh>
                    <mesh position-y={0.25}><boxGeometry args={[0.4, 0.4, 0.4]} /><meshStandardMaterial color="#27ae60" /></mesh>
                </group>

                {/* Technical details (AC / Ventilation units) - Typical Sketch fab */}
                <group position={[-1, 0.3, -0.5]}>
                    <mesh><boxGeometry args={[0.4, 0.3, 0.4]} /><meshStandardMaterial color="#444" /></mesh>
                    <mesh position={[0.5, 0, 0]}><boxGeometry args={[0.3, 0.2, 0.3]} /><meshStandardMaterial color="#444" /></mesh>
                </group>
            </group>

            {/* 7. DIGITAL ADVERTISEMENT (Cubic Totem) */}
            <group position={[-1.8, 0.6, 2.2]}>
                <mesh castShadow><boxGeometry args={[0.15, 1.2, 0.4]} /><meshStandardMaterial color={colors.obsidian} /></mesh>
                <mesh position={[0.08, 0.2, 0]}>
                    <boxGeometry args={[0.01, 0.7, 0.3]} />
                    <meshStandardMaterial color={colors.accent} emissive={colors.accent} emissiveIntensity={0.5} />
                </mesh>
            </group>

        </group>
    )
}
export function MallBanner({ colors }) {
    const fontSize = 0.18;
    const commonProps = {
        fontSize: fontSize,
        anchorY: "middle",
        letterSpacing: 0.05
    };

    return (
        <group position={[0, 0, 0.06]}>
            <group position={[-0.95, 0, 0]}>
                <Text {...commonProps} color={colors.gold} fontWeight={900} anchorX="left">
                    S
                </Text>
                <Text {...commonProps} color="white" fontWeight={200} anchorX="left" position-x={0.14}>
                    CARVES &
                </Text>
            </group>

            <group position={[0.1, 0, 0]}>
                <Text {...commonProps} color={colors.gold} fontWeight={900} anchorX="left">
                    H
                </Text>
                <Text {...commonProps} color="white" fontWeight={200} anchorX="left" position-x={0.14}>
                    ATS
                </Text>
            </group>
        </group>
    );
}