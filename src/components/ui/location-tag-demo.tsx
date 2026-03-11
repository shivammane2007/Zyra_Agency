import { LocationTag } from "@/components/ui/location-tag"

export default function LocationTagDemo() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 bg-background p-8">
      <div className="space-y-2 text-center">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Hover to reveal</p>
      </div>

      <LocationTag city="San Francisco" country="USA" timezone="PST" />

      <p className="max-w-[200px] text-center text-xs text-muted-foreground/60">
        A minimal location indicator with live time
      </p>
    </main>
  )
}