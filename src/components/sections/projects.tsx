"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Code2 } from "lucide-react";
import { projects, type Project } from "@/data/resumeData";
import { ProjectModal } from "../project-modal";
import { SectionHeading } from "./section-heading";

export function Projects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projetos" className="border-b border-border">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <SectionHeading eyebrow="Trabalho" title="Projetos" />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="flex flex-col rounded-xl border border-border bg-panel/60 p-5 shadow-sm transition-shadow hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <Code2 size={16} />
              </div>

              <h3 className="mt-4 font-display text-base font-semibold text-fg">
                {project.name}
              </h3>
              <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-fg-muted">
                {project.summary}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.stack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="rounded bg-bg-subtle px-2 py-1 font-mono text-[11px] text-fg-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setActive(project)}
                className="mt-5 inline-flex items-center gap-1.5 self-start font-mono text-xs font-medium text-accent"
              >
                Ver arquitetura &amp; detalhes
                <ArrowRight size={13} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
