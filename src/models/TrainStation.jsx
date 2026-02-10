import { RoundedBox } from '@react-three/drei'

export function TrainStation(props) {
    const colors = {
        platform: "#dcdde1",
        wall: "#f2f2f2",
        wallAccent: "#e1e1e1",
        accent: "#2d3436",
        roof: "#2f3640",
        wood: "#3d2b1f",
        glass: "#a6d9e8",
        yellowLine: "#f1c40f",
        gold: "#d4af37",
        marble: "#ffffff"
    }

    const hourAngle = -(8 * (Math.PI / 6));
    const minuteAngle = 0;

    return (
        <group {...props}>
            <group position-y={0.05}>
                <RoundedBox args={[4.8, 0.15, 4.8]} radius={0.05} receiveShadow castShadow>
                    <meshStandardMaterial color={colors.accent} />
                </RoundedBox>
                <RoundedBox args={[4.5, 0.18, 4.5]} radius={0.05} position-y={0.02} receiveShadow castShadow>
                    <meshStandardMaterial color={colors.platform} />
                </RoundedBox>

            </group>

            <group position={[0, 0.9, -0.8]}>
                {/* Corp principal */}
                <mesh castShadow>
                    <boxGeometry args={[3.2, 1.6, 2]} />
                    <meshStandardMaterial color={colors.wall} />
                </mesh>

                <mesh position={[0, -0.3, 1.01]}>
                    <boxGeometry args={[3.25, 0.08, 0.05]} />
                    <meshStandardMaterial color={colors.wallAccent} />
                </mesh>
                <mesh position={[0, 0.4, 1.01]}>
                    <boxGeometry args={[3.25, 0.04, 0.05]} />
                    <meshStandardMaterial color={colors.wallAccent} />
                </mesh>

                <mesh position={[0, 0.82, 1.01]}>
                    <boxGeometry args={[3.25, 0.05, 0.05]} />
                    <meshStandardMaterial color={colors.gold} metalness={1} />
                </mesh>

                {[[-0.6, 1.0], [0.6, 1.0]].map((pos, i) => (
                    <group key={i} position={[pos[0], -0.1, pos[1]]}>
                        <mesh>
                            <boxGeometry args={[0.15, 1.4, 0.15]} />
                            <meshStandardMaterial color={colors.gold} metalness={0.8} />
                        </mesh>
                        {/* Column Base */}
                        <mesh position={[0, -0.65, 0]}>
                            <boxGeometry args={[0.22, 0.1, 0.22]} />
                            <meshStandardMaterial color={colors.accent} />
                        </mesh>
                        <mesh position={[0, 0.65, 0]}>
                            <boxGeometry args={[0.22, 0.1, 0.22]} />
                            <meshStandardMaterial color={colors.gold} metalness={1} />
                        </mesh>
                    </group>
                ))}

                {[[-1.1, 0.1], [1.1, 0.1]].map((pos, i) => (
                    <group key={i} position={[pos[0], pos[1], 1]}>
                        <mesh castShadow receiveShadow> {/* Rama */}
                            <boxGeometry args={[0.7, 0.9, 0.1]} />
                            <meshStandardMaterial color={colors.wallAccent} />
                        </mesh>
                        <mesh position={[0, 0, 0.02]} receiveShadow>
                            <boxGeometry args={[0.5, 0.7, 0.05]} />
                            <meshStandardMaterial color={colors.glass} transparent opacity={0.5} />
                        </mesh>
                        <mesh position={[0, 0, 0.03]}>
                            <boxGeometry args={[0.5, 0.02, 0.01]} />
                            <meshStandardMaterial color={colors.wallAccent} />
                        </mesh>
                    </group>
                ))}

                <group position={[0, -0.2, 1.25]}>
                    <mesh castShadow receiveShadow><boxGeometry args={[0.8, 1.2, 0.05]} /><meshStandardMaterial color={colors.accent} /></mesh>
                    <mesh position={[0, 0.1, 0.03]}><boxGeometry args={[0.6, 0.9, 0.02]} /><meshStandardMaterial color={colors.glass} transparent opacity={0.3} /></mesh>
                    {/* Door Handles */}
                    <mesh position={[0.1, -0.1, 0.05]}>
                        <sphereGeometry args={[0.03, 16, 16]} />
                        <meshStandardMaterial color={colors.gold} metalness={1} />
                    </mesh>
                </group>

            </group>

            <group position={[0, 1.8, -0.8]}>
                <mesh castShadow><boxGeometry args={[4, 0.2, 2.8]} /><meshStandardMaterial color={colors.roof} /></mesh>
                <mesh position-y={0.2} castShadow><boxGeometry args={[2.5, 0.3, 1.8]} /><meshStandardMaterial color={colors.accent} /></mesh>

                <group position={[0, 0.15, 1.45]}>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.4, 0.4, 0.05, 32]} />
                        <meshStandardMaterial color="white" />
                    </mesh>

                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
                        <group key={i} rotation={[0, 0, -i * (Math.PI / 6)]}>
                            <mesh position={[0, 0.3, 0.03]}>
                                <boxGeometry args={[i % 3 === 0 ? 0.04 : 0.01, 0.08, 0.01]} />
                                <meshStandardMaterial color="black" />
                            </mesh>
                        </group>
                    ))}

                    {/* LIMBA ORE (la ora 8) */}
                    <group rotation={[0, 0, hourAngle]} position={[0, 0, 0.04]}>
                        <mesh position={[0, 0.12, 0]}>
                            <boxGeometry args={[0.04, 0.24, 0.01]} />
                            <meshStandardMaterial color="black" />
                        </mesh>
                    </group>

                    {/* LIMBA MINUTE (la ora 12) */}
                    <group rotation={[0, 0, minuteAngle]} position={[0, 0, 0.05]}>
                        <mesh position={[0, 0.16, 0]}>
                            <boxGeometry args={[0.025, 0.32, 0.01]} />
                            <meshStandardMaterial color="#c0392b" />
                        </mesh>
                    </group>
                </group>
            </group>

            {[[-1.4, 0.8], [1.4, 0.8]].map((pos, i) => (
                <group key={i} position={[pos[0], 0.3, pos[1]]}>
                    <mesh castShadow><boxGeometry args={[0.9, 0.08, 0.4]} /><meshStandardMaterial color={colors.wood} /></mesh>
                    <mesh position={[0, -0.1, 0]}><boxGeometry args={[0.1, 0.2, 0.3]} /><meshStandardMaterial color="#222" /></mesh>
                </group>
            ))}

            {[[-2.1, 0.5], [2.1, 0.5]].map((pos, i) => (
                <group key={`plant-${i}`} position={[pos[0], 0.3, pos[1]]}>
                    <mesh castShadow>
                        <boxGeometry args={[0.5, 0.4, 0.5]} />
                        <meshStandardMaterial color={colors.accent} />
                    </mesh>
                    <mesh position-y={0.3}>
                        <boxGeometry args={[0.4, 0.3, 0.4]} />
                        <meshStandardMaterial color="#27ae60" />
                    </mesh>
                    {/* Tiny Voxel Flowers */}
                    <mesh position={[0.1, 0.5, 0.1]}>
                        <boxGeometry args={[0.1, 0.1, 0.1]} />
                        <meshStandardMaterial color="#e91e63" emissive="#e91e63" emissiveIntensity={0.5} />
                    </mesh>
                    <mesh position={[-0.1, 0.55, -0.1]}>
                        <boxGeometry args={[0.1, 0.1, 0.1]} />
                        <meshStandardMaterial color="#f1c40f" emissive="#f1c40f" emissiveIntensity={0.5} />
                    </mesh>
                </group>
            ))}

            {[[-2.1, 1.5], [2.1, 1.5]].map((pos, i) => (
                <group key={i} position={[pos[0], 0.1, pos[1]]}>
                    <mesh position-y={0.5} castShadow receiveShadow><cylinderGeometry args={[0.04, 0.04, 1]} /><meshStandardMaterial color={colors.accent} /></mesh>
                    {/* Decorative base for lamp post */}
                    <mesh position-y={0.05}>
                        <boxGeometry args={[0.15, 0.1, 0.15]} />
                        <meshStandardMaterial color={colors.accent} />
                    </mesh>
                    <mesh position-y={1.1} castShadow>
                        <boxGeometry args={[0.18, 0.18, 0.18]} />
                        <meshStandardMaterial color="#f9ca24" emissive="#f9ca24" emissiveIntensity={2} />
                    </mesh>
                </group>
            ))}
        </group>
    )
}