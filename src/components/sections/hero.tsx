"use client";

import { motion } from "framer-motion";
import { Cat, Mail } from "lucide-react";
import { personal } from "@/data/resumeData";
import { DownloadPdfButton } from "../download-pdf-button";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-accent">
      <div className="bg-dot-grid pointer-events-none absolute inset-0 text-hero-ink/10" />

      <div className="relative mx-auto grid max-w-4xl grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-[1.15fr_0.85fr] md:py-32">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mb-4 font-display text-sm font-medium uppercase tracking-widest text-hero-ink-muted"
          >
            {personal.title}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.06, ease: "easeOut" }}
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-hero-ink md:text-6xl"
          >
            {personal.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.14, ease: "easeOut" }}
            className="mt-6 max-w-md text-base leading-relaxed text-hero-ink-muted"
          >
            {personal.summary}
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
              className="inline-flex items-center gap-2 rounded-full border border-hero-ink/25 px-5 py-2.5 text-sm font-medium text-hero-ink transition-colors hover:bg-hero-ink/10"
            >
              <Mail size={15} />
              Entrar em contato
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.3 }}
            className="mt-8 text-sm text-hero-ink-muted"
          >
            {personal.location}
            {personal.phone ? `  ·  ${personal.phone}` : ""}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: -6 }}
          animate={{ opacity: 1, scale: 1, rotate: -3 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          whileHover={{ rotate: 0, scale: 1.02 }}
          className="mx-auto w-full max-w-[280px] rounded-2xl bg-bg p-3 shadow-2xl"
        >
          <div className="flex aspect-square items-center justify-center rounded-xl bg-bg-subtle">
            <Cat size={72} strokeWidth={1.3} className="text-accent" />
          </div>
          <p className="mt-3 px-1 pb-1 font-display text-xs font-medium uppercase tracking-wide text-fg-muted">
            {personal.title.split("·")[1]?.trim() ?? "Auxiliar de TI II"} @ Solidum
          </p>
        </motion.div>
      </div>
    </section>
  );
}
