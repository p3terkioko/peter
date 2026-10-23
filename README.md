# peter

Personal portfolio of Peter Kioko, full-stack software engineer in Nairobi. Live at [peter-seven.vercel.app](https://peter-seven.vercel.app).

## Stack

Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Lenis smooth scrolling, and React Three Fiber for the 3D kitchen and the Claude Desktop Buddy model. Deployed on Vercel, with Umami for analytics.

## Running locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

## Environment variables

The "now playing" widget reads from Spotify through `src/app/api/spotify/route.ts`. Put these in `.env` (never commit it):

```
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=
```

To get a refresh token, add `http://127.0.0.1:8888/callback` as a redirect URI on your Spotify app, then run `node scripts/get-spotify-token.mjs` from the repo root and follow the link it prints. The script writes the token into `.env`.

## Layout

- `src/app`: routes (home, `/kitchen`, `/projects/buddy`, `/uses`, and themed error pages)
- `src/components`: page sections and shared UI
- `src/lib`: Spotify client and recipe data
- `public/models`: optimized 3D models (`scene-opt.glb`, `ttgo-t-display.obj`)

The CV linked from the contact section is served from `public/Peter_Kioko_CV.pdf`.
