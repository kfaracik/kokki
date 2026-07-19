"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IGNITE_STEPS } from "@/lib/data";

export default function Ignite() {
  const rootRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
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
            setStep(p < 0.34 ? 0 : p < 0.68 ? 1 : 2);
            const fill = railRef.current?.querySelector<HTMLElement>(".rail i");
            if (fill) fill.style.transform = `scaleY(${p})`;
            rootRef.current
              ?.querySelector(".ignite-heat")
              ?.classList.toggle("lit", p > 0.3);
          },
        },
      });
      tl.fromTo(
        ".ignite-media .on",
        { opacity: 0 },
        { opacity: 1, ease: "power1.inOut", duration: 0.5 },
        0.12,
      )
        .fromTo(
          ".ignite-media",
          { scale: 1.12 },
          { scale: 1, ease: "none", duration: 1 },
          0,
        )
        .to(
          ".ignite-media .off",
          { opacity: 0.35, ease: "power1.inOut", duration: 0.4 },
          0.55,
        );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="ignite" id="technologia" ref={rootRef}>
      <div className="ignite-sticky">
        <div className="ignite-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="off" src="/brand/pot-off.png" alt="" aria-hidden />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="on"
            src="/brand/pot-on.png"
            alt="Podblatowa kuchenka indukcyjna Kokki — rozgrzane pola indukcyjne pod kamiennym blatem"
          />
        </div>
        <div className="ignite-shade" />
        <div className="ignite-heat" />
        <div className="wrap ignite-inner">
          <div className="ignite-copy">
            {IGNITE_STEPS.map((s, i) => (
              <div
                key={s.index}
                className={`ignite-step${i === step ? " active" : ""}`}
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
