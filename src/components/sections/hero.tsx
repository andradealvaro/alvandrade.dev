"use client";

import { motion } from "framer-motion";
import { Cat, Mail } from "lucide-react";
import { personal } from "@/data/resumeData";
import { DownloadPdfButton } from "../download-pdf-button";
import { HighlightedText } from "./highlighted-text";

const HIGHLIGHTS = [
  "Engenharia da Computação",
  "desenvolvimento full-stack",
  "extração automatizada via IA",
];

export function Hero() {
  return (
    <section id="top" className="border-b border-border">
      <div className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-14 px-6 py-24 md:grid-cols-[1.15fr_0.85fr] md:py-32">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mb-5 inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-widest text-accent"
          >
            <span>■</span> introduction
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.06, ease: "easeOut" }}
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-fg md:text-6xl"
          >
            {personal.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.14, ease: "easeOut" }}
            className="mt-6 max-w-md text-base leading-relaxed text-fg-muted"
          >
            <HighlightedText text={personal.summary} phrases={HIGHLIGHTS} />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.22, ease: "easeOut" }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <DownloadPdfButton />
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              href={personal.email ? `mailto:${personal.email}` : "#contato"}
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
            >
              <Mail size={15} />
              Entrar em contato
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.3 }}
            className="mt-8 font-mono text-xs text-fg-muted"
          >
            {personal.location}
            {personal.phone ? `  ·  ${personal.phone}` : ""}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-[280px]"
        >
          <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-xl border border-accent/30" />
          <div className="relative rounded-xl border border-border bg-panel/80 p-2 shadow-2xl backdrop-blur">
            <div className="flex aspect-square items-center justify-center rounded-lg bg-bg-subtle">
              <Cat size={72} strokeWidth={1.3} className="text-accent" />
            </div>
            <p className="mt-2 px-1 pb-1 font-mono text-[11px] text-fg-muted">
              <span className="text-accent">{">_"}</span> ENGENHARIA DA
              COMPUTAÇÃO @ SOLIDUM
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
