"use client";

import { useRef } from "react";
import Image from "next/image";
import Script from "next/script";
import useTilt from "@/hooks/useTilt";
import { SplineScene } from "@/components/ui/SplineScene";
import { WordReveal } from "@/components/ui/WordReveal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useT } from "@/contexts/LangContext";

gsap.registerPlugin(ScrollTrigger);

function SolarBadge() {
  return (
    <span
      data-solar-badge
      className="relative mx-1.5 inline-block rounded-full overflow-hidden"
      style={{
        background: "#8C8C86",
        verticalAlign: "middle",
        transform: "translateY(-0.1em)",
        width: "4.15em",
        height: "1.5em",
      }}
    >
      <span
        data-solar-text
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: "0.6em",
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          fontSize: "0.6em",
          fontWeight: 800,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.95)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        solar
      </span>
      <span
        data-solar-knob
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "0.25em",
          marginTop: "auto",
          marginBottom: "auto",
          width: "1em",
          height: "1em",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.92)",
          display: "block",
          zIndex: 2,
          boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
        }}
      >
        <span
          data-solar-knob-on
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 30%, #6EE7A0, #16A34A 75%)",
            opacity: 0,
          }}
        />
      </span>
    </span>
  );
}

type SolT = ReturnType<typeof useT>["solutions"];

function DarkCard({ s }: { s: SolT }) {
  const tiltRef = useTilt<HTMLDivElement>({ max: 10, parallax: 12, scale: 1.02, glow: true });

  return (
    <div
      ref={tiltRef}
      className="tilt-card card-dark relative overflow-hidden"
      style={{
        background: "url('/Background-gradient-1-1.png') center/cover no-repeat",
        borderRadius: "22px",
        height: "460px",
        padding: "26px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        willChange: "transform",
        transformStyle: "preserve-3d",
        transition: "transform 0.08s linear, box-shadow 0.35s ease",
        boxShadow: "0 4px 28px rgba(0,0,0,.22)",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0.042) 0px, transparent 1px, transparent 18px)",
          pointerEvents: "none",
          zIndex: 0,
          borderRadius: "inherit",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(74,222,128,0.15), transparent 55%)",
          pointerEvents: "none",
          zIndex: 1,
          borderRadius: "inherit",
          transition: "opacity 0.4s",
          opacity: 1,
        }}
      />
      <div
        data-tilt-illustration
        style={{
          position: "absolute",
          inset: "62px 14px 96px",
          zIndex: 1,
          borderRadius: "14px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "auto",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "240px",
            height: "240px",
            borderRadius: "50%",
            zIndex: 0,
            pointerEvents: "none",
            background: "radial-gradient(ellipse at center, rgba(134,239,172,0.22), rgba(74,222,128,0.07) 45%, transparent 70%)",
            animation: "pulse-glow 3.6s ease-in-out infinite",
          }}
        />
        <SplineScene />
      </div>
      <div
        data-tilt-inner
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          pointerEvents: "none",
        }}
      >
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.65)" }}>
            {s.darkTag}
          </span>
        </div>
        <p style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)" }}>
          <strong style={{ fontWeight: 600, color: "#fff" }}>{s.darkStrong}</strong>{" "}{s.darkDesc}
        </p>
      </div>
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.12); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

function LightCard({ s }: { s: SolT }) {
  const tiltRef = useTilt<HTMLDivElement>({ max: 8, parallax: 10, scale: 1.02, glow: false });

  return (
    <div
      ref={tiltRef}
      className="tilt-card card-light relative overflow-hidden"
      style={{
        background: "#E9E9E6",
        borderRadius: "22px",
        height: "460px",
        padding: "26px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        willChange: "transform",
        transformStyle: "preserve-3d",
        transition: "transform 0.08s linear, box-shadow 0.35s ease",
        boxShadow: "0 4px 18px rgba(0,0,0,.08)",
      }}
    >
      <div
        data-tilt-illustration
        style={{
          position: "absolute",
          inset: "62px 14px 96px",
          zIndex: 1,
          borderRadius: "14px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "auto",
        }}
      >
        <model-viewer
          src="/models/panel-solar.glb"
          auto-rotate
          rotation-per-second="30deg"
          camera-controls
          disable-zoom
          shadow-intensity="1"
          environment-image="neutral"
          style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
        ></model-viewer>
      </div>
      <div
        data-tilt-inner
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          pointerEvents: "none",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <div style={{ fontFamily: "var(--font-syne), sans-serif", fontWeight: 800, fontSize: "clamp(30px,4vw,46px)", color: "#0a0a0a", lineHeight: 1 }}>
            {s.lightStat}
          </div>
          <span style={{ fontSize: "12px", color: "#9a9a9a", marginTop: "4px", fontWeight: 500 }}>
            {s.lightStatLabel}
          </span>
        </div>
        <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#4a4a4a" }}>
          <strong style={{ fontWeight: 600, color: "#0a0a0a" }}>{s.lightStrong}</strong>{" "}{s.lightDesc}
        </p>
      </div>
      <div style={{ position: "absolute", left: "26px", bottom: "8px", zIndex: 3, fontSize: "10px", color: "#9a9a9a", pointerEvents: "auto" }}>
        {s.credit3dBy}{" "}
        <a href="https://sketchfab.com/lechmk" target="_blank" rel="noopener noreferrer" style={{ color: "#7a7a7a" }}>lech</a>{" "}·{" "}
        <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer" style={{ color: "#7a7a7a" }}>{s.credit3dLicense}</a>
      </div>
    </div>
  );
}

export function Solutions() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useT();
  const s = t.solutions;

  useGSAP(
    () => {
      const badge = sectionRef.current?.querySelector<HTMLElement>("[data-solar-badge]");
      if (!badge) return;

      const st = () => ({
        trigger: badge,
        start: "top 68%",
        end: "top 38%",
        scrub: 0.9,
        invalidateOnRefresh: true,
      });

      gsap.fromTo(badge,
        { backgroundColor: "#8C8C86" },
        { backgroundColor: "#1C1F2A", ease: "none", scrollTrigger: st() }
      );

      const knob = badge.querySelector<HTMLElement>("[data-solar-knob]");
      if (knob) {
        gsap.fromTo(knob,
          { x: 0 },
          {
            x: () => {
              const bRect = badge.getBoundingClientRect();
              const kRect = knob.getBoundingClientRect();
              const pad = kRect.left - bRect.left;
              return bRect.width - 2 * pad - kRect.width;
            },
            ease: "none",
            scrollTrigger: st(),
          }
        );
      }

      const knobOn = badge.querySelector<HTMLElement>("[data-solar-knob-on]");
      if (knobOn) {
        gsap.fromTo(knobOn,
          { opacity: 0 },
          { opacity: 1, ease: "none", scrollTrigger: st() }
        );
      }

      const text = badge.querySelector<HTMLElement>("[data-solar-text]");
      if (knob && text) {
        gsap.fromTo(text,
          { x: 0 },
          {
            x: () => {
              const bRect = badge.getBoundingClientRect();
              const kRect = knob.getBoundingClientRect();
              const tRect = text.getBoundingClientRect();
              const pad = kRect.left - bRect.left;
              const currentLeft = tRect.left - bRect.left;
              const extra = bRect.height * 0.067;
              return pad - currentLeft - extra;
            },
            ease: "none",
            scrollTrigger: st(),
          }
        );
      }

      gsap.fromTo("[data-sol-dark]",
        { x: -80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.95, ease: "power3.out",
          scrollTrigger: { trigger: "[data-sol-dark]", start: "top 82%", once: true },
        }
      );
      gsap.fromTo("[data-sol-light]",
        { x: 80, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.95, ease: "power3.out", delay: 0.1,
          scrollTrigger: { trigger: "[data-sol-light]", start: "top 82%", once: true },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <>
      <Script type="module" src="https://unpkg.com/@splinetool/viewer@1.12.97/build/spline-viewer.js" strategy="lazyOnload" />
      <Script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js" strategy="lazyOnload" />
      <section
        ref={sectionRef}
        id="giai-phap"
        className="bg-[#F4F5F2] py-16 sm:py-20 lg:py-32"
      >
        <div className="mx-auto max-w-[1100px] px-5 sm:px-6">

          <div className="mb-9 sm:mb-14">
            <WordReveal
              tag="h2"
              segments={[
                s.wordParts[0],
                <br key="br0" />,
                <SolarBadge key="badge" />,
                s.wordParts[1],
                <br key="br" />,
                s.wordParts[2],
              ]}
              className="font-black leading-[1.12] tracking-tight"
              style={{ fontSize: "clamp(1.6rem, 6vw, 3.4rem)" }}
              start="top 85%"
              end="bottom 25%"
            />

            <WordReveal
              tag="p"
              segments={[s.sub]}
              className="mt-3 font-black leading-[1.12] tracking-tight"
              style={{ fontSize: "clamp(1.6rem, 6vw, 3.4rem)" }}
              start="top 82%"
              end="bottom 22%"
            />
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div data-sol-dark><DarkCard s={s} /></div>
            <div data-sol-light><LightCard s={s} /></div>
          </div>
        </div>
      </section>
    </>
  );
}
