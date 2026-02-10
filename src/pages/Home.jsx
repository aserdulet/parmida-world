import React, { Suspense, useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls, Sky } from '@react-three/drei';
import * as THREE from 'three';

// Models & Components
import Loader from '../components/Loader';
import { CoffeeShop } from "../models/CoffeeShop";
import { CoffeeVideoModal } from "../components/CoffeeVideoModal";
import { OpticsClinic } from "../models/OpticsClinic";
import { SwanPond } from "../models/SwanPond";
import { TrainStation } from "../models/TrainStation";
import { VoxelTrain } from "../models/VoxelTrain";
import { FutureSign } from "../models/FutureSign";
import { FashionMall } from "../models/FashionMall";
import { MallPortalButton } from "../models/MallPortalButton";
import { FancyMallModal } from "../components/FancyMallModal";
import { VirtualPhone } from "../components/VirtualPhone";
import { ReviewModal } from "../components/ReviewModal";
import { ClinicReviewButton } from "../models/ClinicReviewButton";

const STATIONS = {
  STATION: { x: -15, sun: [0, 0, -1], light: 0.5, label: "Early Morning at Central Station", btn: "Start the Day 🚂" },
  COFFEE: { x: -5, sun: [0, 0.1, -1], light: 1.0, label: "Coffee Break with Andrei", btn: "Go to Clinic 🏥" },
  CLINIC: { x: 5, sun: [0, 1, -1], light: 1.8, label: "Optic Clinic - Work Time", btn: "Go to the Mall 🛍️" },
  MALL: { x: 15, sun: [0, 0.5, -1], light: 1.4, label: "Afternoon Shopping", btn: "Relax at the Pond 🦢" },
  POND: { x: 25, sun: [0, 0.2, -1], light: 1.0, label: "Peaceful Afternoon with Swans", btn: "Forward to the Future ➔" },
  FUTURE: { x: 35, sun: [0, -1, -1], light: 0.1, label: "Destination: February 14th", btn: "Return 🔄" }
};

function RailSleepers({ count = 120 }) {
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

const Home = () => {
  const [currentStep, setCurrentStep] = useState('STATION');
  const [isPhoneOpen, setIsPhoneOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isCoffeeOpen, setIsCoffeeOpen] = useState(false);
  const [isMallOpen, setIsMallOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive & Lifecycle Management
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    const readyTimer = setTimeout(() => setIsReady(true), 1000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(readyTimer);
    };
  }, []);

  // Future Station Logic
  useEffect(() => {
    let futureTimer;
    if (currentStep === 'FUTURE' && isReady) {
      futureTimer = setTimeout(() => {
        setHasNotification(true);
        setIsPhoneOpen(true);
      }, 5000);
    }
    return () => clearTimeout(futureTimer);
  }, [currentStep, isReady]);

  const handleNext = () => {
    setIsTransitioning(true);
    const keys = Object.keys(STATIONS);
    const nextIndex = (keys.indexOf(currentStep) + 1) % keys.length;

    setTimeout(() => {
      setCurrentStep(keys[nextIndex]);
      setHasNotification(true);
      setIsPhoneOpen(false);
    }, 400);

    setTimeout(() => setIsTransitioning(false), 2500);
  };

  const hideAnnotations =  isReviewOpen || isCoffeeOpen || isMallOpen;

  return (
      <div className={`w-full h-screen relative bg-[#0f172a] transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
        <style dangerouslySetInnerHTML={{ __html: `
        ${hideAnnotations ? '.annotation { display: none !important; }' : ''}
        .annotation { filter: blur(${isTransitioning ? '4px' : '0px'}); transition: filter 1s; }
        @keyframes speed-streak {
          0% { transform: translateX(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(calc(100vw + 300px)); opacity: 0; }
        }
        .animate-speed-streak { animation: speed-streak 0.8s linear infinite; }
      `}} />

        {/* STORY HUD */}
        {!isPhoneOpen && (
            <div className={`absolute top-6 left-6 z-[9999] p-6 bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl text-white max-w-sm transition-all duration-700 ${isTransitioning ? 'opacity-0 -translate-y-4' : 'opacity-100'}`}>
              <p className="text-pink-500 font-black text-[10px] uppercase tracking-widest mb-1">Parmida's Express • 2026</p>
              <h2 className="text-2xl font-black uppercase mb-4 leading-tight">{STATIONS[currentStep].label}</h2>
              <button onClick={handleNext} className="w-full py-4 bg-white text-black font-black rounded-2xl hover:bg-pink-500 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg cursor-pointer">
                {STATIONS[currentStep].btn} ➔
              </button>
            </div>
        )}


        {/* PHONE ICON */}
        {!isPhoneOpen && (
            <button
                onClick={() => { setIsPhoneOpen(true); setHasNotification(false); }}
                className={`absolute bottom-10 right-10 z-[100] cursor-pointer w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all duration-500 border border-white/20 ${isTransitioning ? 'opacity-0 scale-50' : 'opacity-100 scale-100'}`}
            >
              <span className="text-4xl">📱</span>
              {hasNotification && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center animate-bounce shadow-md">
                    <span className="text-xs text-pink-600 font-black">1</span>
                  </div>
              )}
            </button>
        )}

        {/* MODALS */}
        <ReviewModal isOpen={isReviewOpen} onClose={() => setIsReviewOpen(false)} />
        <CoffeeVideoModal isOpen={isCoffeeOpen} onClose={() => setIsCoffeeOpen(false)} />
        <FancyMallModal isOpen={isMallOpen} onClose={() => setIsMallOpen(false)} />
        <VirtualPhone isOpen={isPhoneOpen} onClose={() => setIsPhoneOpen(false)} currentStep={currentStep} />

        {/* TRANSITION OVERLAY */}
        <div className={`absolute inset-0 z-50 pointer-events-none transition-opacity duration-1000 ${isTransitioning ? 'opacity-100 backdrop-blur-[2px]' : 'opacity-0'}`}>
          {isTransitioning && (
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="absolute bg-gradient-to-r from-transparent via-white/20 to-transparent h-px w-96 animate-speed-streak" style={{ top: `${20 + i * 15}%`, animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
          )}
        </div>

        <Canvas shadows camera={{ position: [0, 5, 12], fov: 22 }} dpr={[1, 2]}>
          <Suspense fallback={<Loader />}>
            <StoryController step={STATIONS[currentStep]} isMobile={isMobile} />

            <group position-y={-1}>
              {/* STATIONS */}
              <TrainStation position={[STATIONS.STATION.x, 0, -3.5]} scale={1.5} />

                <group position={[STATIONS.COFFEE.x, 0, -3.5]}>
                  <CoffeeShop
                      onClick={() => setIsCoffeeOpen(true)}
                      onPointerOver={() => (document.body.style.cursor = 'pointer')}
                      onPointerOut={() => (document.body.style.cursor = 'auto')}
                  />
                </group>

              <group position={[STATIONS.CLINIC.x, 0, -3.5]}>
                {!isReviewOpen && !isPhoneOpen && <ClinicReviewButton onClick={() => setIsReviewOpen(true)} />}
                <OpticsClinic />
              </group>

              <group position={[STATIONS.MALL.x, 0, -3.5]}>
                <FashionMall onClick={() => setIsMallOpen(true)}/>
                {!isMallOpen && !isReviewOpen && !isPhoneOpen && <MallPortalButton onClick={() => setIsMallOpen(true)} />}
              </group>

              <SwanPond position={[STATIONS.POND.x, 0, -2]} />
              <FutureSign position={[STATIONS.FUTURE.x, 0, -1]} />

              <VoxelTrain targetX={STATIONS[currentStep].x} />

              {/* RAILS */}
              <group position-y={0.05}>
                <mesh position={[0, 0, 1.2]} receiveShadow>
                  <boxGeometry args={[100, 0.08, 0.12]} />
                  <meshStandardMaterial color="#2d3436" metalness={0.8} />
                </mesh>
                <mesh position={[0, 0, 1.9]} receiveShadow>
                  <boxGeometry args={[100, 0.08, 0.12]} />
                  <meshStandardMaterial color="#2d3436" metalness={0.8} />
                </mesh>
                <RailSleepers />
              </group>
            </group>

            <ContactShadows opacity={0.4} scale={60} blur={2.5} far={10} resolution={512} />
            <OrbitControls enableRotate={false} enablePan={false} minDistance={isMobile ? 15 : 10} maxDistance={35} />
          </Suspense>
        </Canvas>
      </div>
  );
};

function StoryController({ step, isMobile }) {
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

export default Home;