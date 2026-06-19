/* Gauge bán nguyệt (đồng hồ đo) — kiểu "Saving" trong Image 1.
   percent 0–100 điều khiển độ dài cung. Có data-gauge để GSAP (Bước 5)
   scrub độ dài cung khi vào viewport. */
export function Gauge({
  percent,
  value,
  caption,
}: {
  percent: number;
  value: string;
  caption: string;
}) {
  const R = 80;
  const C = Math.PI * R; // chu vi nửa đường tròn
  const dash = (Math.min(Math.max(percent, 0), 100) / 100) * C;

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 116" className="w-full max-w-[260px]" role="img" aria-label={`${value}, ${caption}`}>
        {/* Track nền */}
        <path
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="rgba(12,42,71,0.10)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        {/* Cung giá trị */}
        <path
          data-gauge
          data-dash={dash}
          d="M 20 100 A 80 80 0 0 1 180 100"
          fill="none"
          stroke="var(--color-brand-500)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${C}`}
        />
        <text x="100" y="86" textAnchor="middle" className="fill-navy" style={{ fontSize: 30, fontWeight: 800 }}>
          {value}
        </text>
      </svg>
      <p className="mt-1 text-sm font-medium text-navy/60">{caption}</p>
    </div>
  );
}
