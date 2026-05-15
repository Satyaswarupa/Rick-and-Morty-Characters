# Rick & Morty Explorer — Next Level

A stunning, next-level Rick and Morty character explorer built with React, Tailwind CSS, and Framer Motion.

## Features

- **Next-Level UI/UX** — Dark theme with glass morphism, gradient accents, smooth animations
- **Real API Integration** — Fetches live data from [Rick and Morty API](https://rickandmortyapi.com)
- **Search & Filters** — Search by name, filter by status, gender, and species
- **Character Cards** — Beautiful cards with hover effects, status badges, episode counts
- **Character Detail Modal** — Full character info with share-to-WhatsApp button
- **Pagination** — Navigate through all 800+ characters
- **Animated Loading Screen** — Preloader with spinning rings
- **WhatsApp Integration** — Share characters directly to WhatsApp (+91 7008671443)
- **Responsive Design** — Works on mobile, tablet, and desktop
- **Scroll Progress** — Visual scroll indicator
- **Framer Motion Animations** — Smooth entrance and hover animations

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- Framer Motion
- Axios
- Lucide React Icons
- Rick and Morty API

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## WhatsApp Integration

Your WhatsApp number **+91 7008671443** is integrated in:
1. **Hero Section** — "Chat on WhatsApp" button
2. **Navbar** — WhatsApp icon in header
3. **Character Detail** — "Share on WhatsApp" button in modal
4. **Footer** — WhatsApp link

## Project Structure

```
src/
├── components/
│   ├── LoadingScreen.jsx
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── StatsBar.jsx
│   ├── SearchFilter.jsx
│   ├── CharacterGrid.jsx
│   ├── CharacterCard.jsx
│   ├── CharacterDetail.jsx
│   └── Footer.jsx
├── hooks/
│   └── useCharacters.js
├── services/
│   └── api.js
├── App.jsx
├── main.jsx
└── index.css
```

## Deployment

```bash
npm run build
# Deploy the /dist folder to Netlify, Vercel, or GitHub Pages
```

---
Built with ❤️ by Satyaswarupa