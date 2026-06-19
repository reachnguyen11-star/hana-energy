import { Navbar } from "@/components/site/Navbar";
import { SmoothScroller } from "@/components/anim/SmoothScroller";
import { Hero } from "@/components/site/Hero";
import { Solutions } from "@/components/sections/Solutions";
import { EnergyTransition } from "@/components/sections/EnergyTransition";
import { Projects } from "@/components/sections/Projects";
import { Process } from "@/components/sections/Process";
import { Equipment } from "@/components/sections/Equipment";
import { Partners } from "@/components/sections/Partners";
import { ContactForm } from "@/components/sections/ContactForm";
import { Footer } from "@/components/site/Footer";

export default function Home() {
  return (
    <>
      {/* Navbar nằm NGOÀI ScrollSmoother để position:fixed hoạt động đúng */}
      <Navbar />

      <SmoothScroller>
        <Hero />
        <Solutions />
        <EnergyTransition />
        <Projects />
        <Partners />
        <Process />
        <Equipment />
        <ContactForm />
        <Footer />
      </SmoothScroller>
    </>
  );
}
