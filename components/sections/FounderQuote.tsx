"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useT } from "@/contexts/LangContext";

gsap.registerPlugin(ScrollTrigger);

export function FounderQuote() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useT();
  const fq = t.founderQuote;

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    const quoteCard   = el.querySelector<HTMLElement>("[data-quote-card]");
    const founderImg  = el.querySelector<HTMLElement>("[data-founder-img]");
    const quoteText   = el.querySelector<HTMLElement>("[data-quote-text]");
    const accentLine  = el.querySelector<HTMLElement>("[data-accent-line]");
    const attribution = el.querySelector<HTMLElement>("[data-attribution]");

    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 72%", once: true },
    });

    if (quoteCard) {
      tl.fromTo(quoteCard,
        { x: -70, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.0, ease: "power3.out" }
      );
    }
    if (founderImg) {
      tl.fromTo(founderImg,
        { x: 60, opacity: 0, scale: 0.94 },
        { x: 0, opacity: 1, scale: 1, duration: 1.0, ease: "power3.out" },
        "-=0.75"
      );
    }
    if (quoteText) {
      tl.fromTo(quoteText,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: "power2.out" },
        "-=0.5"
      );
    }
    if (accentLine) {
      tl.fromTo(accentLine,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.55, ease: "power3.out" },
        "-=0.45"
      );
    }
    if (attribution) {
      tl.fromTo(attribution,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.35"
      );
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="ve-chung-toi" className="relative overflow-hidden">
      <picture className="absolute inset-0 block h-full w-full">
        <source srcSet="/background-gradient-mobile.webp" media="(max-width: 767px)" />
        <img
          src="/background-gradient-pc.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </picture>

      <div className="relative z-10 mx-auto max-w-[1120px] px-5 py-20 sm:px-8 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1.18fr_0.82fr] lg:gap-14">

          {/* Quote card (LEFT) */}
          <div
            data-quote-card
            className="relative order-2 rounded-[28px] p-8 sm:p-10 lg:order-1 lg:p-12"
            style={{
              background:
                "linear-gradient(155deg, rgba(255,255,255,0.16), rgba(255,255,255,0.06))",
              backdropFilter: "blur(22px) saturate(125%)",
              WebkitBackdropFilter: "blur(22px) saturate(125%)",
              border: "1px solid rgba(255,255,255,0.26)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.28), 0 24px 60px -24px rgba(0,0,0,0.55)",
            }}
          >
            <span
              aria-hidden
              className="font-serif text-[3.5rem] leading-[0.2] text-white"
              style={{ opacity: 0.85 }}
            >
              {fq.openQuote}
            </span>

            <blockquote
              data-quote-text
              className="mt-2 text-2xl font-extrabold leading-[1.3] text-white sm:text-3xl lg:text-[2.3rem]"
            >
              {fq.quote}{" "}
              <em className="font-serif italic font-medium text-white">
                {fq.quoteEm}
              </em>
              <span className="font-serif not-italic text-white">.&rdquo;</span>
            </blockquote>

            <span
              data-accent-line
              className="mt-8 block h-[3px] w-12 rounded-full bg-[#34C36A]"
            />

            <div data-attribution className="mt-5">
              <p className="text-base font-bold text-white">{fq.name}</p>
              <p className="mt-0.5 text-sm text-white/65">{fq.role}</p>
            </div>
          </div>

          {/* Founder portrait (RIGHT) */}
          <div
            data-founder-img
            className="relative order-1 mx-auto w-full max-w-[400px] lg:order-2"
          >
            <div
              aria-hidden
              className="absolute -inset-4 rounded-[44px]"
              style={{
                background:
                  "radial-gradient(circle at 50% 45%, rgba(52,195,106,0.40), transparent 70%)",
                filter: "blur(26px)",
              }}
            />
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-[40px]"
              style={{
                background:
                  "linear-gradient(160deg, rgba(255,255,255,0.16), rgba(255,255,255,0.05))",
                backdropFilter: "blur(18px) saturate(135%)",
                WebkitBackdropFilter: "blur(18px) saturate(135%)",
                border: "1.5px solid rgba(190,255,214,0.55)",
                boxShadow:
                  "0 0 50px rgba(52,195,106,0.35), 0 28px 60px -24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.35)",
              }}
            >
              <Image
                src="/Founder-hanavn.png"
                alt={fq.name}
                fill
                sizes="(max-width: 1024px) 80vw, 400px"
                className="object-cover object-center drop-shadow-[0_16px_28px_rgba(0,0,0,0.35)]"
                unoptimized
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[40px]"
                style={{
                  background:
                    "linear-gradient(155deg, rgba(255,255,255,0.22) 0%, transparent 36%), radial-gradient(120% 80% at 50% 110%, rgba(6,20,13,0.35), transparent 60%)",
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
