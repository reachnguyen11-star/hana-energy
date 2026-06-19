import { MapPin, Phone, EnvelopeSimple, Globe } from "@phosphor-icons/react/dist/ssr";
import { COMPANY, NAV_LINKS } from "@/lib/data";
import { Logo } from "./Logo";

const telHref   = "tel:" + COMPANY.hotline.replace(/\s/g, "");
const emailHref = "mailto:" + COMPANY.email;

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      {/* ===== Main grid ===== */}
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pt-16 pb-12 sm:px-6 md:grid-cols-[1.6fr_1fr_1.3fr]">

        {/* Col 1 — Brand + philosophy */}
        <div>
          <Logo className="h-20 w-auto" variant="gold" />
          <p className="mt-5 text-xs font-bold uppercase tracking-widest text-white/35">
            {COMPANY.fullName}
          </p>
          <p className="mt-3 max-w-xs text-sm text-white/55">
            Giải pháp điện &amp; điện mặt trời mái nhà cho nhà máy và khu công nghiệp.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {COMPANY.philosophy.map((p) => (
              <span
                key={p}
                className="rounded-full bg-white/8 px-3 py-1 text-xs font-semibold text-brand-300"
              >
                {p}
              </span>
            ))}
          </div>
        </div>

        {/* Col 2 — Nav links */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40">
            Liên kết
          </h3>
          <ul className="mt-4 space-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Contact info */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/40">
            Liên hệ
          </h3>

          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-3">
              <MapPin size={17} weight="fill" className="mt-0.5 shrink-0 text-brand-400" />
              <span className="text-sm text-white/70 leading-relaxed">{COMPANY.address}</span>
            </li>

            <li>
              <a
                href={telHref}
                className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-brand-300"
              >
                <Phone size={17} weight="fill" className="shrink-0 text-brand-400" />
                <span className="font-semibold">{COMPANY.hotline}</span>
              </a>
            </li>

            <li>
              <a
                href={emailHref}
                className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
              >
                <EnvelopeSimple size={17} weight="fill" className="shrink-0 text-brand-400" />
                <span>{COMPANY.email}</span>
              </a>
            </li>

            <li>
              <a
                href={COMPANY.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
              >
                <Globe size={17} weight="fill" className="shrink-0 text-brand-400" />
                <span>{COMPANY.website.replace("https://", "")}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ===== Bottom bar ===== */}
      <div className="border-t border-white/10 py-6 text-center text-xs text-white/35">
        © {COMPANY.fullName}. Hiệu quả - Bền vững - Tin cậy.
      </div>
    </footer>
  );
}
