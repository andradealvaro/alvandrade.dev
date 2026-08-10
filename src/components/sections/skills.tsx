"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/resumeData";
import { SectionHeading } from "./section-heading";

export function Skills() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <SectionHeading eyebrow="Ferramentas" title="Habilidades técnicas" />

        <div className="mt-12 overflow-hidden rounded-xl border border-border">
          {skills.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
              className={`grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[200px_1fr] sm:gap-6 ${
                index !== 0 ? "border-t border-border" : ""
              }`}
            >
              <p className="font-mono text-xs uppercase tracking-widest text-accent">
                {group.category}
              </p>
              <p className="font-mono text-sm uppercase tracking-wide text-fg-muted">
                {group.items.join("  ·  ")}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
