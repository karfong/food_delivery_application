# OmniTools Suite (Food/Ride Hailing Map & Image Compressor)

A full-stack monorepo built with the MERN stack (focusing on Node/Express for the backend and React/Vite for the frontend). This project contains a suite of modular tools including a Location Pinning Map tool (ideal for e-hailing and food delivery) and a Server-side Image Compressor.

## Tech Stack
- **Frontend**: React (Vite), TypeScript, Tailwind CSS v4, React Router DOM, Lucide React, React Leaflet (OpenStreetMap)
- **Backend**: Node.js, Express, Sharp (Image processing), Multer (File uploads), CORS

## Project Structure
```text
/
├── client/          # Vite React + Tailwind CSS V4 App
│   ├── src/
│   │   ├── components/  # Reusable UI (Navbar, Footer, Layout)
│   │   ├── pages/       # Home, MapTool, CompressTool
│   │   └── ...
├── server/          # Node.js + Express Backend
│   ├── routes/      # Image compression route
│   ├── index.js     # Entry point
│   └── ...
└── README.md
```

## Features
1. **Home Landing Page**: Clean, professional layout with Hero, Steps, Tool Cards, CTA, and FAQ sections.
2. **Location Map Tool**: Interactive map using OpenStreetMap to pin coordinates, perfect for food delivery apps. No database required.
3. **Image Compressor Tool**: Upload an image to the Express backend where `sharp` processes it (format conversion, quality adjustment) and returns the compressed file for download.

## Getting Started

### 1. Backend Setup
1. Open a terminal and navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Express server (runs on `http://localhost:5000`):
   ```bash
   node index.js
   ```
   (Runs on `http://localhost:5001`)
1. Open a new terminal and navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open the provided Local URL (e.g., `http://localhost:5173`) in your browser.

## Notes
- Ensure the backend is running before testing the Image Compressor tool, as it relies on `http://localhost:5001/api/compress`.
- No database or authentication setup is required as per the specifications. All tools operate in-memory/client-side.
