# Supriya & Satwick — Wedding Invitation Web App

A production-ready clone of the interactive royal Indian wedding invitation website ([su-and-sa.vercel.app](https://su-and-sa.vercel.app)), built with **React**, **Vite**, **TypeScript**, **Tailwind CSS v4**, and **Motion**.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
Ensure you have **Node.js 18+** installed:
```bash
node -v
npm -v
```

### 2. Install Dependencies
Run:
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or the port Vite prints in your terminal).

### 4. Build for Production
To build the optimized static production bundle:
```bash
npm run build
```
The output files will be created in the `dist/` directory, ready to deploy to any static hosting service (Vercel, Netlify, Cloudflare Pages, GitHub Pages, Firebase Hosting, AWS S3, etc.).

To preview the production build locally:
```bash
npm run preview
```

---

## 📂 Project Structure

```text
├── index.html                   # HTML entry point with Google Fonts preconnected
├── package.json                 # Project dependencies & scripts
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite bundler configuration with Tailwind CSS plugin
├── public/                      # Static assets served as-is
│   ├── favicon.ico              # Site favicon
│   ├── wedding-invitation-source.zip # Complete project source archive
│   └── images/
│       ├── logo/                # Gold & wine monograms and heart logo
│       ├── einvitation/         # Background courtyards & floral artwork
│       │   └── flora/           # Swaying botanical watercolor sprites
│       └── thingstodo/          # Exploration guide metadata
└── src/
    ├── main.tsx                 # React DOM root entry
    ├── App.tsx                  # Main app controller (URL routing, phases, modal states)
    ├── index.css                # Global CSS variables, keyframe animations, typography
    ├── lib/
    │   └── inviteCodec.ts       # Base64 + checksum URL encoder/decoder for `?d=...`
    ├── data/
    │   ├── i18n.ts              # Full English & Telugu translation dictionaries
    │   ├── transitData.ts       # Airport, train, road directions & city route suggester
    │   ├── explorationData.ts   # Papikondalu, Maredumilli, Lambasingi & street food
    │   └── silksData.ts         # Dress code palette: Sage, Wine, Gold, Cream, Dusk Rose
    └── components/
        ├── common/
        ├── generator/
        │   └── InviteGeneratorModal.tsx # Custom guest invite link generator tool
        └── invitation/
            ├── DoorScene.tsx    # Palace courtyard entrance with illuminated lanterns
            ├── InvitationCard.tsx # Main royal wedding card with double gold frames
            ├── FloraDecorations.tsx # Swaying watercolor florals
            ├── Monogram.tsx     # Animated monogram emblem
            ├── TimelineItinerary.tsx # Schedule: Gathering, Word, Promise, Feast, Celebration
            ├── SilksPalette.tsx # What to Wear canvas with swaying draped silks
            ├── TravelAndExplore.tsx # Transit guide + Things to do
            └── RsvpModal.tsx    # Multi-step RSVP form with guest & meal preferences
```

---

## 🎨 URL Customization & Codec
The application accepts a personalized query parameter `?d=...` containing a 2-character checksum and base64 payload.

**Default link included in brief:**
```text
/invitation?d=1ISeyJ2IjoxLCJuIjoiU2FpIEt1bWFyIiwiciI6MywiY2VsIjoxLCJyc3ZwIjoxfQ
```
- Invitee: **Sai Kumar** (`n: "Sai Kumar"`)
- Relationship: **Friend** (`r: 3`)
- Celebration: **Yes** (`cel: 1`)
- RSVP: **Enabled** (`rsvp: 1`)

Use the **"Create Invite"** button in the app header to generate custom links for any guest!

---

## 🌐 Deploy to Vercel
1. Push this repository to GitHub or GitLab.
2. Import the repository in [Vercel](https://vercel.com).
3. Framework Preset: **Vite**.
4. Click **Deploy**.
