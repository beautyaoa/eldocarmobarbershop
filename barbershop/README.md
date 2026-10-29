# Eldo Carmo Barber Shop — eldocarmobarbershop.com

### 2026-09-30 — Desktop Discovery nav (music apps on hover)
- Added **Discovery** item to desktop nav on ECB + ECG
- On hover / focus: dropdown with YouTube, Spotify, Apple Music, Deezer, YouTube Music (same links as mobile drawer)
- Files changed:
  - `barbershop/index.html`
  - `barbershop/minibar.html`
  - `barbershop/css/style.css`
  - `glamorize/index.html`
  - `glamorize/css/style.css`


Static single-page (plus Mini-Bar page) for Eldo Carmo Barber Shop, Luanda / Lubango.  
No build step — pure HTML / CSS / JS for Cloudflare Pages.

---

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Main site: hero, services, experience, Mini-Bar teaser, gallery, Lubango CTA, booking |
| `minibar.html` | **Eldo Carmo Mini-Bar** — full product catalog (snacks, cocktails & beverages) |
| `checkout.html` | **Checkout** — order summary → Worker (or WhatsApp fallback) |
| `admin.html` | **Admin** — products, zones, media, orders |

---

## Key features

- **Hero** — static image (`hero.webp`) with overlay and CTAs
- **Experience** — “A Experiência Eldo Carmo” with Ambiente video (`exp-ambiente.mp4`); more clips can be added later
- **Client-side cart** (`localStorage`) shared across `index.html`, `minibar.html`, `checkout.html`
  - Quantity **+ / −**
  - **Limpar carrinho**
  - **Finalizar pedido** → `checkout.html` → Worker / WhatsApp fallback
- **Checkout** — product images, qty controls, name / phone / pickup / notes
- **Mini-Bar** — separate page; home shows one clickable lifestyle card (Scookiie)
- **Booking form** → WhatsApp
- **Lubango recruitment** CTA → +244 924 071 971
- Full product images (`object-fit: contain`, no crop)
- **Admin** — products, zones, media, orders (dedicated KV namespace)

---

## Structure

```
barbershop/
├── index.html
├── minibar.html
├── checkout.html
├── admin.html
├── css/style.css
├── css/admin.css
├── js/main.js          # hamburger, cart, checkout, forms, experience video
├── js/admin.js
├── js/products.js
├── assets/
│   ├── icons/          # music platforms (YouTube, Spotify, Apple, Deezer, YT Music)
│   ├── images/         # logo, hero still, gallery-01…07, services, lubango, minibar
│   ├── products/       # Scookiie ×3, Água Pura, Coca-Cola, Cuca
│   └── videos/         # exp-ambiente.mp4 + posters
├── worker/
│   ├── src/index.js
│   └── wrangler.toml
├── ADMIN_GUIDE.md
├── BLUEPRINT.md
└── README.md
```

---

## Deploy

Push this folder to its own GitHub repo → Cloudflare Pages  
**Framework:** None · **Output directory:** `/`

---

## Changelog (important)

### 2026-10-05 — Checkout page
- New `checkout.html` — order summary with product images + qty controls
- Customer form: name, phone, pickup/delivery, notes
- Cart drawer CTA **Finalizar pedido** → `checkout.html` (was direct WhatsApp)
- Submit opens WhatsApp with full order + customer data pre-filled
- Files: `checkout.html`, `css/style.css`, `js/main.js`, `index.html`, `minibar.html`

### 2026-10-05 — Checkout page
- New `checkout.html` — order summary with product images + qty controls
- Customer form: name, phone, pickup/delivery, notes
- Cart drawer CTA **Finalizar pedido** → `checkout.html` (was direct WhatsApp)
- Submit opens WhatsApp with full order + customer data pre-filled
- Files: `checkout.html`, `css/style.css`, `js/main.js`, `index.html`, `minibar.html`

### 2026-10-05 — Design refresh
- Typography: Cormorant Garamond (display) + Inter (body) via Google Fonts
- Header: compact on scroll + Agendar CTA; mobile drawer sticky Agendar
- Hero: eyebrow, stronger overlay, scroll indicator (static image)
- Manifesto quote section + trust strip before booking
- Services: display titles, gold price pills, stronger hover lift
- Experience: larger play control + progress dots
- Product cards & cart empty state improved
- Section spacing / hierarchy tightened; prefers-reduced-motion respected
- Files: `index.html`, `minibar.html`, `checkout.html`, `css/style.css`, `js/main.js`

### 2026-10-29 — Hero & experience videos cleanup
- Hero is static image only (`hero.webp`) — video files not yet available
- Experience section keeps only **Ambiente** (`exp-ambiente.mp4`)
- Removed references to missing videos (hero.mp4, exp-reabertura, exp-corte, exp-transformacao, exp-detalhe, exp-luxo, exp-barba)
- Files: `index.html`, `js/main.js`

### 2026-10-05 — Asset cleanup
- Removed unused images not referenced in HTML/CSS/JS:
  - cuts-*.webp (5), exterior-*.webp (2), interior-*.webp (5), owner-suit.webp
  - chocolate-closeup / chocolate-display / chocolate-ginguba.webp
- Gallery remains `gallery-01` … `gallery-07` only
- Products remain Scookiie ×3 + Água + Coca-Cola + Cuca

### 2026-09-29 — Hero media
- Added `hero.webp` (Johnny + mural) as opening still
- Dark gradient overlay for text legibility

### 2026-09-29 — Mini-Bar page
- New `minibar.html` — full product grid + cart
- Home: section header (No espaço / Mini-Bar / intro) + image card with transparent **Compre agora** button at bottom of image only
- Nav link: **Mini-Bar** → `minibar.html`
- Cart shared via `localStorage` between both pages

### 2026-09-29 — Products & cart
- Replaced Snack Sortido with **Cuca**; individual Scookiie (Menta, Ginguba, Ao Leite)
- Product images full / uncropped (`object-fit: contain`)
- Cart: **+ / −**, **Limpar carrinho**, **Encomendar via WhatsApp**

### 2026-09-29 — Gallery & Lubango
- Gallery replaced with 7 new cut photos (`gallery-01` … `gallery-07`)
- Lubango CTA: full-bleed night landmark image + dark gradient; all text overlaid
- Removed unused media (old gallery/product placeholders, unused Glamorize image)

### 2026-09-30 — Header & menu
- Top announcement bar: “Já disponível — Tá Queimar” → YouTube
- Header transparent on hero, solid when scrolled (Kylie-style)
- Desktop: logo centered **above** horizontal nav (Kylie-style)
- Mobile: logo centered; hamburger left → solid left drawer (not transparent)
- Text logo only (no image): **ELDO CARMO BARBERSHOP** / **JOHNNY BERRY** centered (Kylie-style)
- **Portal** link in desktop nav + mobile drawer
- Discovery: music logos + links; desktop Discovery label white on transparent header
- Experience: regenerated posters (reabertura/transformação); playback with sound on
- Hero: no “Barber Shop · Luanda”; fixed ghost CTA
- Hero media: mobile crop unchanged; desktop uses centered cover so portrait video/image fills the screen
- Mini-Bar: full-bleed hero under transparent header (same style as homepage)

### 2026-09-30 — Mini-Bar header match homepage
- Mini-Bar hero sits under fixed transparent header (white logo / hamburger / cart)
- On scroll → solid cream header (`.is-scrolled`), same as homepage
- Taller hero + overlay padding clears announce bar + nav

### 2026-09-30 — Agendar layout
- Booking form first; contact info stacked under form
- Instagram / Facebook as SVG icon buttons

### Earlier
- Services grid, experience video cards, booking form, footer / portal link
- Contact & WhatsApp numbers wired for Luanda and Lubango

### 2026-09-30 — Fix Discovery dropdown hover gap
- Dropdown no longer closes while moving the cursor onto a music link
- Files: `barbershop/css/style.css`, `glamorize/css/style.css`


---

## Admin + API (2026-10-29)

Same blueprint as Chocolate Scookiie:

| Piece | Path |
|-------|------|
| Admin UI | `admin.html` + `css/admin.css` + `js/admin.js` |
| Catalog defaults / config | `js/products.js` (`ECBARBER_DEFAULTS` / `ECBARBER_CONFIG`) |
| Worker API | `worker/` → publish catalog + orders (KV) |
| Guides | `BLUEPRINT.md`, `ADMIN_GUIDE.md` |

**Cloudinary**
- Cloud: `gyssk0cm`
- Unsigned preset (browser media): `ecbarbershop_unsigned`
- Folder / catalog: `ecbarbershop` → `ecbarbershop/catalog.json`
- API key + secret → **Worker secrets only** (never frontend / git)

**Deploy Worker**
```bash
cd worker
# Create KV namespace in dashboard, put id in wrangler.toml
npx wrangler secret put ADMIN_PASSWORD
npx wrangler secret put CLOUDINARY_CLOUD_NAME   # gyssk0cm
npx wrangler secret put CLOUDINARY_API_KEY
npx wrangler secret put CLOUDINARY_API_SECRET
npx wrangler deploy
```
Then set `ECBARBER_CONFIG.workerUrl` in `js/products.js` to the Worker URL.

**Checkout**
- If `workerUrl` is set → `POST /order` → KV → Admin Encomendas
- If empty → fallback WhatsApp (current behaviour)

Open `/admin.html` → login → Publicar na loja (creates first `catalog.json`).
