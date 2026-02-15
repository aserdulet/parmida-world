import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from "react";

const Hub = lazy(() => import('./pages/Hub'));
const Season1 = lazy(() => import('./pages/./Season1'));
const Season2 = lazy(() => import('./pages/./Season2'));

export default function App() {
    return (
        <main className='bg-[#0f172a] h-screen w-full'>
            <Router>
                <Suspense fallback={
                    <div className="flex items-center justify-center h-screen w-full bg-black text-white font-mono">
                        Loading Parmida's World...
                    </div>
                }>
                    <Routes>
                        <Route path="/" element={<Hub />} />
                        <Route path="/s1" element={<Season1 />} />
                        <Route path="/s2" element={<Season2 />} />
                    </Routes>
                </Suspense>
            </Router>
        </main>
    );
}