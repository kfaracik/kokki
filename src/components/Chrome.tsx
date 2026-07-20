"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import Logo from "./Logo";

export default function Chrome() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenis.on("scroll", ScrollTrigger.update);
    (window as unknown as { lenis: Lenis }).lenis = lenis;
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onScroll = ({ scroll, limit }: { scroll: number; limit: number }) => {
      if (progressRef.current) {
        progressRef.current.style.width = `${limit ? (scroll / limit) * 100 : 0}%`;
      }
      document
        .querySelector(".site-header")
        ?.classList.toggle("scrolled", scroll > 40);
    };
    lenis.on("scroll", onScroll);

    const anchorHandler = (e: Event) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!a) return;
      const id = a.getAttribute("href");
      if (id && id.length > 1 && document.querySelector(id)) {
        e.preventDefault();
        lenis.scrollTo(id, { offset: -10 });
      }
    };
    document.addEventListener("click", anchorHandler);

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let ringRafId = 0;
    let onMove: ((e: MouseEvent) => void) | null = null;
    let onOver: ((e: MouseEvent) => void) | null = null;
    let onOut: ((e: MouseEvent) => void) | null = null;
    if (fine) {
      let mx = window.innerWidth / 2;
      let my = window.innerHeight / 2;
      let rx = mx;
      let ry = my;
      onMove = (e: MouseEvent) => {
        mx = e.clientX;
        my = e.clientY;
        if (dotRef.current) {
          dotRef.current.style.left = `${mx}px`;
          dotRef.current.style.top = `${my}px`;
        }
      };
      const ringLoop = () => {
        rx += (mx - rx) * 0.16;
        ry += (my - ry) * 0.16;
        if (ringRef.current) {
          ringRef.current.style.left = `${rx}px`;
          ringRef.current.style.top = `${ry}px`;
        }
        ringRafId = requestAnimationFrame(ringLoop);
      };
      ringLoop();
      onOver = (e: MouseEvent) => {
        if ((e.target as HTMLElement).closest("a, button, [data-cursor]")) {
          ringRef.current?.classList.add("grow");
        }
      };
      onOut = (e: MouseEvent) => {
        if ((e.target as HTMLElement).closest("a, button, [data-cursor]")) {
          ringRef.current?.classList.remove("grow");
        }
      };
      window.addEventListener("mousemove", onMove);
      document.addEventListener("mouseover", onOver);
      document.addEventListener("mouseout", onOut);
    }

    const pre = preloaderRef.current;
    const preTl = gsap.timeline();
    if (pre) {
      const logo = pre.querySelector("svg");
      const oGroup = pre.querySelector(".o-group");
      preTl
        .to(logo, { opacity: 1, duration: 0.55, ease: "power2.out", delay: 0.1 })
        .add(() => oGroup?.classList.add("lit"), "+=0.15")
        .to(logo, { opacity: 1, duration: 0.55 })
        .to(logo, { opacity: 0, y: -16, duration: 0.4, ease: "power2.in" })
        .to(pre, {
          yPercent: -100,
          duration: 0.7,
          ease: "power3.inOut",
          onComplete: () => pre.remove(),
        });
    }

    return () => {
      preTl.kill();
      document.removeEventListener("click", anchorHandler);
      if (onMove) window.removeEventListener("mousemove", onMove);
      if (onOver) document.removeEventListener("mouseover", onOver);
      if (onOut) document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(ringRafId);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="preloader" ref={preloaderRef}>
        <Logo burner />
      </div>
      <div className="progress" ref={progressRef} />
      <div className="grain" />
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}
