import React, { useState, useEffect, useRef } from 'react';
import { DiscordVideoMessage } from './DiscordVideoMessage';
import {PastryApp} from "./PastryApp.jsx";
import {NotesApp} from "./NotesApp.jsx";
import {JottoApp} from "./JottoApp.jsx";

const DISCORD_DATA = {
    STATION: {
        from: "System",
        server: "Notifications",
        isJoinEvent: true,
        serversAdded: ["Study Hub - Fake It Until you Make it", "Ketchup Queen's server", "Shirin Close Friend", "Shirin Close Close Friend", "Shirin Ultimate Friend"],
        msg: "Multiple invitations received!"
    },
    COFFEE: {
        from: "Andrei",
        msg: "Coffee's on the way! ☕",
        smartReply: "Happy to hear! Since I can't send real caffeine over Discord, here's a virtual one ☕ to help you finish the day strong. You've got this mate!"
    },
    CLINIC: {
        from: "Andrei",
        msg: "Any new stories from today? 👓",
        smartReply: "gusham ba to doktor!"
    },
    MALL: {
        from: "Feryal",
        msg: "My boyfriend still wears your pants. They're his pants now!💅",
    },
    POND: {
        from: "Andrei",
        msg: "The swans are waiting... 🦢",
        smartReply: "Try to feed them with some clicks! Let's see if they like it."
    },
    FUTURE: {
        from: "System",
        server: "End of the Line",
        msg: "The journey continues on Feb 14th.",

    }
};

export function VirtualPhone({ isOpen, onClose, currentStep }) {
    const [activeApp, setActiveApp] = useState(null);
    const [sugarLevel, setSugarLevel] = useState(20);
    const [happiness, setHappiness] = useState(50);
    const [chatInput, setChatInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [futureMessages, setFutureMessages] = useState([]);
    const [isAndreiTyping, setIsAndreiTyping] = useState(false);
    const [hasReplied, setHasReplied] = useState(false);
    const [lastStep, setLastStep] = useState(currentStep);
    const futureSequenceStarted = useRef(false);
    const messagesEndRef = useRef(null);

    const stepData = DISCORD_DATA[currentStep] || DISCORD_DATA.STATION;

    useEffect(() => {
        if (isOpen && currentStep !== lastStep) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLastStep(currentStep);
            setHasReplied(false);

            if (stepData && !stepData.isJoinEvent) {
                setMessages([{ id: 'init', user: stepData.from, text: stepData.msg }]);
            } else {
                setMessages([]);
            }

            if (currentStep !== 'FUTURE') {
                setFutureMessages([]);
                futureSequenceStarted.current = false;
            }
        }
    }, [isOpen, currentStep, lastStep, stepData]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (!isOpen) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLastStep(null);
        }
    }, [isOpen]);

    useEffect(() => {
        if (activeApp === 'discord') {
            scrollToBottom();
        }
    }, [messages, futureMessages, isAndreiTyping, activeApp]);

    useEffect(() => {
        if (isOpen && currentStep === 'FUTURE' && !futureSequenceStarted.current) {
            futureSequenceStarted.current = true;
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setActiveApp('discord');

            let isCancelled = false;
            const sequence = async () => {
                await new Promise(r => setTimeout(r, 2000));
                if (isCancelled) return;
                setIsAndreiTyping(true);
                await new Promise(r => setTimeout(r, 3000));
                if (isCancelled) return;
                setIsAndreiTyping(false);
                setFutureMessages([{ id: 101, user: 'Andrei', text: "I have something to ask you..." }]);
                await new Promise(r => setTimeout(r, 2000));
                if (isCancelled) return;
                setFutureMessages(prev => [...prev, { id: 103, user: 'Andrei', isVideo: true, videoUrl: "video/midas_clip.mp4" }]);
                setFutureMessages(prev => [...prev, { id: 104, user: 'System', text: "Spoiler: She said yes!!!" }]);

            };
            sequence();
            return () => { isCancelled = true; };
        }
    }, [currentStep, isOpen]);

    const handleSend = () => {
        if (!chatInput.trim()) return;

        const userMsg = { id: Date.now(), user: 'Midas', text: chatInput };
        setMessages(prev => [...prev, userMsg]);
        setChatInput('');

        // Smart Reply Logic: reply only once per station
        if (!hasReplied && stepData.smartReply) {
            setHasReplied(true);
            setIsAndreiTyping(true);

            setTimeout(() => {
                setIsAndreiTyping(false);
                const reply = {
                    id: Date.now() + 1,
                    user: stepData.from,
                    text: stepData.smartReply
                };
                setMessages(prev => [...prev, reply]);
            }, 1800);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-150 flex items-center justify-center sm:items-end sm:justify-end p-4 sm:p-6 md:p-10 pointer-events-none select-none touch-none">
            <div className="absolute inset-0 pointer-events-auto" onClick={onClose} />

            {/* IPHONE FRAME CONTAINER */}
            <div
                className="relative pointer-events-auto select-none outline-none scale-[0.85] min-[400px]:scale-[0.95] sm:scale-[1.1] md:scale-[1.2] lg:scale-[1.3] landscape:scale-[0.6] origin-center sm:origin-bottom-right transition-all duration-500 animate-in fade-in slide-in-from-bottom-10"
                onContextMenu={(e) => e.preventDefault()}
                style={{ WebkitUserSelect: 'none', userSelect: 'none', WebkitTouchCallout: 'none' }}
            >
                <div className="absolute -left-2 top-24 w-1.5 h-10 bg-zinc-800 rounded-l-md" />
                <div className="absolute -left-2 top-36 w-1.5 h-14 bg-zinc-800 rounded-l-md" />
                <div className="absolute -right-2 top-36 w-1.5 h-20 bg-zinc-800 rounded-r-md" />

                <div className="w-90
                 h-170.5 bg-[#0a0a0a] rounded-[3rem] p-2 shadow-2xl border border-white/10 relative">

                    <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative flex flex-col border border-white/5">

                        {/* Dynamic Island */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[35%] h-7 bg-black rounded-3xl z-70 flex items-center px-4">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-auto blur-[1px] opacity-60" />
                            <div className="w-4 h-1 bg-zinc-800 rounded-full" />
                        </div>

                        <div className={`absolute top-0 left-0 right-0 z-60 pt-8 pb-3 px-6 flex justify-between items-center transition-all ${activeApp === 'jotto' || activeApp === 'notes' ? 'bg-white/80 backdrop-blur-md' : activeApp ? 'bg-black/20 backdrop-blur-md' : ''}`}>
                            <span className={`text-[12px] font-bold ${activeApp === 'jotto' || activeApp === 'notes' ? 'text-black' : 'text-white'}`}>{new Date().getHours()}:{new Date().getMinutes()}</span>
                            <button
                                onClick={activeApp ? () => setActiveApp(null) : onClose}
                                className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center transition-all active:scale-75 z-100 ${activeApp === 'jotto' || activeApp === 'notes' ? 'bg-black/10 text-black' : 'bg-white/10 text-white'}`}
                            >
                                {activeApp ? '←' : '✕'}
                            </button>
                        </div>

                        <div className="flex-1 relative overflow-hidden flex flex-col">
                            <div className={`absolute inset-0 transition-colors duration-1000 ${activeApp === 'discord' ? 'bg-[#313338]' : activeApp === 'pastry' ? 'bg-[#fdf8f5]' : activeApp === 'jotto' || activeApp === 'notes' ? 'bg-white' : 'bg-linear-to-tr from-slate-900 to-rose-900'}`} />
                            <div className="h-16 shrink-0 relative z-10" />

                            <div className="flex-1 relative z-10 overflow-hidden flex flex-col">
                                {!activeApp && (
                                    <div className="p-8 grid grid-cols-2 gap-8 animate-in fade-in zoom-in-95 duration-500">
                                        <div onClick={() => setActiveApp('discord')} className="flex flex-col items-center gap-2 cursor-pointer active:scale-90 transition-transform">
                                            <div className="w-14 h-14 bg-[#5865F2] rounded-2xl flex items-center justify-center shadow-xl"><svg width="30" height="30" fill="white" viewBox="0 0 127.14 96.36"><path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.71,32.65-1.82,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1,105.25,105.25,0,0,0,32.19-16.14h0C130.46,50.45,121.48,26.7,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.87,53,48.74,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.11,53,91,65.69,84.69,65.69Z" /></svg></div>
                                            <span className="text-white text-[10px] font-bold">Discord</span>
                                        </div>
                                        <div onClick={() => setActiveApp('jotto')} className="flex flex-col items-center gap-2 cursor-pointer active:scale-90 transition-transform">
                                            <div className="w-14 h-14 bg-zinc-900 rounded-2xl flex items-center justify-center shadow-xl border border-white/10">
                                                <div className="grid grid-cols-2 gap-1"><div className="w-2.5 h-2.5 bg-green-500 rounded-sm" /><div className="w-2.5 h-2.5 bg-yellow-500 rounded-sm" /><div className="w-2.5 h-2.5 bg-zinc-600 rounded-sm" /><div className="w-2.5 h-2.5 bg-green-500 rounded-sm" /></div>
                                            </div>
                                            <span className="text-white text-[10px] font-bold">Jotto</span>
                                        </div>
                                        <div onClick={() => setActiveApp('notes')} className="flex flex-col items-center gap-2 cursor-pointer active:scale-90 transition-transform">
                                            <div className="w-14 h-14 bg-white rounded-2xl flex flex-col items-center justify-center shadow-xl overflow-hidden">
                                                <div className="w-full h-3 bg-[#f39c12]" />
                                                <div className="flex-1 w-full p-2 flex flex-col gap-1">
                                                    <div className="w-full h-px bg-gray-200" />
                                                    <div className="w-full h-px bg-gray-200" />
                                                    <div className="w-full h-px bg-gray-200" />
                                                    <div className="w-full h-px bg-gray-200" />
                                                </div>
                                            </div>
                                            <span className="text-white text-[10px] font-bold">Notes</span>
                                        </div>
                                        <div onClick={() => setActiveApp('pastry')} className="flex flex-col items-center gap-2 cursor-pointer active:scale-90 transition-transform group">
                                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-xl border border-slate-100 relative overflow-hidden">
                                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-pink-50 opacity-60" />

                                                <div className="relative flex items-center justify-center">
                                                    <span className="text-2xl z-10">🧁</span>
                                                </div>

                                                <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-emerald-200 rounded-full blur-xl opacity-40" />
                                            </div>
                                            <span className="text-white text-[10px] font-bold">SugarRush</span>
                                        </div>
                                    </div>
                                )}

                                {activeApp === 'discord' && (
                                    <div className="flex-1 flex flex-col h-full bg-[#313338] animate-in slide-in-from-right duration-300">
                                        <div className="p-3 border-b border-black/20 flex items-center gap-2">
                                            <div className="w-6 h-6 bg-zinc-700 rounded-full flex items-center justify-center text-[10px] text-white font-bold">#</div>
                                            <span className="text-white text-[11px] font-bold uppercase truncate tracking-tight">{stepData.server}</span>
                                        </div>
                                        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                                            {currentStep === 'STATION' ? (
                                                stepData.serversAdded?.map((s, i) => (
                                                    <div key={i} className="bg-[#2b2d31] p-3 rounded-lg  text-zinc-300">Added to: <span className="text-[#5865F2] font-bold">{s}</span></div>
                                                ))
                                            ) : (
                                                messages.map(m => (
                                                    <div key={m.id} className="flex flex-col animate-in fade-in">
                                                        <span className={`text-[10px] font-bold ${m.user === 'Midas' ? 'text-pink-400' : 'text-[#5865f2]'}`}>{m.user}</span>
                                                        <div className="bg-black/20 p-2.5 rounded-xl mt-1 text-zinc-200 text-xs border border-white/5 leading-relaxed">{m.text}</div>
                                                    </div>
                                                ))
                                            )}
                                            {futureMessages.map(m => (
                                                <div key={m.id} className="flex flex-col animate-in slide-in-from-bottom-2">
                                                    <span className="text-[10px] font-bold text-[#5865f2]">{m.user}</span>
                                                    {m.isVideo ? <DiscordVideoMessage videoUrl={m.videoUrl} /> : <div className="bg-black/20 p-2.5 rounded-xl mt-1 text-zinc-200 text-xs">{m.text}</div>}
                                                </div>
                                            ))}
                                            {isAndreiTyping && (
                                                <div className="flex items-center gap-2 px-1">
                                                    <div className="flex gap-1"><span className="w-1 h-1 bg-zinc-500 rounded-full animate-bounce" /> <span className="w-1 h-1 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.2s]" /></div>
                                                    <span className="text-zinc-500 text-[10px] italic">Typing...</span>
                                                </div>
                                            )}
                                            <div ref={messagesEndRef} />
                                        </div>
                                        {currentStep !== 'STATION' &&
                                            <div className="p-4 bg-[#313338] pb-10">
                                                <div className="bg-[#383a40] rounded-xl flex items-center px-4 py-3 gap-3">
                                                    <input
                                                        value={chatInput}
                                                        onChange={e => setChatInput(e.target.value)}
                                                        onKeyDown={e => e.key === 'Enter' && handleSend()}
                                                        placeholder="Type a message..."
                                                        className="bg-transparent outline-none text-white text-xs flex-1"
                                                    />
                                                    <button onClick={handleSend} className="text-pink-500 font-bold text-[10px] uppercase tracking-wider">Send</button>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                )}

                                {activeApp === 'jotto' && (
                                    <JottoApp/>
                                )}

                                {activeApp === 'notes' && (
                                    <NotesApp/>
                                )}
                                {activeApp === 'pastry' && (
                                    <PastryApp
                                        sugarLevel={sugarLevel}
                                        setSugarLevel={setSugarLevel}
                                        happiness={happiness}
                                        setHappiness={setHappiness}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Home Bar */}
                        <div className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 rounded-full z-80 ${activeApp === 'jotto' || activeApp === 'notes' ? 'bg-black/20' : 'bg-white/20'}`} />
                    </div>
                </div>
            </div>
        </div>
    );
}