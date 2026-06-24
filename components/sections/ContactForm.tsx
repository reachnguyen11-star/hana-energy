"use client";

import { useRef } from "react";
import { Phone, EnvelopeSimple, MapPin } from "@phosphor-icons/react/dist/ssr";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useT } from "@/contexts/LangContext";
import { COMPANY } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useT();
  const c = t.contact;

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    const st = { trigger: el, start: "top 78%", once: true };

    gsap.fromTo(
      el.querySelector("[data-contact-left]"),
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.9, ease: "power3.out", scrollTrigger: st }
    );
    gsap.fromTo(
      el.querySelector("[data-contact-form]"),
      { y: 40, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out", delay: 0.18, scrollTrigger: st }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="lien-he" className="bg-[#F4F5F2] py-16 sm:py-20 lg:py-32">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-start">

          {/* LEFT — CTA Copy */}
          <div data-contact-left>
            <p className="text-xs font-semibold tracking-widest uppercase text-[#1AA64B] mb-4">
              {c.sectionLabel}
            </p>

            <h2 className="text-4xl lg:text-5xl font-black text-[#0E1B2A] leading-[1.1]">
              {c.heading1}
              <br />
              <em className="font-black italic"> {c.heading2}</em>
            </h2>

            <p className="text-[#7A7A7A] leading-relaxed mt-5 text-base">
              {c.sub}
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={`tel:${COMPANY.hotline.replace(/\s/g, "")}`}
                className="flex gap-3 items-center text-[#0E1B2A] font-bold text-xl hover:text-[#1AA64B] transition-colors"
              >
                <Phone size={24} weight="bold" className="shrink-0 text-[#1AA64B]" />
                {COMPANY.hotline}
              </a>

              <a
                href={`mailto:${COMPANY.email}`}
                className="flex gap-3 items-center text-[#7A7A7A] text-sm hover:text-[#1AA64B] transition-colors"
              >
                <EnvelopeSimple size={20} weight="regular" className="shrink-0 text-[#1AA64B]" />
                {COMPANY.email}
              </a>

              <div className="flex gap-3 items-start text-[#7A7A7A] text-sm">
                <MapPin size={20} weight="regular" className="shrink-0 text-[#1AA64B] mt-0.5" />
                <span>{COMPANY.address}</span>
              </div>
            </div>
          </div>

          {/* RIGHT — Contact Form */}
          <div
            data-contact-form
            className="bg-white rounded-[22px] border border-[#0E1B2A]/[0.08] p-8 shadow-[0_16px_60px_rgba(14,27,42,0.08)]"
          >
            <form
              action={`mailto:${COMPANY.email}`}
              method="post"
              encType="text/plain"
              className="space-y-5"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#0E1B2A] uppercase tracking-wide">
                  {c.fieldName}
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder={c.fieldNamePlaceholder}
                  className="w-full border border-[#0E1B2A]/[0.12] rounded-xl px-4 py-3 text-[#0E1B2A] placeholder-[#7A7A7A]/60 focus:outline-none focus:border-[#1AA64B] text-sm bg-[#F4F5F2] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#0E1B2A] uppercase tracking-wide">
                  {c.fieldPhone}
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder={c.fieldPhonePlaceholder}
                  className="w-full border border-[#0E1B2A]/[0.12] rounded-xl px-4 py-3 text-[#0E1B2A] placeholder-[#7A7A7A]/60 focus:outline-none focus:border-[#1AA64B] text-sm bg-[#F4F5F2] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#0E1B2A] uppercase tracking-wide">
                  {c.fieldEmail}
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder={c.fieldEmailPlaceholder}
                  className="w-full border border-[#0E1B2A]/[0.12] rounded-xl px-4 py-3 text-[#0E1B2A] placeholder-[#7A7A7A]/60 focus:outline-none focus:border-[#1AA64B] text-sm bg-[#F4F5F2] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#0E1B2A] uppercase tracking-wide">
                  {c.fieldService}
                </label>
                <select
                  name="service"
                  className="w-full border border-[#0E1B2A]/[0.12] rounded-xl px-4 py-3 text-[#0E1B2A] focus:outline-none focus:border-[#1AA64B] text-sm bg-[#F4F5F2] transition-colors appearance-none cursor-pointer"
                >
                  <option value="">{c.fieldServicePlaceholder}</option>
                  {c.services.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#0E1B2A] uppercase tracking-wide">
                  {c.fieldCapacity}
                </label>
                <select
                  name="capacity"
                  className="w-full border border-[#0E1B2A]/[0.12] rounded-xl px-4 py-3 text-[#0E1B2A] focus:outline-none focus:border-[#1AA64B] text-sm bg-[#F4F5F2] transition-colors appearance-none cursor-pointer"
                >
                  <option value="">{c.fieldCapacityPlaceholder}</option>
                  {c.capacities.map((cap) => (
                    <option key={cap.value} value={cap.value}>{cap.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#0E1B2A] uppercase tracking-wide">
                  {c.fieldMessage}{" "}
                  <span className="text-[#7A7A7A] normal-case font-normal">{c.fieldMessageOptional}</span>
                </label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder={c.fieldMessagePlaceholder}
                  className="w-full border border-[#0E1B2A]/[0.12] rounded-xl px-4 py-3 text-[#0E1B2A] placeholder-[#7A7A7A]/60 focus:outline-none focus:border-[#1AA64B] text-sm bg-[#F4F5F2] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-[#1AA64B] text-white font-bold py-4 text-base hover:bg-[#138A3E] transition-colors mt-2"
              >
                {c.submit}
              </button>
            </form>

            <p className="text-xs text-[#7A7A7A] text-center mt-3">
              {c.commitment}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
