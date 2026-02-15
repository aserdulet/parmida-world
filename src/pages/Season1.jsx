import React, { Suspense, useEffect, useState } from "react";
import { Canvas} from "@react-three/fiber";
import { ContactShadows, OrbitControls } from '@react-three/drei';

import { useStore } from "../store/useStore";

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
import {StoryController} from "../controller/StoryController.jsx";
import {RailSleepers} from "../models/RailSleepers.jsx";
import {STATIONS} from "../utils/index.js";
import {PersistentControls} from "../controller/PersistentController.jsx";


const Season1 = () => {
  const {
    currentStep, isPhoneOpen, isReviewOpen, isCoffeeOpen, isMallOpen, isTransitioning, isMobile,
    setPhoneOpen, setReviewOpen, setCoffeeOpen, setMallOpen, setNotification, setIsMobile,
    handleNextStep
  } = useStore();

  const [isReady, setIsReady] = useState(false);

  // Responsive & Lifecycle
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    const readyTimer = setTimeout(() => setIsReady(true), 1000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(readyTimer);
    };
  }, [setIsMobile]);

  // Future Station Logic (Păstrată dar folosind Store-ul)
  useEffect(() => {
    let futureTimer;
    if (currentStep === 'FUTURE' && isReady) {
      futureTimer = setTimeout(() => {
        setNotification(true);
        setPhoneOpen(true);
      }, 5000);
    }
    return () => clearTimeout(futureTimer);
  }, [currentStep, isReady, setNotification, setPhoneOpen]);

  const hideAnnotations = isReviewOpen || isCoffeeOpen || isMallOpen;

  return (
      <div className={`w-full h-screen relative bg-[#0f172a] transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}>
        <style dangerouslySetInnerHTML={{ __html: `
        @keyframes music-bar { 0%, 100% { height: 4px; } 50% { height: 12px; } }
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
              <button
                  onClick={() => handleNextStep(STATIONS)}
                  className="w-full py-4 bg-white text-black font-black rounded-2xl hover:bg-pink-500 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                {STATIONS[currentStep].btn} ➔
              </button>
            </div>
        )}

        {/* Persistent UI Controls */}
        <PersistentControls/>

        {/* Modals - Acum controlate global */}
        <ReviewModal isOpen={isReviewOpen} onClose={() => setReviewOpen(false)} />
        <CoffeeVideoModal isOpen={isCoffeeOpen} onClose={() => setCoffeeOpen(false)} />
        <FancyMallModal isOpen={isMallOpen} onClose={() => setMallOpen(false)} />
        <VirtualPhone isOpen={isPhoneOpen} onClose={() => setPhoneOpen(false)} currentStep={currentStep} />

        {/* Speed Lines Effect */}
        <div className={`absolute inset-0 z-50 pointer-events-none transition-opacity duration-1000 ${isTransitioning ? 'opacity-100 backdrop-blur-[2px]' : 'opacity-0'}`}>
          {isTransitioning && (
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="absolute bg-gradient-to-r from-transparent via-white/20 to-transparent h-px w-96 animate-speed-streak" style={{ top: `${20 + i * 15}%`, animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
          )}
        </div>

        {/* R3F Canvas */}
        <Canvas shadows camera={{ position: [0, 5, 12], fov: 22 }} dpr={[1, 2]}>
          <Suspense fallback={<Loader />}>
            <StoryController step={STATIONS[currentStep]} isMobile={isMobile} />

            <group position-y={-1}>
              <TrainStation position={[STATIONS.STATION.x, 0, -3.5]} scale={1.5} />

              <group position={[STATIONS.COFFEE.x, 0, -3.5]}>
                <CoffeeShop
                    onClick={() => setCoffeeOpen(true)}
                    onPointerOver={() => (document.body.style.cursor = 'pointer')}
                    onPointerOut={() => (document.body.style.cursor = 'auto')}
                />
              </group>

              <group position={[STATIONS.CLINIC.x, 0, -3.5]}>
                {!isReviewOpen && !isPhoneOpen && <ClinicReviewButton onClick={() => setReviewOpen(true)} />}
                <OpticsClinic />
              </group>

              <group position={[STATIONS.MALL.x, 0, -3.5]}>
                <FashionMall onClick={() => setMallOpen(true)} />
                {!isMallOpen && !isReviewOpen && !isPhoneOpen && <MallPortalButton onClick={() => setMallOpen(true)} />}
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


export default Season1;