"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
}

export function SectionHeading({ eyebrow, title }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-fg">
        {title}
      </h2>
    </motion.div>
  );
}
