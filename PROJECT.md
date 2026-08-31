# Stremfigement

**Stack:** Single static HTML file — React + Babel + Tailwind loaded via CDN, no build step
**Live:** http://slash301.cloud/ (served from repo root)
**Local:** open `index.html` directly, or `python -m http.server 5200` in this folder → http://localhost:5200/
**Editing:** open `index.html`, edit the JSX inside the `<script type="text/babel">` block, save, refresh browser. No npm install, no build/export step.

## What it is
Stremio addon configurator for Real-Debrid (and other debrid) users, built on AIOStreams. Configure API keys, pick/remove addons, set stream filters (quality, language, seeders, size limits), drag-to-reorder sort criteria, pick a display formatter, set playback options, then get an install manifest URL and a `stremio://` deep link to install directly into Stremio. Comparable in spirit to bootstrapper.stremaddon.net and duck-tools.pages.dev/quackstart.

Manifest URLs point at the public AIOStreams instance defined in `AIOSTREAMS_BASE_URL` near the top of the script (currently `https://aiostreams.elfhosted.com`). Change that one constant to point at a self-hosted AIOStreams instance instead.

## Structure
- `index.html` — the entire app (HTML shell + inline JSX component + Tailwind via CDN). This is both the source and the deployed artifact — there is no separate build output.
- `StremioConfigurator.tsx` — historical source file from an earlier Next.js version of this project. No longer used to build anything; kept for reference only. The logic in `index.html` is the current, maintained version.
- `CNAME` — GitHub Pages custom domain config (slash301.cloud).

## History
Originally built as a Next.js static export (compiled `_next/` chunks). That added build-step complexity this project never needed (no routing, no SSR, no server data — config lives entirely client-side, encoded into the install URL), and its `_next/` chunks had drifted out of sync with `StremioConfigurator.tsx`, plus the export had hardcoded a `basePath: '/Stremfigement'` from an earlier subpath deployment, which broke all asset loading (CSS included) once served from a domain root. Rebuilt as a single dependency-free HTML file to remove all of that: no build tool to keep in sync, no basePath to get wrong, works root-relative on any host automatically.

## State
Functionally complete for its purpose. Config JSON generation, manifest URL, and stremio:// deep link all verified working. Fully polished UI (dark theme, glass cards, indigo/purple palette).

## What needs work / next directions
- Could add more debrid service options (Torbox, AllDebrid) as explicit fields in `services`
- Preset configs ("power user", "minimal") would speed up setup, similar to bootstrapper's presets
- Real-Debrid key validation (currently just stored, never checked against the Real-Debrid API)
- Consider adding Stremio account sign-in/AuthKey support if account-level sync (not just a manifest link) becomes a goal
