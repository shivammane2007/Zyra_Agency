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
import { TechStack } from "@/components/sections/TechStack";
import { WhatWeBuild } from "@/components/sections/WhatWeBuild";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-between">
        <Hero />
        <Philosophy />
        <BuildWorkflow />
        <WhatWeBuild />
        <Capabilities />
        <ProcessTimeline />
        <Projects />
        <Team />
        <Results />
        <TechStack />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
