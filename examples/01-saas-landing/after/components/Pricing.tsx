// AFTER: Production-grade pricing with monthly/annual toggle
// Skills applied: 03, 04, 06, 07 (a11y: state announced), 10

"use client";

import * as React from "react";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type BillingCycle = "monthly" | "annual";

const tiers = [
  {
    name: "Free",
    description: "For side projects and hobby apps",
    price: { monthly: 0, annual: 0 },
    cta: "Start free",
    href: "/signup?plan=free",
    features: [
      "10K events/month",
      "1 project",
      "7-day data retention",
      "Community support",
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    description: "For growing product teams",
    price: { monthly: 49, annual: 39 },
    cta: "Start 14-day trial",
    href: "/signup?plan=pro",
    features: [
      "1M events/month",
      "Unlimited projects",
      "12-month data retention",
      "Funnels, retention, cohorts",
      "Email support",
      "Session replay (100/mo)",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "For organizations with custom needs",
    price: { monthly: null, annual: null },
    cta: "Contact sales",
    href: "/contact",
    features: [
      "Unlimited events",
      "Unlimited projects",
      "Custom data retention",
      "SSO/SAML, SCIM",
      "Dedicated success manager",
      "SOC 2 Type II, HIPAA BAA",
      "On-prem / self-host option",
    ],
    highlighted: false,
  },
] as const;

export function Pricing(): React.JSX.Element {
  const [cycle, setCycle] = React.useState<BillingCycle>("annual");
  const liveMessage = React.useRef<HTMLDivElement>(null);

  const onCycleChange = (next: BillingCycle) => {
    setCycle(next);
    // Announce state change for screen readers
    if (liveMessage.current) {
      liveMessage.current.textContent = `Showing ${next} prices`;
    }
  };

  return (
    <section
      aria-labelledby="pricing-title"
      className="bg-background py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2
            id="pricing-title"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            No hidden fees. No per-seat charges. Cancel anytime.
          </p>
        </div>

        <div
          className="mt-10 flex justify-center"
          role="group"
          aria-label="Billing cycle"
        >
          <div className="inline-flex rounded-full border border-border bg-muted p-1 text-sm">
            {(["monthly", "annual"] as const).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={cycle === c}
                onClick={() => onCycleChange(c)}
                className={cn(
                  "rounded-full px-4 py-1.5 font-medium capitalize transition-colors",
                  cycle === c
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {c}
                {c === "annual" && (
                  <span className="ml-1.5 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-semibold text-emerald-600">
                    Save 20%
                  </span>
                )}
              </button>
            ))}
          </div>
          <div
            ref={liveMessage}
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          />
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "relative flex flex-col rounded-2xl border bg-card p-8 shadow-sm",
                tier.highlighted
                  ? "border-primary ring-2 ring-primary"
                  : "border-border"
              )}
            >
              {tier.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold text-foreground">
                {tier.name}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {tier.description}
              </p>
              <div className="mt-6">
                {tier.price.monthly === null ? (
                  <p className="text-4xl font-bold text-foreground">Custom</p>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-foreground">
                      ${tier.price[cycle]}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      /month
                      {cycle === "annual" && tier.price.monthly > 0 && (
                        <span className="ml-1 text-xs">
                          (billed annually)
                        </span>
                      )}
                    </span>
                  </div>
                )}
              </div>
              <ul className="mt-6 space-y-3 text-sm">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-3">
                    <Check
                      className="h-5 w-5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                variant={tier.highlighted ? "default" : "outline"}
                className="mt-8 w-full"
              >
                <a href={tier.href}>{tier.cta}</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
