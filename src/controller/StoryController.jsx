// StoryController rămâne o componentă de ajutor pentru Canvas
import {useFrame} from "@react-three/fiber";
import {useRef} from "react";
import * as THREE from "three";
import {Environment, Sky} from "@react-three/drei";

export function StoryController({ step, isMobile }) {
    const lightRef = useRef();

    useFrame((state) => {
        const zoom = isMobile ? 1.6 : 1.0;
        state.camera.position.lerp(new THREE.Vector3(step.x + 3, 8 * zoom, 18 * zoom), 0.04);
        state.camera.lookAt(step.x, 0, 0);

        if (lightRef.current) {
            lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, step.light * 1.5, 0.05);
            lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, step.x + 10, 0.05);
        }
    });

    return (
        <>
            <Sky distance={450000} sunPosition={step.sun} inclination={0} azimuth={0.25} />
            <ambientLight intensity={0.4} />
            <directionalLight
                ref={lightRef}
                position={[10, 20, 10]}
                castShadow
                shadow-mapSize={[1024, 1024]}
                shadow-camera-left={-20}
                shadow-camera-right={20}
                shadow-camera-top={20}
                shadow-camera-bottom={-20}
            />
            <Environment preset={step.sun[1] < -0.5 ? "night" : "dawn"} />
        </>
    );
}
