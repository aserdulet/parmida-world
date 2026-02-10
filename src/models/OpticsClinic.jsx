import {RoundedBox, Html, Float, Text} from '@react-three/drei'

export function OpticsClinic(props) {

    // 1. PREMIUM FOUNDATION
    const colors = {
        marble: "#ffffff",
        wall: "#f2f2f2",
        wood: "#1e272e",
        roofMain: "#c85078",
        roofAccent: "#d87093",
        glass: "#a6d9e8",
        gold: "#d4af37",
        cross: "#2ecc71",
        floor: "#e5e7eb",
        darkAccent: "#2c3e50"
    }

    return (
        <group {...props}>
            {/* 1. PREMIUM FOUNDATION */}
            <group position-y={0.05}>
                <RoundedBox args={[5.4, 0.1, 5.4]} radius={0.05} receiveShadow castShadow>
                    <meshStandardMaterial color={colors.gold} metalness={0.8} />
                </RoundedBox>
                <RoundedBox args={[5, 0.15, 5]} radius={0.05} position-y={0.05} receiveShadow castShadow>
                    <meshStandardMaterial color="#dcdde1" />
                </RoundedBox>
                {/* Marble steps at entrance */}
                <group position={[0, 0.1, 1.8]}>
                    <mesh receiveShadow castShadow position={[0, 0, 0]}>
                        <boxGeometry args={[3, 0.1, 1.2]} />
                        <meshStandardMaterial color={colors.marble} />
                    </mesh>
                    <mesh receiveShadow castShadow position={[0, 0.1, -0.2]}>
                        <boxGeometry args={[2.5, 0.1, 0.8]} />
                        <meshStandardMaterial color={colors.marble} />
                    </mesh>
                </group>
            </group>

            {/* 2. GLASS ATRIUM (MODERN & FANCY) */}
            <group position={[0, 1.1, 0.8]}>
                {/* Main glass structure */}
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[2.2, 2.2, 1.2]} />
                    <meshStandardMaterial color={colors.glass} transparent opacity={0.2} metalness={0.9} roughness={0.1} />
                </mesh>
                {/* Gold frames for atrium */}
                {[[-1.1, -0.6], [1.1, -0.6], [-1.1, 0.6], [1.1, 0.6]].map((pos, i) => (
                    <mesh key={i} position={[pos[0], 0, pos[1]]}>
                        <boxGeometry args={[0.08, 2.2, 0.08]} />
                        <meshStandardMaterial color={colors.gold} metalness={1} />
                    </mesh>
                ))}
                {/* Upper gold beam */}
                <mesh position={[0, 1.1, 0]}>
                    <boxGeometry args={[2.28, 0.1, 1.28]} />
                    <meshStandardMaterial color={colors.gold} metalness={1} />
                </mesh>

                {/* Interior: Minimalist reception */}
                <mesh position={[0, -0.8, -0.2]} castShadow>
                    <boxGeometry args={[1.2, 0.5, 0.4]} />
                    <meshStandardMaterial color={colors.marble} />
                </mesh>
                {/* Digital screen in back */}
                <mesh position={[0, 0.2, -0.55]}>
                    <boxGeometry args={[1.4, 0.8, 0.02]} />
                    <meshStandardMaterial color="#1e272e" emissive="#3498db" emissiveIntensity={0.5} />
                </mesh>
            </group>

            {/* 3. LATERAL CLINIC BODIES */}
            <group position-y={1.1}>
                {/* Left Wing */}
                <mesh position={[-1.8, 0, -0.5]} castShadow receiveShadow>
                    <boxGeometry args={[1.4, 2.2, 2.5]} />
                    <meshStandardMaterial color={colors.wall} />
                </mesh>
                {/* Right Wing */}
                <mesh position={[1.8, 0, -0.5]} castShadow receiveShadow>
                    <boxGeometry args={[1.4, 2.2, 2.5]} />
                    <meshStandardMaterial color={colors.wall} />
                </mesh>

                {/* Facade details: Modern vertical slats with black base */}
                {[-2.4, -1.2, 1.2, 2.4].map((x, i) => (
                    <group key={i} position={[x, 0, 0.76]}>
                        <mesh position={[0, -1, -0.1]} castShadow>
                            <boxGeometry args={[0.3, 0.2, 0.2]} />
                            <meshStandardMaterial color={colors.darkAccent} />
                        </mesh>
                        {[...Array(5)].map((_, j) => (
                            <mesh key={j} position={[0, -1 + j * 0.5, 0]} castShadow>
                                <boxGeometry args={[0.05, 0.1, 0.1]} />
                                <meshStandardMaterial color={colors.gold} metalness={1} />
                            </mesh>
                        ))}
                    </group>
                ))}
            </group>

            {/* 4. MEDICAL SIGN (GLOWING CROSS) */}
            <group position={[-2, 2.8, 0.8]}>
                <mesh castShadow>
                    <boxGeometry args={[0.6, 0.2, 0.2]} />
                    <meshStandardMaterial color={colors.cross} emissive={colors.cross} emissiveIntensity={2} />
                </mesh>
                <mesh castShadow rotation-z={Math.PI / 2}>
                    <boxGeometry args={[0.6, 0.2, 0.2]} />
                    <meshStandardMaterial color={colors.cross} emissive={colors.cross} emissiveIntensity={2} />
                </mesh>
                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                    {/* Floating accent light */}
                    <pointLight intensity={1} color={colors.cross} distance={2} />
                </Float>
            </group>

            {/* 5. ICONIC GLASSES */}
            <group position={[0, 2.3, -0.2]}>
                {/* Support roof */}
                <mesh castShadow position-y={0}>
                    <boxGeometry args={[5.2, 0.2, 3.2]} />
                    <meshStandardMaterial color={colors.roofMain} />
                </mesh>
                <mesh position-y={0.25} castShadow>
                    <boxGeometry args={[3.5, 0.3, 2.2]} />
                    <meshStandardMaterial color={colors.roofAccent} />
                </mesh>

                {/* Giant Glasses Frame on facade */}
                <group position={[0, 0.8, 1.3]} scale={1.3}>
                    <group position={[-0.45, 0, 0]}>
                        <mesh castShadow><torusGeometry args={[0.35, 0.004, 12, 32]} /><meshStandardMaterial color={colors.wood} metalness={0.5} /></mesh>
                        <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.35, 0.35, 0.01, 32]} /><meshStandardMaterial color={colors.glass} transparent opacity={0.6} metalness={1} /></mesh>
                    </group>
                    <group position={[0.45, 0, 0]}>
                        <mesh castShadow><torusGeometry args={[0.35, 0.004, 12, 32]} /><meshStandardMaterial color={colors.wood} metalness={0.5} /></mesh>
                        <mesh rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.35, 0.35, 0.01, 32]} /><meshStandardMaterial color={colors.glass} transparent opacity={0.6} metalness={1} /></mesh>
                    </group>
                    <mesh position={[0, 0, 0]}><boxGeometry args={[0.2, 0.08, 0.04]} /><meshStandardMaterial color={colors.gold} metalness={1} /></mesh>
                </group>
            </group>

            {/* 6. BRANDING "PREMIUM CLINIC" */}
            <group position={[0, 3.6, 0.5]}>
                <mesh castShadow>
                    <boxGeometry args={[4.2, 1, 0.15]} />
                    <meshStandardMaterial color={colors.wood} metalness={0.8} roughness={0.2} />
                </mesh>

                <group position={[0, 0.15, 0.1]}>
                    <Text
                        fontSize={0.35}
                        color="white"
                        anchorX="right"
                        position-x={-0.1}
                        fontWeight={900}
                    >
                        OPTICS
                    </Text>
                    <Text
                        position-x={0.1}
                        fontSize={0.35}
                        color={colors.roofAccent}
                        anchorX="center"
                        fontWeight={900}
                    >
                        &
                    </Text>
                    <Text
                        fontSize={0.35}
                        color="white"
                        anchorX="left"
                        position-x={0.25}
                        fontWeight={900}
                    >
                        CLINIC
                    </Text>
                </group>

                {/* --- SUBTITLE TEXT --- */}
                <Text
                    fontSize={0.1}
                    color={colors.roofAccent}
                    position={[0, -0.25, 0.1]}
                    fontWeight={700}
                    letterSpacing={0.15}
                    maxWidth={4}
                    textAlign="center"
                >
                    Advanced Medical Vision by Doktor Parmida
                </Text>
            </group>

            {/* 7. Decorations */}
            {[[-2.2, 2.2], [2.2, 2.2]].map((pos, i) => (
                <group key={i} position={[pos[0], 0.4, -pos[1]]}>
                    <mesh castShadow receiveShadow>
                        <boxGeometry args={[0.8, 0.6, 0.8]} />
                        <meshStandardMaterial color={colors.marble} />
                    </mesh>
                    {/* Voxel "Bonsai" style plants */}
                    <group position-y={0.4}>
                        <mesh castShadow><boxGeometry args={[0.5, 0.5, 0.5]} /><meshStandardMaterial color="#27ae60" /></mesh>
                        <mesh position-y={0.3}><boxGeometry args={[0.3, 0.3, 0.3]} /><meshStandardMaterial color="#2ecc71" /></mesh>
                    </group>
                </group>
            ))}

        </group>
    )
}