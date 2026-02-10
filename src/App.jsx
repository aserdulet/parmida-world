import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/index'

export default function App() {
  return (
    <main className='bg-slate-300/20 h-full'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </main>
  )
}