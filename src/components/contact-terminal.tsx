"use client";

import { useState } from "react";
import { Check, Copy, Mail } from "lucide-react";
import { personal } from "@/data/resumeData";

const COMMAND = "curl -s https://alvandradedev.vercel.app/contact";

export function ContactTerminal() {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(`$ ${COMMAND}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="mx-auto max-w-4xl px-6 pb-4">
      <div className="overflow-hidden rounded-xl border border-border bg-panel/70">
        <div className="flex items-center gap-1.5 border-b border-border bg-bg-subtle px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-[11px] text-fg-muted">contato</span>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:items-center">
          <p className="font-mono text-xs text-fg-muted sm:text-sm">
            <span className="text-accent">$</span> {COMMAND}
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 font-mono text-xs text-fg transition-colors hover:border-accent hover:text-accent"
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? "copiado" : "copiar"}
            </button>
            <a
              href={personal.email ? `mailto:${personal.email}` : "#contato"}
              className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 font-mono text-xs font-medium text-accent-fg transition-opacity hover:opacity-90"
            >
              <Mail size={13} />
              enviar e-mail
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
