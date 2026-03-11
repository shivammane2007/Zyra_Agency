import { WebGLShader } from "@/components/ui/web-gl-shader"
import { ClientErrorBoundary } from "@/components/ui/ClientErrorBoundary"
import { LiquidButton } from "@/components/ui/liquid-glass-button"

export function Hero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <ClientErrorBoundary>
          <WebGLShader />
        </ClientErrorBoundary>
      </div>
      <div className="relative z-10 mx-auto w-full max-w-3xl border border-[#27272a] p-2">
        <main className="relative border border-[#27272a] py-10 overflow-hidden">
          <div className="relative mb-3 isolate">
            <h1 className="text-white text-center text-7xl font-extrabold tracking-tighter mix-blend-difference md:text-[clamp(2rem,8vw,7rem)]">
              Design is Everything
            </h1>
          </div>
          <p className="text-white/60 px-6 text-center text-xs md:text-sm lg:text-lg">
            Unleashing creativity through bold visuals, seamless interfaces, and
            limitless possibilities.
          </p>
          <div className="my-8 flex items-center justify-center gap-1">
            <span className="relative flex h-3 w-3 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zyra-accent-neon opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-zyra-accent-neon"></span>
            </span>
            <p className="text-xs text-zyra-accent-neon">Available for New Projects</p>
          </div>

          <div className="flex justify-center">
            <LiquidButton className="text-white border border-zyra-border-subtle rounded-full" size={"xl"}>
              Let&apos;s Go
            </LiquidButton>
          </div>
        </main>
      </div>
    </section>
  )
}
