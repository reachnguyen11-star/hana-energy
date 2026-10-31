"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const SOURCES = {
  desktop: { src: "/video/hero-pc.mp4", scrollVh: 1.4 },
  mobile: { src: "/video/hero-mobile.mp4", scrollVh: 1.2 },
};

const FPS = 24;
/* Light smoothing so the playhead never jumps with the scroll position. */
const SMOOTH = 0.15;
/* After scrolling stops the playhead glides this many frames further in the
   direction of travel (scaled down for slow, short scrolls). */
const EXTRA_FRAMES = 3;
const GLIDE_SECONDS = 0.45;
/* No scroll update for this long = scrolling has stopped. On desktop Lenis is still
   easing the page just after the wheel stops, so this waits for it to settle. */
const IDLE_MS = 140;
/* Scroll speed (px/s) at which the full EXTRA_FRAMES glide applies. */
const FULL_GLIDE_SPEED = 1200;

/**
 * Night → sunrise video scrubbed by scroll. The enclosing hero <section> is pinned
 * while the video plays, then released. Only the clip for the current breakpoint loads.
 */
export function HeroScrubVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      const video = videoRef.current;
      /* Resolved from the DOM: a parent's ref isn't attached yet in a child's layout effect. */
      const pin = video?.closest("section");
      if (!video || !pin) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 768px)",
          mobile: "(max-width: 767px)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { desktop, reduce } = ctx.conditions as {
            desktop: boolean;
            mobile: boolean;
            reduce: boolean;
          };
          const cfg = desktop ? SOURCES.desktop : SOURCES.mobile;

          video.src = cfg.src;
          video.load();

          /* Reduced motion: no scrub, rest on the final (daylight) frame. */
          if (reduce) {
            const showEnd = () => {
              video.currentTime = Math.max(video.duration - 0.05, 0);
            };
            video.addEventListener("loadedmetadata", showEnd, { once: true });
            return () => video.removeEventListener("loadedmetadata", showEnd);
          }

          /* playhead = scroll position (`play.p`, 0→1) + glide offset (`play.glide`, s). */
          const play = { p: 0, glide: 0 };
          const seek = () => {
            if (!video.duration) return;
            const t = gsap.utils.clamp(0, video.duration, play.p * video.duration + play.glide);
            if (Math.abs(video.currentTime - t) > 0.005) video.currentTime = t;
          };

          let idleTimer: ReturnType<typeof setTimeout> | undefined;
          let peakSpeed = 0;
          let direction = 1;

          const glideOut = () => {
            const strength = gsap.utils.clamp(0.25, 1, peakSpeed / FULL_GLIDE_SPEED);
            peakSpeed = 0;
            gsap.to(play, {
              glide: (direction * EXTRA_FRAMES * strength) / FPS,
              duration: GLIDE_SECONDS,
              ease: "power2.out",
              overwrite: "auto",
              onUpdate: seek,
            });
          };

          const tween = gsap.to(play, {
            p: 1,
            ease: "none",
            onUpdate: seek,
            scrollTrigger: {
              trigger: pin,
              start: "top top",
              end: () => `+=${window.innerHeight * cfg.scrollVh}`,
              pin: true,
              scrub: SMOOTH,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const speed = Math.abs(self.getVelocity());
                if (speed < 20) return; /* refresh / resize, not a real scroll */
                peakSpeed = Math.max(peakSpeed, speed);
                direction = self.direction;
                /* Scrolling again: drop the old glide so the video follows the scroll. */
                if (play.glide !== 0) {
                  gsap.to(play, { glide: 0, duration: 0.2, overwrite: "auto", onUpdate: seek });
                }
                clearTimeout(idleTimer);
                idleTimer = setTimeout(glideOut, IDLE_MS);
              },
            },
          });

          /* iOS Safari only paints scrubbed frames after a play() has happened. */
          const unlock = () => {
            video
              .play()
              .then(() => {
                video.pause();
                seek();
              })
              .catch(() => {});
          };
          video.addEventListener("loadeddata", unlock, { once: true });

          return () => {
            video.removeEventListener("loadeddata", unlock);
            clearTimeout(idleTimer);
            gsap.killTweensOf(play);
            tween.scrollTrigger?.kill();
            tween.kill();
          };
        }
      );

      return () => mm.revert();
    },
    { scope: videoRef }
  );

  return (
    <div
      data-hero-bg
      className="absolute inset-0 bg-cover bg-center bg-[url('/video/hero-mobile-poster.webp')] md:bg-[url('/video/hero-pc-poster.webp')]"
    >
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
        className="h-full w-full object-cover object-center"
      />
    </div>
  );
}
