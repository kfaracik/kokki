"use client";

import { useEffect, useRef } from "react";

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

export default function Header() {
  const ctaRef = useMagnetic();

  return (
    <header className="site-header">
      <div className="wrap nav-inner">
        <a href="#top" className="logo" aria-label="Kokki — strona główna">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo.svg" alt="Kokki" />
        </a>
        <nav className="menu">
          <a href="#technologia">Technologia</a>
          <a href="#panel">Sterowanie</a>
          <a href="#oferta">Oferta</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a href="#kontakt" className="cta" ref={ctaRef}>
          <span className="dot" />
          Kontakt
        </a>
      </div>
    </header>
  );
}
