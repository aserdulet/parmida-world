import { Float, RoundedBox, Text } from '@react-three/drei'

export function FutureSign(props) {
    const colors = {
        obsidian: "#1a1a1b",
        gold: "#d4af37",
        rose: "#d87093",
        marble: "#ffffff"
    }

    return (
        <group {...props}>
            <group position-y={0.05}>
                <RoundedBox args={[2.5, 0.1, 1.2]} radius={0.05} receiveShadow>
                    <meshStandardMaterial color={colors.gold} metalness={0.8} />
                </RoundedBox>
                <RoundedBox args={[2.2, 0.15, 1]} radius={0.05} position-y={0.05} receiveShadow>
                    <meshStandardMaterial color={colors.obsidian} />
                </RoundedBox>
            </group>

            <mesh position={[-0.8, 0.6, 0]} castShadow>
                <boxGeometry args={[0.08, 1, 0.08]} />
                <meshStandardMaterial color={colors.gold} metalness={1} />
            </mesh>
            <mesh position={[0.8, 0.6, 0]} castShadow>
                <boxGeometry args={[0.08, 1, 0.08]} />
                <meshStandardMaterial color={colors.gold} metalness={1} />
            </mesh>

            <group position={[0, 1.6, 0]}>
                <RoundedBox args={[3.2, 1.6, 0.15]} radius={0.1}>
                    <meshStandardMaterial color={colors.rose} emissive={colors.rose} emissiveIntensity={0.2} />
                </RoundedBox>

                <mesh position={[0, 0, 0.08]}>
                    <boxGeometry args={[2.9, 1.3, 0.02]} />
                    <meshStandardMaterial color="#a6d9e8" transparent opacity={0.1} metalness={1} />
                </mesh>

                <group position={[0, 0, 0.1]}>
                    <Text
                        position={[0, 0.45, 0]}
                        fontSize={0.08}
                        color="#fbc2eb"
                        fontWeight={900}
                        letterSpacing={0.4}
                    >
                        SAVE THE DATE
                    </Text>

                    <Text
                        position={[0, 0.1, 0]}
                        fontSize={0.32}
                        color="white"
                        fontWeight={900}
                        letterSpacing={-0.05}
                    >
                        14 FEBRUARY
                    </Text>

                    <mesh position={[0, -0.15, 0]}>
                        <planeGeometry args={[0.8, 0.01]} />
                        <meshBasicMaterial color="white" transparent opacity={0.3} />
                    </mesh>

                    <Text
                        position={[0, -0.35, 0]}
                        fontSize={0.11}
                        color="white"
                        fontStyle="italic"
                        fontWeight={200}
                        opacity={0.8}
                        transparent
                    >
                        The journey continues...
                    </Text>
                </group>

                <pointLight position={[0, 0, 0.3]} intensity={2} color="#ff79c6" distance={4} />
            </group>

            <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
                {[...Array(6)].map((_, i) => (
                    <mesh
                        key={i}
                        position={[
                            Math.sin(i * 1.5) * 2,
                            Math.cos(i * 0.8) + 1.6,
                            Math.sin(i * 0.5) * 0.5
                        ]}
                    >
                        <boxGeometry args={[0.04, 0.04, 0.04]} />
                        <meshStandardMaterial color={colors.gold} emissive={colors.gold} emissiveIntensity={2} />
                    </mesh>
                ))}
            </Float>
        </group>
    )
}