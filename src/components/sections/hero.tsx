"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { personal } from "@/data/resumeData";
import { DownloadPdfButton } from "../download-pdf-button";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-[0.35]" />
      <div className="relative mx-auto max-w-4xl px-6 py-24 md:py-32">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4 text-sm text-fg-muted"
        >
          {personal.title}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="text-4xl font-semibold tracking-tight text-fg md:text-5xl"
        >
          {personal.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.16 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-fg-muted"
        >
          {personal.summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.24 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <DownloadPdfButton />
          <a
            href={personal.email ? `mailto:${personal.email}` : "#contato"}
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm text-fg transition-colors hover:border-accent"
          >
            <Mail size={15} />
            Entrar em contato
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.32 }}
          className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-fg-muted"
        >
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={14} />
            {personal.location}
          </span>
          {personal.phone && (
            <span className="inline-flex items-center gap-1.5">
              <Phone size={14} />
              {personal.phone}
            </span>
          )}
        </motion.div>
      </div>
    </section>
  );
}
