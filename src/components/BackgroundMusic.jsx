import React, { useState, useEffect, useRef } from "react";

export const BackgroundMusic = ({ isPhoneOpen, isCoffeeOpen }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        const baseUrl = import.meta.env.BASE_URL || "/";
        const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
        const audioPath = `${cleanBase}audio/for-p.mp3`.replace('//', '/');


        const audio = new Audio(audioPath);
        audio.loop = true;
        audio.volume = 0.10;
        audioRef.current = audio;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = (isPhoneOpen || isCoffeeOpen) ? 0.02 : 0.10;
        }
    }, [isPhoneOpen, isCoffeeOpen]);

    const toggleMusic = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => {
                console.error("Audio blockat. Încearcă să dai un click oriunde pe pagină mai întâi.", e);
            });
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="flex flex-col items-end gap-1 md:gap-2">
            <button
                onClick={toggleMusic}
                className={`flex items-center cursor-pointer gap-2 md:gap-3 px-3 py-2 md:px-4 md:py-3 rounded-2xl backdrop-blur-xl border transition-all duration-500 shadow-xl
                ${isPlaying
                    ? 'bg-pink-500/20 border-pink-500/50 text-pink-500 shadow-pink-500/10'
                    : 'bg-black/60 border-white/10 text-white hover:border-white/30'}`}
            >
                <div className="flex items-end gap-[2px] h-3 w-4">
                    <div className={`w-1 bg-current rounded-full transition-all duration-300 ${isPlaying ? 'animate-[music-bar_0.8s_infinite]' : 'h-[4px]'}`} />
                    <div className={`w-1 bg-current rounded-full transition-all duration-300 ${isPlaying ? 'animate-[music-bar_1.2s_infinite]' : 'h-[2px]'}`} />
                    <div className={`w-1 bg-current rounded-full transition-all duration-300 ${isPlaying ? 'animate-[music-bar_1s_infinite]' : 'h-[4px]'}`} />
                </div>

                <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.15em]">
                    {isPlaying ? 'Mute' : 'Music'}
                </span>
            </button>

            <div className={`transition-all duration-700 transform 
                ${isPlaying ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                <div className="bg-black/40 backdrop-blur-md px-2 py-1 md:px-3 md:py-1.5 rounded-xl border border-white/5 flex items-center gap-2">
                    <span className="text-[7px] md:text-[9px] text-pink-300 font-bold uppercase tracking-tighter">Now Playing:</span>
                    <span className="text-[8px] md:text-[10px] text-white font-medium italic whitespace-nowrap">For P — ilyatruhanov</span>
                </div>
            </div>
        </div>
    );
};