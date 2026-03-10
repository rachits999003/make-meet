# MakeMeet – Google-Meet-like Video Conferencing App

A simple, clean video conferencing web app built with **React + Vite** and powered by **Jitsi Meet** (free public server – no API key required).

## Features

- 🎥 **Create a new meeting** with one click – generates a unique random room ID
- 🔗 **Join an existing meeting** by entering a meeting ID
- 📋 **Shareable meeting links** – share the full URL or just the room ID
- 🔇 **Audio muted by default** on join
- 🖥 **Screen sharing**, camera controls, and chat built in (via Jitsi toolbar)
- 📋 **Activity log** – participant join/leave events logged in real time
- 👋 **Auto-redirect** to home after leaving a meeting
- 🌙 Clean **dark-mode UI**

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 + Vite |
| Video engine | Jitsi Meet (meet.jit.si) |
| Jitsi SDK | @jitsi/react-sdk |
| Routing | React Router v6 |
| Styling | Plain CSS (dark theme) |

## Project Structure

```
make-meet/
├── index.html              # App entry HTML
├── vite.config.js          # Vite configuration
├── package.json
├── eslint.config.js
└── src/
    ├── main.jsx            # React root mount
    ├── App.jsx             # Routes setup
    ├── index.css           # Global styles & shared buttons
    └── pages/
        ├── Home.jsx        # Landing page (create / join)
        ├── Home.css
        ├── Meeting.jsx     # Full-screen Jitsi meeting page
        └── Meeting.css
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production

```bash
npm run build
```

### 4. Preview the production build locally

```bash
npm run preview
```

## How It Works

### URL Structure

| URL | Description |
|---|---|
| `/` | Home page – create or join a meeting |
| `/meeting/:roomId` | Meeting page – embedded Jitsi room |

### Creating a Meeting

Click **+ New Meeting** on the home page. The app generates a random 6-character room ID (e.g. `xk9p2m`) and navigates to `/meeting/xk9p2m`. Share the full URL with others to invite them.

### Joining a Meeting

Enter the meeting ID in the **"Join an existing meeting"** field and click **Join**, or navigate directly to the meeting URL.

### Activity Log

Click the **📋 Log** button in the meeting header to toggle a live sidebar showing participant join/leave events.

## Deployment to Vercel

1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repo.
3. Vercel auto-detects Vite – click **Deploy**.
4. Add a `vercel.json` for client-side routing rewrites:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

That's it – your app is live! 🎉

## Environment Notes

- Uses the **free public** `meet.jit.si` server – no account or API key needed.
- For production use with custom domains or advanced features, consider [Jitsi as a Service (JaaS)](https://jaas.8x8.vc/).

## Customization

Edit `src/pages/Meeting.jsx` to tweak the Jitsi config:

```jsx
configOverwrite={{
  startWithAudioMuted: true,   // mute mic on join
  startWithVideoMuted: false,  // camera on by default
}}

interfaceConfigOverwrite={{
  SHOW_JITSI_WATERMARK: false, // hide Jitsi logo
  TOOLBAR_BUTTONS: [ /* add/remove buttons */ ],
}}
```