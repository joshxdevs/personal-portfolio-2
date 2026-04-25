/* ============================================================
   DATA — Projects
   ============================================================
   To add or update a project, edit this array.

   Fields:
     id          → used as the HTML element id (no spaces)
     num         → display number, e.g. '01'
     year        → string, e.g. '2026'
     title       → project title
     description → 1–2 sentence description
     tags        → short category chips  (max ~3)
     stack       → tech used (shown as mono pills)
     github      → full URL or null to hide
     live        → full URL or null to hide
     screenshot  → path from root e.g. 'assets/projects/carebridge.webp'
                   set null while you don't have one yet
   ============================================================ */

window.PROJECTS = [
  {
    id: 'carebridge',
    num: '01',
    year: '2026',
    title: 'CareBridge',
    description: 'A real-time healthcare concierge platform connecting patients with medical professionals across India. Features live emergency dispatch, OTP authentication via Better Auth, and intelligent triage — built on a WebSocket microservice architecture with sub-100ms latency.',
    tags: ['Healthcare', 'Real-time', 'Full-stack'],
    stack: ['Next.js', 'Node.js', 'WebSockets', 'PostgreSQL', 'Prisma', 'Better Auth'],
    github: null,           /* e.g. 'https://github.com/jpag/carebridge' */
    live: null,           /* e.g. 'https://carebridge.app' */
    screenshot: 'carebridge.png',           /* e.g. 'assets/projects/carebridge.webp' */
  },
  {
    id: 'playlist-tracker',
    num: '02',
    year: '2025',
    title: 'Playlist Tracker',
    description: 'A full-stack learning tracker for YouTube playlists. Features persistent watch-state, smart completion dashboards, role-based access control, and JWT authentication — synced to Neon PostgreSQL. Designed with skeleton loaders and a premium minimalist UI.',
    tags: ['Productivity', 'Full-stack'],
    stack: ['React', 'Vite', 'Node.js', 'PostgreSQL', 'Neon', 'JWT'],
    github: null,
    live: null,
    screenshot: null,
  },
  {
    id: 'portfolio',
    num: '03',
    year: '2025',
    title: 'This site.',
    description: 'A Vercel-inspired, typography-first portfolio. Zero frameworks — hand-crafted vanilla HTML, CSS, and JavaScript. Every animation curve, spacing value, and line-height deliberate. Built to obsess over what everyone else considers a footnote.',
    tags: ['Design', 'Portfolio'],
    stack: ['HTML', 'CSS', 'JavaScript'],
    github: null,
    live: null,
    screenshot: null,
  },
];
