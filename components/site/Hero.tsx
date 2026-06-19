import Image from "next/image";
import { SealCheck, ArrowUpRight, SunDim, Play, Lightning } from "@phosphor-icons/react/dist/ssr";
import { HERO_METRICS } from "@/lib/data";

export function Hero() {
  return (
    <section id="top" className="relative">
      {/* ===================================================================
          CONTAINER HERO — full-bleed banner.
          Tỉ lệ: 16:9 (desktop) · 9:16 (mobile).
          =================================================================== */}
      <div className="relative w-full overflow-hidden bg-navy-900 aspect-[9/16] md:aspect-[16/9]">
        {/* ---------- LAYER 1: BANNER ---------- */}
        <div data-hero-bg className="absolute inset-0">
          {/* Mobile: banner dọc 9:16 */}
          <Image
            src="/Hana_Energy_PC_banner_mobile.png"
            alt="Hana Energy - nhà máy năng lượng mặt trời tương lai trên đồi xanh"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center md:hidden"
          />
          {/* Desktop: banner ngang 16:9 */}
          <Image
            src="/Hana_Energy_PC_banner_PC.png"
            alt="Hana Energy - nhà máy năng lượng mặt trời tương lai trên đồi xanh"
            fill
            priority
            sizes="100vw"
            className="hidden object-cover object-center md:block"
          />
        </div>

        {/* Scrim — gradient tối ở đáy & trên cùng cho nav + nội dung đọc rõ */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/30 via-transparent to-navy-900/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/50 via-transparent to-transparent md:from-navy-900/40" />

        {/* ---------- LAYER 2: NỘI DUNG HERO (heading trái + cards phải) ---------- */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end px-5 pb-16 pt-24 sm:px-8 lg:px-14 lg:pb-20">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">

            {/* ======= TRÁI: Badge + Heading + CTA ======= */}
            <div className="max-w-2xl">
              {/* Pill badge */}
              <div
                data-reveal
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
              >
                <SunDim size={18} weight="fill" className="text-brand-300" />
                <span className="text-sm font-medium text-white/90">
                  Đổi mới. Năng lượng. Phát triển.
                </span>
              </div>

              {/* Heading chính */}
              <h1
                data-reveal
                className="font-sans text-4xl font-extrabold leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.4)] sm:text-5xl lg:text-[3.5rem] xl:text-[4rem]"
              >
                Năng Lượng Sạch,
                <br />
                <span className="italic text-brand-300">
                  Khả Năng Vô Hạn
                </span>
              </h1>

              {/* CTA */}
              <div data-reveal className="mt-8 flex items-center gap-3">
                <a
                  href="#giai-phap"
                  className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-base font-bold text-navy transition-all hover:bg-brand-50 active:translate-y-px"
                >
                  Bắt đầu ngay
                  <ArrowUpRight size={20} weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="#lien-he"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:translate-y-px"
                >
                  Tư vấn miễn phí
                </a>
              </div>
            </div>

            {/* ======= PHẢI: Glass cards (ẩn mobile, hiện desktop) ======= */}
            <div className="hidden flex-shrink-0 lg:flex lg:flex-col lg:gap-3" style={{ width: "420px" }}>
              {/* Hàng trên: 2 stat cards nhỏ */}
              <div className="flex gap-3">
                {/* Card stat 1: 35% */}
                <div
                  data-hero-stat
                  className="glass-card flex-1 rounded-2xl px-5 py-4"
                >
                  <p className="text-3xl font-extrabold tracking-tight text-white">35%</p>
                  <p className="mt-1 text-xs font-medium text-white/60 leading-snug">
                    Giảm chi phí điện năng tiêu thụ
                  </p>
                </div>
                {/* Card stat 2: 99+ */}
                <div
                  data-hero-stat
                  className="glass-card flex-1 rounded-2xl px-5 py-4"
                >
                  <div className="flex items-baseline gap-2">
                    <p className="text-3xl font-extrabold tracking-tight text-white">99+</p>
                    <Lightning size={20} weight="fill" className="text-brand-300" />
                  </div>
                  <p className="mt-1 text-xs font-medium text-white/60 leading-snug">
                    Doanh nghiệp đồng hành
                  </p>
                </div>
              </div>

              {/* Card lớn phía dưới: Feature card */}
              <div
                data-hero-stat
                className="glass-card flex gap-4 rounded-2xl p-4"
              >
                {/* Thumbnail ảnh nhỏ */}
                <div className="relative h-[120px] w-[140px] shrink-0 overflow-hidden rounded-xl bg-navy-900">
                  <Image
                    src="/Hana_Energy_PC_banner_PC.png"
                    alt="Dự án điện mặt trời Hana"
                    fill
                    sizes="140px"
                    className="object-cover"
                  />
                </div>
                {/* Nội dung */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold leading-snug text-white">
                      Thúc Đẩy Mở Rộng Năng Lượng Tái Tạo
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-white/55 line-clamp-3">
                      Khám phá cách chúng tôi dẫn đầu chuyển đổi hệ thống năng lượng
                      với giải pháp đổi mới sáng tạo...
                    </p>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <a
                      href="#du-an"
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/25"
                    >
                      Bắt đầu
                      <ArrowUpRight size={13} weight="bold" />
                    </a>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white/25"
                    >
                      Xem
                      <Play size={12} weight="fill" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ===================================================================
          NỀN BO GÓC — nằm ngay dưới banner, tạo transition mượt
          =================================================================== */}
      <div className="relative -mt-10 z-10">
        <div className="rounded-t-[2.5rem] bg-cream pt-14 pb-2 sm:rounded-t-[3rem]">
          {/* HÀNG METRIC + BADGE NĂNG LỰC */}
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="glass-card glass-card--light flex flex-col items-stretch gap-4 rounded-[var(--radius-card)] p-5 sm:flex-row sm:items-center sm:gap-2 sm:p-6">
              {HERO_METRICS.map((m, i) => (
                <div
                  key={m.label}
                  className={`flex flex-1 flex-col px-2 ${i > 0 ? "sm:border-l sm:border-navy/10" : ""}`}
                >
                  <span className="text-3xl font-extrabold tracking-tight text-navy">{m.value}</span>
                  <span className="mt-1 text-sm text-navy/60">{m.label}</span>
                </div>
              ))}
              <div className="flex items-center gap-3 rounded-2xl bg-brand-50 px-4 py-3 sm:ml-2">
                <SealCheck size={32} weight="fill" className="shrink-0 text-brand-600" />
                <span className="text-sm font-semibold leading-tight text-brand-700">
                  Chứng chỉ
                  <br />
                  Năng lực
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
