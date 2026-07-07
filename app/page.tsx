import { Hero } from "@/components/sections/Hero";
import { Agitation } from "@/components/sections/Agitation";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { Process } from "@/components/sections/Process";
import { SocialProof } from "@/components/sections/SocialProof";
import { Contact, Footer } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Agitation />
      <Work />
      <Services />
      <Process />
      <About />
      <SocialProof />
      <Contact />
      <Footer />
    </main>
  );
}