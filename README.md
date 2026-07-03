# Null Threat — Marketing Landing Page

**Live site:** [https://null-threat.vercel.app/](https://null-threat.vercel.app/)  
**Repository:** [github.com/givecursorfree-oss/Null-Threat](https://github.com/givecursorfree-oss/Null-Threat)

React + Vite landing page for **Null Threat** — a free, open-source offline malware scanner for Windows, macOS, and Linux.

## Stack

- **React 18** + **TypeScript**
- **Vite 5**
- **Tailwind CSS 3**
- **Lucide React** icons
- **UnicornStudio** particle background (CDN)

## Quick Start

```bash
cd "Cyber HERO"
npm install
npm run dev
```

Opens at [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm run preview
```

Production output: `dist/`

## Project Structure

```
Cyber HERO/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── variables.css          # Design system CSS custom properties
├── theme.css              # Tailwind @theme tokens
├── tokens.json            # Design tokens (JSON)
├── DESIGN (1).md          # Style reference
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    └── components/
        ├── AuraBackground.tsx   # UnicornStudio particles
        ├── Nav.tsx
        ├── Hero.tsx
        ├── ThreatMap.tsx        # Radar + SVG attack paths
        ├── TrustBar.tsx
        ├── ValueProp.tsx
        ├── ProblemSolution.tsx
        ├── EngineStepper.tsx
        ├── FeaturesGrid.tsx
        ├── RiskScore.tsx
        ├── OpenSource.tsx
        ├── DownloadCTA.tsx
        ├── Footer.tsx
        └── Logo.tsx
```

## Design Specs

- Page background: `#030304`
- Content container: `max-w-7xl mx-auto px-6`
- Font: Inter (300, 400, 500, 600)
- Hero headline pattern: bold white + semi-transparent gray second clause
- Logo: `w-5 h-5` gradient square + "NULL THREAT" wordmark

## Design System

Tokens are sourced from the Cyber HERO design files:

| File | Role |
|------|------|
| `variables.css` | CSS custom properties (colors, type, spacing, radii, shadows) |
| `theme.css` | Tailwind v4 `@theme` reference |
| `tokens.json` | Design tokens (JSON) |
| `DESIGN (1).md` | Style reference & component patterns |

### Background

`src/components/RedOverlayUnicornStudioBackground.tsx` — native React port of `red-overlay-unicornstudio-background.tsx`:

- UnicornStudio project `tPmIIl0vKqHO9yqmtge2`
- Ember threat overlay (`mix-blend-mode: color`) using `--color-ember`
- Vignette + top fade mask

### Premium UI

- Entry preloader with progress bar
- CSS/IntersectionObserver section reveal motion
- Scroll-aware nav (hides on scroll down)
- SVG film-grain noise overlay
- `prefers-reduced-motion` respected

## Related

- App source: `../CyberSecur Opensource/shieldscan/`
- Brand docs: `../CyberSecur Opensource/shieldscan/docs/brand/`
- Static HTML version: `../CyberSecur Opensource/shieldscan/website/index.html`
