"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useT } from "@/contexts/LangContext";

const PARTNERS = [
  { name: "Đức Thành",            logo: "/partners/duc-thanh.png" },
  { name: "HM",                   logo: "/partners/hm.png" },
  { name: "Thuận An Paper Group", logo: "/partners/thuan-an-paper.png" },
  { name: "BCG Energy",           logo: "/partners/bcg-energy.png" },
  { name: "Phu Chau",             logo: "/partners/phu-chau.png" },
  { name: "ĐVJ",                  logo: "/partners/dvj.png" },
  { name: "Golden Gate",          logo: "/partners/Golden-Gate-Logo-Chuan-5.png" },
] as const;

const TRACK = [...PARTNERS, ...PARTNERS];

const EDGE_FADE =
  "linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%)";

export function Partners() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const t = useT();

  useGSAP(
    () => {
      if (!trackRef.current) return;
      tweenRef.current = gsap.to(trackRef.current, {
        xPercent: -50,
        ease: "none",
        duration: 30,
        repeat: -1,
      });
    },
    { scope: trackRef }
  );

  return (
    <section className="bg-cream py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <p
          data-reveal
          className="text-center text-sm font-medium uppercase tracking-[0.18em] text-navy/40"
        >
          {t.partners.label}
        </p>

        <div
          data-reveal
          className="mt-7 overflow-hidden rounded-[var(--radius-card)] border border-navy/8 bg-paper"
          onMouseEnter={() => tweenRef.current?.pause()}
          onMouseLeave={() => tweenRef.current?.resume()}
        >
          <div
            className="relative py-9"
            style={{ WebkitMaskImage: EDGE_FADE, maskImage: EDGE_FADE }}
          >
            <div
              ref={trackRef}
              className="flex w-max items-center gap-14 px-7 will-change-transform sm:gap-20"
            >
              {TRACK.map((p, i) => (
                <div
                  key={`${p.name}-${i}`}
                  className="relative h-12 w-[140px] shrink-0"
                  title={p.name}
                >
                  <Image
                    src={p.logo}
                    alt={p.name}
                    fill
                    sizes="140px"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
