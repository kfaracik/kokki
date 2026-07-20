# Kokki — roadmapa

Redesign [kokki.pl](https://kokki.pl) → ekstremalnie premium strona marki podblatowych kuchenek indukcyjnych.
Docelowo spięta z backendem/adminem na wzór infrastruktury new-pawnshop (leady zamiast koszyka).

## ✅ Faza 0 — Analiza i decyzje (2026-07-19)

- [x] Audyt obecnej strony (WordPress + Elementor, lead-gen, brak e-commerce)
- [x] Analiza infrastruktury new-pawnshop → admin/auth/RBAC/audit/deploy reużywalne ~1:1
- [x] Decyzje: rebuild na Next.js · produkty mockowane w kształcie przyszłego backendu · najpierw wizual
- [x] Referencja poziomu dopracowania: bittersweetfestival.pl

## ✅ Faza 1 — Design direction

- [x] Prototyp kierunku wizualnego (dark premium, pomarańcz #e8622a, scroll-driven storytelling)
- [x] Akceptacja kierunku

## ✅ Faza 2 — Właściwa strona (to repo)

- [x] Scaffold Next.js 15 + TS + Tailwind v4 + GSAP + Lenis
- [x] Assety z kokki.pl: logo SVG, wideo hero, render panelu, sesje foto (pary off/on zwojów), fonty marki (Outfit + Lato)
- [x] Autentyczne treści: copy, FAQ, specyfikacje (spiek 12 mm, 1×32 A / 2×16 A, szafka 60 cm)
- [x] Sekcje: Hero (wideo) · Ticker · **Ignite** (pinned scena — zwoje rozżarzają się scrollem) · Invisible cooking · Panel (tilt 3D) · Oferta (3 mocki) · Liczniki · FAQ · Kontakt · Footer
- [x] Smaczki: preloader, custom cursor, film grain, magnetyczne CTA, progress bar, marquee, hover-ignite na zdjęciach, gigantyczne logo w stopce
- [x] Design system "sharp": promienie 4/10/14 px pod estetykę szklanego panelu, diamentowe akcenty (◆ z logo)
- [x] Smaczek-flagowiec: **"O" w logo footera zapala się jak palnik** (pierścienie zwojów + żar) na hover
- [x] Dane produktów/FAQ w typowanym `src/lib/data.ts` — kształt przyszłego dokumentu Mongo

## 🔶 Faza 3 — Szlif wizualny (w toku / następne)

- [ ] Kompresja `public/brand/hero.mp4` (28 MB → ~4 MB; wymaga ffmpeg: `brew install ffmpeg`)
- [ ] Mobile QA (menu mobilne — hamburger, sekcja Ignite na touch, wysokości 100svh)
- [ ] Weryfikacja wizualna panel-tilt (pane renderer nie pozwolił na screenshot)
- [ ] Sekcje: Współpraca (B2B/architekci) i O nas
- [ ] Mikro-dopracowania: preloader → inline Logo z zapłonem O, easing sceny Ignite, a11y (focus-visible, prefers-reduced-motion pełne)
- [ ] Favicon/OG image z logo, meta SEO, sitemap

## ⬜ Faza 4 — Publikacja

- [ ] Remote na GitHubie
- [ ] Deploy na Vercel (Hobby) + ewentualna domena kokki.pl (przepięcie DNS po akceptacji znajomego)
- [ ] Lighthouse pass (LCP z wideo hero!), analityka, cookie banner (privacy-first)

## ⬜ Faza 5 — Backend + Admin (fork new-pawnshop)

- [ ] Fork warstwy admin: NextAuth (Google) + RBAC (admin/pracownik) + audit log + `/team`
- [ ] Model danych: `products` (moduły/konfiguracje — zgodny z `src/lib/data.ts`), `faq`, **`inquiries` (skrzynka leadów zamiast orders)**
- [ ] Endpoint formularza kontaktowego → inquiries + powiadomienie e-mail
- [ ] Upload zdjęć produktów (base64 → S3 opcjonalnie)
- [ ] Deploy backendu (Fly.io, wzór new-pawnshop-api)

## ⬜ Faza 6 — Integracja

- [ ] Front: mocki z `data.ts` → API (ISR/revalidate)
- [ ] Admin CRUD produktów/FAQ widoczny na stronie
- [ ] E2E QA całości

---

**Stan na 2026-07-19:** Fazy 0–2 zakończone. Strona działa lokalnie: `npm run dev -- -p 3005`.
