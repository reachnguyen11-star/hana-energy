"use client";

import Image from "next/image";
import { ArrowUpRight, SunDim, Play, Lightning } from "@phosphor-icons/react/dist/ssr";
import { RotatingHeadline } from "@/components/anim/RotatingHeadline";
import { HeroScrubVideo } from "@/components/anim/HeroScrubVideo";
import { useT } from "@/contexts/LangContext";

export function Hero() {
  const t = useT();
  const h = t.hero;

  return (
    <section id="top" className="relative">
      <div className="relative w-full overflow-hidden bg-navy-900 aspect-[9/16] md:aspect-[16/9]">
        {/* LAYER 1: NIGHT → SUNRISE VIDEO, scrubbed by scroll */}
        <HeroScrubVideo />

        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/10 via-transparent to-navy-900/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/50 via-transparent to-transparent md:from-navy-900/40" />

        {/* LAYER 2: CONTENT */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end px-5 pb-16 pt-24 sm:px-8 lg:px-14 lg:pb-20">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">

            {/* LEFT: Badge + Heading + CTA */}
            <div className="max-w-2xl">
              <div
                data-reveal
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm"
              >
                <SunDim size={18} weight="fill" className="text-brand-300" />
                <span className="text-sm font-medium text-white/90">
                  {h.badge}
                </span>
              </div>

              <h1
                data-reveal
                className="font-sans text-4xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.4)] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]"
              >
                {h.h1First}
                <br />
                <RotatingHeadline phrases={h.rotatingPhrases} />
              </h1>

              <div data-reveal className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#giai-phap"
                  className="group inline-flex items-center gap-3 whitespace-nowrap rounded-full bg-white px-6 py-3.5 text-base font-bold text-navy transition-all hover:bg-brand-50 active:translate-y-px sm:px-7 sm:py-4"
                >
                  {h.cta1}
                  <ArrowUpRight size={20} weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="#lien-he"
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-white/25 bg-navy-900/35 px-6 py-3.5 text-base font-semibold text-white backdrop-blur-md transition-all hover:bg-navy-900/50 active:translate-y-px sm:py-4"
                >
                  {h.cta2}
                </a>
              </div>
            </div>

            {/* RIGHT: Glass cards (desktop only) */}
            <div className="hidden flex-shrink-0 lg:flex lg:flex-col lg:gap-3" style={{ width: "420px" }}>
              <div className="flex gap-3">
                <div data-hero-stat className="glass-card flex-1 rounded-2xl px-5 py-4">
                  <p className="text-3xl font-extrabold tracking-tight text-white">35%</p>
                  <p className="mt-1 text-xs font-medium text-white/60 leading-snug">
                    {h.stat1Label}
                  </p>
                </div>
                <div data-hero-stat className="glass-card flex-1 rounded-2xl px-5 py-4">
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-extrabold tracking-tight text-white">99+</p>
                    <Lightning size={20} weight="fill" className="text-brand-300" />
                  </div>
                  <p className="mt-1 text-xs font-medium text-white/60 leading-snug">
                    {h.stat2Label}
                  </p>
                </div>
              </div>

              <div data-hero-stat className="glass-card flex gap-4 rounded-2xl p-4">
                <div className="relative h-[120px] w-[140px] shrink-0 overflow-hidden rounded-xl bg-navy-900">
                  <Image
                    src="/Background_hana_energy_PC.webp"
                    alt="Hana solar project"
                    fill
                    sizes="140px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold leading-snug text-white">
                      {h.featureTitle}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/55 line-clamp-3">
                      {h.featureDesc}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <a
                      href="#du-an"
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/25"
                    >
                      {h.featureCta1}
                      <ArrowUpRight size={13} weight="bold" />
                    </a>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/25"
                    >
                      {h.featureCta2}
                      <Play size={12} weight="fill" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
