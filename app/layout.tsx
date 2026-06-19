import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";
import "./globals.css";

/* Sans: Be Vietnam Pro — thiết kế riêng cho tiếng Việt, hiện đại, chuyên nghiệp.
   (Không dùng Inter làm default theo taste-skill.) */
const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam",
  display: "swap",
});

/* Serif italic — chỉ dùng cho từ nhấn mạnh trong heading (mix giống Image 2).
   Serif được biện minh vì brief yêu cầu rõ; tránh Fraunces/Instrument_Serif. */
const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  style: ["italic", "normal"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hana Việt Nam | Giải pháp Điện & Điện mặt trời mái nhà cho nhà máy, KCN",
  description:
    "Hana Việt Nam cung cấp giải pháp năng lượng an toàn, hiệu quả, bền vững: hạ tầng điện công nghiệp, điện mặt trời mái nhà và lưu trữ năng lượng (BESS) cho nhà máy và khu công nghiệp.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c2a47",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning className={`${beVietnam.variable} ${playfair.variable}`}>
      <body className="font-sans">
        {/* Anti-FOUC: ẩn phần tử reveal trước paint, GSAP sẽ animate hiện vào */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('gsap-ready')",
          }}
        />
        {children}
      </body>
    </html>
  );
}
