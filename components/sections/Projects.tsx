import Image from "next/image";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { PROJECTS } from "@/lib/data";
import { ProjectsCarousel } from "./ProjectsCarousel";

export function Projects() {
  return (
    <section id="du-an" className="relative overflow-hidden bg-[#051610] py-20 lg:py-32">
      {/* Background grid */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(26, 166, 75, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(26, 166, 75, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[800px] rounded-full bg-brand-500/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1440px]">
        {/* Header */}
        <div data-reveal className="mb-14 px-5 text-center sm:px-6 lg:px-10">
          {/* Pill badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-400" />
            <span className="text-xs font-medium text-white/70">
              Đổi mới. Hana. Năng Lượng. Phát triển.
            </span>
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-400">
            Dự án tiêu biểu
          </p>
          <h2 className="mt-4 text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[2.8rem]">
            Dự án Năng lượng Hana
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-white/65">
            Hơn 21 MWp đã được Hana thiết kế và triển khai cho các nhà máy, khu công nghiệp
            trên cả nước, đảm bảo tối ưu sản lượng và chất lượng hệ thống.
          </p>
        </div>

        {/* Horizontal Carousel — auto-scroll every 3.8s, pauses on hover */}
        <ProjectsCarousel>
          {PROJECTS.map((p, i) => (
            <article
              key={p.name}
              data-reveal
              style={{ transitionDelay: `${i * 80}ms` }}
              className="group relative flex w-[80vw] shrink-0 flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-md transition-all hover:-translate-y-2 hover:border-brand-500/50 sm:w-[390px]"
            >
              {/* Photo */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-navy-900">
                <Image
                  src={p.img}
                  alt={`Dự án ${p.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Power badge overlaid on photo bottom-left */}
                <div className="absolute bottom-3 left-3 rounded-lg bg-black/50 px-3 py-1.5 backdrop-blur-sm">
                  <span className="text-sm font-bold text-brand-300">{p.power}</span>
                  <span className="ml-1 text-xs text-white/60">Công suất</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg font-bold leading-snug text-white">{p.name}</h3>
                <p className="mt-1.5 flex-1 text-sm text-white/55">
                  Chủ đầu tư: {p.owner}
                </p>

                <div className="mt-6">
                  <a
                    href="#lien-he"
                    className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-400"
                  >
                    Xem Chi Tiết
                    <ArrowRight size={15} weight="bold" />
                  </a>
                </div>
              </div>
            </article>
          ))}

          {/* Spacer cuối carousel */}
          <div className="w-1 shrink-0 lg:w-4" aria-hidden="true" />
        </ProjectsCarousel>

      </div>
    </section>
  );
}
