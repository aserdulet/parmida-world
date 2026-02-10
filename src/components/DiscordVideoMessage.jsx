import {useState, useRef, useEffect} from "react";

export function DiscordVideoMessage({ videoUrl, poster }) {
    const [, setIsHovered] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleFullscreenChange = () => {
            if (!document.fullscreenElement && 
                !document.webkitFullscreenElement && 
                !document.mozFullScreenElement && 
                !document.msFullscreenElement) {
                video.controls = false;
                video.pause();
            }
        };

        const handleWebkitExitFullscreen = () => {
            video.controls = false;
            video.pause();
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        video.addEventListener('webkitendfullscreen', handleWebkitExitFullscreen);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            video.removeEventListener('webkitendfullscreen', handleWebkitExitFullscreen);
        };
    }, []);

    const handlePlayAndFullscreen = () => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = false;
        
        // On iOS, we need to call play() before webkitEnterFullscreen
        video.play().catch(err => console.log("Video play failed:", err));

        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitEnterFullscreen) {
            // Special handling for iOS Safari
            video.webkitEnterFullscreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }

        // Add controls automatically when playing to ensure user can exit or manage video
        video.controls = true;
    };

    return (
        <div
            className="relative mt-2 group max-w-60"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                onClick={handlePlayAndFullscreen}
                className="rounded-xl overflow-hidden border border-white/10 bg-black shadow-lg relative aspect-video flex items-center justify-center cursor-pointer group/vid"
            >
                {/* Mobile visible fullscreen button */}
                <button
                    type="button"
                    aria-label="Fullscreen"
                    onClick={(e) => { e.stopPropagation(); handlePlayAndFullscreen(); }}
                    className="absolute top-2 right-2 z-10 w-9 h-9 rounded-full bg-white/15 border border-white/30 backdrop-blur-md flex items-center justify-center active:scale-95 md:opacity-0 md:group-hover/vid:opacity-100 transition-opacity cursor-pointer"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h6v6" />
                        <path d="M9 21H3v-6" />
                        <path d="M21 3l-7 7" />
                        <path d="M3 21l7-7" />
                    </svg>
                </button>
                <video
                    ref={videoRef}
                    poster={poster}
                    className="w-full h-auto"
                    playsInline
                    preload="metadata"
                    controlsList="nodownload"
                >
                    <source src={videoUrl} type="video/mp4" />
                </video>

                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/vid:bg-black/40 transition-all">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover/vid:scale-110 transition-transform">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>

                <div className="absolute bottom-2 right-2 text-[8px] text-white/50 uppercase font-black tracking-widest opacity-0 group-hover/vid:opacity-100 transition-opacity">
                    Click for Fullscreen Experience
                </div>
            </div>

            <div className="flex items-center gap-2 mt-1.5 px-1">
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    Parmida Exclusive Preview
                </span>
            </div>
        </div>
    );
}