import {useEffect, useMemo, useRef} from "react";
import * as THREE from "three";

export function RailSleepers({ count = 120 }) {
    const meshRef = useRef();
    const tempObject = useMemo(() => new THREE.Object3D(), []);

    useEffect(() => {
        for (let i = 0; i < count; i++) {
            tempObject.position.set(-50 + i * 0.85, -0.02, 1.55);
            tempObject.updateMatrix();
            meshRef.current.setMatrixAt(i, tempObject.matrix);
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    }, [count, tempObject]);

    return (
        <instancedMesh ref={meshRef} args={[null, null, count]} receiveShadow>
            <boxGeometry args={[0.18, 0.04, 1.1]} />
            <meshStandardMaterial color="#3d2b1f" roughness={0.9} />
        </instancedMesh>
    );
}
