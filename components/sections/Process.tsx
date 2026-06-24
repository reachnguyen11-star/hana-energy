"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PROCESS } from "@/lib/data";
import { useT } from "@/contexts/LangContext";

export function Process() {
  const [activeIdx, setActiveIdx] = useState(0);
  const t = useT();
  const p = t.process;

  useEffect(() => {
    const steps = Array.from(
      document.querySelectorAll<HTMLElement>("[data-proc-step]")
    );

    function onScroll() {
      const threshold = window.innerHeight * 0.6;
      let active = 0;
      steps.forEach((step, i) => {
        if (step.getBoundingClientRect().top < threshold) active = i;
      });

      steps.forEach((s, k) => {
        s.classList.toggle("is-active", k === active);
        s.classList.toggle("opacity-40", k !== active);
      });

      setActiveIdx(active);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const activeStepT = p.steps[activeIdx];

  return (
    <section id="quy-trinh" className="relative bg-[#F4F5F2] py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-[1100px] px-5 sm:px-6">

        <div className="mb-6 bg-[#F4F5F2]">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#34C36A]">
            {p.sectionLabel}
          </p>
          <h2 className="mt-4 max-w-xl text-[1.7rem] font-extrabold leading-[1.12] tracking-tight text-[#0E1B2A] sm:text-4xl lg:text-[2.6rem]">
            <em className="not-italic">{p.headingNormal}</em>{" "}
            <em className="italic font-extrabold">{p.headingItalic}</em>{" "}
            {p.headingTail}
          </h2>
          <p className="mt-4 max-w-lg text-base text-[#7A7A7A]">
            {p.sub}
          </p>
        </div>

        <div className="grid items-start gap-10 lg:gap-14 lg:grid-cols-[0.9fr_1.1fr]">

          {/* LEFT: Sticky image card */}
          <div className="lg:sticky lg:top-[14vh]">
            <div
              className="relative overflow-hidden rounded-[22px] bg-[#0E1524] shadow-[0_32px_80px_-30px_rgba(14,21,36,0.45)]"
              style={{ aspectRatio: "4/3" }}
            >
              {PROCESS.map((proc, i) => (
                <div
                  key={proc.step}
                  className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                  style={{ opacity: activeIdx === i ? 1 : 0, zIndex: activeIdx === i ? 1 : 0 }}
                >
                  <Image
                    src={proc.image}
                    alt={p.steps[i].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 500px"
                    priority={i === 0}
                  />
                </div>
              ))}

              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to top, rgba(14,21,36,0.88) 0%, rgba(14,21,36,0.25) 55%, transparent 100%)",
                  zIndex: 2,
                }}
              />

              <div className="absolute top-5 left-6 z-10">
                <span
                  className="inline-block rounded-full px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em]"
                  style={{ background: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.65)", backdropFilter: "blur(8px)" }}
                >
                  {activeStepT.step} / 05
                </span>
                <p
                  key={activeIdx}
                  className="mt-2 text-sm font-bold text-white leading-snug animate-fade-in"
                  style={{ maxWidth: "160px" }}
                >
                  {activeStepT.title}
                </p>
              </div>

              <div className="absolute bottom-6 left-7 z-10">
                <p className="text-[3.5rem] font-extrabold leading-none tracking-tight text-[#34C36A]">
                  {String(activeIdx + 1).padStart(2, "0")}
                </p>
                <p className="mt-1 text-sm font-medium text-white/60">{p.totalLabel}</p>
              </div>
            </div>
          </div>

          {/* RIGHT: Scrollable steps */}
          <div className="flex flex-col divide-y divide-[#0E1B2A]/10">
            {p.steps.map((step, i) => {
              const isActive = activeIdx === i;
              return (
                <div
                  key={step.step}
                  data-proc-step={i}
                  className={`proc-step grid grid-cols-[2.5rem_1fr] items-start gap-3 px-1 py-6 first:pt-0 transition-all duration-300 sm:gap-4 sm:px-2 sm:py-9 lg:px-4 ${
                    isActive ? "is-active" : "opacity-40"
                  }`}
                >
                  <span
                    className={`proc-step-num mt-0.5 font-mono font-bold tabular-nums transition-all duration-300 ${
                      isActive ? "text-xl text-[#34C36A]" : "text-sm text-[#0E1B2A]/25"
                    }`}
                  >
                    {step.step}
                  </span>

                  <div>
                    <h4
                      className={`proc-step-title font-bold leading-snug text-[#0E1B2A] transition-all duration-300 ${
                        isActive ? "text-xl lg:text-2xl" : "text-base"
                      }`}
                    >
                      {step.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#7A7A7A]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
