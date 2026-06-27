import type { Metadata } from "next";
import { LangProvider } from "@/contexts/LangContext";
import { Navbar } from "@/components/site/Navbar";
import { SmoothScroller } from "@/components/anim/SmoothScroller";
import { ParallaxBackdrop } from "@/components/anim/ParallaxBackdrop";
import { Hero } from "@/components/site/Hero";
import { Metrics } from "@/components/sections/Metrics";
import { Solutions } from "@/components/sections/Solutions";
import { BusinessSolutions } from "@/components/sections/BusinessSolutions";
import { Projects } from "@/components/sections/Projects";
import { FounderQuote } from "@/components/sections/FounderQuote";
import { Manifesto } from "@/components/sections/Manifesto";
import { Process } from "@/components/sections/Process";
import { Equipment } from "@/components/sections/Equipment";
import { Partners } from "@/components/sections/Partners";
import { ContactForm } from "@/components/sections/ContactForm";
import { Footer } from "@/components/site/Footer";

const EN_TITLE =
  "Hana Vietnam | Solar & Electrical Solutions for Factories and Industrial Parks";
const EN_DESC =
  "Hana Vietnam provides safe, efficient, and sustainable energy solutions: industrial electrical infrastructure, rooftop solar PV, and battery energy storage systems (BESS) for factories and industrial parks.";

export const metadata: Metadata = {
  title: EN_TITLE,
  description: EN_DESC,
  alternates: {
    canonical: "/en",
    languages: {
      "vi-VN": "/",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "vi_VN",
    url: "/en",
    siteName: "Hana Vietnam",
    title: EN_TITLE,
    description: EN_DESC,
    images: [
      {
        url: "/Hana_Energy_PC_banner_PC.png",
        width: 1200,
        height: 630,
        alt: "Hana Vietnam — solar solutions for factories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: EN_TITLE,
    description: EN_DESC,
    images: ["/Hana_Energy_PC_banner_PC.png"],
  },
};

export default function HomeEn() {
  return (
    <LangProvider lang="en">
      <Navbar />
      <SmoothScroller>
        <Hero />
        <Metrics />
        <Solutions />
        <BusinessSolutions />
        <Process />
        <ParallaxBackdrop>
          <Equipment />
          <Projects />
        </ParallaxBackdrop>
        <FounderQuote />
        <Manifesto />
        <Partners />
        <ContactForm />
        <Footer />
      </SmoothScroller>
    </LangProvider>
  );
}
