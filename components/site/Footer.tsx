"use client";

import { MapPin, Phone, EnvelopeSimple, Globe } from "@phosphor-icons/react/dist/ssr";
import { COMPANY } from "@/lib/data";
import { Logo } from "./Logo";
import { useT } from "@/contexts/LangContext";

const telHref   = "tel:" + COMPANY.hotline.replace(/\s/g, "");
const emailHref = "mailto:" + COMPANY.email;

export function Footer() {
  const t = useT();
  const f = t.footer;

  return (
    <footer className="relative text-white overflow-hidden">
      <picture className="absolute inset-0 block h-full w-full pointer-events-none">
        <source srcSet="/background-gradient-mobile.webp" media="(max-width: 767px)" />
        <img
          src="/background-gradient-pc.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </picture>

      <div className="relative z-10">
        <div className="mx-auto grid max-w-[1100px] gap-10 px-5 pt-16 pb-12 md:grid-cols-[1.8fr_1fr_1.2fr]">

          {/* Col 1 — Brand */}
          <div>
            <Logo className="h-16 w-auto" variant="gold" />

            <p className="mt-4 text-xs font-bold uppercase tracking-widest text-white/50">
              {COMPANY.fullName}
            </p>

            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/80">
              {f.tagline}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {f.philosophy.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full bg-white/[0.15] px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm"
                >
                  {pill}
                </span>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-3">
              <a
                href={COMPANY.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Website"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.15] text-white/80 backdrop-blur-sm transition-colors hover:bg-white/[0.25] hover:text-white"
              >
                <Globe size={15} weight="bold" />
              </a>
              <a
                href={telHref}
                aria-label="Hotline"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.15] text-white/80 backdrop-blur-sm transition-colors hover:bg-white/[0.25] hover:text-white"
              >
                <Phone size={15} weight="bold" />
              </a>
            </div>
          </div>

          {/* Col 2 — Nav links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/50">
              {f.linksTitle}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {t.nav.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-white font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white/50">
              {f.contactTitle}
            </h3>

            <ul className="mt-4 space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} weight="fill" className="mt-0.5 shrink-0 text-white" />
                <span className="text-sm leading-relaxed text-white/80 font-medium">
                  {COMPANY.address}
                </span>
              </li>

              <li>
                <a
                  href={telHref}
                  className="flex items-center gap-3 text-sm text-white/80 transition-colors hover:text-white font-medium"
                >
                  <Phone size={16} weight="fill" className="shrink-0 text-white" />
                  <span className="font-semibold text-white">{COMPANY.hotline}</span>
                </a>
              </li>

              <li>
                <a
                  href={emailHref}
                  className="flex items-center gap-3 text-sm text-white/80 transition-colors hover:text-white font-medium"
                >
                  <EnvelopeSimple size={16} weight="fill" className="shrink-0 text-white" />
                  <span>{COMPANY.email}</span>
                </a>
              </li>

              <li>
                <a
                  href={COMPANY.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-white/80 transition-colors hover:text-white font-medium"
                >
                  <Globe size={16} weight="fill" className="shrink-0 text-white" />
                  <span>{COMPANY.website.replace("https://", "")}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.15] py-6 text-center text-xs text-white/60 font-medium">
          © 2025 {COMPANY.fullName} · {f.copyright}
        </div>
      </div>
    </footer>
  );
}
