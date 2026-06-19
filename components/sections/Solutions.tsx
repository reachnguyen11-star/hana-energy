import Image from "next/image";
import { ArrowUpRight, SunDim, Lightning, BatteryCharging } from "@phosphor-icons/react/dist/ssr";

const SERVICES = [
  {
    id: "solar",
    Icon: SunDim,
    title: "Điện mặt trời áp mái",
    desc: "Tận dụng diện tích mái, giảm chi phí điện và phát thải, hoàn vốn nhanh cho doanh nghiệp.",
    img: "/background-section-2-hana-energy.jpg",
  },
  {
    id: "electrical",
    Icon: Lightning,
    title: "Hạ tầng điện công nghiệp",
    desc: "Thiết kế, thi công hệ thống điện công nghiệp an toàn, ổn định cho nhà máy và khu công nghiệp.",
    img: "/projects/thuan-an.png",
  },
  {
    id: "bess",
    Icon: BatteryCharging,
    title: "Lưu trữ năng lượng (BESS)",
    desc: "Lưu trữ và tối ưu nguồn điện, tăng độ ổn định và chủ động vận hành cho quá trình sản xuất.",
    img: "/background-section-3-hana-energy.jpg",
  },
] as const;

export function Solutions() {
  return (
    <section id="giai-phap" className="relative overflow-hidden py-20 lg:py-32">
      {/* Background Image & Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background-section-2-hana-energy.jpg"
          alt="Hệ thống điện mặt trời mái nhà công nghiệp"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#051610]/87" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-10">
        {/* Header — căn giữa */}
        <div data-reveal className="mb-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-400">
            Giải pháp toàn diện
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[2.8rem]">
            Dịch Vụ &amp; Giải Pháp Năng Lượng
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/70">
            Ba trụ cột giải pháp giúp nhà máy &amp; khu công nghiệp chủ động nguồn điện,
            giảm chi phí và phát thải.
          </p>
        </div>

        {/* Cards với icon chip nổi bên trên */}
        <div className="grid gap-8 pt-7 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ id, Icon, title, desc, img }) => (
            /* Wrapper: pt-7 = khoảng để icon chip nhô lên 28px trên card */
            <div key={id} className="relative pt-7">
              {/* Icon chip nổi trên đỉnh card */}
              <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 shadow-[0_0_28px_rgba(26,166,75,0.55)]">
                  <Icon size={28} weight="duotone" className="text-white" />
                </span>
              </div>

              <article
                data-reveal
                className="glass-card group flex flex-col transition-transform duration-500 hover:-translate-y-2"
              >
                {/* Khoảng trống để icon không che ảnh */}
                <div className="h-7" aria-hidden="true" />

                {/* Photo */}
                <div className="mx-3 overflow-hidden rounded-2xl">
                  <div className="relative aspect-[4/3] w-full bg-navy-800">
                    <Image
                      src={img}
                      alt={title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col px-4 pb-5 pt-5 text-center">
                  <h3 className="text-xl font-bold text-white">{title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/65">{desc}</p>

                  <div className="mt-7">
                    <a
                      href="#lien-he"
                      className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-400"
                    >
                      Xem chi tiết
                      <ArrowUpRight size={16} weight="bold" />
                    </a>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
