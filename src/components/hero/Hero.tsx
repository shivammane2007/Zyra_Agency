"use client";

import React from "react";
import { useScroll, useTransform } from "framer-motion";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";

export function Hero() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
    <div
      className="h-[150vh] md:h-[400vh] bg-black w-full relative pt-40 overflow-clip"
      ref={ref}
    >
      <GoogleGeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
      >
        <div className="flex flex-col items-center justify-center text-center px-6 -mt-40 md:-mt-110 transform-gpu will-change-transform">
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs tracking-widest text-white/70 mb-6">
            NEXT-GEN PRODUCT DEVELOPMENT
          </span>
          <h1 className="hero-animated-text text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] max-w-4xl">
            DESIGN. BUILD. LAUNCH. Products That SCALE
          </h1>
          <p className="mt-6 text-lg md:text-xl text-white/60 max-w-3xl">
            <b>Designing, Engineering, and Launching Modern Products That Drive Real Impact </b>

          </p>
          <div className="mt-10">
            <button className="rounded-lg bg-white text-black px-6 py-3 font-medium hover:bg-white/90 transition">
             <b>Bring Your IDEA TO LIFE ➤</b>
            </button>
          </div>
        </div>
      </GoogleGeminiEffect>
    </div>
  );
}
