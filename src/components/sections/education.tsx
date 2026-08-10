"use client";

import { motion } from "framer-motion";
import { education, languages } from "@/data/resumeData";
import { SectionHeading } from "./section-heading";

export function Education() {
  return (
    <section id="formacao" className="border-b border-border">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <SectionHeading eyebrow="Formação" title="Formação acadêmica" />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-[1fr_260px]">
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

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
          >
            <h3 className="font-mono text-xs uppercase tracking-widest text-slate-400">
              Idiomas
            </h3>
            <ul className="mt-4 space-y-2.5">
              {languages.map((lang) => (
                <li key={lang.name} className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase text-slate-300">
                    {lang.name}
                  </span>
                  <span className="rounded bg-emerald-500/10 px-2 py-1 font-mono text-xs text-emerald-400">
                    {lang.level.toUpperCase()}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
