"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useT } from "@/contexts/LangContext";

gsap.registerPlugin(ScrollTrigger);

type Card = ReturnType<typeof useT>["businessSolutions"]["cards"][number];

function BizCard({ card }: { card: Card }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = cardRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      gsap.to(el, {
        rotateY: (dx / (rect.width / 2)) * 8,
        rotateX: -(dy / (rect.height / 2)) * 8,
        scale: 1.04,
        duration: 0.35,
        ease: "power2.out",
        transformPerspective: 900,
        overwrite: "auto",
      });

      const pctX = ((e.clientX - rect.left) / rect.width) * 100;
      const pctY = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${pctX}%`);
      el.style.setProperty("--my", `${pctY}%`);
    };

    const handleLeave = () => {
      gsap.to(el, {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.7,
        ease: "elastic.out(1, 0.55)",
        transformPerspective: 900,
        overwrite: "auto",
      });
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      data-biz-card
      className="relative flex flex-col rounded-[20px] p-7 pt-6 cursor-default"
      style={{
        background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(8px) saturate(120%)",
        WebkitBackdropFilter: "blur(8px) saturate(120%)",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16), 0 8px 40px rgba(0,0,0,0.16)",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[20px]"
        style={{
          background:
            "radial-gradient(480px circle at var(--mx, 50%) var(--my, 50%), rgba(52,195,106,0.12), transparent 65%)",
          zIndex: 0,
        }}
      />

      <div className="relative z-10 flex flex-col flex-1">
        <p className="mb-5 text-[0.65rem] font-semibold tracking-[0.22em] uppercase text-white/55">
          {card.tag}
        </p>

        <div className="mb-5 h-px w-10 bg-white/40" />

        <div className="mb-1 flex flex-col gap-1">
          <h3
            className="font-black leading-[1.05] tracking-tight text-white"
            style={{ fontSize: "clamp(1.75rem, 2.8vw, 2.4rem)" }}
          >
            {card.titleTop}
          </h3>
          <h3
            className="font-black leading-[1.05] tracking-tight text-white/50"
            style={{ fontSize: "clamp(1.75rem, 2.8vw, 2.4rem)" }}
          >
            {card.titleBottom}
          </h3>
        </div>

        <div className="mt-5 mb-6 h-px w-10 bg-white/40" />

        <p className="mb-3 text-sm font-bold leading-snug text-white">
          {card.headline}
        </p>

        <p className="flex-1 text-xs leading-relaxed text-white/65">
          {card.desc}
        </p>

        <a
          href={card.href}
          className="mt-7 inline-flex w-fit items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold tracking-wide transition-opacity hover:opacity-85 active:scale-[0.97]"
          style={{ background: "#34C36A", color: "#0A1A0E" }}
        >
          {card.cta}
          <span aria-hidden>↗</span>
        </a>
      </div>
    </div>
  );
}

export function BusinessSolutions() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useT();
  const bs = t.businessSolutions;

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.fromTo(
      el.querySelectorAll("[data-biz-card]"),
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.14,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 78%", once: true },
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="giai-phap-dn" className="relative overflow-hidden" style={{ minHeight: "70vh" }}>

      <picture className="absolute inset-0 block w-full h-full">
        <source srcSet="/Background_hana_energy_mobile.webp" media="(max-width: 767px)" />
        <img
          src="/Background_hana_energy_PC.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          decoding="sync"
        />
      </picture>

      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(8,14,26,0.50) 0%, rgba(8,14,26,0.15) 38%, rgba(8,14,26,0.20) 62%, rgba(8,14,26,0.65) 100%)",
        }}
      />

      <div className="relative z-[2] mx-auto max-w-[1200px] px-5 sm:px-8 py-14 sm:py-20 lg:py-28">

        <p className="mb-8 sm:mb-10 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: "#34C36A" }}>
          {bs.sectionLabel}
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          {bs.cards.map((card) => (
            <BizCard key={card.tag} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
