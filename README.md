# RIHANA DREAMS CARS

A cinematic, one-page Next.js 14 site for a luxury Moroccan desert car rental brand.

## Stack
- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion (text reveals, hover distortion, modal transitions)
- Lenis (buttery smooth scroll)
- lucide-react (icons)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build for production

```bash
npm run build
npm start
```

## Deploy to Vercel

Push this folder to a GitHub repo and import it in Vercel — zero config needed.
Or run `vercel` from the project root with the Vercel CLI.

## Header navigation

`components/Header.js` renders the primary nav (Fleet · Experience · Pourquoi nous · Contact)
and the "Book your ride" CTA, used by both the desktop bar and the mobile menu.

- Add/rename a link: edit the `navLinks` array in `lib/data.js`; labels live in
  `lib/i18n.js` (`navFleet`, `navExperience`, `navWhy`, `navContact`, `navBook`).
- Car categories (Family / Belbala / Atlas) belong only inside `/fleet` as filters —
  never in the header.
- "Pourquoi nous" is the single article `/blog/pourquoi-choisir-rihana-car` (content in `lib/blogData.js`). `/blog`, `/why-rihana` and the three removed articles redirect to it (see `next.config.js`).

## Editing content

- **All copy, car specs & categories:** `lib/data.js` — one file, no need to touch components.
- **FR / EN / AR translations:** `lib/i18n.js` (French is the default; Arabic switches the page to RTL with the Cairo font; the choice is saved in `localStorage`). Blog article bodies are French only.
- **WhatsApp & phone numbers:** bottom of `lib/data.js` (`whatsappNumber`, `phoneNumberIntl`). Contact channels are WhatsApp, phone and the Marrakech location only.
- **Logo:** `public/logo.png` (used in Header and Footer). **Images:** `public/images/cars/`, `public/images/covers/`.
- **Hero video:** `public/videos/hero.mp4` (already compressed to ~2MB for fast load).

## Notes

- The hero video was compressed from the original 4K/44Mbps source to a
  1080×1920 H.264 file (~2MB) for fast first paint — swap it in
  `public/videos/hero.mp4` if you get a higher-quality/landscape cut.
- Car photography was extracted from the supplied spec-sheet PDFs. Swap in
  studio cutouts (transparent background) in `public/images/cars/` any time
  for an even cleaner "no background" fleet look — the CarCard component
  already treats the image as `object-cover` inside a bordered frame, so
  transparent PNGs will drop straight in.
- Contact numbers live in `lib/data.js`: main WhatsApp/phone `212640001846` (header, contact page,
  car pages, floating button) and a secondary `212784270768` shown in the footer only.
- Cars have no prices: every car shows "Sur Demande" / "Price on Request" / "الثمن عند الطلب"
  and a "Demander le prix sur WhatsApp" button on its page.
