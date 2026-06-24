"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MUTED = "#B8B8B2";
const INK = "#0E1B2A";

interface WordRevealProps {
  /** Pass text as plain strings + ReactNode for inline elements (badges, etc.) */
  segments: Array<string | ReactNode>;
  className?: string;
  style?: React.CSSProperties;
  tag?: "h1" | "h2" | "h3" | "p";
  /** Where in the viewport the animation starts (default "top 82%") */
  start?: string;
  /** Where it ends (default "bottom 30%") */
  end?: string;
  scrub?: number;
}

/**
 * Splits string segments into word spans and scroll-animates them
 * from muted grey → ink color. ReactNode segments (badges etc.) pass through.
 */
export function WordReveal({
  segments,
  className = "",
  style,
  tag: Tag = "h2",
  start = "top 82%",
  end = "bottom 30%",
  scrub = 0.8,
}: WordRevealProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const spans = el.querySelectorAll<HTMLSpanElement>(".wr-word");
      if (!spans.length) return;

      gsap.fromTo(
        spans,
        { color: MUTED },
        {
          color: INK,
          stagger: 0.06,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub,
          },
        }
      );
    },
    { scope: containerRef }
  );

  function renderSegment(seg: string | ReactNode, segIdx: number) {
    if (typeof seg !== "string") {
      return <span key={`seg-${segIdx}`}>{seg}</span>;
    }
    return seg.split(/\s+/).filter(Boolean).map((word, wIdx) => (
      <span
        key={`${segIdx}-${wIdx}`}
        className="wr-word inline-block"
        style={{ color: MUTED, marginRight: "0.22em" }}
      >
        {word}
      </span>
    ));
  }

  return (
    <Tag
      ref={containerRef as React.RefObject<HTMLHeadingElement>}
      className={className}
      style={style}
    >
      {segments.map((seg, i) => renderSegment(seg, i))}
    </Tag>
  );
}
