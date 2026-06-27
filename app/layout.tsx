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

const SITE_URL = "https://hana-energy.vercel.app";
const SITE_TITLE =
  "Hana Việt Nam | Giải pháp Điện & Điện mặt trời mái nhà cho nhà máy, KCN";
const SITE_DESC =
  "Hana Việt Nam cung cấp giải pháp năng lượng an toàn, hiệu quả, bền vững: hạ tầng điện công nghiệp, điện mặt trời mái nhà và lưu trữ năng lượng (BESS) cho nhà máy và khu công nghiệp.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESC,
  alternates: {
    canonical: "/",
    languages: {
      "vi-VN": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    alternateLocale: "en_US",
    url: "/",
    siteName: "Hana Việt Nam",
    title: SITE_TITLE,
    description: SITE_DESC,
    images: [
      {
        url: "/Hana_Energy_PC_banner_PC.png",
        width: 1200,
        height: 630,
        alt: "Hana Việt Nam — giải pháp điện mặt trời cho nhà máy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESC,
    images: ["/Hana_Energy_PC_banner_PC.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c2a47",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning className={`${beVietnam.variable} ${playfair.variable}`}>
      <body suppressHydrationWarning className="font-sans">
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
