import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

/**
 * Generates a random alphanumeric meeting ID (e.g. "xk9p2m").
 * This becomes the Jitsi room name, making every meeting unique.
 */
function generateRoomId() {
  return Math.random().toString(36).substring(2, 8)
}

/**
 * Home – the landing page of MakeMeet.
 *
 * Users can:
 *  1. Click "New Meeting" to auto-generate a room ID and navigate to it.
 *  2. Type an existing meeting ID and click "Join" to enter that room.
 */
function Home() {
  // Tracks what the user types in the "join meeting" input field
  const [joinInput, setJoinInput] = useState('')

  // useNavigate lets us programmatically change the URL
  const navigate = useNavigate()

  /** Creates a brand-new meeting room with a random ID */
  function handleNewMeeting() {
    const roomId = generateRoomId()
    navigate(`/meeting/${roomId}`)
  }

  /** Joins an existing room using the ID the user typed */
  function handleJoin(e) {
    e.preventDefault()
    const trimmed = joinInput.trim()
    if (!trimmed) return
    navigate(`/meeting/${trimmed}`)
  }

  return (
    <div className="home-wrapper">
      <div className="home-card">
        {/* ── Logo / Branding ── */}
        <div className="home-logo">
          <span className="logo-icon">🎥</span>
          <h1 className="logo-text">MakeMeet</h1>
        </div>

        <p className="home-tagline">
          Free, fast video meetings for everyone.
        </p>

        {/* ── Create new meeting ── */}
        <button className="btn btn-primary" onClick={handleNewMeeting}>
          + New Meeting
        </button>

        <div className="divider">
          <span>or join an existing meeting</span>
        </div>

        {/* ── Join existing meeting ── */}
        <form className="join-form" onSubmit={handleJoin}>
          <input
            type="text"
            className="join-input"
            placeholder="Enter meeting ID (e.g. xk9p2m)"
            value={joinInput}
            onChange={(e) => setJoinInput(e.target.value)}
            aria-label="Meeting ID"
          />
          <button
            type="submit"
            className="btn btn-secondary"
            disabled={!joinInput.trim()}
          >
            Join
          </button>
        </form>

        <p className="home-hint">
          Meeting IDs are case-sensitive. Share the full URL or just the ID.
        </p>
      </div>
    </div>
  )
}

export default Home
