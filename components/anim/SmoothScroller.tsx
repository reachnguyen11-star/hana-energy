"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function formatCount(value: number, original: string, suffix: string) {
  const padded = /^0\d/.test(original)
    ? String(Math.round(value)).padStart(2, "0")
    : String(Math.round(value));
  return padded + suffix;
}

export function SmoothScroller({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          isMobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { isDesktop, reduce } = ctx.conditions as {
            isDesktop: boolean;
            isMobile: boolean;
            reduce: boolean;
          };

          if (reduce) {
            gsap.set("[data-reveal], [data-hero-stat]", { opacity: 1, y: 0 });
            return;
          }

          /* ---- Lenis smooth scroll (replaces ScrollSmoother) ---- */
          let lenis: Lenis | undefined;
          let tickerFn: ((time: number) => void) | undefined;

          if (isDesktop) {
            lenis = new Lenis({ duration: 1.1, smoothWheel: true });
            /* Connect Lenis to GSAP ScrollTrigger */
            lenis.on("scroll", ScrollTrigger.update);
            tickerFn = (time: number) => { lenis!.raf(time * 1000); };
            gsap.ticker.add(tickerFn);
            gsap.ticker.lagSmoothing(0);
          }

          /* ---- Hero stat cards ---- */
          gsap.fromTo(
            "[data-hero-stat]",
            { y: 32, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out", delay: 0.15 }
          );

          /* ---- Reveal on scroll ---- */
          gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
            const isCard =
              el.tagName === "ARTICLE" ||
              el.closest("article") !== null ||
              el.classList.contains("glass-card");
            gsap.fromTo(
              el,
              { y: isCard ? 24 : 36, opacity: 0, scale: isCard ? 0.97 : 1 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: isCard ? 0.65 : 0.8,
                ease: isCard ? "power2.out" : "power3.out",
                scrollTrigger: { trigger: el, start: "top 88%" },
              }
            );
          });

          /* ---- Counters ---- */
          gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
            const original = el.textContent?.trim() ?? "";
            const end = parseFloat(el.dataset.value ?? "0");
            const suffix = el.dataset.suffix ?? "";
            const obj = { v: 0 };
            el.textContent = formatCount(0, original, suffix);
            const tween = gsap.to(obj, {
              v: end,
              duration: 1.8,
              ease: "power2.out",
              paused: true,
              onUpdate: () => { el.textContent = formatCount(obj.v, original, suffix); },
              onComplete: () => { el.textContent = formatCount(end, original, suffix); },
            });
            if (ScrollTrigger.isInViewport(el)) {
              tween.play();
            } else {
              ScrollTrigger.create({
                trigger: el,
                start: "top 90%",
                once: true,
                onEnter: () => tween.play(),
              });
            }
          });

          /* ---- Gauges ---- */
          gsap.utils.toArray<SVGPathElement>("[data-gauge]").forEach((p) => {
            const dash = parseFloat(p.dataset.dash ?? "0");
            gsap.fromTo(
              p,
              { attr: { "stroke-dasharray": "0 9999" } },
              {
                attr: { "stroke-dasharray": `${dash} 9999` },
                duration: 1.4,
                ease: "power2.out",
                scrollTrigger: { trigger: p, start: "top 85%", once: true },
              }
            );
          });

          /* Process step detection is handled directly in Process.tsx
             via a native scroll listener — more reliable with Lenis. */

          const onLoad = () => ScrollTrigger.refresh();
          window.addEventListener("load", onLoad);

          return () => {
            window.removeEventListener("load", onLoad);
            if (tickerFn) gsap.ticker.remove(tickerFn);
            lenis?.destroy();
          };
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  /* Lenis works on native window scroll — no wrapper divs needed */
  return <div ref={root}>{children}</div>;
}
