// AFTER: Production-grade Hero section
// Skills applied: 03 (UX), 04 (tokens), 06 (code quality), 07 (a11y)

import Image from "next/image";
import Link from "next/link";
import { Play, Star } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero(): React.JSX.Element {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:py-28 lg:px-8">
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
            New: AI-powered cohort analysis
          </div>

          <h1
            id="hero-title"
            className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Ship features your users{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              actually want
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Flowmetric turns raw product events into clear narratives. See
            exactly where users drop off, what drives retention, and what to
            build next — without a data team.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/demo">Get a 15-min demo</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/demo-video" className="gap-2">
                <Play className="h-4 w-4" aria-hidden="true" />
                Watch 2-min tour
              </Link>
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-3">
            <div
              className="flex"
              role="img"
              aria-label="Rated 4.8 out of 5 stars"
            >
              {[0, 1, 2, 3].map((i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                  aria-hidden="true"
                />
              ))}
              <Star
                className="h-4 w-4 fill-amber-400/50 text-amber-400"
                aria-hidden="true"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">4.8/5</span> ·{" "}
              Trusted by 2,000+ product teams
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-primary/20 via-accent/20 to-transparent blur-2xl" />
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              <span className="ml-3 text-xs text-muted-foreground">
                app.flowmetric.io/dashboard
              </span>
            </div>
            <Image
              src="/dashboard-screenshot.png"
              alt="Flowmetric dashboard showing user retention funnel and cohort analysis"
              width={1280}
              height={800}
              priority
              className="block w-full"
            />
          </div>

          <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-border bg-card p-3 shadow-lg sm:block">
            <p className="text-xs text-muted-foreground">Weekly active</p>
            <p className="text-lg font-bold text-foreground">+24.3%</p>
          </div>
          <div className="absolute -right-6 top-12 hidden rounded-xl border border-border bg-card p-3 shadow-lg sm:block">
            <p className="text-xs text-muted-foreground">Conversion</p>
            <p className="text-lg font-bold text-emerald-500">+12.1%</p>
          </div>
        </div>
      </div>
    </section>
  );
}
