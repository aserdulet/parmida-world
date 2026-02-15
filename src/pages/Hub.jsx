import React, { Suspense, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Float, Text, ContactShadows, Environment, Image, useCursor, ScrollControls, Scroll, QuadraticBezierLine } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

import s1Img from "../assets/s1.jpg";
import s2Img from "../assets/s2.png";

const HangingSupport = () => {
    const { viewport } = useThree();

    const width = viewport.width * 2;

    return (
        <group>
            {/* string */}
            <QuadraticBezierLine
                start={[-width, 2.3, -0.1]}
                end={[width, 2.3, -0.1]}
                mid={[0, 2.1, -0.1]}
                color="#8b7355"
                lineWidth={1}
            />
            {/* wood */}
            <mesh position={[0, 2.15, 0.1]}>
                <boxGeometry args={[0.15, 0.4, 0.1]} />
                <meshStandardMaterial color="#b58d63" roughness={1} />
            </mesh>
        </group>
    );
};

const Polaroid = ({ imgSource, title, description, date, position, rotation, route, scale = 1 }) => {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(false);
    useCursor(hovered);

    return (
        <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
            <group
                position={position}
                rotation={rotation}
                scale={hovered ? scale * 1.05 : scale}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => navigate(route)}
            >
                <HangingSupport />

                <mesh castShadow receiveShadow>
                    <boxGeometry args={[3.2, 4.2, 0.05]} />
                    <meshStandardMaterial color="#fdfdfd" roughness={0.9} />
                </mesh>

                <Image
                    url={imgSource}
                    position={[0, 0.5, 0.04]}
                    scale={[2.8, 2.8]}
                    grayscale={hovered ? 0 : 0.1}
                    transparent
                />

                <group position={[0, -1.2, 0.04]}>
                    <Text
                        fontSize={0.18}
                        color="#111"
                        maxWidth={2.8}
                        textAlign="center"
                        fontStyle="italic"
                    >
                        {title}
                    </Text>

                    <Text
                        position={[0, -0.4, 0]}
                        fontSize={0.09}
                        color="#444"
                        maxWidth={2.6}
                        textAlign="center"
                        lineHeight={1.4}
                    >
                        {description}
                    </Text>

                    <Text
                        position={[1.4, -0.75, 0.01]}
                        fontSize={0.06}
                        color="#999"
                        anchorX="right"
                    >
                        {date}
                    </Text>
                </group>
            </group>
        </Float>
    );
};

const Content = () => {
    const { viewport } = useThree();
    const isMobile = window.innerWidth < 768;

    return (
        <Scroll>
            <group position={[0, 0, 0]}>
                {/* S1 */}
                <Polaroid
                    imgSource={s1Img}
                    title="The beginning"
                    description="Between those train rides and shifts at the clinic, space was found for virtual coffees, plenty of sugar, and a swan. It was the beginning of a beautiful 'Yes'."
                    date="Feb 14, 2026"
                    position={isMobile ? [0, 0, 0] : [-3.5, 0, 0]}
                    rotation={[0, 0, 0.05]}
                    route="/s1"
                />

                {/* S2 */}
                <Polaroid
                    imgSource={s2Img}
                    title="Official Cat Business"
                    description="A collection of moments leading up to July. May contain traces of 'Cat Business' and Farsi/German accents."
                    date="Arrival: July 2026"
                    position={isMobile ? [0, -viewport.height * 0.8, 0] : [3.5, -0.2, 0]}
                    rotation={[0, 0, -0.05]}
                    route="/s2"
                />
            </group>
        </Scroll>
    );
};

const Hub = () => {
    const isMobile = window.innerWidth < 768;

    return (
        <div className="w-full h-screen bg-[#f0eee9] relative overflow-hidden font-serif">
            <Canvas shadows camera={{ position: [0, 0, 10], fov: 40 }}>
                <color attach="background" args={["#f0eee9"]} />

                <mesh position={[0, 0, -2]}>
                    <planeGeometry args={[100, 100]} />
                    <meshStandardMaterial color="#f0eee9" />
                </mesh>

                <ambientLight intensity={0.6} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />

                <Suspense fallback={null}>
                    <ScrollControls pages={isMobile ? 2 : 1} damping={0.2}>
                        <Content />
                    </ScrollControls>

                    <Environment preset="studio" />
                    <ContactShadows position={[0, -4.5, 0]} opacity={0.1} scale={20} blur={3} />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Hub;