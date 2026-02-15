import React, { useMemo } from 'react'
import * as THREE from 'three'

const Lamppost = ({ position }) => (
    <group position={position}>
        <mesh castShadow>
            <cylinderGeometry args={[0.05, 0.1, 3]} />
            <meshStandardMaterial color="#2d3436" />
        </mesh>
        <mesh position={[0, 1.5, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.4]} />
            <meshStandardMaterial color="#2d3436" />
        </mesh>
        <mesh position={[0, 1.5, 0.4]}>
            <sphereGeometry args={[0.15, 8, 8]} />
            <meshStandardMaterial color="#f1c40f" emissive="#f1c40f" emissiveIntensity={2} />
        </mesh>
    </group>
);

const ParkBench = ({ position, rotation }) => (
    <group position={position} rotation={rotation}>
        <mesh position={[0, 0.2, 0]} castShadow>
            <boxGeometry args={[1.2, 0.05, 0.4]} />
            <meshStandardMaterial color="#7e5835" />
        </mesh>
        <mesh position={[0, 0.4, -0.2]} rotation={[-0.2, 0, 0]} castShadow>
            <boxGeometry args={[1.2, 0.3, 0.05]} />
            <meshStandardMaterial color="#7e5835" />
        </mesh>
        <mesh position={[0.5, 0.1, 0]}><boxGeometry args={[0.05, 0.2, 0.4]} /><meshStandardMaterial color="#2d3436" /></mesh>
        <mesh position={[-0.5, 0.1, 0]}><boxGeometry args={[0.05, 0.2, 0.4]} /><meshStandardMaterial color="#2d3436" /></mesh>
    </group>
);

const TycoonFlower = ({ position, color }) => (
    <group position={position}>
        <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.2]} />
            <meshStandardMaterial color="#2ecc71" />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
            <sphereGeometry args={[0.08, 5, 5]} />
            <meshStandardMaterial color={color} flatShading />
        </mesh>
    </group>
);

export function EnvironmentSegment({ position, withTrees = true }) {
    const materials = useMemo(() => ({
        water: new THREE.MeshStandardMaterial({ color: "#00a8ff", metalness: 0.8, roughness: 0.1, transparent: true, opacity: 0.7 }),
        waterDeep: new THREE.MeshStandardMaterial({ color: "#0097e6" }),
        stone: new THREE.MeshStandardMaterial({ color: "#95a5a6", roughness: 0.8 }),
        asphalt: new THREE.MeshStandardMaterial({ color: "#34495e", roughness: 0.9 }),
        grass: new THREE.MeshStandardMaterial({ color: "#2ecc71", flatShading: true }),
        curb: new THREE.MeshStandardMaterial({ color: "#bdc3c7" }),
        wood: new THREE.MeshStandardMaterial({ color: "#7e5835" }),
        leaves: new THREE.MeshStandardMaterial({ color: "#27ae60", flatShading: true }),
        railing: new THREE.MeshStandardMaterial({ color: "#b2bec3", metalness: 0.8 })
    }), []);

    return (
        <group position={position}>
            <group position={[-7, -0.6, 0]}>
                <mesh receiveShadow><boxGeometry args={[10, 0.2, 20]} /><primitive object={materials.waterDeep} attach="material" /></mesh>
                <mesh position={[0, 0.15, 0]} receiveShadow>
                    <planeGeometry args={[10, 20]} />
                    <primitive object={materials.water} attach="material" rotation={[-Math.PI / 2, 0, 0]} />
                </mesh>
            </group>

            <group position={[-2, -0.2, 0]}>
                <mesh receiveShadow castShadow><boxGeometry args={[0.6, 0.8, 20]} /><primitive object={materials.stone} attach="material" /></mesh>
                {[...Array(5)].map((_, i) => (
                    <group key={i} position={[0.2, 0.5, -8 + i * 4]}>
                        <mesh castShadow><cylinderGeometry args={[0.03, 0.03, 0.6]} /><primitive object={materials.railing} attach="material" /></mesh>
                        <mesh position={[-0.1, 0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
                            <cylinderGeometry args={[0.01, 0.01, 4]} /><primitive object={materials.railing} attach="material" />
                        </mesh>
                    </group>
                ))}
            </group>

            <group position={[-0.5, -0.45, 0]}>
                <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[2.5, 20]} /><primitive object={materials.asphalt} attach="material" /></mesh>
                <Lamppost position={[1.4, 0, -2]} />
                <ParkBench position={[1.4, 0, 4]} rotation={[0, -Math.PI / 2, 0]} />

                <mesh position={[1.25, 0.05, 0]}><boxGeometry args={[0.1, 0.2, 20]} /><primitive object={materials.curb} attach="material" /></mesh>
                <mesh position={[-1.25, 0.05, 0]}><boxGeometry args={[0.1, 0.2, 20]} /><primitive object={materials.curb} attach="material" /></mesh>
            </group>

            <group position={[4.5, -0.5, 0]}>
                <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[7.5, 20]} /><primitive object={materials.grass} attach="material" /></mesh>
                <TycoonFlower position={[1, 0, -2]} color="#e84393" />
                <TycoonFlower position={[1.2, 0, -2.2]} color="#fdcb6e" />
                <TycoonFlower position={[0.8, 0, -1.8]} color="#81ecec" />

                {withTrees && (
                    <group>
                        <LollipopTree position={[1, 0.1, 2]} scale={0.9} materials={materials} />
                        <LollipopTree position={[2.5, 0.1, -6]} scale={1.2} materials={materials} />
                    </group>
                )}
            </group>
        </group>
    )
}

function LollipopTree({ position, scale = 1, materials }) {
    return (
        <group position={position} scale={scale}>
            <mesh position={[0, 0.4, 0]} castShadow><cylinderGeometry args={[0.1, 0.2, 0.8, 6]} /><primitive object={materials.wood} attach="material" /></mesh>
            <group position={[0, 1.2, 0]}>
                <mesh castShadow><sphereGeometry args={[0.6, 7, 7]} /><primitive object={materials.leaves} attach="material" /></mesh>
                <mesh position={[0.2, 0.2, 0.1]} castShadow><sphereGeometry args={[0.3, 5, 5]} /><primitive object={materials.leaves} attach="material" /></mesh>
            </group>
        </group>
    )
}