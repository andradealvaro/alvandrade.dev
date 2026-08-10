"use client";

import { motion } from "framer-motion";
import { Code2, Workflow, Wrench } from "lucide-react";
import { SectionHeading } from "./section-heading";

const POINTS = [
  {
    icon: Code2,
    title: "Desenvolvimento full-stack",
    body: "Concepção, modelagem de dados e implementação de sistemas web de ponta a ponta, de banco de dados a interface.",
  },
  {
    icon: Workflow,
    title: "Automação de processos",
    body: "Substituição de planilhas e rotinas manuais por scripts e sistemas com trilha de auditoria e controle de permissão.",
  },
  {
    icon: Wrench,
    title: "Suporte de infraestrutura",
    body: "Diagnóstico de hardware, redes, Active Directory e administração de acesso em ambiente corporativo.",
  },
];

export function About() {
  return (
    <section id="sobre" className="border-b border-border">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <SectionHeading eyebrow="Perfil" title="Sobre" />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {POINTS.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="rounded-xl border border-border p-5 transition-colors hover:border-accent/50"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <point.icon size={18} />
              </div>
              <h3 className="mt-4 font-display text-sm font-semibold text-fg">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {point.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
