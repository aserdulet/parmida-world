import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import {EnvironmentSegment} from "../models/s2/EnvironmentSegment.jsx";



const SceneContent = () => {
    const scroll = useScroll();
    const segmentGroup = useRef();

    const segmentCount = 6;
    const segmentLength = 20;
    const totalLength = segmentCount * segmentLength;

    useFrame(() => {
        const offset = scroll.offset;
        const playhead = offset * totalLength * 5;

        if (segmentGroup.current) {
            segmentGroup.current.children.forEach((child, index) => {
                let z = (index * segmentLength - playhead) % totalLength;
                if (z > segmentLength) z -= totalLength;
                if (z < -totalLength + segmentLength) z += totalLength;
                child.position.z = z;
            });
        }

    });

    return (
        <group>
            <group ref={segmentGroup}>
                {[...Array(segmentCount)].map((_, i) => (
                    <EnvironmentSegment key={i} position={[0, 0, 0]} withTrees={i % 2 === 0} />
                ))}
            </group>
        </group>
    );
};

const Season2 = () => {
    // const julyVibe = {
    //     x: 0,
    //     sun: [15, 8, 10],
    //     light: 1.5
    // };

    return (
        <div className="w-full h-screen bg-[#a5d8ff]">
            <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
                <div className="max-w-md space-y-4">
                    <span className="text-5xl">🐈‍⬛</span>

                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        <span className="font-medium text-indigo-600">Meow!</span> Work in progress
                    </h1>

                    <p className="text-lg leading-relaxed text-slate-600">
                        My apologies, but <span className="font-medium text-indigo-600">this Cat</span> is still working
                        on this page.
                    </p>
                </div>
            </div>
            {/*<PersistentControls />*/}

            {/*<div className="absolute bottom-10 w-full text-center z-10 pointer-events-none">*/}
            {/*    <p className="text-white/50 font-serif italic animate-pulse">*/}
            {/*        Scroll to pedal towards July...*/}
            {/*    </p>*/}
            {/*</div>*/}

            {/*<Canvas shadows camera={{ position: [0, 5, 12], fov: 35 }}>*/}
            {/*    <Suspense fallback={null}>*/}
            {/*        <StoryController step={julyVibe} />*/}

            {/*        <ScrollControls pages={10} damping={0.4}>*/}
            {/*            <SceneContent />*/}
            {/*        </ScrollControls>*/}

            {/*        <Environment preset="sunset" />*/}
            {/*        <ContactShadows*/}
            {/*            position={[0, -0.49, 0]}*/}
            {/*            opacity={0.4}*/}
            {/*            scale={20}*/}
            {/*            blur={2}*/}
            {/*            far={4.5}*/}
            {/*        />*/}
            {/*    </Suspense>*/}
            {/*</Canvas>*/}
        </div>
    );
};

export default Season2;