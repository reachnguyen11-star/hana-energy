"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useT } from "@/contexts/LangContext";

gsap.registerPlugin(ScrollTrigger);

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useT();
  const m = t.manifesto;

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    const leftEl  = el.querySelector("[data-manifesto-left]");
    const rightEl = el.querySelector("[data-manifesto-right]");

    if (leftEl) {
      gsap.fromTo(
        leftEl.querySelectorAll(":scope > *"),
        { x: -45, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.13,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: leftEl, start: "top 80%", once: true },
        }
      );
    }

    if (rightEl) {
      gsap.fromTo(
        el.querySelectorAll("[data-report-card]"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.13,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: rightEl, start: "top 82%", once: true },
        }
      );
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 lg:py-28 bg-[#F4F5F2]">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-6">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-14 items-center">

          {/* LEFT — Manifesto quote */}
          <div data-manifesto-left>
            <span className="text-xs font-bold uppercase tracking-widest text-[#1AA64B]">
              {m.sectionLabel}
            </span>

            <h2 className="text-4xl lg:text-5xl font-black leading-[1.1] tracking-tight text-[#0E1B2A] mt-4">
              {m.headingStart}{" "}
              <span className="font-serif italic">{m.headingEm}</span>.
            </h2>

            <p className="text-[#7A7A7A] leading-relaxed mt-5">
              {m.body}
            </p>

            <a
              href="#lien-he"
              className="inline-flex items-center gap-2 text-[#1AA64B] font-semibold mt-8 hover:underline"
            >
              {m.cta}
            </a>
          </div>

          {/* RIGHT — Report insight cards */}
          <div data-manifesto-right className="flex flex-col gap-4">
            {m.reportCards.map((card) => (
              <div
                key={card.chip}
                data-report-card
                className="bg-white rounded-[16px] border border-[#0E1B2A]/[0.08] p-6"
              >
                <span className="text-xs font-bold uppercase text-[#7A7A7A] border border-[#0E1B2A]/[0.12] px-2 py-0.5 rounded-full">
                  {card.chip}
                </span>

                <h3 className="font-extrabold text-[#0E1B2A] leading-snug mt-3">
                  {card.title}
                </h3>

                <a
                  href="#"
                  className="inline-block text-sm font-semibold text-[#1AA64B] mt-3 hover:underline"
                >
                  {m.readMore}
                </a>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
