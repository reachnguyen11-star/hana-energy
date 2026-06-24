"use client";

import Image from "next/image";
import {
  SunDim,
  Lightning,
  BatteryCharging,
  Wrench,
  CheckCircle,
  ShieldCheck,
  Star,
} from "@phosphor-icons/react/dist/ssr";
import { EQUIPMENT } from "@/lib/data";
import { useT } from "@/contexts/LangContext";

const CATEGORY_ICONS = [SunDim, Lightning, BatteryCharging, Wrench];

export function Equipment() {
  const t = useT();
  const eq = t.equipment;

  return (
    <section id="thiet-bi" className="relative py-16 sm:py-20 lg:py-28">
      <div className="max-w-[1100px] mx-auto px-5 sm:px-6">

        <div className="text-on-image text-center mb-10 sm:mb-14">
          <p className="text-brand-300 text-sm font-semibold uppercase tracking-widest mb-3">
            {eq.sectionLabel}
          </p>
          <h2 className="text-white text-3xl sm:text-4xl font-bold leading-tight mb-4">
            {eq.headingPrefix}{" "}
            <em className="text-[#5FD089] font-serif not-italic italic">
              {eq.headingEm}
            </em>
          </h2>
          <p className="text-white/90 text-base max-w-xl mx-auto leading-relaxed">
            {eq.sub}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {eq.items.map((item, idx) => {
            const Icon = CATEGORY_ICONS[idx % CATEGORY_ICONS.length];
            const brands = EQUIPMENT[idx]?.brands ?? [];
            return (
              <div
                key={item.category}
                data-reveal
                className="flex flex-col bg-[#0E1B2A]/15 border border-white/15 rounded-[16px] p-7 backdrop-blur-sm hover:bg-[#0E1B2A]/25 hover:border-brand-500/40 transition-all duration-300"
              >
                <Icon weight="duotone" size={28} className="text-brand-300 mb-4" />
                <h3 className="text-white font-bold text-base mb-1">
                  {item.category}
                </h3>
                <p className="text-white/65 text-xs leading-relaxed mb-5">
                  {item.desc}
                </p>

                <div className="mt-auto flex flex-row items-center gap-3 w-full">
                  {brands.map((brand) =>
                    brand.logo ? (
                      <span
                        key={brand.name}
                        title={brand.name}
                        className="inline-flex h-11 items-center justify-start min-w-0"
                      >
                        <Image
                          src={brand.logo}
                          alt={brand.name}
                          width={140}
                          height={42}
                          className={`${
                            ["Jinko", "Huawei", "Sungrow"].includes(brand.name) ? "h-[36px] sm:h-[42px]" : "h-[24px]"
                          } w-auto max-w-full object-contain brightness-0 invert opacity-90`}
                        />
                      </span>
                    ) : (
                      <span
                        key={brand.name}
                        className="inline-flex items-center rounded-lg bg-white/[0.08] px-3.5 py-2.5 text-xs font-semibold text-white/70"
                      >
                        {brand.name}
                      </span>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 mx-auto w-fit flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-9 rounded-2xl border border-white/15 bg-[#0E1B2A]/15 px-7 py-4 backdrop-blur-sm">
          {eq.benefits.map((benefit, i) => {
            const BenefitIcon = [CheckCircle, ShieldCheck, Star][i % 3];
            return (
              <div key={i} className="flex items-center gap-2">
                <BenefitIcon weight="duotone" size={20} className="text-brand-300 shrink-0" />
                <span className="text-white/90 text-sm">{benefit}</span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
