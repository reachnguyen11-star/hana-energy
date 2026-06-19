"use client";

import { useRef } from "react";

/* =========================================================================
   <ScrollVideoSection /> — PLACEHOLDER cho scroll-driven video scrubbing
   (kiểu Apple AirPods). Hiện render khung giữ chỗ; khi có video thật:

   1. Bỏ comment khối <video> bên dưới, đặt file vào /public/scrub.mp4
      (khuyến nghị: H.264, ~24–30fps, đã nén; hoặc image sequence để mượt hơn).
   2. Bước 5 sẽ nối GSAP như sau (đặt trong useGSAP scope của component này):

      gsap.registerPlugin(ScrollTrigger);
      const video = videoRef.current!;
      video.pause();
      const setTime = () => {
        // map progress (0→1) sang currentTime của video
        // dùng onUpdate thay vì animate trực tiếp để tránh giật
      };
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%",     // độ dài scroll = thời lượng scrub
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          if (video.duration) video.currentTime = self.progress * video.duration;
        },
      });

   3. Tôn trọng prefers-reduced-motion: nếu reduce → bỏ pin/scrub, hiện
      poster tĩnh (poster="/scrub-poster.jpg").
   ========================================================================= */
export function ScrollVideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section
      ref={sectionRef}
      data-scroll-video
      className="relative flex min-h-[60vh] items-center justify-center bg-navy-900 text-center"
    >
      {/*
      <video
        ref={videoRef}
        src="/scrub.mp4"
        poster="/scrub-poster.jpg"
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
      />
      */}
      <div className="relative z-10 px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
          Scroll-driven video
        </p>
        <p className="mt-3 max-w-md text-lg text-white/70">
          Khu vực giữ chỗ cho video scrubbing theo scroll. Gắn video thật + GSAP scrub ở Bước 5.
        </p>
      </div>
    </section>
  );
}
