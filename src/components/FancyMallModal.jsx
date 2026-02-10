import React from 'react';

const BERLIN_STORES = [
    {
        name: "Stradivarius",
        specialty: "Designer Scarves & Silk",
        url: "https://www.stradivarius.com/de/",
        image: "https://images.pexels.com/photos/1036856/pexels-photo-1036856.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
        name: "Zara Berlin",
        specialty: "High-Street Chic & Hats",
        url: "https://www.zara.com/de/en/woman-accessories-hats-l1005.html",
        image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=800&auto=format&fit=crop",
    },
    {
        name: "VooStore",
        specialty: "Avant-Garde Hats",
        url: "https://voostore.com/collections/womens-hats",
        image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=800&auto=format&fit=crop",
    },
    {
        name: "Bershka",
        specialty: "Minimalist Headwear",
        url: "https://www.bershka.com/de/h-woman.html",
        image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=800&auto=format&fit=crop",
    },
    {
        name: "Galeries Lafayette",
        specialty: "French Elegance & Scarves",
        url: "https://www.galerieslafayette.com/",
        image: "https://images.unsplash.com/photo-1582037928769-181f2644ecb7?q=80&w=800&auto=format&fit=crop",
    },
    {
        name: "Mytheresa",
        specialty: "Couture Scarves",
        url: "https://www.mytheresa.com/de/en/women/accessories/scarves",
        image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=800&auto=format&fit=crop",
    }
];

export function FancyMallModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-3xl animate-in fade-in duration-700">
            <div className="w-full max-w-4xl bg-[#fdfdfd] rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.8)] border border-white/20 flex flex-col overflow-hidden animate-in zoom-in-95 duration-500 landscape:scale-[0.8] landscape:origin-center">

                {/* Header Custom */}
                <div className="bg-white px-10 py-8 flex justify-between items-center border-b border-gray-100 relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#d4af37] to-transparent" />
                    <div>
                        <p className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.6em] mb-2">Private Shops Tour</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-14 h-14 flex items-center justify-center rounded-full bg-black text-white hover:bg-[#d4af37] transition-all duration-500 shadow-xl group cursor-pointer"
                    >
                        <span className="group-hover:rotate-90 transition-transform duration-500 text-xl">✕</span>
                    </button>
                </div>

                {/* Catalog Grid */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-gray-50/50 max-h-[70vh]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {BERLIN_STORES.map((store, i) => (
                            <div
                                key={i}
                                onClick={() => window.open(store.url, '_blank')}
                                className="group relative h-75 bg-white rounded-4xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700 border border-white"
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src={store.image}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        alt={store.name}
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-80" />
                                </div>

                                {/* Info Overlay */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                                    <div className="translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                                        <h3 className="text-2xl font-serif italic mb-2">{store.name}</h3>
                                        <p className="text-white/60 text-[11px] font-light mb-4 italic">
                                            Specialty: <span className="text-white font-medium">{store.specialty}</span>
                                        </p>

                                        {/* Brands list - reveal on hover */}
                                        <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                                            <div className="w-full py-3 bg-[#d4af37] text-white text-center rounded-xl text-[9px] font-black uppercase tracking-widest">
                                                View Collection ↗
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="py-20 text-center">
                        <div className="w-20 h-px bg-[#d4af37] mx-auto mb-6 opacity-30" />
                        <p className="text-gray-400 text-[10px] font-light tracking-[0.4em] uppercase">
                            Exclusively for Parmida Style World • 2026
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}