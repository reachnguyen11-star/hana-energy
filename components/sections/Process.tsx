"use client";

import { PROCESS } from "@/lib/data";

/**
 * PROCESS SECTION — "Tám bước, từ khảo sát đến bảo trì"
 *
 * Layout giống prototype: nền navy tối, 2 cột.
 * - Trái: sticky visual (ảnh đổi theo step) + counter "0X / 08 bước"
 * - Phải: danh sách 8 bước, scroll triggers highlight step đang active
 *
 * Scroll animation xử lý trong SmoothScroller.tsx qua data attributes:
 *   [data-proc-step]  → từng bước
 *   [data-proc-visual] → container visual
 *   [data-proc-img]    → mỗi ảnh step
 *   [data-proc-counter]→ số counter
 */
export function Process() {
  return (
    <section id="quy-trinh" className="relative bg-[#051610] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        {/* Section heading */}
        <div data-reveal className="mb-16 max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-400">
            Quy trình triển khai
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[2.8rem]">
            Tám bước, từ khảo sát đến bảo trì
          </h2>
          <p className="mt-4 max-w-lg text-base text-white/60">
            Bạn luôn biết dự án đang ở đâu. Mỗi bước có đầu ra rõ ràng và người phụ trách cụ thể.
          </p>
        </div>

        {/* 2-column layout */}
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* ====== LEFT: Sticky visual ====== */}
          <div className="lg:sticky lg:top-[14vh] lg:self-start">
            <div
              data-proc-visual
              className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-navy-700 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.6)]"
            >
              {/* Mỗi step 1 ảnh, chỉ ảnh active hiện */}
              {PROCESS.map((p, i) => (
                <div
                  key={p.step}
                  data-proc-img={i}
                  className={`absolute inset-0 transition-opacity duration-500 ${i === 0 ? "opacity-100" : "opacity-0"}`}
                >
                  {/* ⚠️ THAY ẢNH: ảnh minh hoạ từng bước quy trình */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://picsum.photos/seed/${p.image}/900/700`}
                    alt={p.title}
                    className="h-full w-full object-cover"
                    loading={i === 0 ? "eager" : "lazy"}
                  />
                  {/* Gradient overlay đáy cho counter */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#051610]/80 via-transparent to-transparent" />
                </div>
              ))}

              {/* Counter "0X / 08 bước" */}
              <div className="absolute bottom-5 left-6 z-10">
                <p
                  data-proc-counter
                  className="text-[3.4rem] font-extrabold leading-none tracking-tight text-brand-400"
                >
                  01
                </p>
                <p className="text-sm text-white/70">/ 08 bước</p>
              </div>
            </div>
          </div>

          {/* ====== RIGHT: Steps list ====== */}
          <div className="flex flex-col gap-2">
            {PROCESS.map((p, i) => (
              <div
                key={p.step}
                data-proc-step={i}
                className={`proc-step group grid grid-cols-[auto_1fr] items-baseline gap-5 rounded-2xl border border-transparent p-5 transition-all duration-400 ${
                  i === 0 ? "is-active" : "opacity-40"
                }`}
              >
                <span className="proc-step-num font-mono text-base font-semibold tabular-nums text-white transition-colors">
                  {p.step}
                </span>
                <div>
                  <h4 className="proc-step-title text-lg font-bold text-white transition-colors">{p.title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/55">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
