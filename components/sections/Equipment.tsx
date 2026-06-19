import Image from "next/image";
import {
  SunDim,
  Lightning,
  BatteryCharging,
  Wrench,
  CheckCircle,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import { EQUIPMENT } from "@/lib/data";

/* Logo thật trong /public/equipment/ — key khớp với brand name */
const BRAND_LOGOS: Record<string, string> = {
  "LONGi":    "/equipment/longi.png",
  "JA Solar": "/equipment/ja-solar.png",
  "Jinko":    "/equipment/jinko.png",
  "Huawei":   "/equipment/huawei.png",
  "Sungrow":  "/equipment/sungrow.png",
};

const ICONS = [SunDim, Lightning, BatteryCharging, Wrench];

const BENEFITS = [
  "Bảo hành chính hãng 12-25 năm",
  "Hiệu suất cao, suy hao thấp theo thời gian",
  "Đầy đủ chứng nhận CO/CQ & kiểm định",
];

export function Equipment() {
  return (
    <section className="bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-14">
          {/* ===== TRÁI: Intro + lợi ích ===== */}
          <div data-reveal className="lg:sticky lg:top-28">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">
              Tiêu chuẩn thiết bị
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-[1.12] tracking-tight text-navy sm:text-4xl">
              Chỉ dùng thiết bị Tier-1
            </h2>
            <p className="mt-4 max-w-md text-base text-navy/60">
              Hana lựa chọn các thương hiệu hàng đầu thế giới để đảm bảo hiệu suất và độ bền cho
              toàn bộ vòng đời hệ thống.
            </p>

            <ul className="mt-7 space-y-3">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle size={22} weight="fill" className="mt-0.5 shrink-0 text-brand-500" />
                  <span className="text-navy/80">{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-brand-100 bg-brand-50 px-5 py-4">
              <ShieldCheck size={30} weight="fill" className="shrink-0 text-brand-600" />
              <span className="text-sm font-semibold leading-tight text-brand-700">
                Cam kết thiết bị chính hãng,
                <br />
                truy xuất nguồn gốc minh bạch.
              </span>
            </div>
          </div>

          {/* ===== PHẢI: Lưới card thương hiệu ===== */}
          <div className="grid gap-4 sm:grid-cols-2">
            {EQUIPMENT.map((e, i) => {
              const Icon = ICONS[i];
              return (
                <article
                  key={e.category}
                  data-reveal
                  className="group flex flex-col rounded-[var(--radius-card)] border border-navy/8 bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_16px_50px_rgba(7,24,43,0.08)]"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                    <Icon size={26} weight="duotone" />
                  </span>
                  <h3 className="mt-5 font-bold text-navy">{e.category}</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {e.brands.map((b) => (
                      <li key={b}>
                        {BRAND_LOGOS[b] ? (
                          /* Logo thật: nền trắng, chiều cao cố định */
                          <div className="flex h-9 items-center rounded-xl border border-navy/8 bg-white px-3 py-1.5 shadow-sm transition-shadow hover:shadow-md">
                            <div className="relative h-5 w-20">
                              <Image
                                src={BRAND_LOGOS[b]}
                                alt={b}
                                fill
                                sizes="80px"
                                className="object-contain"
                              />
                            </div>
                          </div>
                        ) : (
                          <span className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-navy/70">
                            {b}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
