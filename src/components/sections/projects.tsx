"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, FolderGit2 } from "lucide-react";
import { projects, type Project } from "@/data/resumeData";
import { SectionHeading } from "./section-heading";

export function Projects() {
  return (
    <section id="projetos" className="border-b border-border">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <SectionHeading eyebrow="Trabalho" title="Projetos" />

        <div className="mt-12 space-y-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="overflow-hidden rounded-2xl border border-border bg-bg-subtle/40 p-6 shadow-sm transition-shadow hover:shadow-xl hover:shadow-accent/5"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-fg">
          <FolderGit2 size={18} />
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold text-fg">
            {project.name}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
            {project.summary}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 pl-14">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent"
          >
            {tech}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="mt-5 ml-14 inline-flex items-center gap-1.5 text-sm font-medium text-accent"
      >
        Ver detalhes técnicos
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown size={15} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="ml-14 overflow-hidden"
          >
            <div className="mt-5 space-y-4 border-t border-border pt-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-fg-muted">
                  Problema
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                  {project.problem}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-fg-muted">
                  Abordagem
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                  {project.approach}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-fg-muted">
                  Detalhes de implementação
                </p>
                <dl className="mt-2 space-y-2">
                  {project.details.map((detail) => (
                    <div key={detail.label} className="text-sm">
                      <dt className="inline font-medium text-fg">
                        {detail.label}:{" "}
                      </dt>
                      <dd className="inline text-fg-muted">{detail.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
