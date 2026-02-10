import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Particle-like steam for the locomotive
function TrainSteam({ active }) {
    const particles = useMemo(() => {
        return Array.from({ length: 5 }, (_, i) => ({
            id: i,
            // eslint-disable-next-line react-hooks/purity
            offset: [Math.random() * 0.2 - 0.1, 0, Math.random() * 0.2 - 0.1],
            // eslint-disable-next-line react-hooks/purity
            speed: 0.5 + Math.random() * 0.5,
            delay: i * 0.4
        }))
    }, [])

    const groupRef = useRef()

    useFrame((state) => {
        if (!active || !groupRef.current) return
        groupRef.current.children.forEach((child, i) => {
            const p = particles[i]
            const time = (state.clock.elapsedTime + p.delay) % 2
            child.position.y = 0.5 + time * p.speed
            child.scale.setScalar(1 - time / 2)
            child.material.opacity = (1 - time / 2) * 0.5
        })
    })

    if (!active) return null

    return (
        <group ref={groupRef} position={[0.6, 0.4, 0]}>
            {particles.map((p) => (
                <mesh key={p.id} position={p.offset}>
                    <boxGeometry args={[0.15, 0.15, 0.15]} />
                    <meshStandardMaterial color="white" transparent opacity={0.5} flatShading />
                </mesh>
            ))}
        </group>
    )
}

// Stable roof details (prevent ugly refresh)
function RoofGreebles({ accent }) {
    const details = useMemo(() => [
        { pos: [0.4, 0.42, 0], size: [0.3, 0.06, 0.3] },
        { pos: [-0.2, 0.41, 0.15], size: [0.2, 0.04, 0.1] },
        { pos: [-0.2, 0.41, -0.15], size: [0.2, 0.04, 0.1] },
    ], [])

    return (
        <group>
            {/* Top plate with metallic effect */}
            <mesh position={[0, 0.34, 0]} castShadow>
                <boxGeometry args={[1.8, 0.08, 0.6]} />
                <meshStandardMaterial color="#2d3436" metalness={0.8} roughness={0.2} />
            </mesh>
            {details.map((d, i) => (
                <mesh key={`greeble-${i}`} position={d.pos} castShadow>
                    <boxGeometry args={d.size} />
                    <meshStandardMaterial color={accent} metalness={0.7} emissive={accent} emissiveIntensity={0.2} />
                </mesh>
            ))}
        </group>
    )
}

function TrainCarriage({ position, accent }) {
    return (
        <group position={position}>
            {/* Chassis with micro-offset to avoid Z-fighting */}
            <mesh position={[0, -0.26, 0]} castShadow receiveShadow>
                <boxGeometry args={[2.2, 0.12, 0.82]} />
                <meshStandardMaterial color="#000" metalness={0.8} />
            </mesh>
            <mesh castShadow receiveShadow>
                <boxGeometry args={[2, 0.6, 0.75]} />
                <meshStandardMaterial color="white" />
            </mesh>
            {/* Windows with real depth */}
            {[[-0.55, 0], [0.55, 0]].map((p, i) => (
                <mesh key={`window-${i}`} position={[p[0], 0.1, 0]}>
                    <boxGeometry args={[0.7, 0.28, 0.77]} />
                    <meshStandardMaterial color="#1a1a1b" metalness={1} roughness={0.1} />
                </mesh>
            ))}
                {/* Lateral detail: Double gold stripe */}
                <mesh position={[0, 0.1, 0.385]}>
                    <boxGeometry args={[2, 0.02, 0.01]} />
                    <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.5} />
                </mesh>
                <mesh position={[0, -0.1, 0.385]}>
                    <boxGeometry args={[2, 0.02, 0.01]} />
                    <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.5} />
                </mesh>

                <RoofGreebles accent={accent} />
            {/* Fine lateral stripe */}
            <mesh position={[0, -0.12, 0]}>
                <boxGeometry args={[2.02, 0.04, 0.78]} />
                <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.2} />
            </mesh>
        </group>
    )
}

export function VoxelTrain({ targetX }) {
    const trainRef = useRef()
    const currentX = useRef(targetX)

    const colors = {
        gold: "#d4af37",
        rose: "#f4c2c2",
        obsidian: "#1a1a1b",
        light: "#fffde7"
    }

    useFrame((state) => {
        if (!trainRef.current) return
        currentX.current = THREE.MathUtils.lerp(currentX.current, targetX, 0.02)
        trainRef.current.position.x = currentX.current
        // Subtle stable vibration
        trainRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 10) * 0.002
    })

    return (
        // eslint-disable-next-line react-hooks/refs
        <group ref={trainRef} position={[currentX.current, 0.5, 2]}>

            {/* 1. LOCOMOTIVE (Aerodynamic & Detailed Design) */}
            <group position={[2.4, 0, 0]}>
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[1.8, 0.6, 0.75]} />
                    <meshStandardMaterial color="white" />
                </mesh>

                {/* AERODYNAMIC "MULTI-SLICED" NOSE */}
                <group position={[0.9, -0.05, 0]}>
                    <mesh position={[0.1, 0.05, 0]} castShadow receiveShadow><boxGeometry args={[0.2, 0.5, 0.75]} /><meshStandardMaterial color="white" /></mesh>
                    <mesh position={[0.3, -0.02, 0]} castShadow receiveShadow><boxGeometry args={[0.2, 0.35, 0.75]} /><meshStandardMaterial color="white" /></mesh>
                    {/* Gold Deflector at the base */}
                    <mesh position={[0.25, -0.02, 0.3]}><boxGeometry args={[0.1, 0.05, 0.1]} /><meshStandardMaterial emissive={colors.light} emissiveIntensity={5} /></mesh>
                    <mesh position={[0.25, -0.02, -0.3]}><boxGeometry args={[0.1, 0.05, 0.1]} /><meshStandardMaterial emissive={colors.light} emissiveIntensity={5} /></mesh>
                    <mesh position={[0.4, -0.1, 0.25]}><boxGeometry args={[0.1, 0.05, 0.1]} /><meshStandardMaterial emissive={colors.light} emissiveIntensity={3} /></mesh>
                    <mesh position={[0.4, -0.1, -0.25]}><boxGeometry args={[0.1, 0.05, 0.1]} /><meshStandardMaterial emissive={colors.light} emissiveIntensity={3} /></mesh>
                </group>

                {/* ENCASED COCKPIT - Premium Glass Effect */}
                <mesh position={[0.4, 0.18, 0]} castShadow>
                    <boxGeometry args={[0.7, 0.25, 0.77]} />
                    <meshStandardMaterial color={colors.obsidian} metalness={1} roughness={0} />
                </mesh>
                {/* Golden cockpit frame detail */}
                <mesh position={[0.4, 0.3, 0]}>
                    <boxGeometry args={[0.72, 0.02, 0.78]} />
                    <meshStandardMaterial color={colors.gold} metalness={1} />
                </mesh>

                {/* Steam effect (active when close to the first station) */}
                {/* eslint-disable-next-line react-hooks/refs */}
                <TrainSteam active={Math.abs(currentX.current - (-15)) < 2} />

                {/* LATERAL DETAIL: Gilded air vent grill */}
                <group position={[-0.2, 0, 0]}>
                    {[0, 0.1, 0.2].map((x, i) => (
                        <mesh key={`vent-${i}`} position={[x, 0, 0.38]}>
                            <boxGeometry args={[0.02, 0.3, 0.01]} />
                            <meshStandardMaterial color={colors.gold} />
                        </mesh>
                    ))}
                </group>
            </group>

            {/* 2. CARRIAGES (Stable system) */}
            {[0, 1, 2].map((i) => (
                <group key={`carriage-${i}`} position={[-i * 2.25, 0, 0]}>
                    <TrainCarriage accent={colors.rose} position={[0, 0, 0]} />
                    {/* Matte black articulation (Bellows) */}
                    <mesh position={[1.12, -0.05, 0]}>
                        <boxGeometry args={[0.25, 0.45, 0.55]} />
                        <meshStandardMaterial color="#000" roughness={1} />
                    </mesh>
                </group>
            ))}

            {/* 3. UNDERGLOW  */}
            <mesh position={[-1, -0.36, 0]}>
                <boxGeometry args={[9, 0.01, 0.5]} />
                <meshStandardMaterial emissive={colors.rose} emissiveIntensity={1.5} transparent opacity={0.6} />
            </mesh>
        </group>
    )
}