"use client";

import { Cat } from "lucide-react";
import { personal } from "@/data/resumeData";

export function HeroTerminal() {
  return (
    <div className="w-full max-w-[300px] overflow-hidden rounded-xl border border-border bg-panel/90 shadow-2xl backdrop-blur">
      <div className="flex items-center gap-1.5 border-b border-border bg-bg-subtle px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        <span className="ml-2 font-mono text-[11px] text-fg-muted">
          zsh — alvaro
        </span>
      </div>

      <div className="space-y-2 p-4 font-mono text-[11px] leading-relaxed">
        <p className="text-fg-muted">
          <span className="text-accent">$</span> alvaro.getProfile()
        </p>
        <p className="text-accent">✓ API_STATUS: online</p>
        <p className="text-fg-muted">
          ✓ STACK:{" "}
          <span className="text-fg">Next.js · TypeScript · Supabase</span>
        </p>

        <div className="relative mt-3 overflow-hidden rounded-lg border border-border bg-bg-subtle">
          <div className="scanlines pointer-events-none absolute inset-0" />
          <div className="flex aspect-square items-center justify-center">
            <Cat size={64} strokeWidth={1.3} className="text-accent" />
          </div>
        </div>

        <p className="pt-1 text-fg-muted">
          <span className="text-accent">{">_"}</span>{" "}
          {personal.title.split("·")[1]?.trim() ?? "Desenvolvimento Full-Stack"}{" "}
          @ Solidum
        </p>
      </div>
    </div>
  );
}
