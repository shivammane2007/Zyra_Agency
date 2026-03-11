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
import { ShootingStars } from "@/components/ui/shooting_star";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col">
        <Hero />
        <div className="relative isolate w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 -z-10 hidden w-20 overflow-hidden opacity-35 lg:block xl:w-32 2xl:w-40">
            <ShootingStars className="[mask-image:linear-gradient(to_bottom,transparent_0,black_6rem,black_calc(100%-4rem),transparent_100%)]" />
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-20 overflow-hidden opacity-35 lg:block xl:w-32 2xl:w-40">
            <ShootingStars className="[mask-image:linear-gradient(to_bottom,transparent_0,black_6rem,black_calc(100%-4rem),transparent_100%)]" />
          </div>
          <div className="relative z-10">
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
          </div>
        </div>
      </main>
      <div className="relative isolate">
        <div className="pointer-events-none absolute inset-y-0 left-0 -z-10 hidden w-20 overflow-hidden opacity-35 lg:block xl:w-32 2xl:w-40">
          <ShootingStars className="[mask-image:linear-gradient(to_bottom,black_0,black_calc(100%-3rem),transparent_100%)]" />
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-20 overflow-hidden opacity-35 lg:block xl:w-32 2xl:w-40">
          <ShootingStars className="[mask-image:linear-gradient(to_bottom,black_0,black_calc(100%-3rem),transparent_100%)]" />
        </div>
        <div className="relative z-10">
          <Footer />
        </div>
      </div>
    </>
  );
}
