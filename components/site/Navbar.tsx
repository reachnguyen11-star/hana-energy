"use client";

import { useState } from "react";
import { CaretDown, List, X } from "@phosphor-icons/react";
import { NAV_LINKS } from "@/lib/data";
import { Logo } from "./Logo";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        className="glass-card pointer-events-auto flex w-full max-w-5xl items-center justify-between gap-4 rounded-full py-2.5 pl-5 pr-2.5"
        aria-label="Điều hướng chính"
      >
        {/* Logo trái */}
        <a href="#top" className="flex shrink-0 items-center gap-2 text-white" aria-label="Hana Việt Nam, trang chủ">
          <Logo className="h-14 w-auto" />
        </a>

        {/* Menu giữa (desktop) */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
              >
                {link.label}
                {link.hasDropdown && <CaretDown size={13} weight="bold" className="opacity-70" />}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA phải (desktop) — xanh lá brand */}
        <a
          href="#lien-he"
          className="hidden shrink-0 items-center rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(26,166,75,0.45)] transition-all hover:bg-brand-400 active:translate-y-px lg:inline-flex"
        >
          Tư vấn miễn phí
        </a>

        {/* Hamburger (mobile) */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 lg:hidden"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          aria-expanded={open}
        >
          {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
        </button>
      </nav>

      {/* Drawer mobile */}
      {open && (
        <div className="glass-card pointer-events-auto absolute top-20 mx-4 w-[calc(100%-2rem)] max-w-5xl rounded-3xl p-4 lg:hidden">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium text-white/90 transition-colors hover:bg-white/10"
                >
                  {link.label}
                  {link.hasDropdown && <CaretDown size={14} weight="bold" className="opacity-70" />}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#lien-he"
            onClick={() => setOpen(false)}
            className="mt-2 flex items-center justify-center rounded-2xl bg-brand-500 px-5 py-3 text-base font-semibold text-white"
          >
            Tư vấn miễn phí
          </a>
        </div>
      )}
    </header>
  );
}
