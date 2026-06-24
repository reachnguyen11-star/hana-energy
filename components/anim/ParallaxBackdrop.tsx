"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Nền dùng chung + parallax xuyên suốt nhiều section.
   Lớp nền dùng position:sticky để ảnh LUÔN ở cỡ ~viewport (không bị phóng to
   theo chiều cao tổng của các section → tránh vỡ ảnh). Parallax = dịch dọc nhẹ. */
export function ParallaxBackdrop({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!rootRef.current || !imgRef.current) return;

      gsap.fromTo(
        imgRef.current,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className="relative">
      {/* Lớp nền phủ toàn section; sticky giữ ảnh ở cỡ viewport → không over-zoom */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Ảnh cao hơn viewport một chút để có khoảng dịch parallax mà không lộ mép */}
          <div
            ref={imgRef}
            className="absolute inset-x-0 -top-[8vh] h-[116vh] will-change-transform"
          >
            <picture className="block h-full w-full">
              <source
                srcSet="/Background_hana_energy_mobile.webp"
                media="(max-width: 767px)"
              />
              <img
                src="/Background_hana_energy_PC.webp"
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
        </div>
      </div>

      {/* Nội dung (Equipment + Projects) — nền trong suốt để ảnh xuyên qua */}
      <div className="relative z-[2]">{children}</div>
    </div>
  );
}
