import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Meeting from './pages/Meeting'

/**
 * App component sets up client-side routing.
 *
 * Routes:
 *   /             → Home page  (create or join a meeting)
 *   /meeting/:roomId → Meeting page (embedded Jitsi room)
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meeting/:roomId" element={<Meeting />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
