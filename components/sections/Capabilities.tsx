import { SealCheck } from "@phosphor-icons/react/dist/ssr";
import { HERO_STATS, COMPANY } from "@/lib/data";

export function Capabilities() {
  return (
    <section id="ve-chung-toi" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <div className="overflow-hidden rounded-[var(--radius-hero)] bg-navy-900 px-6 py-12 sm:px-12 lg:px-16 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-16">
          {/* Trái: thông điệp năng lực */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-500/15 px-4 py-1.5 text-sm font-semibold text-brand-300">
              <SealCheck size={18} weight="fill" />
              Chứng chỉ &amp; Năng lực
            </span>
            <h2 data-reveal className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-4xl">
              Năng lực được chứng minh qua từng con số
            </h2>
            <p data-reveal className="mt-4 max-w-md text-white/65">
              {COMPANY.philosophy.join(" - ")}. Hana cam kết chất lượng và sự minh bạch trong mọi dự án.
            </p>
          </div>

          {/* Phải: dải số liệu */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-8 sm:gap-x-14">
            {HERO_STATS.map((s) => (
              <div key={s.label} data-reveal>
                <p
                  data-counter
                  data-value={s.value}
                  data-suffix={s.suffix}
                  className="text-4xl font-extrabold tracking-tight text-brand-400 sm:text-5xl"
                >
                  {s.display}
                </p>
                <p className="mt-1 text-sm text-white/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
