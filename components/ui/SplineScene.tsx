"use client";

export function SplineScene() {
  return (
    <div className="relative h-full w-full flex items-center justify-center overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 55%, rgba(52,195,106,0.25) 0%, transparent 70%)",
        }}
      />

      {/* Orbit rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[84, 130, 176].map((size) => (
          <div
            key={size}
            className="absolute rounded-full border border-white/10"
            style={{ width: size, height: size }}
          />
        ))}
      </div>

      {/* Sun core */}
      <div className="relative z-10 flex items-center justify-center">
        <div
          className="h-14 w-14 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 38% 35%, #ffdb72 0%, #f59e0b 55%, #d97706 100%)",
            boxShadow: "0 0 32px 8px rgba(245,158,11,0.35)",
          }}
        />
        {/* Sun rays */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-1 origin-left rounded-full bg-amber-300/60"
            style={{
              width: 14,
              left: "50%",
              top: "50%",
              marginTop: -2,
              transform: `rotate(${i * 45}deg) translateX(28px)`,
            }}
          />
        ))}
      </div>

      {/* Orbiting electron 1 */}
      <div
        className="absolute"
        style={{
          width: 130,
          height: 130,
          animation: "spin 7s linear infinite",
        }}
      >
        <div
          className="absolute h-3 w-3 rounded-full bg-[#34C36A] shadow-[0_0_8px_2px_rgba(52,195,106,0.6)]"
          style={{ top: -6, left: "calc(50% - 6px)" }}
        />
      </div>

      {/* Orbiting electron 2 */}
      <div
        className="absolute"
        style={{
          width: 176,
          height: 176,
          animation: "spin 11s linear infinite reverse",
        }}
      >
        <div
          className="absolute h-2.5 w-2.5 rounded-full bg-sky-400/80 shadow-[0_0_6px_2px_rgba(56,189,248,0.5)]"
          style={{ top: -5, left: "calc(50% - 5px)" }}
        />
      </div>

      {/* Small data labels */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between text-[10px] font-mono tracking-widest text-white/20 uppercase">
        <span>Solar</span>
        <span>24/7</span>
        <span>Clean</span>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
