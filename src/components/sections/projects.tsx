"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Folder } from "lucide-react";
import { projects, type Project } from "@/data/resumeData";
import { ProjectModal } from "../project-modal";
import { SectionHeading } from "./section-heading";

const LANGUAGE_COLOR: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
};

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
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="flex flex-col rounded-xl border border-border bg-panel/60 p-5 shadow-sm transition-all duration-200 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-fg-muted">
                  <Folder size={16} />
                  <span className="rounded bg-bg-subtle px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide">
                    main
                  </span>
                </div>
                <span className="rounded bg-accent-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-accent">
                  {project.status}
                </span>
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

              <div className="mt-4 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-fg-muted">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: LANGUAGE_COLOR[project.language] ?? "#8b949e",
                    }}
                  />
                  {project.language}
                </span>

                <button
                  type="button"
                  onClick={() => setActive(project)}
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-accent"
                >
                  Ver arquitetura &amp; detalhes
                  <ArrowRight size={13} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  );
}
