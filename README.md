# Nischay & Yashaswini — Wedding Invitation Web App

Interactive royal Indian wedding invitation website for the auspicious wedding of **Nischay & Yashaswini** at Savithramma Kariyappa Gowda Kalyana Mantapa, Channarayapatna, Karnataka. Built with **React**, **Vite**, **TypeScript**, **Tailwind CSS v4**, and **Motion**.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
Ensure you have **Node.js 24+** installed:
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
The output files will be created in the `dist/` directory, ready to deploy to GitHub Pages, Vercel, Netlify, or any static hosting service.

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
│   └── images/
│       ├── logo/                # Authentic NY monogram logo assets
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
    │   ├── i18n.ts              # Full English & Kannada translation dictionaries
    │   ├── transitData.ts       # Airport, train, road directions & routes to Channarayapatna
    │   ├── explorationData.ts   # Shravanabelagola, Shettihalli, Belur, Halebidu attractions
    │   └── silksData.ts         # Dress code palette: Sage, Wine, Gold, Cream, Dusk Rose
    └── components/
        ├── common/
        ├── generator/
        │   └── InviteGeneratorModal.tsx # Custom guest invite link generator tool
        └── invitation/
            ├── DoorScene.tsx    # Palace courtyard entrance with illuminated lanterns & wax seal
            ├── InvitationCard.tsx # Main royal wedding card with double gold frames
            ├── ScratchDateCard.tsx # Interactive scratch-to-reveal golden card & countdown
            ├── FloraDecorations.tsx # Swaying watercolor florals
            ├── Monogram.tsx     # Authentic NY monogram emblem
            ├── TimelineItinerary.tsx # Schedule: Grand Reception & Shubha Muhurtha
            ├── SilksPalette.tsx # What to Wear canvas with swaying draped silks
            ├── TravelAndExplore.tsx # Transit guide + Things to do in Channarayapatna & Hassan
            └── RsvpModal.tsx    # Multi-step RSVP form with guest & blessing notes
```

---

## 🎨 URL Customization & Codec
The application accepts a personalized query parameter `?d=...` containing a 2-character checksum and base64 payload.

Use the **"Create Invite"** button in the app header to generate custom personalized links for any guest!
