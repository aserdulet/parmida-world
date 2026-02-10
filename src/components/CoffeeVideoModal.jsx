import React from 'react';

export function CoffeeVideoModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-500">
            <div className="absolute inset-0" onClick={onClose} />

            <div className="relative w-full max-w-2xl bg-[#1a1a1a] rounded-3xl sm:rounded-4xl shadow-[0_0_100px_rgba(241,196,15,0.1)] overflow-hidden border border-white/10 flex flex-col animate-in zoom-in-95 max-h-[90vh]">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/50 sm:bg-black text-white hover:bg-[#f1c40f] hover:text-black transition-all duration-500 shadow-xl group cursor-pointer active:scale-90"
                >
                    <span className="group-hover:rotate-90 transition-transform duration-500 text-lg sm:text-xl">✕</span>
                </button>

                <div className="overflow-y-auto custom-scrollbar">

                    <div className="relative aspect-[4/5] sm:aspect-video w-full bg-[#111] flex items-center justify-center overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop"
                            alt="Premium Coffee"
                            className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-black/20 to-transparent" />

                        <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 pointer-events-none">
                            <p className="text-[#f1c40f] text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] mb-2">
                                Andrei's Special Selection
                            </p>
                            <h2 className="text-white text-3xl sm:text-4xl font-black uppercase tracking-tighter leading-[0.9]">
                                The Perfect <br/> Brew
                            </h2>
                            <p className="text-white/80 text-xs sm:text-sm mt-3 sm:mt-4 max-w-md italic font-light leading-relaxed line-clamp-3 sm:line-clamp-none">
                                Experience the art of coffee making with <span className="text-[#f1c40f] font-bold">much caring</span>.
                                Crafted for style and flavor!
                            </p>
                        </div>
                    </div>

                    <div className="p-5 sm:p-6 bg-[#222] flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5">
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#f1c40f] shrink-0 rounded-xl flex items-center justify-center text-xl sm:text-2xl shadow-lg shadow-[#f1c40f]/20">
                                ☕
                            </div>
                            <div>
                                <p className="text-white text-sm sm:text-base font-bold tracking-tight">Premium Roasted Beans</p>
                                <p className="text-white/40 text-[9px] sm:text-[10px] uppercase tracking-widest font-black">
                                    100% Arabica Or Davidoff
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="w-full sm:w-auto px-8 py-3 bg-white text-black font-black rounded-xl hover:bg-[#f1c40f] transition-all active:scale-95 text-[11px] sm:text-[12px] uppercase tracking-widest cursor-pointer"
                        >
                            Close ad
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}