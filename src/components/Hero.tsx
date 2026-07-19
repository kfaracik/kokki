"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMagnetic } from "./Header";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cta1 = useMagnetic();
  const cta2 = useMagnetic();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.set("[data-hero]", { y: 44, opacity: 0 });
      gsap.to("[data-hero]", {
        y: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        delay: 1.6,
      });
      gsap.to(".hero-content", {
        yPercent: 26,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero-media", {
        yPercent: 12,
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="top" ref={rootRef}>
      <div className="hero-media">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster="/brand/hero-off.png"
          src="/brand/hero.mp4"
        />
      </div>
      <div className="hero-shade" />
      <div className="wrap hero-content">
        <p className="eyebrow" data-hero>
          Podblatowe kuchenki indukcyjne
        </p>
        <h1>
          <span className="line">
            <span data-hero>Odkryj nowy</span>
          </span>
          <span className="line">
            <span data-hero>
              wymiar <span className="accent">gotowania</span>
            </span>
          </span>
        </h1>
        <p className="sub" data-hero>
          Ukryta innowacja w Twojej kuchni. Minimalizm i elegancja połączone z
          niezrównaną funkcjonalnością — indukcja, która znika pod blatem.
        </p>
        <div className="actions" data-hero>
          <a href="#oferta" className="cta solid" ref={cta1}>
            <span className="dot" />
            Nasza oferta
          </a>
          <a href="#technologia" className="cta" ref={cta2}>
            Zobacz jak działa
          </a>
        </div>
      </div>
      <div className="scroll-cue">
        <span>Przewiń</span>
        <span className="bar" />
      </div>
    </section>
  );
}
