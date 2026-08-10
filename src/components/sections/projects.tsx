"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { projects } from "@/data/resumeData";
import { SectionHeading } from "./section-heading";

export function Projects() {
  return (
    <section id="projetos" className="border-b border-border">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <SectionHeading eyebrow="Trabalho" title="Projetos" />

        <div className="mt-12 space-y-6">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[number] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-border p-6 transition-colors hover:border-fg-muted/40">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="text-base font-medium text-fg">{project.name}</h3>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-fg-muted">
        {project.summary}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-border px-2.5 py-1 text-xs text-fg-muted"
          >
            {tech}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="mt-5 inline-flex items-center gap-1.5 text-sm text-accent"
      >
        Ver detalhes técnicos
        <ChevronDown
          size={15}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="mt-5 space-y-4 border-t border-border pt-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-fg-muted">
              Problema
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
              {project.problem}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-fg-muted">
              Abordagem
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
              {project.approach}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-fg-muted">
              Detalhes de implementação
            </p>
            <dl className="mt-2 space-y-2">
              {project.details.map((detail) => (
                <div key={detail.label} className="text-sm">
                  <dt className="inline font-medium text-fg">{detail.label}: </dt>
                  <dd className="inline text-fg-muted">{detail.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </div>
  );
}
