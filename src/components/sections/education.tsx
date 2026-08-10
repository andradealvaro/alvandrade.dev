"use client";

import { motion } from "framer-motion";
import { education, languages } from "@/data/resumeData";
import { SectionHeading } from "./section-heading";

export function Education() {
  return (
    <section id="formacao" className="border-b border-border">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <SectionHeading eyebrow="Formação" title="Formação acadêmica" />

        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-[1fr_260px]">
          <div className="space-y-6">
            {education.map((item, index) => (
              <motion.div
                key={item.institution}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.35, delay: index * 0.08, ease: "easeOut" }}
                className="rounded-xl border border-border p-4"
              >
                <h3 className="font-display text-sm font-semibold text-fg">
                  {item.degree}
                </h3>
                <p className="mt-1 text-sm text-fg-muted">{item.institution}</p>
                <p className="mt-1 font-mono text-xs font-medium text-accent">
                  {item.period}
                </p>
              </motion.div>
            ))}
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-fg-muted">
              Idiomas
            </h3>
            <ul className="mt-3 space-y-2">
              {languages.map((lang) => (
                <li
                  key={lang.name}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-fg">{lang.name}</span>
                  <span className="text-fg-muted">{lang.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
