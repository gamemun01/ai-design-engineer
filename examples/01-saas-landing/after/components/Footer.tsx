// AFTER: Production-grade Footer
// Skills applied: 04, 06, 07 (semantic), 10 (no emoji icons, no console.log)

import Link from "next/link";
import { Github, Linkedin, Twitter, Youtube } from "lucide-react";

const footerLinks = [
  {
    title: "Product",
    links: [
      { href: "/features", label: "Features" },
      { href: "/pricing", label: "Pricing" },
      { href: "/changelog", label: "Changelog" },
      { href: "/integrations", label: "Integrations" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/customers", label: "Customers" },
      { href: "/careers", label: "Careers" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/docs", label: "Documentation" },
      { href: "/blog", label: "Blog" },
      { href: "/guides", label: "Guides" },
      { href: "/support", label: "Support" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
      { href: "/security", label: "Security" },
      { href: "/dpa", label: "DPA" },
    ],
  },
];

const social = [
  { href: "https://github.com/flowmetric", label: "GitHub", Icon: Github },
  { href: "https://twitter.com/flowmetric", label: "Twitter", Icon: Twitter },
  { href: "https://linkedin.com/company/flowmetric", label: "LinkedIn", Icon: Linkedin },
  { href: "https://youtube.com/@flowmetric", label: "YouTube", Icon: Youtube },
];

export function Footer(): React.JSX.Element {
  return (
    <footer
      aria-labelledby="footer-heading"
      className="border-t border-border bg-muted/30"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Link href="/" className="text-lg font-bold text-foreground">
              Flowmetric
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Product analytics for teams that ship.
            </p>
          </div>

          {footerLinks.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="text-sm font-semibold text-foreground">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">
            © 2026 Flowmetric, Inc. All rights reserved.
          </p>
          <ul className="flex items-center gap-4" aria-label="Social links">
            {social.map(({ href, label, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  aria-label={label}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
