import { useState } from 'react'
import { RoundedBox, Html } from '@react-three/drei'
import { Text } from '@react-three/drei'


function CubicCup({ scale = 1, position, rotation, colors }) {
  return (
    <group scale={scale} position={position} rotation={rotation}>
      <mesh position-y={0.1} castShadow>
        <boxGeometry args={[0.4, 0.2, 0.4]} />
        <meshStandardMaterial color="white" flatShading />
      </mesh>
      <mesh position-y={0.3} castShadow>
        <boxGeometry args={[0.5, 0.4, 0.5]} />
        <meshStandardMaterial color="white" flatShading />
      </mesh>
      <mesh position-y={0.55} castShadow>
        <boxGeometry args={[0.55, 0.1, 0.55]} />
        <meshStandardMaterial color="white" flatShading />
      </mesh>
      <mesh position-y={0.61} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[0.45, 0.45]} />
        <meshStandardMaterial color={colors.coffeeDark} flatShading />
      </mesh>
    </group>
  )
}


export function CoffeeShop({ onClick, ...props }) {
  const [hovered, setHovered] = useState(false)

  const colors = {
    wall: "#f5f6fa",
    skirting: "#2d3436",
    roofBase: "#d35400",
    roofTop: "#e67e22",
    door: "#5d4037",
    awningLight: "#f7f1e3",
    awningDark: "#d1ccc0",
    coffeeDark: "#3d2b1f",
    grass: "#44bd32",
    gold: "#d4af37",
    marble: "#ffffff"
  }

  return (
    <group
      {...props}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
    >
      {/* 1. base */}
      <group position-y={0.05}>
        <RoundedBox args={[4.8, 0.1, 4.8]} radius={0.05} receiveShadow castShadow>
          <meshStandardMaterial color={colors.gold} metalness={0.8} />
        </RoundedBox>
        <RoundedBox args={[4.5, 0.15, 4.5]} radius={0.05} position-y={0.05} receiveShadow castShadow>
          <meshStandardMaterial color="#dcdde1" />
        </RoundedBox>
        {/* Marble Path */}
        <group position-y={0.08}>
          <RoundedBox args={[1.4, 0.05, 0.8]} radius={0.02} position={[0, 0.05, 1.4]} receiveShadow castShadow>
            <meshStandardMaterial color={colors.marble} />
          </RoundedBox>
        </group>
      </group>

      {/* 2. Building */}
      <group position-y={1.1}>
        {/* Main Body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.8, 2.2, 2.5]} />
          <meshStandardMaterial color={colors.wall} flatShading />
        </mesh>

        {/* Details */}
        <mesh position={[-1.41, 0, 0]}>
          <boxGeometry args={[0.05, 2.2, 2.1]} />
          <meshStandardMaterial color={colors.door} />
        </mesh>
        <mesh position={[1.41, 0, 0]}>
          <boxGeometry args={[0.05, 2.2, 2.1]} />
          <meshStandardMaterial color={colors.door} />
        </mesh>

        {/* Large glass */}
        <group position={[0, 0, 1.26]}>
          <mesh castShadow>
            <boxGeometry args={[2.4, 1.8, 0.1]} />
            <meshStandardMaterial color="#a6d9e8" transparent opacity={0.3} metalness={0.9} roughness={0.1} />
          </mesh>
          {/* frame */}
          <mesh position={[0, 0.9, 0.05]}>
            <boxGeometry args={[2.5, 0.1, 0.12]} />
            <meshStandardMaterial color={colors.gold} metalness={1} />
          </mesh>
          <mesh position={[0, -0.9, 0.05]}>
            <boxGeometry args={[2.5, 0.1, 0.12]} />
            <meshStandardMaterial color={colors.gold} metalness={1} />
          </mesh>
        </group>

        {/* door */}
        <group position={[0.8, -0.4, 1.27]}>
          <mesh castShadow>
            <boxGeometry args={[0.7, 1.4, 0.05]} />
            <meshStandardMaterial color={colors.door} />
          </mesh>
          <mesh position={[0.2, 0, 0.03]}>
            <boxGeometry args={[0.05, 0.3, 0.05]} />
            <meshStandardMaterial color={colors.gold} metalness={1} />
          </mesh>
        </group>
      </group>

      {/* 3. roof */}
      <group position-y={2.2}>
        <mesh castShadow>
          <boxGeometry args={[3.2, 0.2, 3]} />
          <meshStandardMaterial color={colors.skirting} />
        </mesh>

        <mesh position-y={0.25} castShadow>
          <boxGeometry args={[2.8, 0.3, 2.6]} />
          <meshStandardMaterial color={colors.roofTop} />
        </mesh>

        {/* panel */}
        {/* --- SIGN PANEL WITH WEBGL TEXT --- */}
        <group position={[0, 0.6, 1.3]} scale={hovered ? 1.05 : 1}>
          <mesh castShadow>
            <boxGeometry args={[3.4, 1, 0.15]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[0, 0, -0.05]}>
            <boxGeometry args={[3.5, 1.1, 0.1]} />
            <meshStandardMaterial color={colors.gold} metalness={1} />
          </mesh>

          {/* TEXTUL ÎN PERSANĂ */}
          <Text
              fontSize={0.35}
              color="white"
              position={[0, 0.22, 0.08]}
              anchorX="center"
              anchorY="middle"
          >
            آندره
          </Text>

          {/* LINIA NEON AURIE */}
          <mesh position={[0, -0.05, 0.08]}>
            <planeGeometry args={[2.2, 0.03]} />
            <meshStandardMaterial color={colors.gold} emissive={colors.gold} emissiveIntensity={2} />
          </mesh>

          {/* TEXTUL ÎN ENGLEZĂ */}
          <Text
              fontSize={0.12}
              color={colors.gold}
              position={[0, -0.22, 0.08]}
              fontWeight={900}
              letterSpacing={0.4}
              anchorX="center"
              anchorY="middle"
          >
            VIRTUAL COFFEE
          </Text>
        </group>

        <group position={[1, 0.4, 0.5]} rotation={[0, -0.4, 0]}>
          <CubicCup scale={1.5} colors={colors} position={[0, 0, 0]} />
        </group>
      </group>

      {/* 4. decorations*/}
      <group position={[0, 2.1, 1.4]} rotation-x={0.4}>
        {[...Array(7)].map((_, i) => (
          <mesh key={i} position={[i * 0.4 - 1.2, 0, 0]} castShadow>
            <boxGeometry args={[0.38, 0.08, 0.8]} />
            <meshStandardMaterial color={i % 2 === 0 ? colors.awningDark : colors.awningLight} />
          </mesh>
        ))}
      </group>

      {/* 5. decorations 2 */}
      <group position={[-1.8, 0.4, 1.8]}>
        {[0, 0.8].map((x, i) => (
          <group key={i} position={[x, 0, 0]}>
            <mesh castShadow><boxGeometry args={[0.6, 0.5, 0.6]} /><meshStandardMaterial color={colors.marble} /></mesh>
            <mesh position-y={0.4}><boxGeometry args={[0.4, 0.4, 0.4]} /><meshStandardMaterial color={colors.grass} /></mesh>
          </group>
        ))}
      </group>

      {/* 6. outdoor*/}
      <group position={[2, 0.2, 1.8]}>
        <mesh position-y={0.5} castShadow><boxGeometry args={[0.05, 1, 0.05]} /><meshStandardMaterial color={colors.skirting} /></mesh>
        <mesh position-y={1} castShadow><boxGeometry args={[1.2, 0.05, 1.2]} /><meshStandardMaterial color={colors.marble} /></mesh>
        {/* umbrella */}
        <group position-y={1.1}>
          <mesh castShadow rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[1, 0.6, 4]} />
            <meshStandardMaterial color={colors.gold} metalness={0.5} />
          </mesh>
        </group>
      </group>
    </group>
  )
}