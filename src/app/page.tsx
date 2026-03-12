import { Navbar } from "@/components/navbar/Navbar";
import { CTA } from "@/components/sections/CTA";
import { Capabilities } from "@/components/sections/Capabilities";
import { Hero } from "@/components/hero/Hero";
import { Footer } from "@/components/sections/Footer";
import { Philosophy } from "@/components/sections/Philosophy";
import { BuildWorkflow } from "@/components/sections/BuildWorkflow";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Projects } from "@/components/sections/Projects";
import { Results } from "@/components/sections/Results";
import { Team } from "@/components/sections/Team";
import { FAQSection } from "@/components/sections/FAQ";
import { TechStack } from "@/components/sections/TechStack";
import { WhatWeBuild } from "@/components/sections/WhatWeBuild";
import { PracticalEffect } from "@/components/ui/practical_effect";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col">
        <Hero />
        <div className="relative isolate w-full">
          <PracticalEffect className="-z-10 opacity-45 [mask-image:linear-gradient(to_bottom,transparent_0,black_7rem,black_calc(100%-4rem),transparent_100%)]" />
          <div className="relative z-10">
            <Philosophy />
            <BuildWorkflow />
            <WhatWeBuild />
            <Capabilities />
            <ProcessTimeline />
            <Projects />
            <Team />
            <FAQSection />
            <Results />
            <TechStack />
            <CTA />
          </div>
        </div>
      </main>
      <div className="relative isolate">
        <PracticalEffect className="-z-10 opacity-35 [mask-image:linear-gradient(to_bottom,black_0,black_calc(100%-3rem),transparent_100%)]" />
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </>
  );
}
