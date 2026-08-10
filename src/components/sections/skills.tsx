"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/resumeData";
import { SectionHeading } from "./section-heading";

export function Skills() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <SectionHeading eyebrow="Ferramentas" title="Habilidades técnicas" />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {skills.map((group, index) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
              className="rounded-xl border border-border p-5"
            >
              <h3 className="font-display text-sm font-semibold text-fg">
                {group.category}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
