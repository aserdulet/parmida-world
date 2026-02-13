import React from "react";

export const JottoApp = () => {
    return (
        <div className="w-full h-full bg-white flex justify-center animate-in slide-in-from-right duration-300">
            <iframe
                src="https://aserdulet.github.io/jotto/"
                className="w-full h-full border-none origin-top scale-[0.83]"
                style={{ width: '380px', height: '120.5%' }}
            />
        </div>
    )
}