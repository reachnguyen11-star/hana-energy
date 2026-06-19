import Image from "next/image";

interface LogoProps {
  className?: string;
  /** "gold" = logo vàng cho nền tối (default), "navy" = logo xanh cho nền sáng */
  variant?: "gold" | "navy";
}

export function Logo({ className = "h-16 w-auto", variant = "gold" }: LogoProps) {
  const src = variant === "navy" ? "/logo-hana-navy.png" : "/logo-hana-gold.png";
  return (
    <Image
      src={src}
      alt="Hana Việt Nam"
      height={128}
      width={128}
      className={`object-contain ${className}`}
      priority
    />
  );
}
