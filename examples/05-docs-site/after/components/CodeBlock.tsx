// AFTER: CodeBlock — client component, lang label + copy button with aria-live
// Skills applied: 04 (tokens), 06 (code), 07 (a11y)

"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "bash" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable; no-op (kept silent — no console.error per Skill 06)
    }
  };

  return (
    <figure className="my-6 overflow-hidden rounded-lg border border-border bg-muted">
      {/* Lang label + copy button header */}
      <figcaption className="flex items-center justify-between border-b border-border bg-card/50 px-4 py-2">
        <span className="font-mono text-xs uppercase text-muted-foreground">{language}</span>
        <button
          onClick={copy}
          aria-label="Copy code"
          className="inline-flex h-8 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus:outline-none"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              <span aria-live="polite">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Copy</span>
            </>
          )}
        </button>
      </figcaption>
      <pre className="overflow-x-auto p-4 text-sm">
        <code className={cn("font-mono text-foreground")}>{code}</code>
      </pre>
    </figure>
  );
}
