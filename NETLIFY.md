# Deploying to Netlify

This is a Next.js 14 (App Router) project — a raw source ZIP can't be
dragged onto Netlify's "deploy manually" drop zone (that only accepts a
pre-built static folder). Pick one of these instead:

## Option A — Netlify CLI (fastest, no GitHub needed)
```bash
npm install
npm install -g netlify-cli
netlify deploy --build
```
Follow the prompts (create/link a site), then `netlify deploy --build --prod`
when you're happy with the preview. Netlify auto-detects Next.js and
handles the build for you.

## Option B — Connect a Git repo (recommended for ongoing work)
1. Push this folder to a new GitHub repo.
2. On netlify.com → "Add new site" → "Import an existing project" → pick
   the repo. Netlify detects Next.js automatically (build command
   `next build`, no extra config needed).
3. Every push updates the live preview automatically.

## Option C — Local build + drag-and-drop (static-only, quickest look)
Only use this if you just want a quick visual check and don't need
next/image optimization or the booking form's dynamic behavior to be
perfect:
```bash
npm install
npm run build
```
Then drag the resulting `.next` folder is **not** draggable directly —
for a true static drop, ask to add `output: 'export'` to
`next.config.js` first (this disables a few Next.js features like image
optimization, but produces a plain `out/` folder you can drag straight
onto Netlify).
