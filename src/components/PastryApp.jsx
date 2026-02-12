import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Cylinder, ContactShadows } from '@react-three/drei';

function BloodVial({ isScanning, happiness }) {
    const groupRef = useRef();
    const scanLineRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.rotation.z = Math.sin(t * (1 + happiness / 50)) * 0.1;
            groupRef.current.position.y = Math.sin(t * 2) * 0.05;
        }
        if (isScanning && scanLineRef.current) {
            scanLineRef.current.position.y = Math.sin(t * 8) * 0.8;
        }
    });

    return (
        <group ref={groupRef} scale={[1.1, 1.1, 1.1]}>
            <Cylinder args={[0.3, 0.3, 2.2, 32]} >
                <meshPhysicalMaterial transparent opacity={0.15} transmission={1} thickness={0.5} color="#ffffff" />
            </Cylinder>
            <Cylinder args={[0.28, 0.28, 1.6, 32]} position={[0, -0.2, 0]}>
                <MeshDistortMaterial
                    color={happiness > 70 ? "#FF69B4" : "#D32F2F"}
                    speed={isScanning ? 5 : 1.5}
                    distort={0.2}
                />
            </Cylinder>
            <Cylinder args={[0.33, 0.33, 0.4, 32]} position={[0, 1.1, 0]}>
                <meshStandardMaterial color="#F472B6" />
            </Cylinder>
            {isScanning && (
                <mesh ref={scanLineRef}>
                    <cylinderGeometry args={[0.45, 0.45, 0.03, 32]} />
                    <meshBasicMaterial color="#10B981" transparent opacity={0.6} />
                </mesh>
            )}
        </group>
    );
}

// --- 2. MAIN COMPONENT ---
export function PastryApp({ sugarLevel, setSugarLevel, happiness, setHappiness }) {
    const [isScanning, setIsScanning] = useState(false);
    const [showJoke, setShowJoke] = useState(false);
    const [scanResult, setScanResult] = useState(null);
    const [feedbackEmoji, setFeedbackEmoji] = useState(null);

    const pastries = [
        { id: 'kranz', name: 'Frankfurter Kranz', sugar: 15, joy: 20, icon: '🍰', note: 'Essential for Frankfurt survival.' },
        { id: 'nussecke', name: 'Nussecke', sugar: 25, joy: 40, icon: '🥜', restricted: true },
        { id: 'beth', name: 'Bethmännchen', sugar: 10, joy: 15, icon: '🍪', note: 'Mini-dose of Marzipan.' },
        { id: 'apfel', name: 'Apfelstrudel', sugar: 18, joy: 25, icon: '🍎', note: 'One slice keeps another doctor away.' },
        { id: 'donau', name: 'Donauwelle', sugar: 22, joy: 30, icon: '🍰', note: 'Chocolate wave.' },
    ];

    const runBloodTest = () => {
        setIsScanning(true);
        setScanResult(null);
        setTimeout(() => {
            setIsScanning(false);
            setScanResult("PATIENT TYPE: 0 Negative (Universal Sugar with Joy)");
        }, 2500);
    };

    const handleEat = (sBoost, jBoost, isSecret = false) => {
        setSugarLevel(prev => Math.min(prev + sBoost, 100));
        setHappiness(prev => Math.min(prev + jBoost, 100));
        setFeedbackEmoji(happiness > 80 ? '🥰' : '😊');
        setTimeout(() => setFeedbackEmoji(null), 1000);
        if (isSecret) setShowJoke(false);
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-[#FCFDFF] relative overflow-hidden font-sans select-none">

            {/* Header */}
            <div className="p-6 pt-12 bg-white border-b border-slate-100 z-20 shadow-sm">
                <h2 className="text-[10px] font-black text-pink-400 uppercase tracking-[0.3em] mb-1">Doktor Parmida Secret Stash</h2>
                <h1 className="text-xl font-bold text-slate-800">Sugar Analysis</h1>
            </div>

            {/* 3D Lab Section */}
            <div className="h-64 w-full relative z-10">
                <Canvas camera={{ position: [0, 0, 4] }}>
                    <ambientLight intensity={1.5} />
                    <pointLight position={[10, 10, 10]} intensity={2} />
                    <Suspense fallback={null}>
                        <BloodVial sugarLevel={sugarLevel} isScanning={isScanning} happiness={happiness} />
                        <ContactShadows position={[0, -1.5, 0]} opacity={0.2} scale={10} blur={2.5} />
                    </Suspense>
                </Canvas>

                {/* Floating Emoji Feedback */}
                {feedbackEmoji && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl animate-bounce z-50 pointer-events-none">
                        {feedbackEmoji}
                    </div>
                )}

                <div className="absolute inset-x-6 bottom-4 flex flex-col gap-2 z-30">
                    {scanResult && (
                        <div className="bg-emerald-50 border border-emerald-100 p-2 rounded-xl text-center animate-in slide-in-from-top-2 duration-500">
                            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-tight">{scanResult}</p>
                        </div>
                    )}
                    <button
                        onClick={runBloodTest}
                        className="w-full cursor-pointer py-3.5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all"
                    >
                        {isScanning ? "Blood test results..." : "Analyze Sample 💉"}
                    </button>
                </div>
            </div>

            {/* Pastry Prescription Menu */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 z-20">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Daily Prescriptions</p>
                {pastries.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => item.restricted ? setShowJoke(true) : handleEat(item.sugar, item.joy)}
                        className="w-full bg-white border cursor-pointer border-slate-100 p-4 rounded-2xl flex justify-between items-center hover:border-pink-200 transition-all active:bg-slate-50 group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                                {item.icon}
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-slate-700 text-xs">{item.name}</h3>
                                <p className="text-[8px] text-slate-400 font-medium">{item.note || 'No side effects detected.'}</p>
                            </div>
                        </div>
                        <div className="text-[10px] font-black text-pink-500 bg-pink-50 px-3 py-1 rounded-full uppercase">Eat</div>
                    </button>
                ))}
            </div>

            {/* Global Stats Footer */}
            <div className="p-4 bg-white border-t border-slate-100 flex gap-4 shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
                <StatBox label="Sugar Level" value={sugarLevel} color="bg-pink-400" />
                <StatBox label="Happiness" value={happiness} color="bg-emerald-400" />
            </div>

            {/* Nussecke Modal */}
            {showJoke && <NusseckeJoke onDismiss={() => setShowJoke(false)} onSuccess={() => handleEat(25, 45, true)} />}
        </div>
    );
}

// --- SUB-COMPONENTS ---

function StatBox({ label, value, color }) {
    return (
        <div className="flex-1">
            <div className="flex justify-between text-[8px] font-black text-slate-400 uppercase mb-1">
                <span>{label}</span>
                <span>{Math.round(value)}%</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className={`h-full ${color} transition-all duration-1000 ease-out`} style={{ width: `${value}%` }} />
            </div>
        </div>
    );
}

function NusseckeJoke({ onDismiss, onSuccess }) {
    const [hacked, setHacked] = useState(false);

    return (
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-8 animate-in fade-in duration-300">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl text-center max-w-[280px] border border-slate-100 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-[8px] font-bold px-3 py-1 rounded-full uppercase">Security Alert</div>

                {!hacked ? (
                    <>
                        <div className="text-5xl mb-4 animate-pulse">🥜</div>
                        <h4 className="text-sm font-bold text-slate-800 uppercase tracking-tight">Out of Stock!</h4>
                        <p className="text-[10px] text-slate-500 my-4 leading-relaxed font-medium italic">
                            "Nussecke is strictly reserved for the <span className="text-pink-500 font-bold underline">Frankfurt Summer Real Life Meting</span>. Consumption is only permitted when the 2 authorized persons meet."
                        </p>
                        <div className="space-y-2">
                            <button onClick={onDismiss} className="w-full py-4 bg-slate-100 cursor-pointer text-slate-600 rounded-2xl text-[10px] font-bold uppercase hover:bg-slate-200 transition-all">I'll wait for summer 😇</button>
                            <button onClick={() => setHacked(true)} className="w-full cursor-pointer py-2 text-pink-400 text-[9px] font-black uppercase hover:underline">Give me anyway... 😂</button>
                        </div>
                    </>
                ) : (
                    <div className="animate-in zoom-in duration-300">
                        <div className="text-6xl mb-4 animate-bounce">🤫</div>
                        <h4 className="text-sm font-bold text-emerald-600 uppercase italic">Approved!</h4>
                        <p className="text-[11px] text-slate-500 mt-4 leading-relaxed font-medium">
                            Hahaha, okay Doctor! But leave some for the summer.
                        </p>
                        <button onClick={onSuccess} className="mt-6 w-full cursor-pointer py-4 bg-pink-500 text-white rounded-2xl text-[10px] font-black uppercase shadow-lg shadow-pink-200 active:scale-95 transition-all">Ja / Si / areh / Da 😋</button>
                    </div>
                )}
            </div>
        </div>
    );
}