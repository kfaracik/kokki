"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FAQ, PRODUCTS, TICKER_ITEMS } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/motion";
import { useMagnetic } from "./Header";
import Logo from "./Logo";

export function Ticker() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="marquee">
      <div className="marquee-track" ref={trackRef}>
        {items.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}

export function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      if (reduced) gsap.set(ref.current, { y: 0 });
      gsap.to(ref.current, {
        opacity: 1,
        y: 0,
        duration: reduced ? 0.4 : 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 84%" },
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <div className="reveal" ref={ref}>
      {children}
    </div>
  );
}

export function Invisible() {
  const photoRef = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const st = ScrollTrigger.create({
      trigger: photoRef.current,
      start: "top 55%",
      onEnter: () => setLit(true),
    });
    return () => st.kill();
  }, []);

  return (
    <section className="pad" id="niewidzialna">
      <div className="wrap invisible-grid">
        <Reveal>
          <div
            className={`invisible-photo${lit ? " lit" : ""}`}
            ref={photoRef}
            onMouseEnter={() => setLit(true)}
            onMouseLeave={() => setLit(false)}
            data-cursor
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="off" src="/brand/chef-off.jpg" alt="" aria-hidden />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="on"
              src="/brand/chef-on.jpg"
              alt="Kucharz gotujący na blacie z niewidoczną indukcją Kokki"
            />
            <div className="hint">
              <i />
              Indukcja pod blatem
            </div>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <p className="eyebrow">Invisible cooking</p>
            <h2 style={{ fontSize: "clamp(2rem, 3.4vw, 3.2rem)", margin: "18px 0" }}>
              Gotuj bezpośrednio
              <br />
              na blacie
            </h2>
            <p style={{ color: "var(--muted)", lineHeight: 1.75 }}>
              Pola indukcyjne pracują przez kamień. Gdy kończysz gotować,
              kuchenka po prostu znika — zostaje czysty blat i pełna przestrzeń
              robocza.
            </p>
            <ul className="checklist">
              <li>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/check.svg" alt="" aria-hidden />
                <span>
                  Montaż pod <b>spiekiem kwarcowym 12 mm</b>, granitem i
                  kwarcytem
                </span>
              </li>
              <li>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/check.svg" alt="" aria-hidden />
                <span>
                  Szafka <b>od 60 cm</b> — również na łączeniu szafek i w
                  modułach sieciówek
                </span>
              </li>
              <li>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/check.svg" alt="" aria-hidden />
                <span>
                  Zasilanie <b>1×32 A lub 2×16 A</b> — dwa moduły, elastyczne
                  podłączenie
                </span>
              </li>
              <li>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/brand/check.svg" alt="" aria-hidden />
                <span>
                  Sprawdzi się też <b>w kuchni zewnętrznej</b> — na tarasie i w
                  ogrodzie
                </span>
              </li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Panel() {
  const stageRef = useRef<HTMLDivElement>(null);
  const rotorRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const rotor = rotorRef.current;
    if (!stage || !rotor) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    if (prefersReducedMotion()) return;
    gsap.set(rotor, { transformPerspective: 1100 });
    const rx = gsap.quickTo(rotor, "rotationX", {
      duration: 0.9,
      ease: "power3",
    });
    const ry = gsap.quickTo(rotor, "rotationY", {
      duration: 0.9,
      ease: "power3",
    });
    const move = (e: MouseEvent) => {
      const r = stage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      ry(x * 9);
      rx(-y * 7);
      glareRef.current?.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
      glareRef.current?.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX - r.left}px`;
        glowRef.current.style.top = `${e.clientY - r.top}px`;
      }
    };
    const leave = () => {
      rx(0);
      ry(0);
    };
    stage.addEventListener("mousemove", move);
    stage.addEventListener("mouseleave", leave);
    return () => {
      stage.removeEventListener("mousemove", move);
      stage.removeEventListener("mouseleave", leave);
    };
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    const stage = stageRef.current;
    if (!stage) return;
    const r = stage.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "panel-ripple";
    ripple.style.left = `${e.clientX - r.left}px`;
    ripple.style.top = `${e.clientY - r.top}px`;
    stage.appendChild(ripple);
    ripple.addEventListener("animationend", () => ripple.remove());
  };

  return (
    <section className="pad" id="panel">
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <p className="eyebrow">Sterowanie</p>
            <h2>
              Dotykowy panel,
              <br />
              dokładnie tam gdzie chcesz
            </h2>
            <p>
              W szufladzie, na blacie lub na ścianie. Cztery pola, suwak mocy,
              timer i blokada — wszystko w tafli czarnego szkła.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <div
            className="panel-stage"
            ref={stageRef}
            onPointerDown={onPointerDown}
            data-cursor
          >
            <div className="panel-glow" ref={glowRef} />
            <div className="panel-tilt">
              <div className="panel-rotor" ref={rotorRef}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brand/panel.png"
                  alt="Panel sterowania Kokki — cztery pola grzewcze, suwak mocy, timer i blokada"
                />
                <div className="panel-glare" ref={glareRef} />
                <div className="panel-sheen" />
              </div>
              <div className="panel-floor" />
            </div>
            <div className="panel-chips">
              <span className="chip">4 pola grzewcze</span>
              <span className="chip">Suwak mocy</span>
              <span className="chip">Timer</span>
              <span className="chip">Blokada</span>
              <span className="chip">Szuflada · Blat · Ściana</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Counter({ to, suffix }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => {
        if (prefersReducedMotion()) {
          el.textContent = String(to);
          return;
        }
        const obj = { v: 0 };
        gsap.to(obj, {
          v: to,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        });
      },
    });
    return () => st.kill();
  }, [to]);
  return (
    <>
      <span ref={ref}>0</span>
      {suffix ? <span className="accent">{suffix}</span> : null}
    </>
  );
}

export function Products() {
  return (
    <section className="pad" id="oferta" style={{ background: "var(--bg-2)" }}>
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <p className="eyebrow">Oferta</p>
            <h2>
              Modułowy system,
              <br />
              trzy sposoby na Twój blat
            </h2>
            <p>
              Dwa moduły po dwa palniki. Układ dobierasz do swojej kuchni — a
              panel sterowania umieszczasz tam, gdzie jest Ci wygodnie.
            </p>
          </div>
        </Reveal>
        <div className="products">
          {PRODUCTS.map((p) => (
            <Reveal key={p.id}>
              <article className="card" data-cursor>
                <div className="visual">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.name} loading="lazy" />
                </div>
                <div className="card-body">
                  <span className="tag">{p.tag}</span>
                  <h3>{p.name}</h3>
                  <p>{p.description}</p>
                  <div className="specs">
                    {p.specs.map((s) => (
                      <div className="spec-row" key={s.label}>
                        <span className="k">{s.label}</span>
                        <span className={`v${s.highlight ? " num" : ""}`}>
                          {s.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="stats">
          <Reveal>
            <div className="stat">
              <div className="n">
                <Counter to={2000} suffix="W" />
              </div>
              <div className="l">Maksymalna moc palnika</div>
            </div>
          </Reveal>
          <Reveal>
            <div className="stat">
              <div className="n">
                <Counter to={4} />
              </div>
              <div className="l">Palniki w konfiguracji</div>
            </div>
          </Reveal>
          <Reveal>
            <div className="stat">
              <div className="n">
                <Counter to={12} suffix="mm" />
              </div>
              <div className="l">Spiek kwarcowy nad indukcją</div>
            </div>
          </Reveal>
          <Reveal>
            <div className="stat">
              <div className="n">
                <Counter to={60} suffix="cm" />
              </div>
              <div className="l">Minimalna szerokość szafki</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const COLLAB_CARDS = [
  {
    title: "Architekci i projektanci wnętrz",
    body: "Czysty blat bez płyty otwiera nowe możliwości projektowe. Wspieramy Cię na etapie koncepcji — od rozmieszczenia modułów po detale frezowania.",
  },
  {
    title: "Firmy kamieniarskie",
    body: "Montaż pod spiekiem 12 mm, granitem i kwarcytem. Dostarczamy specyfikację techniczną i wsparcie przy przygotowaniu blatu.",
  },
  {
    title: "Studia kuchenne",
    body: "Wyróżnij swoją ofertę produktem, którego nie ma nikt inny. Materiały ekspozycyjne, szkolenia i indywidualne warunki współpracy.",
  },
];

export function Collab() {
  const photoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        photoRef.current?.querySelector("img") ?? null,
        { yPercent: -8, scale: 1.12 },
        {
          yPercent: 8,
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: photoRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="pad" id="wspolpraca" style={{ background: "var(--bg-2)" }}>
      <div className="wrap">
        <div className="collab-grid">
          <div>
            <Reveal>
              <p className="eyebrow">Współpraca</p>
              <h2 style={{ fontSize: "clamp(2rem, 3.4vw, 3.2rem)", margin: "18px 0" }}>
                Dla profesjonalistów,
                <br />
                którzy projektują kuchnie
              </h2>
              <p style={{ color: "var(--muted)", lineHeight: 1.75, maxWidth: "52ch" }}>
                W Kokki cenimy kreatywność i innowacyjność, które niosą ze sobą
                profesjonaliści z branży architektonicznej i kamieniarskiej.
                Wspieramy projektantów wnętrz, architektów oraz firmy
                kamieniarskie w tworzeniu przestrzeni, w których technologia
                znika, a zostaje design.
              </p>
            </Reveal>
            <div className="collab-cards">
              {COLLAB_CARDS.map((c, i) => (
                <Reveal key={c.title}>
                  <div className="collab-card" data-cursor>
                    <span className="collab-num">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{c.title}</h3>
                      <p>{c.body}</p>
                    </div>
                    <span className="diamond" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal>
            <div className="collab-photo" ref={photoRef}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/collab.jpg" alt="Czajnik parzący herbatę na kamiennym blacie z ukrytą indukcją Kokki" loading="lazy" decoding="async" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section className="pad about" id="o-nas">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">O nas</p>
          <blockquote className="about-quote">
            Powstaliśmy z połączenia pasji do nowoczesnych technologii
            i&nbsp;miłości do <span className="accent">estetycznych, funkcjonalnych
            przestrzeni</span>. Tego produktu brakowało na rynku — więc go
            stworzyliśmy.
          </blockquote>
          <p className="about-sub">
            Zespół profesjonalistów specjalizujących się w architekturze wnętrz
            i elektronice użytkowej · Poznań
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export function Faq() {
  const [open, setOpen] = useState<string | null>(null);
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  return (
    <section className="pad" id="faq">
      <div className="wrap">
        <Reveal>
          <div className="sec-head">
            <p className="eyebrow">FAQ</p>
            <h2>Najczęstsze pytania</h2>
          </div>
        </Reveal>
        <Reveal>
          <div className="faq-list">
            {FAQ.map((f) => {
              const isOpen = open === f.id;
              return (
                <div className={`faq-item${isOpen ? " open" : ""}`} key={f.id}>
                  <button
                    className="faq-q"
                    onClick={() => setOpen(isOpen ? null : f.id)}
                    aria-expanded={isOpen}
                  >
                    {f.question}
                    <span className="faq-icon" />
                  </button>
                  <div
                    className="faq-a"
                    ref={(el) => {
                      refs.current[f.id] = el;
                    }}
                    style={{
                      maxHeight: isOpen
                        ? `${refs.current[f.id]?.scrollHeight ?? 400}px`
                        : 0,
                    }}
                  >
                    <p>{f.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Contact() {
  const btnRef = useMagnetic();
  return (
    <section className="pad contact" id="kontakt">
      <div className="wrap contact-grid">
        <Reveal>
          <p className="eyebrow">Kontakt</p>
          <h2>
            Porozmawiajmy
            <br />o Twojej kuchni
          </h2>
          <p
            style={{
              color: "var(--muted)",
              marginTop: 26,
              lineHeight: 1.7,
              maxWidth: "40ch",
            }}
          >
            Dowiedz się więcej o produktach Kokki i o tym, jak mogą zmienić
            Twoją przestrzeń. Doradzimy również przy wyborze miejsca na panel
            sterowania i szczegółach montażu.
          </p>
        </Reveal>
        <Reveal>
          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <div className="field">
              <input type="text" id="f-name" placeholder=" " autoComplete="name" />
              <label htmlFor="f-name">Imię</label>
            </div>
            <div className="field">
              <input type="email" id="f-email" placeholder=" " autoComplete="email" />
              <label htmlFor="f-email">E-mail</label>
            </div>
            <div className="field">
              <textarea id="f-msg" rows={3} placeholder=" " />
              <label htmlFor="f-msg">Twoja wiadomość</label>
            </div>
            <small>
              Podanie danych, w tym adresu e-mail, jest dobrowolne, ale
              niezbędne do wysłania i przetworzenia zapytania. Przysługuje Ci
              prawo dostępu do swoich danych, ich poprawiania oraz żądania
              zaprzestania przetwarzania.
            </small>
            <a
              href="#kontakt"
              className="cta solid"
              ref={btnRef}
              style={{ alignSelf: "flex-start", marginTop: 6 }}
              onClick={(e) => e.preventDefault()}
            >
              <span className="dot" />
              <span className="cta-label">
                <span className="cta-text" data-text="Wyślij wiadomość">
                  Wyślij wiadomość
                </span>
              </span>
            </a>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: hover)").matches) return;
    const group = logoRef.current?.querySelector(".o-group");
    if (!logoRef.current || !group) return;
    const io = new IntersectionObserver(
      ([entry]) => group.classList.toggle("lit", entry.isIntersecting),
      { threshold: 0.4 },
    );
    io.observe(logoRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-logo" data-cursor ref={logoRef}>
          <Logo burner />
        </div>
        <div className="foot-grid">
          <div>
            <p>
              KOKKI Spółka z ograniczoną odpowiedzialnością
              <br />
              ul. Trójpole 1D/50A, 61-693 Poznań
              <br />
              KRS 0001107078 · NIP 9721353093 · REGON 52870677700000
            </p>
          </div>
          <div className="foot-links">
            <a href="#technologia">Technologia</a>
            <a href="#panel">Sterowanie</a>
            <a href="#oferta">Oferta</a>
            <a href="#wspolpraca">Współpraca</a>
            <a href="#o-nas">O nas</a>
            <a href="#faq">FAQ</a>
            <a href="#kontakt">Kontakt</a>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Kokki. Nowy wymiar gotowania.</span>
          <span>Odkryj ukrytą innowację w swojej kuchni</span>
        </div>
      </div>
    </footer>
  );
}
