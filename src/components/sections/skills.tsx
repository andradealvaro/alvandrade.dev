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
                  className={`flex items-center justify-between gap-4 py-5 ${
                    index !== 0 ? "border-t border-border" : ""
                  }`}
                >
                  <p className="min-w-[160px] shrink-0 text-base font-bold text-fg">
                    {group.category}
                  </p>
                  <p className="font-mono text-xs uppercase tracking-wider text-fg-muted">
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
            className="rounded-sm border border-neutral-200 bg-white p-8 text-black lg:col-span-5"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                {">_"}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                DOC_RESUME_01
              </span>
            </div>

            <h3 className="mt-3 text-2xl font-bold text-black">
              Currículo Oficial
            </h3>
            <p className="mb-6 mt-2 text-sm leading-relaxed text-neutral-600">
              Versão em PDF otimizada para ATS e leitura rápida, cobrindo
              experiências, projetos e formação acadêmica.
            </p>

            <DownloadPdfButton variant="invert" />

            <div className="mt-4 rounded-none border border-[#e5e5e5] bg-[#f4f4f4] p-4 font-mono text-xs text-neutral-800">
              $ curl -s https://alv.dev/api/contact
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
