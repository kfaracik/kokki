"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IGNITE_STEPS } from "@/lib/data";
import { prefersReducedMotion } from "@/lib/motion";

const RIM_X = 0.229;
const RIM_Y = 0.31;
const MEDIA_FOCUS_X = 0.4;

type Bubble = {
  x: number;
  y: number;
  vy: number;
  r: number;
  life: number;
  max: number;
  wob: number;
  seed: number;
};

export default function Ignite() {
  const rootRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "+=220%",
          scrub: 1,
          onUpdate: (self) => {
            const p = self.progress;
            progressRef.current = p;
            setStep(p < 0.34 ? 0 : p < 0.68 ? 1 : 2);
            const fill = railRef.current?.querySelector<HTMLElement>(".rail i");
            if (fill) fill.style.transform = `scaleY(${p})`;
          },
        },
      });
      tl.fromTo(
        ".ignite-media .on",
        { opacity: 0 },
        { opacity: 1, ease: "power1.inOut", duration: 0.5 },
        0.12,
      ).to(
        ".ignite-media .off",
        { opacity: 0.35, ease: "power1.inOut", duration: 0.4 },
        0.55,
      );
      if (!prefersReducedMotion()) {
        tl.fromTo(
          ".ignite-media",
          { scale: 1.12 },
          { scale: 1, ease: "none", duration: 1 },
          0,
        );
      }
    }, rootRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const img = rootRef.current?.querySelector<HTMLImageElement>(
      ".ignite-media .on",
    );
    if (!canvas || !img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx2d = canvas.getContext("2d");
    if (!ctx2d) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let bubbles: Bubble[] = [];

    const resize = () => {
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const rim = () => {
      const vw = img.clientWidth;
      const vh = img.clientHeight;
      const iw = img.naturalWidth || 1920;
      const ih = img.naturalHeight || 994;
      const scale = Math.max(vw / iw, vh / ih);
      const ox = (iw * scale - vw) * MEDIA_FOCUS_X;
      const oy = (ih * scale - vh) * 0.5;
      return {
        x: RIM_X * iw * scale - ox,
        y: RIM_Y * ih * scale - oy,
        spread: 0.075 * iw * scale,
      };
    };

    const tick = () => {
      const w = canvas.width;
      const h = canvas.height;
      const p = progressRef.current;
      const heat = gsap.utils.clamp(0, 1, (p - 0.32) / 0.45);
      ctx2d.clearRect(0, 0, w, h);
      if (heat === 0 && bubbles.length === 0) return;

      if (heat > 0 && bubbles.length < 64 && Math.random() < heat * 0.55) {
        const a = rim();
        bubbles.push({
          x: (a.x + (Math.random() - 0.5) * a.spread * 2) * dpr,
          y: (a.y + (Math.random() - 0.5) * a.spread * 0.4) * dpr,
          vy: -(0.35 + Math.random() * 0.75) * dpr,
          r: (1.4 + Math.random() * 2.8) * dpr,
          life: 0,
          max: 150 + Math.random() * 130,
          wob: 0.4 + Math.random() * 1.3,
          seed: Math.random() * Math.PI * 2,
        });
      }

      bubbles = bubbles.filter((b) => b.life < b.max);
      ctx2d.globalCompositeOperation = "lighter";
      for (const b of bubbles) {
        b.life++;
        const t = b.life / b.max;
        b.vy -= 0.0045 * dpr;
        b.x += Math.sin(b.seed + b.life * 0.035) * b.wob * dpr * 0.35;
        b.y += b.vy;
        const steam = gsap.utils.clamp(0, 1, (t - 0.3) / 0.7);
        const r = b.r * (1 + steam * 9);
        const alpha = (t < 0.3 ? 0.42 : 0.42 * (1 - steam)) * heat;
        if (alpha <= 0.004) continue;
        const cr = Math.round(240 - steam * 15);
        const cg = Math.round(130 + steam * 100);
        const cb = Math.round(70 + steam * 155);
        const g = ctx2d.createRadialGradient(b.x, b.y, 0, b.x, b.y, r);
        g.addColorStop(0, `rgba(${cr},${cg},${cb},${alpha})`);
        g.addColorStop(0.55, `rgba(${cr},${cg},${cb},${alpha * 0.35})`);
        g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
        ctx2d.fillStyle = g;
        ctx2d.beginPath();
        ctx2d.arc(b.x, b.y, r, 0, Math.PI * 2);
        ctx2d.fill();
      }
    };

    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="ignite" id="technologia" ref={rootRef}>
      <div className="ignite-sticky">
        <div className="ignite-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="off" src="/brand/pot-off.jpg" alt="" aria-hidden />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="on"
            src="/brand/pot-on.jpg"
            alt="Podblatowa kuchenka indukcyjna Kokki — rozgrzane pola indukcyjne pod kamiennym blatem"
          />
        </div>
        <div className="ignite-shade" />
        <canvas className="ignite-steam" ref={canvasRef} aria-hidden />
        <div className="wrap ignite-inner">
          <div className="ignite-copy">
            {IGNITE_STEPS.map((s, i) => (
              <div
                key={s.index}
                className={`ignite-step${i === step ? " active" : i < step ? " past" : " future"}`}
              >
                <div className="ignite-index">{s.index}</div>
                <h2>{s.title}</h2>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="ignite-rail" ref={railRef}>
          {IGNITE_STEPS.map((s, i) => (
            <span
              key={s.index}
              className={`tick${i === step ? " active" : ""}`}
            >
              0{i + 1}
            </span>
          ))}
          <span className="rail">
            <i />
          </span>
        </div>
      </div>
      <div style={{ height: "220vh" }} aria-hidden />
    </section>
  );
}
