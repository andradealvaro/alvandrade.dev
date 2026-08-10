"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/resumeData";
import { DownloadPdfButton } from "../download-pdf-button";

export function Skills() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-emerald-400">
              <span>■</span> Toolkit
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold text-fg">
              Tech Stack
            </h2>
            <p className="mt-2 max-w-md text-sm text-fg-muted">
              Visão geral das tecnologias e ferramentas com as quais desenvolvo
              diariamente.
            </p>

            <div className="mt-8">
              {skills.map((group, index) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.06,
                    ease: "easeOut",
                  }}
                  className={`flex flex-col justify-between gap-1.5 py-4 sm:flex-row sm:items-center ${
                    index !== 0 ? "border-t border-border" : ""
                  }`}
                >
                  <p className="font-bold text-fg">{group.category}</p>
                  <p className="font-mono text-xs uppercase text-fg-muted">
                    {group.items.join(", ")}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative rounded-2xl border border-slate-200 bg-slate-100 p-6 text-slate-900 shadow-2xl lg:col-span-5"
          >
            <p className="font-mono text-xs text-slate-500">
              {">_"} DOC_RESUME_A4
            </p>
            <h3 className="mt-3 font-display text-lg font-bold text-slate-900">
              Currículo Oficial
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Versão em PDF otimizada para ATS e leitura rápida, cobrindo
              experiências, projetos e formação acadêmica.
            </p>

            <div className="mt-5">
              <DownloadPdfButton variant="invert" />
            </div>

            <div className="mt-3 rounded-lg border border-slate-300 bg-slate-200/80 p-3 font-mono text-xs text-slate-800">
              $ curl -s https://alv.dev/api/contact
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
