export const NotesApp = () => {
    return (
        <div className="flex-1 flex flex-col h-full bg-white animate-in slide-in-from-right duration-300">
            <div className="p-6 pt-12 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-black text-[#f39c12]">Notes</h1>
                </div>
                <div className="mt-4 bg-[#fff9db] p-6 rounded-2xl shadow-sm border border-yellow-100 min-h-50 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#f39c12] rounded-full" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Personal Reminder</span>
                    </div>
                    <p className="text-xl font-medium text-gray-800 leading-tight">
                        Reminder: <span className="font-black border-b-2 border-[#f39c12]">Study</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-auto italic">Everything has a solution - don't forget it!</p>
                </div>

                <div className="mt-4 bg-[#fff9db] p-6 rounded-2xl shadow-sm border border-yellow-100 min-h-50 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#f39c12] rounded-full" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Future Self Parmida</span>
                    </div>
                    <p className="text-xl font-medium text-gray-800 leading-tight">
                        Parmida from the past was 10 hrs at work and still managed to do groceries and cook dinner. <span className="font-black border-b-2 border-[#f39c12]">Remember that you are a super hero</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-auto italic">#legend</p>
                </div>
            </div>
        </div>

    )
}