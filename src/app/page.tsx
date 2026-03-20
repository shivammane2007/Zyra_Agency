"use client";
import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import { Footer } from "@/components/sections/Footer";
import { PracticalEffect } from "@/components/ui/practical_effect";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";

const Philosophy = dynamic(() => import("@/components/sections/Philosophy").then(m => m.Philosophy), { ssr: false });
const BuildWorkflow = dynamic(() => import("@/components/sections/BuildWorkflow").then(m => m.BuildWorkflow), { ssr: false });
const WhatWeBuild = dynamic(() => import("@/components/sections/WhatWeBuild").then(m => m.WhatWeBuild), { ssr: false });
const Capabilities = dynamic(() => import("@/components/sections/Capabilities").then(m => m.Capabilities), { ssr: false });
const ProcessTimeline = dynamic(() => import("@/components/sections/ProcessTimeline").then(m => m.ProcessTimeline), { ssr: false });
const Projects = dynamic(() => import("@/components/sections/Projects").then(m => m.Projects), { ssr: false });
const Team = dynamic(() => import("@/components/sections/Team"), { ssr: false });
const FAQSection = dynamic(() => import("@/components/sections/FAQ").then(m => m.FAQSection), { ssr: false });
const Results = dynamic(() => import("@/components/sections/Results").then(m => m.Results), { ssr: false });
const TechStack = dynamic(() => import("@/components/sections/TechStack").then(m => m.TechStack), { ssr: false });
const CTA = dynamic(() => import("@/components/sections/CTA").then(m => m.CTA), { ssr: false });

export default function Home() {
  // Intersection Observer refs for each section
  const [philosophyRef, philosophyInView] = useInView({ triggerOnce: true, rootMargin: "200px" });
  const [buildWorkflowRef, buildWorkflowInView] = useInView({ triggerOnce: true, rootMargin: "200px" });
  const [whatWeBuildRef, whatWeBuildInView] = useInView({ triggerOnce: true, rootMargin: "200px" });
  const [capabilitiesRef, capabilitiesInView] = useInView({ triggerOnce: true, rootMargin: "200px" });
  const [processTimelineRef, processTimelineInView] = useInView({ triggerOnce: true, rootMargin: "200px" });
  const [projectsRef, projectsInView] = useInView({ triggerOnce: true, rootMargin: "200px" });
  const [teamRef, teamInView] = useInView({ triggerOnce: true, rootMargin: "200px" });
  const [faqRef, faqInView] = useInView({ triggerOnce: true, rootMargin: "200px" });
  const [resultsRef, resultsInView] = useInView({ triggerOnce: true, rootMargin: "200px" });
  const [techStackRef, techStackInView] = useInView({ triggerOnce: true, rootMargin: "200px" });
  const [ctaRef, ctaInView] = useInView({ triggerOnce: true, rootMargin: "200px" });

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col">
        <Hero />
        <div className="relative isolate w-full">
          <PracticalEffect className="-z-10 opacity-45 [mask-image:linear-gradient(to_bottom,transparent_0,black_7rem,black_calc(100%-4rem),transparent_100%)]" />
          <div className="relative z-10">
            <div ref={philosophyRef}>{philosophyInView && <Philosophy />}</div>
            <div ref={buildWorkflowRef}>{buildWorkflowInView && <BuildWorkflow />}</div>
            <div ref={whatWeBuildRef}>{whatWeBuildInView && <WhatWeBuild />}</div>
            <div ref={capabilitiesRef}>{capabilitiesInView && <Capabilities />}</div>
            <div ref={processTimelineRef}>{processTimelineInView && <ProcessTimeline />}</div>
            <div ref={projectsRef}>{projectsInView && <Projects />}</div>
            <div ref={teamRef}>{teamInView && <Team />}</div>
            <div ref={faqRef}>{faqInView && <FAQSection />}</div>
            <div ref={resultsRef}>{resultsInView && <Results />}</div>
            <div ref={techStackRef}>{techStackInView && <TechStack />}</div>
            <div ref={ctaRef}>{ctaInView && <CTA />}</div>
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
