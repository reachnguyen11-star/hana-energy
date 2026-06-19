"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

/* Định dạng số cho counter — giữ leading-zero kiểu "06", giữ suffix (+, %). */
function formatCount(value: number, original: string, suffix: string) {
  const padded = /^0\d/.test(original) ? String(Math.round(value)).padStart(2, "0") : String(Math.round(value));
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

          /* ----- prefers-reduced-motion: hiện tĩnh, không animation ----- */
          if (reduce) {
            gsap.set("[data-reveal], [data-hero-stat]", { opacity: 1, y: 0 });
            return;
          }

          /* ----- ScrollSmoother: mượt như video (chỉ desktop) ----- */
          let smoother: ScrollSmoother | undefined;
          if (isDesktop) {
            smoother = ScrollSmoother.create({
              wrapper: "#smooth-wrapper",
              content: "#smooth-content",
              smooth: 1.2,
              effects: true,
              normalizeScroll: true,
            });
          }

          /* ----- HERO: stat cards bay vào staggered khi load ----- */
          gsap.fromTo(
            "[data-hero-stat]",
            { y: 32, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out", delay: 0.15 }
          );

          /* (Bỏ parallax nền hero: banner hiển thị TRỌN ảnh theo tỉ lệ nên
             không có vùng dư để dịch chuyển — parallax sẽ làm hở mép.) */

          /* ----- Reveal on scroll: heading fade-up, cards scale+fade ----- */
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

          /* ----- Counter: đếm tăng khi vào viewport (snap số nguyên) ----- */
          gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
            const original = el.textContent?.trim() ?? "";
            const end = parseFloat(el.dataset.value ?? "0");
            const suffix = el.dataset.suffix ?? "";
            const obj = { v: 0 };
            el.textContent = formatCount(0, original, suffix); // tránh nháy số cuối → 0
            const tween = gsap.to(obj, {
              v: end,
              duration: 1.8,
              ease: "power2.out",
              paused: true,
              onUpdate: () => {
                el.textContent = formatCount(obj.v, original, suffix);
              },
              onComplete: () => {
                el.textContent = formatCount(end, original, suffix);
              },
            });
            // Above-the-fold (đã trong viewport) → chạy ngay khi load.
            // Below-the-fold → đợi scroll tới.
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

          /* ----- Gauge: vẽ cung khi vào viewport ----- */
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

          /* ----- PROCESS: drive active step + visual via scroll ---- */
          const procSteps = gsap.utils.toArray<HTMLElement>("[data-proc-step]");
          const procImgs = gsap.utils.toArray<HTMLElement>("[data-proc-img]");
          const procCounter = document.querySelector<HTMLElement>("[data-proc-counter]");

          if (procSteps.length > 0 && procImgs.length > 0) {
            function setProcessStep(idx: number) {
              procSteps.forEach((s, k) => {
                s.classList.toggle("is-active", k === idx);
                s.classList.toggle("opacity-40", k !== idx);
              });
              procImgs.forEach((v, k) => {
                v.style.opacity = k === idx ? "1" : "0";
              });
              if (procCounter) {
                procCounter.textContent = String(idx + 1).padStart(2, "0");
              }
            }

            const procSection = document.querySelector<HTMLElement>("#quy-trinh");

            if (isDesktop && procSection) {
              /* Desktop: pin section, advance step theo scroll scrub.
                 Mỗi bước = 25% viewport → 8 bước = 200% tổng pin height. */
              ScrollTrigger.create({
                trigger: procSection,
                start: "top top",
                end: `+=${procSteps.length * 25}%`,
                pin: true,
                scrub: 0.6,
                onUpdate: (self) => {
                  const idx = Math.min(
                    Math.floor(self.progress * procSteps.length),
                    procSteps.length - 1
                  );
                  setProcessStep(idx);
                },
              });
            } else {
              /* Mobile: trigger 1 lần khi từng bước vào viewport */
              procSteps.forEach((step, i) => {
                ScrollTrigger.create({
                  trigger: step,
                  start: "top 65%",
                  once: true,
                  onEnter: () => setProcessStep(i),
                });
              });
            }
          }

          /* Căn lại trigger sau khi ảnh/font tải xong (tránh lệch start). */
          const onLoad = () => ScrollTrigger.refresh();
          window.addEventListener("load", onLoad);

          return () => {
            window.removeEventListener("load", onLoad);
            smoother?.kill();
          };
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      <div id="smooth-wrapper">
        <div id="smooth-content">{children}</div>
      </div>
    </div>
  );
}
