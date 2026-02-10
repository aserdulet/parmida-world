import {useState, useRef} from "react";

export function DiscordVideoMessage({ videoUrl, poster }) {
    const [, setIsHovered] = useState(false);
    const videoRef = useRef(null);

    const handlePlayAndFullscreen = () => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = false;
        video.play();

        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
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
                <video
                    ref={videoRef}
                    poster={poster}
                    className="w-full h-auto"
                    playsInline
                    preload="metadata"
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