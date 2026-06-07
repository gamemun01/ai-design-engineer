// AFTER: Accessible FAQ accordion
// Skills applied: 04, 05, 06, 07, 10

"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Is my data secure?",
    a: "Yes. We're SOC 2 Type II certified and GDPR compliant. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). You can also enable SSO/SAML and IP allowlists on the Business plan.",
  },
  {
    q: "How long does setup take?",
    a: "Most teams are sending events within 10 minutes using our JavaScript, iOS, Android, and server-side SDKs. For complex server-side integrations, plan for 1–2 hours.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes — no annual contracts on monthly plans. You can downgrade, pause, or cancel from your billing settings. We also offer a 14-day money-back guarantee on annual plans.",
  },
  {
    q: "Do you offer a free tier?",
    a: "Yes. The Free plan includes 10,000 events/month, 1 project, and 7-day data retention — perfect for side projects and hobby apps.",
  },
  {
    q: "Can I self-host Flowmetric?",
    a: "Self-hosting is available on the Enterprise plan. We provide a Helm chart for Kubernetes and a Docker Compose setup for smaller deployments.",
  },
  {
    q: "How is Flowmetric different from GA4 or Mixpanel?",
    a: "Flowmetric is built for B2B product teams who need both product analytics and behavioral data without switching tools. We combine funnels, retention, and session replay in one platform, with AI-assisted insights.",
  },
];

export function FAQ(): React.JSX.Element {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <section
      aria-labelledby="faq-title"
      className="bg-muted/30 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2
            id="faq-title"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Can&apos;t find what you&apos;re looking for?{" "}
            <a
              href="mailto:hello@flowmetric.io"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Email us
            </a>
            .
          </p>
        </div>

        <div className="mt-12 divide-y divide-border rounded-2xl border border-border bg-card">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <div key={faq.q}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-base font-semibold text-foreground">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
                        isOpen && "rotate-180"
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="px-6 pb-5 text-base text-muted-foreground"
                >
                  {faq.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
