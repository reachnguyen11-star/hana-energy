"use client";

import { useRef, useEffect, useCallback } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

const AUTO_INTERVAL = 3000;  // chuyển mỗi 3 giây
const PAUSE_ON_NAV  = 4000;  // tạm dừng 4s sau khi nhấn nút

export function ProjectsCarousel({ children }: { children: React.ReactNode }) {
  const scrollRef  = useRef<HTMLDivElement>(null);
  const pauseRef   = useRef(false);
  const indexRef   = useRef(0);
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ---- Helper: lấy danh sách card ---- */
  const cards = () =>
    Array.from(scrollRef.current?.querySelectorAll<HTMLElement>("article") ?? []);

  /* ---- Cuộn đến card thứ idx (chính xác, không phụ thuộc offsetLeft) ---- */
  const goTo = useCallback((idx: number) => {
    const el = scrollRef.current;
    const list = cards();
    if (!el || !list[idx]) return;

    /* Tính vị trí card so với container (độc lập với padding/transform) */
    const elRect   = el.getBoundingClientRect();
    const cardRect = list[idx].getBoundingClientRect();
    const target   = el.scrollLeft + (cardRect.left - elRect.left);

    el.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
    indexRef.current = idx;
  }, []);

  /* ---- Advance ---- */
  const advance = useCallback(() => {
    if (pauseRef.current) return;
    const list = cards();
    if (!list.length) return;
    goTo((indexRef.current + 1) % list.length);
  }, [goTo]);

  /* ---- Start / stop timer ---- */
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(advance, AUTO_INTERVAL);
  }, [advance]);

  const stopTimerFor = useCallback((ms: number) => {
    pauseRef.current = true;
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeout(() => {
      pauseRef.current = false;
      startTimer();
    }, ms);
  }, [startTimer]);

  /* ---- Mount ---- */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    startTimer();

    const pause  = () => { pauseRef.current = true; };
    const resume = () => { pauseRef.current = false; };

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("touchstart",  pause,  { passive: true });
    el.addEventListener("touchend",    resume);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  /* ---- Nút điều hướng ---- */
  const nav = (dir: 1 | -1) => {
    const list = cards();
    const next = (indexRef.current + dir + list.length) % list.length;
    goTo(next);
    stopTimerFor(PAUSE_ON_NAV);
  };

  return (
    <div>
      {/* Vùng cuộn */}
      <div
        ref={scrollRef}
        /* Bỏ snap để scrollTo() hoạt động chính xác */
        className="flex gap-6 overflow-x-auto px-5 pb-8 pt-4 scrollbar-hide sm:px-6 lg:px-10"
      >
        {children}
        {/* spacer cuối */}
        <div className="w-1 shrink-0 lg:w-4" aria-hidden="true" />
      </div>

      {/* Nút prev / next */}
      <div className="mt-2 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => nav(-1)}
          aria-label="Dự án trước"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-sm transition-all hover:border-brand-400 hover:bg-brand-500 active:scale-95"
        >
          <CaretLeft size={18} weight="bold" />
        </button>
        <button
          type="button"
          onClick={() => nav(1)}
          aria-label="Dự án tiếp theo"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-sm transition-all hover:border-brand-400 hover:bg-brand-500 active:scale-95"
        >
          <CaretRight size={18} weight="bold" />
        </button>
      </div>
    </div>
  );
}
