# Stremfigement

**Stack:** Next.js (static export), Tailwind CSS  
**Live:** https://projects.slash301.com/Stremfigement/  
**Local:** `npx serve -l 5200` in `projects-slash301-com/` → http://localhost:5200/Stremfigement/  
**No local dev server** — deployed as a static Next.js build (_next/ chunks present)

## What it is
Stremio addon configurator for Real-Debrid users. Simplifies the AIOStreams addon setup — connects Stremio auth, Real-Debrid API key, configures plugins (Comet, Zilean, Knaben, Sootio, etc.), sets language/quality preferences, then generates an install URL. Drag-to-reorder plugins. JSON config sidebar.

## Structure
Deployed as a pre-built static Next.js export:
- `index.html` — shell loading Next.js chunks
- `_next/static/` — compiled JS/CSS chunks
- `StremioConfigurator.tsx` — source component (kept alongside build)
- `404.html` / `404/`

## State
Functionally complete for its purpose. Fully polished UI (glass cards, glow effects, indigo palette). AIOStreams-powered. No source build files present — edits require rebuilding or editing `StremioConfigurator.tsx` and re-exporting.

## What needs work / next directions
- Source files not version-controlled alongside the build — risky if _next chunks get out of sync
- Could add more debrid service options (Torbox, AllDebrid)
- Preset configs ("power user", "minimal") would speed up setup
- Deep link install directly into Stremio app
