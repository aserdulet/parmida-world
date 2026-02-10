import { Html, Float } from '@react-three/drei'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function FloatingHeart({ position }) {
    return (
        <Float speed={4} rotationIntensity={0.5} floatIntensity={2}>
            <Html position={position} center pointerEvents="none">
                {/* Container cu efect de sticlă mată și umbră fină */}
                <div className="
                    flex items-center justify-center
                    w-10 h-10
                    bg-black/40 backdrop-blur-md
                    border border-white/20
                    rounded-full shadow-2xl
                    animate-in fade-in zoom-in duration-300
                ">
                    <span className="text-xl select-none filter drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                        🤍
                    </span>
                </div>
            </Html>
        </Float>
    )
}

export function SwanPond(props) {
    const swanWhiteRef = useRef()
    const swanBlackRef = useRef()
    const [foodPos, setFoodPos] = useState(null)
    const [isFeeding, setIsFeeding] = useState(false)
    const [whiteHearts, setWhiteHearts] = useState(false)
    const [blackHearts, setBlackHearts] = useState(false)

    const colors = {
        marble: "#ffffff",
        gold: "#d4af37",
        waterTop: "#b2ebf2",
        waterDeep: "#4dd0e1",
        sakura: "#ffb7c5",
        wood: "#2d3436",
        obsidian: "#1a1a1b"
    }

    const handleSwanInteraction = (swanType) => {
        if (swanType === 'white') {
            setWhiteHearts(true)
            setTimeout(() => setWhiteHearts(false), 2000)
        } else {
            setBlackHearts(true)
            setTimeout(() => setBlackHearts(false), 2000)
        }
    }

    const handleWaterClick = (e) => {
        e.stopPropagation()
        const clickPoint = e.point
        setFoodPos([clickPoint.x - props.position[0], 0.25, clickPoint.z - props.position[2]])
        setIsFeeding(true)
        setTimeout(() => { setIsFeeding(false); setFoodPos(null); }, 4000)
    }

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime()
        const moveSwan = (ref, isBlack) => {
            if (!ref.current) return
            const targetX = isFeeding ? foodPos[0] + (isBlack ? 0.3 : -0.3) : (isBlack ? Math.cos(t * 0.4) * 0.8 + 0.6 : Math.sin(t * 0.4) * 0.8 - 0.6)
            const targetZ = isFeeding ? foodPos[2] + (isBlack ? 0.3 : -0.3) : (isBlack ? Math.sin(t * 0.5) * 0.7 : Math.cos(t * 0.5) * 0.7)
            ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, targetX, 0.03)
            ref.current.position.z = THREE.MathUtils.lerp(ref.current.position.z, targetZ, 0.03)
            const angle = Math.atan2(targetX - ref.current.position.x, targetZ - ref.current.position.z)
            ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, angle + (isBlack ? Math.PI : 0), 0.05)
            // Floating effect
            ref.current.position.y = 0.38 + Math.sin(t * 2) * 0.02
        }
        moveSwan(swanWhiteRef, false)
        moveSwan(swanBlackRef, true)
    })

    return (
        <group {...props}>
            {/* 1. foundation */}
            <group>
                <mesh position-y={0.05} receiveShadow><boxGeometry args={[5, 0.1, 5]} /><meshStandardMaterial color={colors.obsidian} /></mesh>
                <mesh position-y={0.15} receiveShadow castShadow><boxGeometry args={[4.8, 0.1, 4.8]} /><meshStandardMaterial color={colors.gold} metalness={1} /></mesh>
                <mesh position-y={0.25} receiveShadow><boxGeometry args={[4.6, 0.1, 4.6]} /><meshStandardMaterial color={colors.marble} /></mesh>
            </group>

            {/* 2. water */}
            <group position-y={0.3}>
                <mesh position-y={-0.05}><boxGeometry args={[3.8, 0.05, 3.8]} /><meshStandardMaterial color={colors.waterDeep} /></mesh>
                <mesh position-y={0.08} onClick={handleWaterClick}>
                    <boxGeometry args={[3.8, 0.02, 3.8]} />
                    <meshStandardMaterial color={colors.waterTop} transparent opacity={0.5} metalness={0.9} roughness={0} />
                </mesh>
            </group>

            {/* 3. tree */}
            <group position={[-1.6, 0.3, -1.6]}>
                <mesh position-y={0.5}><boxGeometry args={[0.2, 1, 0.2]} /><meshStandardMaterial color={colors.wood} /></mesh>
                <mesh position={[0.2, 0.8, 0]} rotation={[0, 0, 0.5]}><boxGeometry args={[0.1, 0.6, 0.1]} /><meshStandardMaterial color={colors.wood} /></mesh>

                <group position-y={1.2}>
                    <mesh><boxGeometry args={[1, 0.6, 1]} /><meshStandardMaterial color={colors.sakura} /></mesh>
                    <mesh position={[0.4, 0.3, 0.4]}><boxGeometry args={[0.6, 0.4, 0.6]} /><meshStandardMaterial color={colors.sakura} /></mesh>
                    <mesh position={[-0.3, 0.2, -0.3]}><boxGeometry args={[0.7, 0.5, 0.7]} /><meshStandardMaterial color={colors.sakura} /></mesh>
                    {/* particles */}
                    {[...Array(5)].map((_, i) => (
                        <mesh key={i} position={[Math.sin(i) * 0.8, -0.8 - i * 0.2, Math.cos(i) * 0.8]}>
                            <boxGeometry args={[0.05, 0.05, 0.05]} />
                            <meshStandardMaterial color={colors.sakura} />
                        </mesh>
                    ))}
                </group>
            </group>

            <group position={[1.5, 0.3, 0]}>
                {[[-0.6, -1], [-0.6, 1], [0.6, -1], [0.6, 1]].map((p, i) => (
                    <mesh key={i} position={[p[0], 0.8, p[1]]}>
                        <boxGeometry args={[0.08, 1.6, 0.08]} />
                        <meshStandardMaterial color={colors.gold} metalness={1} />
                    </mesh>
                ))}
                <group position-y={1.6}>
                    {[...Array(5)].map((_, i) => (
                        <mesh key={i} position={[0, 0, -0.8 + i * 0.4]}>
                            <boxGeometry args={[1.4, 0.05, 0.05]} />
                            <meshStandardMaterial color={colors.gold} metalness={1} />
                        </mesh>
                    ))}
                </group>
            </group>

            {/* 5. sit */}
            <group position={[0, 0.3, 1.8]}>
                <mesh position-y={0.1}><boxGeometry args={[1.2, 0.1, 0.4]} /><meshStandardMaterial color={colors.obsidian} /></mesh>
                <mesh position={[0, 0.3, -0.15]}><boxGeometry args={[1.2, 0.3, 0.05]} /><meshStandardMaterial color={colors.obsidian} /></mesh>
                <mesh position={[0, 0.16, 0]}><boxGeometry args={[1.1, 0.05, 0.35]} /><meshStandardMaterial color={colors.sakura} /></mesh>
            </group>

            {/* 6. swans */}
            <group position-y={0}>
                <group ref={swanWhiteRef} onClick={(e) => { e.stopPropagation(); handleSwanInteraction('white'); }}>
                    {whiteHearts && <FloatingHeart position={[0, 0.8, 0]} />}
                    <mesh castShadow><boxGeometry args={[0.3, 0.2, 0.4]} /><meshStandardMaterial color="#ffffff" /></mesh>
                    <mesh position={[0, 0.2, 0.15]} rotation-x={-0.4}><boxGeometry args={[0.07, 0.4, 0.07]} /><meshStandardMaterial color="#ffffff" /></mesh>
                    <mesh position={[0, 0.4, 0.22]}><boxGeometry args={[0.1, 0.1, 0.12]} /><meshStandardMaterial color="#ffffff" /></mesh>
                    <mesh position={[0, 0.4, 0.28]}><boxGeometry args={[0.05, 0.05, 0.1]} /><meshStandardMaterial color="#e67e22" /></mesh>
                </group>
                <group ref={swanBlackRef} onClick={(e) => { e.stopPropagation(); handleSwanInteraction('black'); }}>
                    {blackHearts && <FloatingHeart position={[0, 0.8, 0]} />}
                    <mesh castShadow><boxGeometry args={[0.3, 0.2, 0.4]} /><meshStandardMaterial color="#222222" /></mesh>
                    <mesh position={[0, 0.2, 0.15]} rotation-x={-0.4}><boxGeometry args={[0.07, 0.4, 0.07]} /><meshStandardMaterial color="#222222" /></mesh>
                    <mesh position={[0, 0.4, 0.22]}><boxGeometry args={[0.1, 0.1, 0.12]} /><meshStandardMaterial color="#222222" /></mesh>
                    <mesh position={[0, 0.4, 0.28]}><boxGeometry args={[0.05, 0.05, 0.1]} /><meshStandardMaterial color="#e67e22" /></mesh>
                </group>
            </group>

            {isFeeding && foodPos && (
                <group position={foodPos}>
                    {[...Array(3)].map((_, i) => (
                        // eslint-disable-next-line react-hooks/purity
                        <mesh key={i} position={[Math.random() * 0.1, 0, Math.random() * 0.1]}>
                            <boxGeometry args={[0.06, 0.06, 0.06]} />
                            <meshStandardMaterial color={colors.gold} emissive={colors.gold} />
                        </mesh>
                    ))}
                </group>
            )}

            {[[-1.8, 1.8], [1.8, -1.8]].map((pos, i) => (
                <group key={i} position={[pos[0], 0.3, pos[1]]}>
                    <mesh position-y={0.1}><boxGeometry args={[0.2, 0.2, 0.2]} /><meshStandardMaterial color={colors.marble} /></mesh>
                    <mesh position-y={0.3}><boxGeometry args={[0.15, 0.2, 0.15]} /><meshStandardMaterial emissive={colors.gold} emissiveIntensity={2} color="white" /></mesh>
                    <mesh position-y={0.45}><boxGeometry args={[0.25, 0.05, 0.25]} /><meshStandardMaterial color={colors.obsidian} /></mesh>
                </group>
            ))}
        </group>
    )
}