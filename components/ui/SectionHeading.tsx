/* Heading section tái sử dụng. eyebrow là TUỲ CHỌN — toàn trang chỉ dùng
   eyebrow ở tối đa 3 section (taste-skill: ≤ ceil(số section / 3)). */
export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
  light = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  sub?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  const isCenter = align === "center";
  return (
    <div className={`${isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl text-left"}`}>
      {eyebrow && (
        <p
          data-reveal
          className={`text-sm font-semibold uppercase tracking-[0.18em] ${
            light ? "text-brand-300" : "text-brand-600"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        data-reveal
        className={`mt-3 text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.75rem] ${
          light ? "text-white" : "text-navy"
        }`}
      >
        {title}
      </h2>
      {sub && (
        <p
          data-reveal
          className={`mt-4 text-base sm:text-lg ${light ? "text-white/70" : "text-navy/60"}`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
