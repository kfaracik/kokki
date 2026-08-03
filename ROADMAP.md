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

## ✅ Faza 3 — Szlif wizualny

- [x] Kompresja `public/brand/hero.mp4` — 28 MB → **1,3 MB** (ffmpeg, 1600 px / CRF 30 / faststart)
- [x] Menu mobilne: hamburger + pełnoekranowy overlay (numerowane linki, stagger, blokada scrolla); scroll-cue ukryty na mobile
- [x] Sekcje **Współpraca** (3 grupy odbiorców + foto z parallaxem) i **O nas** (manifest typograficzny) — autentyczne copy z kokki.pl
- [x] Preloader → inline Logo z zapłonem „O" podczas ładowania
- [x] Favicon (palnik: pomarańczowa tarcza + pierścień na czerni) + meta OG (hero-on.png)
- [ ] Weryfikacja wizualna panel-tilt + finalny mobile pass na realnym urządzeniu (pane renderer ogranicza zrzuty)
- [x] A11y: pełny audit prefers-reduced-motion / focus-visible — reduced: Lenis→native scroll, preloader/hero fade-only, bez parallaxów/tickera/tilt/magnetic/sheen, countery natychmiastowe, para na canvasie off; focus: globalny `:focus-visible` (accent outline), skip-link „Przejdź do treści" → `#main`

## 🔶 Faza 4 — Publikacja

- [x] Remote na GitHubie — https://github.com/kfaracik/kokki (private)
- [x] Deploy na Vercel (Hobby) — produkcja: https://kokki-six.vercel.app (projekt `kokki`, scope `ms-projects-44d04358`)
- [x] Auto-deploy z GitHuba — repo podpięte, push na `main` = deploy produkcji (zweryfikowany)
- [x] Optymalizacja grafik — Współpraca dostała ostry kadr 1632px z renderu kuchni (zamiast rozciąganego 692px czajnika); pary pot/chef + poster hero jako JPEG, dedykowane miniatury kart, OG 1200×630; waga obrazów strony ~11 MB → ~1 MB (QA wizualne na produkcji w realnym Chrome)
- [ ] Domena kokki.pl (przepięcie DNS po akceptacji znajomego)
- [x] Lighthouse pass (mobile, produkcja): Perf 64 → **85**, A11y/BP/SEO **100** — panel.png 189 KiB → webp 10.7 KiB, chef 1920→1280, preloader ~2.45s → ~1.9s, wejście hero nakłada się na kurtynę (LCP 4.5→3.8s, TBT 590→20ms, SI 5.9→4.8s)
- [x] Analityka: @vercel/analytics (cookieless — cookie banner niepotrzebny). **Wymaga 1 kliknięcia: Vercel dashboard → projekt kokki → Analytics → Enable**

## ⬜ Faza 5 — Backend + Admin (fork new-pawnshop)

- [x] Backend `~/Projects/kokki-backend` (Express+TS+Mongoose, fork rdzenia new-pawnshop-backend): modele `products`/`faq`/`inquiries`, publiczne GET + POST inquiries (zod, honeypot, rate limit 5/15 min), admin CRUD za `ADMIN_TOKEN` (Bearer, timing-safe), powiadomienie e-mail przez SMTP env, seed danych strony; przetestowany curl E2E
- [x] Fork warstwy admin → `~/Projects/kokki-admin`: NextAuth (Google + dev-login) + RBAC (admin/pracownik) + audit log + `/team` zachowane; Pulpit/Zapytania/Produkty/FAQ na proxy BFF (`KOKKI_BACKEND_URL`+`KOKKI_ADMIN_TOKEN`); branding Kokki (pomarańcz); zweryfikowany E2E na żywym API (port 3007, dev-login)
- [x] Endpoint formularza kontaktowego → inquiries + e-mail; **formularz na stronie podpięty** (`NEXT_PUBLIC_API_URL`, stany wysyłania/potwierdzenia/błędu, honeypot) — E2E OK lokalnie
- [x] Upload zdjęć produktów (base64 przez `/api/upload` w adminie; S3/R2 opcjonalnie przez env)
- [ ] Deploy backendu — **zablokowane**: Fly.io trial wygasł (wymaga dodania karty na koncie larkfreeme70.55@gmail.com); alternatywa: Render dashboard (gotowe `render.yaml` + `Dockerfile` w kokki-backend). Po deployu: ustawić `NEXT_PUBLIC_API_URL` w Vercel (projekt kokki) i env admina

## ⬜ Faza 6 — Integracja

- [x] Front: mocki z `data.ts` → API (`lib/api.ts`, ISR revalidate 300 s, fallback na statyczne dane gdy brak `NEXT_PUBLIC_API_URL`/API padnie — produkcja bezpieczna do czasu deployu API)
- [x] Admin CRUD produktów/FAQ widoczny na stronie — potwierdzone E2E lokalnie: PATCH taga w API → strona pokazała zmianę po oknie revalidate → revert
- [x] E2E QA całości (lokalnie): formularz → API → panel; produkty/FAQ z bazy (11 rekordów w SSR); wyłapany i naprawiony bug backendu (partial PATCH zerował pola z defaultami — fix 218ccfb w kokki-backend)
- [ ] E2E QA na produkcji — po deployu API i ustawieniu `NEXT_PUBLIC_API_URL` w Vercel

---

**Stan na 2026-07-20:** Fazy 0–3 zakończone (poza dwoma punktami QA). **Strona jest live: https://kokki-six.vercel.app** (deploy przez `vercel deploy --prod`). Zostało z Fazy 4: remote na GitHubie, domena, Lighthouse. Lokalnie: `npm run dev -- -p 3005`.
