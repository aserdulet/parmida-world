import React from 'react';
import {BackgroundMusic} from "../components/BackgroundMusic.jsx";
import {useStore} from "../store/useStore";

export const PersistentControls = () => {
    const {
        isPhoneOpen,
        isCoffeeOpen,
        hasNotification,
        isTransitioning,
        setPhoneOpen,
        setNotification
    } = useStore();

    return (
        <div className={`
      fixed z-[100] flex flex-row items-center gap-2 md:gap-4 
      transition-all duration-500 
      bottom-4 right-4 scale-90 origin-bottom-right
      md:bottom-10 md:right-10 md:scale-100
      ${isTransitioning ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}
    `}>

            <BackgroundMusic isCoffeeOpen={isCoffeeOpen} isPhoneOpen={isPhoneOpen} />

            {!isPhoneOpen && (
                <button
                    onClick={() => { setPhoneOpen(true); setNotification(false); }}
                    className="relative w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl md:rounded-3xl shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all border border-white/20 cursor-pointer"
                >
                    <span className="text-3xl md:text-4xl">📱</span>
                    {hasNotification && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-white rounded-full flex items-center justify-center animate-bounce shadow-md">
                            <span className="text-[10px] text-pink-600 font-black">1</span>
                        </div>
                    )}
                </button>
            )}
        </div>
    );
};