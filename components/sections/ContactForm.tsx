"use client";

import { useState } from "react";
import { Phone, EnvelopeSimple, PaperPlaneTilt } from "@phosphor-icons/react";
import { COMPANY } from "@/lib/data";

const telHref = "tel:" + COMPANY.hotline.replace(/\./g, "");

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const newErrors: Record<string, boolean> = {};

    if (!data.get("name")?.toString().trim()) newErrors.name = true;
    const phone = data.get("phone")?.toString().trim() ?? "";
    if (!phone || !/^[0-9 ]{9,15}$/.test(phone)) newErrors.phone = true;
    if (!data.get("solution")?.toString().trim()) newErrors.solution = true;

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // TODO: Gửi dữ liệu tới Google Sheets / API
    setSent(true);
    form.reset();
  }

  return (
    <section id="lien-he" className="relative overflow-hidden bg-[#051610] py-20 lg:py-28">
      {/* Background image + overlay */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/background-section-3-hana-energy.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/95 via-navy-900/85 to-navy-900/80" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:items-center">
        {/* ====== LEFT: Heading + contact info ====== */}
        <div data-reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-400">
            Bắt đầu
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[2.8rem]">
            Đặt lịch khảo sát mái nhà máy miễn phí
          </h2>
          <p className="mt-5 max-w-md text-base text-white/65">
            Gửi thông tin, đội kỹ thuật sẽ phản hồi trong vòng 24 giờ kèm ước tính sản lượng và
            thời gian hoàn vốn sơ bộ.
          </p>

          <div className="mt-8 grid gap-4">
            <a
              href={telHref}
              className="flex items-center gap-3 text-white transition-colors hover:text-brand-300"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-brand-400">
                <Phone size={20} weight="fill" />
              </span>
              <span className="font-semibold">{COMPANY.hotline}</span>
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              className="flex items-center gap-3 text-white transition-colors hover:text-brand-300"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-brand-400">
                <EnvelopeSimple size={20} weight="fill" />
              </span>
              <span className="font-semibold">{COMPANY.email}</span>
            </a>
          </div>
        </div>

        {/* ====== RIGHT: Lead form ====== */}
        <form
          data-reveal
          className="rounded-3xl border border-white/[0.14] bg-white/[0.06] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-lg sm:p-9"
          onSubmit={handleSubmit}
          noValidate
        >
          {sent && (
            <div className="mb-5 rounded-2xl border border-brand-400/40 bg-brand-400/15 px-5 py-4 text-sm text-white">
              Đã nhận thông tin. Đội kỹ thuật sẽ liên hệ trong 24 giờ.
            </div>
          )}

          {/* Họ tên */}
          <div className="mb-5">
            <label htmlFor="f-name" className="mb-2 block text-sm text-white/75">
              Họ và tên
            </label>
            <input
              type="text"
              id="f-name"
              name="name"
              placeholder="Nguyễn Văn An"
              required
              onChange={() => setErrors((e) => ({ ...e, name: false }))}
              className={`w-full rounded-xl border bg-navy-900/40 px-4 py-3.5 text-white placeholder-white/35 transition-all focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-400/70 focus:ring-red-400/30"
                  : "border-white/[0.18] focus:border-brand-400 focus:ring-brand-400/25"
              }`}
            />
            {errors.name && <p className="mt-1.5 text-xs text-red-300">Vui lòng nhập họ tên.</p>}
          </div>

          {/* SĐT + Công ty */}
          <div className="mb-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="f-phone" className="mb-2 block text-sm text-white/75">
                Số điện thoại
              </label>
              <input
                type="tel"
                id="f-phone"
                name="phone"
                placeholder="09xx xxx xxx"
                required
                onChange={() => setErrors((e) => ({ ...e, phone: false }))}
                className={`w-full rounded-xl border bg-navy-900/40 px-4 py-3.5 text-white placeholder-white/35 transition-all focus:outline-none focus:ring-2 ${
                  errors.phone
                    ? "border-red-400/70 focus:ring-red-400/30"
                    : "border-white/[0.18] focus:border-brand-400 focus:ring-brand-400/25"
                }`}
              />
              {errors.phone && <p className="mt-1.5 text-xs text-red-300">Số điện thoại chưa hợp lệ.</p>}
            </div>
            <div>
              <label htmlFor="f-company" className="mb-2 block text-sm text-white/75">
                Công ty / nhà máy
              </label>
              <input
                type="text"
                id="f-company"
                name="company"
                placeholder="Tên doanh nghiệp"
                className="w-full rounded-xl border border-white/[0.18] bg-navy-900/40 px-4 py-3.5 text-white placeholder-white/35 transition-all focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-400/25"
              />
            </div>
          </div>

          {/* Giải pháp */}
          <div className="mb-6">
            <label htmlFor="f-sol" className="mb-2 block text-sm text-white/75">
              Giải pháp quan tâm
            </label>
            <select
              id="f-sol"
              name="solution"
              required
              onChange={() => setErrors((e) => ({ ...e, solution: false }))}
              className={`w-full rounded-xl border bg-navy-900/40 px-4 py-3.5 text-white transition-all focus:outline-none focus:ring-2 ${
                errors.solution
                  ? "border-red-400/70 focus:ring-red-400/30"
                  : "border-white/[0.18] focus:border-brand-400 focus:ring-brand-400/25"
              }`}
            >
              <option value="">— Chọn giải pháp —</option>
              <option>Điện mặt trời áp mái</option>
              <option>Pin lưu trữ BESS</option>
              <option>Hạ tầng điện công nghiệp</option>
              <option>Tư vấn tổng thể</option>
            </select>
            {errors.solution && <p className="mt-1.5 text-xs text-red-300">Vui lòng chọn giải pháp.</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-4 text-base font-bold text-white shadow-[0_8px_28px_rgba(26,166,75,0.45)] transition-all hover:bg-brand-400 active:translate-y-px"
          >
            <PaperPlaneTilt size={20} weight="fill" />
            Gửi yêu cầu khảo sát
          </button>
        </form>
      </div>
    </section>
  );
}
