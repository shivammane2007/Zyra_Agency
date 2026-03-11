"use client"

import React from "react"
import { Cpu, Orbit, Radio } from "lucide-react"
import { PinContainer } from "@/components/ui/3d-pin"

export function AnimatedPinDemo() {
  return (
    <div className="flex h-[40rem] w-full items-center justify-center bg-zyra-bg-primary px-4">
      <PinContainer title="Explore Space" href="https://github.com/serafimcloud" containerClassName="max-w-sm">
        <div className="flex h-[20rem] w-[20rem] flex-col rounded-2xl border border-zyra-border-default bg-[linear-gradient(180deg,rgba(57,255,135,0.08)_0%,rgba(20,20,20,0.95)_32%,rgba(8,8,8,1)_100%)] p-5 text-zyra-text-secondary shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-zyra-accent-neon animate-pulse" />
            <div className="text-xs uppercase tracking-[0.18em] text-zyra-text-secondary">Live Connection</div>
          </div>

          <div className="mt-4 flex-1 space-y-4">
            <div>
              <div className="text-2xl font-bold text-zyra-text-primary">Space Station Alpha</div>
              <div className="mt-2 text-sm text-zyra-text-secondary">Realtime telemetry and orbital systems feed.</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1 rounded-xl border border-zyra-border-subtle bg-zyra-bg-secondary/70 p-3">
                <div className="text-3xl font-bold text-zyra-accent-neon">427</div>
                <div className="text-xs uppercase tracking-[0.16em] text-zyra-text-secondary">Days in Orbit</div>
              </div>
              <div className="space-y-1 rounded-xl border border-zyra-border-subtle bg-zyra-bg-secondary/70 p-3">
                <div className="text-3xl font-bold text-zyra-accent-neon">98%</div>
                <div className="text-xs uppercase tracking-[0.16em] text-zyra-text-secondary">Systems Online</div>
              </div>
            </div>

            <div className="relative h-24 overflow-hidden rounded-xl border border-zyra-border-subtle bg-zyra-bg-secondary/70 p-3">
              {[Cpu, Orbit, Radio].map((Icon, index) => (
                <div
                  key={index}
                  className="absolute inset-x-0 flex items-center gap-3"
                  style={{ top: `${18 + index * 20}px`, opacity: 1 - index * 0.22 }}
                >
                  <Icon className="h-4 w-4 text-zyra-accent-neon" />
                  <div className="h-px flex-1 bg-gradient-to-r from-zyra-accent-neon/40 via-zyra-accent-neon/10 to-transparent" />
                </div>
              ))}
            </div>

            <div className="flex items-end justify-between">
              <div className="text-xs text-zyra-text-secondary">Last ping: 3 seconds ago</div>
              <div className="text-sm font-medium text-zyra-accent-neon">Connect -&gt;</div>
            </div>
          </div>
        </div>
      </PinContainer>
    </div>
  )
}