import Image from "next/image";
import { Gear, Leaf, ShieldCheck } from "@phosphor-icons/react/dist/ssr";

const IMPACT_STATS = [
  {
    value: "10k+",
    label: "Tấn CO₂ được cắt giảm",
    caption: "Tiết kiệm cho môi trường hàng năm",
  },
  {
    value: "2 Triệu+",
    label: "Hộ gia đình được cấp điện",
    caption: "Cung cấp năng lượng sạch cho gia đình",
  },
  {
    value: "50 Triệu+",
    label: "USD tiết kiệm cho khách hàng",
    caption: "Tiết kiệm chi phí điện năng",
  },
] as const;

const FEATURES = [
  {
    Icon: Gear,
    title: "Công nghệ Tiên Tiến",
    desc: "Sử dụng các tấm pin mặt trời và công nghệ lưu trữ tiên tiến nhất để tối đa hóa hiệu suất.",
  },
  {
    Icon: Leaf,
    title: "Tác động Thân Thiện",
    desc: "Giảm đáng kể khí thải carbon, góp phần bảo vệ hành tinh xanh cho thế hệ tiếp theo.",
  },
  {
    Icon: ShieldCheck,
    title: "Tin cậy Dài hạn",
    desc: "Đảm bảo hiệu suất bền vững và tuổi thọ hệ thống lên đến 25 năm.",
  },
] as const;

export function EnergyTransition() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-28">
      {/* Background solar photo + dark overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background-section-3-hana-energy.jpg"
          alt="Hệ thống điện mặt trời quy mô công nghiệp"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-[#051610]/87" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">

          {/* ===== TRÁI: Big impact stats ===== */}
          <div data-reveal className="space-y-10">
            {IMPACT_STATS.map((s) => (
              <div key={s.label} className="border-l-2 border-brand-500/50 pl-6">
                <p className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-[3.25rem] leading-none">
                  {s.value}
                </p>
                <p className="mt-2 text-xl font-bold text-white/90 sm:text-2xl leading-snug">
                  {s.label}
                </p>
                <p className="mt-1 text-sm text-white/50">{s.caption}</p>
              </div>
            ))}
          </div>

          {/* ===== PHẢI: Feature cards ===== */}
          <div className="space-y-4">
            {FEATURES.map(({ Icon, title, desc }) => (
              <div
                key={title}
                data-reveal
                className="glass-card flex items-start gap-4 p-5"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <Icon size={24} weight="duotone" className="text-brand-300" />
                </span>
                <div>
                  <h3 className="font-bold text-white">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">{desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
