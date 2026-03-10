import { useParams, useNavigate } from 'react-router-dom'
import { JitsiMeeting } from '@jitsi/react-sdk'
import { useRef, useState, useCallback } from 'react'
import './Meeting.css'

/**
 * Meeting – renders a full-screen Jitsi video conference room.
 *
 * The roomId comes from the URL parameter: /meeting/:roomId
 * We use the free public Jitsi server at meet.jit.si so no API key is needed.
 */
function Meeting() {
  // Extract the room ID from the URL, e.g. /meeting/xk9p2m  →  roomId = "xk9p2m"
  const { roomId } = useParams()

  // useNavigate lets us send the user back home after they leave the meeting
  const navigate = useNavigate()

  // We keep a reference to the Jitsi External API object so we can call
  // methods on it (e.g. listen for events) once it is ready.
  const apiRef = useRef(null)

  // Log of participant join/leave events shown below the meeting
  const [eventLog, setEventLog] = useState([])

  // Whether to show the event log panel
  const [showLog, setShowLog] = useState(false)

  /** Adds a timestamped entry to the event log */
  const addLogEntry = useCallback((message) => {
    const time = new Date().toLocaleTimeString()
    setEventLog((prev) => [`[${time}] ${message}`, ...prev])
  }, [])

  /**
   * Called by the Jitsi SDK once the iframe and External API are ready.
   * Here we attach event listeners for participant activity.
   *
   * @param {object} api – the Jitsi Meet External API instance
   */
  function handleApiReady(api) {
    apiRef.current = api

    // Fired when a new participant joins the room
    api.addEventListener('participantJoined', ({ displayName, id }) => {
      addLogEntry(`✅ ${displayName || 'A participant'} joined (${id})`)
    })

    // Fired when a participant leaves the room
    api.addEventListener('participantLeft', ({ id }) => {
      addLogEntry(`❌ Participant left (${id})`)
    })

    // Fired when the local user hangs up / leaves the meeting
    api.addEventListener('readyToClose', () => {
      addLogEntry('👋 You left the meeting.')
      // Small delay so the user sees the log entry before redirect
      setTimeout(() => navigate('/'), 1500)
    })

    addLogEntry('🚀 Meeting started – room: ' + roomId)
  }

  /**
   * Applies inline styles to the Jitsi iframe element.
   * We make it fill the entire meeting container.
   */
  function handleIframeRef(iframeRef) {
    iframeRef.style.width = '100%'
    iframeRef.style.height = '100%'
    iframeRef.style.border = 'none'
  }

  return (
    <div className="meeting-wrapper">
      {/* ── Top bar ── */}
      <header className="meeting-header">
        <div className="meeting-header-left">
          <span className="logo-icon-sm">🎥</span>
          <span className="meeting-title">MakeMeet</span>
        </div>

        <div className="meeting-header-center">
          <span className="room-badge">Room: {roomId}</span>
          <button
            className="btn-copy"
            title="Copy meeting link"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href)
            }}
          >
            📋 Copy link
          </button>
        </div>

        <div className="meeting-header-right">
          <button
            className="btn-log-toggle"
            onClick={() => setShowLog((v) => !v)}
            title="Toggle activity log"
          >
            📋 Log {showLog ? '▲' : '▼'}
          </button>
          <button
            className="btn-leave"
            onClick={() => navigate('/')}
            title="Leave meeting"
          >
            ✕ Leave
          </button>
        </div>
      </header>

      {/* ── Main area ── */}
      <div className="meeting-body">
        {/* Jitsi meeting iframe */}
        <div className="jitsi-container">
          <JitsiMeeting
            domain="meet.jit.si"
            roomName={roomId}
            configOverwrite={{
              // Start with audio muted so participants don't blast audio on join
              startWithAudioMuted: true,
              // Allow camera to be on by default
              startWithVideoMuted: false,
              // Hide the Jitsi watermark/logo
              disableDeepLinking: true,
              // Enable screen-sharing toolbar button
              disableScreensharingVirtualBackground: false,
            }}
            interfaceConfigOverwrite={{
              // Hide the Jitsi "powered by" brand watermark
              SHOW_JITSI_WATERMARK: false,
              SHOW_WATERMARK_FOR_GUESTS: false,
              SHOW_BRAND_WATERMARK: false,
              // Keep the toolbar clean
              TOOLBAR_BUTTONS: [
                'microphone',
                'camera',
                'closedcaptions',
                'desktop',
                'fullscreen',
                'fodeviceselection',
                'hangup',
                'profile',
                'chat',
                'recording',
                'livestreaming',
                'etherpad',
                'sharedvideo',
                'settings',
                'raisehand',
                'videoquality',
                'filmstrip',
                'invite',
                'feedback',
                'stats',
                'shortcuts',
                'tileview',
                'videobackgroundblur',
                'download',
                'help',
                'mute-everyone',
                'security',
              ],
            }}
            userInfo={{
              displayName: 'Guest',
            }}
            onApiReady={handleApiReady}
            getIFrameRef={handleIframeRef}
          />
        </div>

        {/* ── Activity log panel (slides in from the right) ── */}
        {showLog && (
          <aside className="event-log">
            <h3 className="event-log-title">Activity Log</h3>
            {eventLog.length === 0 ? (
              <p className="event-log-empty">No events yet…</p>
            ) : (
              <ul className="event-log-list">
                {eventLog.map((entry, i) => (
                  <li key={i} className="event-log-item">{entry}</li>
                ))}
              </ul>
            )}
          </aside>
        )}
      </div>
    </div>
  )
}

export default Meeting
