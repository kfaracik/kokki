"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";

function magnetize(el: HTMLElement) {
  const move = (e: MouseEvent) => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.3}px)`;
  };
  const leave = () => {
    el.style.transform = "";
  };
  el.addEventListener("mousemove", move);
  el.addEventListener("mouseleave", leave);
  return () => {
    el.removeEventListener("mousemove", move);
    el.removeEventListener("mouseleave", leave);
  };
}

export function useMagnetic() {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    if (!window.matchMedia("(hover: hover)").matches) return;
    return magnetize(ref.current);
  }, []);
  return ref;
}

const LINKS = [
  { href: "#technologia", label: "Technologia" },
  { href: "#panel", label: "Sterowanie" },
  { href: "#oferta", label: "Oferta" },
  { href: "#wspolpraca", label: "Współpraca" },
  { href: "#faq", label: "FAQ" },
];

export default function Header() {
  const ctaRef = useMagnetic();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    return () => document.documentElement.classList.remove("menu-open");
  }, [open]);

  return (
    <>
      <header className="site-header">
        <div className="wrap nav-inner">
          <a href="#top" className="logo" aria-label="Kokki — strona główna">
            <Logo />
          </a>
          <nav className="menu">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <a href="#kontakt" className="cta" ref={ctaRef}>
            <span className="dot" />
            Kontakt
          </a>
          <button
            className={`burger${open ? " active" : ""}`}
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <div className={`mobile-menu${open ? " open" : ""}`} aria-hidden={!open}>
        <nav>
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              style={{ transitionDelay: open ? `${0.08 + i * 0.06}s` : "0s" }}
              onClick={() => setOpen(false)}
            >
              <span className="idx">0{i + 1}</span>
              {l.label}
            </a>
          ))}
          <a
            href="#kontakt"
            className="menu-contact"
            style={{
              transitionDelay: open ? `${0.08 + LINKS.length * 0.06}s` : "0s",
            }}
            onClick={() => setOpen(false)}
          >
            <span className="idx">0{LINKS.length + 1}</span>
            Kontakt
          </a>
        </nav>
        <div className="mobile-menu-foot">
          <span>Kokki — nowy wymiar gotowania</span>
        </div>
      </div>
    </>
  );
}
