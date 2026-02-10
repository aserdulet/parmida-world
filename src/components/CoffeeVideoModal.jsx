import React from 'react';

export function CoffeeVideoModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-500">
            <div className="w-full max-w-2xl bg-[#1a1a1a] rounded-4xl shadow-[0_0_100px_rgba(241,196,15,0.2)] overflow-hidden border border-white/10 flex flex-col animate-in zoom-in-95 relative landscape:scale-[0.8]">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-30 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-[#f1c40f] hover:text-black rounded-full text-white transition-all duration-300 active:scale-90"
                >
                    <span className="text-xl">✕</span>
                </button>

                {/* Image Container */}
                <div className="relative aspect-video w-full bg-[#111] flex items-center justify-center overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop"
                        alt="Premium Coffee"
                        className="w-full h-full object-cover"
                    />

                    {/* Gradient Overlay*/}
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

                    <div className="absolute bottom-8 left-8 right-8 pointer-events-none">
                        <p className="text-[#f1c40f] text-[10px] font-black uppercase tracking-[0.5em] mb-2">
                            Andrei's Special Selection
                        </p>
                        <h2 className="text-white text-4xl font-black uppercase tracking-tighter leading-none">
                            The Perfect <br/> Brew
                        </h2>
                        <p className="text-white/80 text-sm mt-4 max-w-md italic font-light leading-relaxed">
                            Experience the art of coffee making with <span className="text-[#f1c40f] font-bold">much caring</span>.
                            Crafted from the emotes list, served with style as a message in Discord and Telegram!
                        </p>
                    </div>
                </div>

                {/* Bottom Bar Info */}
                <div className="p-6 bg-[#222] flex items-center justify-between border-t border-white/5">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#f1c40f] rounded-xl flex items-center justify-center text-2xl shadow-lg shadow-[#f1c40f]/20">
                            ☕
                        </div>
                        <div>
                            <p className="text-white font-bold tracking-tight">Premium Roasted Beans</p>
                            <p className="text-white/40 text-[10px] uppercase tracking-widest font-black">
                                100% Arabica Or Davidoff
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="px-8 py-3 bg-white text-black font-black rounded-xl hover:bg-[#f1c40f] transition-all active:scale-95 text-[12px] uppercase tracking-widest"
                    >
                        Close ad
                    </button>
                </div>
            </div>
        </div>
    );
}