"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type Phrase = { text: string; final: boolean };

const HOLD = 2;
const DUR = 0.7;

export function RotatingHeadline({ phrases }: { phrases: readonly Phrase[] }) {
  const wrapRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(
        "[data-rot-item]",
        wrapRef.current
      );
      if (!items.length) return;

      const finalIdx = items.length - 1;

      gsap.set(items, { yPercent: 100 });
      gsap.set(items[0], { yPercent: 0 });

      const tl = gsap.timeline({ delay: 0.6 });

      for (let i = 1; i < items.length; i++) {
        tl.to(
          items[i - 1],
          { yPercent: -100, duration: DUR, ease: "power2.inOut" },
          `+=${HOLD}`
        ).to(
          items[i],
          { yPercent: 0, duration: DUR, ease: "power2.inOut" },
          "<"
        );
      }

      tl.fromTo(
        items[finalIdx],
        { filter: "drop-shadow(0 0 0px rgba(26,166,75,0))" },
        {
          filter: "drop-shadow(0 0 14px rgba(26,166,75,0.55))",
          duration: 0.5,
          ease: "power2.out",
        },
        ">-0.1"
      );
    },
    { scope: wrapRef, dependencies: [phrases] }
  );

  return (
    <span
      ref={wrapRef}
      aria-label={phrases[phrases.length - 1].text}
      style={{
        display: "inline-grid",
        overflow: "hidden",
        lineHeight: 1.15,
        paddingBottom: "0.08em",
      }}
    >
      {phrases.map((p, i) => (
        <span
          key={i}
          data-rot-item
          aria-hidden
          className={`italic ${p.final ? "bg-gradient-to-r from-white to-[#1AA64B] bg-clip-text text-transparent" : "text-white"}`}
          style={{
            gridArea: "1 / 1",
            whiteSpace: "nowrap",
            willChange: "transform",
          }}
        >
          {p.text}
        </span>
      ))}
    </span>
  );
}
