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

export default function Home() {
  return (
    <LangProvider lang="vi">
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
