import React from 'react';

export function ReviewModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-500 pointer-events-auto">
            <div className="w-full max-w-85 max-h-[85vh] bg-[#fffafa] rounded-[2.5rem] shadow-2xl overflow-hidden border border-pink-100/50 flex flex-col animate-in zoom-in-95 pointer-events-auto relative">

                {/* w-14 h-14 flex items-center justify-center rounded-full bg-black text-white hover:bg-[#d4af37] transition-all duration-500 shadow-xl group cursor-pointer
                group-hover:rotate-90 transition-transform duration-500 text-xl
                */}
                <div className="bg-linear-to-b from-white to-pink-50 p-5 text-center relative shrink-0 border-b border-pink-100/50">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-black text-white hover:bg-pink-500 transition-all duration-500 shadow-xl group cursor-pointer active:scale-90"
                    >
                        <span className="group-hover:rotate-90 transition-transform duration-500 text-lg">✕</span>
                    </button>

                    <div className="w-14 h-14 bg-white rounded-full mx-auto mb-2 flex items-center justify-center text-2xl shadow-lg shadow-pink-100 border-4 border-white">
                        👩‍⚕️
                    </div>
                    <h2 className="text-gray-800 font-black text-lg tracking-tight leading-none">Dr. Parmida</h2>
                    <p className="text-pink-700 text-[8px] uppercase font-bold tracking-[0.2em] mt-1.5">Elite Medical Practitioner</p>
                </div>
                <div className="p-5 space-y-4 overflow-y-auto custom-scrollbar bg-[#fffafa]">

                    <div className="bg-white p-3.5 rounded-2xl border border-pink-100 shadow-sm">
                        <p className="text-gray-600 text-[12px] leading-relaxed italic">
                            "Known for her incredible hospitality, she makes you smile before the consultation begins. She calls everyone by their first name!"
                        </p>
                    </div>

                    <div className="space-y-3">
                        <RatingRow label="Clinical Skill" stars={10} />
                        <RatingRow label="Expertise" stars={10} />
                        <RatingRow label="Soft Skills" text="Highly Adaptable" />

                        <div className="mt-4 bg-[#1e272e] p-4 rounded-2xl text-white shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-16 h-16 bg-pink-500/10 rounded-full -mr-8 -mt-8 blur-xl" />
                            <p className="text-gray-500 text-[8px] font-black uppercase tracking-widest mb-2">Professional Metrics</p>

                            <div className="flex justify-between items-center text-[11px]">
                                <span className="text-gray-300 font-medium">Patient Trust</span>
                                <span className="text-pink-300 font-bold">100%</span>
                            </div>

                            <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/5">
                                <span className="font-bold text-white text-[11px] italic">Hospitality Score</span>
                                <div className="text-right">
                                    <span className="text-yellow-400 font-black text-lg">∞ / 5</span>
                                    <p className="text-[7px] text-gray-500 italic uppercase">Legendary Status</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-pink-50/50 p-3 rounded-xl border border-pink-100">
                        <p className="text-gray-700 text-[11px] leading-snug italic text-center">
                            "NOTE: She's also known as the medical community's rising star."
                        </p>
                    </div>

                    <div className='pt-2'>
                        <p className="text-gray-400 text-[8px] uppercase font-bold text-center tracking-[0.2em]">Verified medical board reviews</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function RatingRow({ label, stars, text }) {
    return (
        <div className="flex justify-between items-center border-b border-pink-100/30 pb-1.5">
            <span className="text-gray-500 text-[9px] font-black uppercase tracking-tight">{label}</span>
            {stars ? (
                <div className="flex gap-0.5">
                    {[...Array(stars)].map((_, i) => (
                        <span key={i} className="text-yellow-500 text-[10px]">★</span>
                    ))}
                </div>
            ) : (
                <span className="text-[#1e272e] font-black text-[10px] uppercase bg-pink-100/50 px-2 py-0.5 rounded-md">{text}</span>
            )}
        </div>
    );
}