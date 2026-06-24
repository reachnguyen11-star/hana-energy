"use client";

import Image from "next/image";
import { Factory, SolarPanel } from "@phosphor-icons/react/dist/ssr";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useT } from "@/contexts/LangContext";

gsap.registerPlugin(ScrollTrigger);

export function Metrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useT();
  const m = t.metrics;

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    const st = { trigger: el, start: "top 80%", once: true };

    gsap.fromTo(
      el.querySelector<HTMLElement>("[data-bento-left]"),
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: st }
    );
    gsap.fromTo(
      el.querySelector<HTMLElement>("[data-bento-mid]"),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.85, ease: "power3.out", delay: 0.12, scrollTrigger: st }
    );
    gsap.fromTo(
      el.querySelector<HTMLElement>("[data-bento-right]"),
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.22, scrollTrigger: st }
    );

    const num21 = el.querySelector<HTMLElement>("[data-metric-21]");
    if (num21) {
      const obj = { v: 0 };
      gsap.to(obj, {
        v: 21,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: { trigger: num21, start: "top 88%", once: true },
        onUpdate: () => { num21.textContent = Math.round(obj.v) + "+"; },
        onComplete: () => { num21.textContent = "21+"; },
      });
    }

    const num30 = el.querySelector<HTMLElement>("[data-metric-30]");
    if (num30) {
      const obj = { v: 0 };
      gsap.to(obj, {
        v: 30,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: { trigger: num30, start: "top 88%", once: true },
        onUpdate: () => { num30.textContent = Math.round(obj.v) + "+"; },
        onComplete: () => { num30.textContent = "30+"; },
      });
    }
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="chi-so" className="relative z-20 mt-12 mb-20 px-5 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:auto-rows-[260px]">

          {/* Left col — spans 2 rows */}
          <div
            data-bento-left
            className="md:row-span-2 relative rounded-[2rem] overflow-hidden min-h-[300px] md:min-h-0 border border-black/5 shadow-sm"
          >
            <Image
              src="/039571c3-8e40-4dc0-a7d2-2551ce8c1cae.png"
              alt="Hana Energy Solar Panels"
              fill
              className="object-cover object-bottom"
            />
          </div>

          {/* Mid col */}
          <div data-bento-mid className="flex flex-col gap-4 md:col-span-1 md:row-span-2">

            {/* 21+ MWp */}
            <div className="flex-1 rounded-[2rem] border border-black/5 p-7 flex flex-col justify-between shadow-sm relative overflow-hidden">
              <Image
                src="/e3d55d99-26c6-4fa8-9380-c070305adb35.jpg"
                alt="Background"
                fill
                className="object-cover z-0"
              />
              <div className="relative z-10 flex justify-between items-start">
                <h3
                  data-metric-21
                  className="text-[3.5rem] leading-none font-extrabold text-white drop-shadow-md"
                >
                  21+
                </h3>
                <SolarPanel size={32} weight="fill" className="text-white drop-shadow-md" />
              </div>
              <div className="relative z-10 mt-6">
                <p className="font-bold text-white text-lg drop-shadow-md mb-1">{m.mwpUnit}</p>
                <p className="text-white/90 text-sm font-medium drop-shadow-md">
                  {m.mwpDesc}
                </p>
              </div>
            </div>

            {/* 30+ Projects */}
            <div className="flex-1 rounded-[2rem] border border-black/5 p-7 flex flex-col justify-between relative overflow-hidden shadow-sm">
              <Image
                src="/background-gradient-pc.webp"
                alt="Background"
                fill
                className="object-cover z-0"
              />
              <div className="relative z-10 flex justify-between items-start">
                <h3
                  data-metric-30
                  className="text-[3.5rem] leading-none font-extrabold text-white drop-shadow-md"
                >
                  30+
                </h3>
                <Factory size={32} weight="fill" className="text-white drop-shadow-md" />
              </div>
              <div className="relative z-10 mt-6">
                <p className="font-bold text-white text-lg drop-shadow-md mb-1">{m.projUnit}</p>
                <p className="text-white/90 text-sm font-medium drop-shadow-md">
                  {m.projDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Right col */}
          <div data-bento-right className="flex flex-col gap-4 md:col-span-1 md:row-span-2">
            <div className="flex-1 relative rounded-[2rem] overflow-hidden min-h-[240px] border border-black/5 shadow-sm">
              <Image
                src="/0624d58e-f831-45c9-9b5e-57a06cba9e38.png"
                alt="Hana Energy Wind Turbine"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 relative rounded-[2rem] overflow-hidden border border-black/5 shadow-sm min-h-[240px]">
              <Image
                src="/Untitled design (13).png"
                alt="Hana Logo Card"
                fill
                className="object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
