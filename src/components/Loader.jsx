import { Html, useProgress } from "@react-three/drei"

const Loader = () => {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="fixed inset-0 w-screen h-screen bg-[#0f172a] flex flex-col items-center justify-center z-[1000] transition-all duration-1000">
        {/* Branding */}
        <div className="mb-12 flex flex-col items-center animate-in fade-in zoom-in duration-1000">
          <div className="w-24 h-24 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center mb-6 shadow-2xl backdrop-blur-xl">
             <span className="text-5xl animate-pulse">🚂</span>
          </div>
          <h1 className="text-white font-black text-3xl tracking-tighter uppercase mb-2">
            Vision & Style <span className="text-pink-500 italic">Express</span>
          </h1>
          <p className="text-white/40 font-bold text-[10px] uppercase tracking-[0.4em]">
            Destination: 14 February 2026
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-64 flex flex-col items-center gap-4">
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
            <div 
              className="h-full bg-gradient-to-r from-pink-500 to-rose-400 transition-all duration-300 ease-out shadow-[0_0_15px_rgba(236,72,153,0.5)]"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex justify-between w-full px-1">
            <span className="text-white/30 font-black text-[9px] uppercase tracking-widest">
              Initializing World
            </span>
            <span className="text-pink-500 font-black text-[10px]">
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      </div>
    </Html>
  )
}

export default Loader