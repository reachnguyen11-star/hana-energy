import Image from "next/image";

/* Logo đối tác thật — /public/partners/ */
const PARTNERS = [
  { name: "Đức Thành",           logo: "/partners/duc-thanh.png",      ext: "png" },
  { name: "HM",                  logo: "/partners/hm.jpg",             ext: "jpg" },
  { name: "Thuận An Paper Group",logo: "/partners/thuan-an-paper.png", ext: "png" },
  { name: "BCG Energy",          logo: "/partners/bcg-energy.png",     ext: "png" },
  { name: "Phu Chau",            logo: "/partners/phu-chau.jpg",       ext: "jpg" },
  { name: "ĐVJ",                 logo: "/partners/dvj.jpg",            ext: "jpg" },
] as const;

export function Partners() {
  return (
    <section className="bg-cream py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <p
          data-reveal
          className="text-center text-sm font-medium uppercase tracking-[0.18em] text-navy/40"
        >
          Đối tác &amp; khách hàng tiêu biểu
        </p>

        {/* Logo wall — border panel */}
        <div
          data-reveal
          className="mt-7 overflow-hidden rounded-[var(--radius-card)] border border-navy/8 bg-paper"
        >
          <div className="grid grid-cols-2 divide-x divide-y divide-navy/8 sm:grid-cols-3 lg:grid-cols-6 lg:divide-y-0">
            {PARTNERS.map(({ name, logo }) => (
              <div
                key={name}
                className="group flex items-center justify-center px-5 py-8 transition-colors duration-300 hover:bg-brand-50/60"
              >
                <div className="relative h-12 w-full max-w-[130px] grayscale transition-all duration-300 group-hover:grayscale-0">
                  <Image
                    src={logo}
                    alt={name}
                    fill
                    sizes="130px"
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
