"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { Project } from "@/data/resumeData";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/70 px-4 py-10 backdrop-blur-sm sm:items-center"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-panel shadow-2xl"
          >
            <div className="flex items-center gap-1.5 border-b border-border bg-bg-subtle px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-[11px] text-fg-muted">
                bash ~ ~/projects/{project?.slug}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Fechar"
                className="ml-auto flex h-6 w-6 items-center justify-center rounded-md text-fg-muted transition-colors hover:bg-bg hover:text-fg"
              >
                <X size={14} />
              </button>
            </div>

            <div className="custom-scrollbar max-h-[70vh] overflow-y-auto px-6 py-5">
              <h3 className="font-display text-xl font-semibold text-fg">
                {project?.name}
              </h3>

              <div className="mt-5 space-y-5">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wide text-fg-muted">
                    problema
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    {project?.problem}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wide text-fg-muted">
                    abordagem
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                    {project?.approach}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wide text-fg-muted">
                    implementação
                  </p>
                  <dl className="mt-2 space-y-2.5">
                    {project?.details.map((detail) => (
                      <div key={detail.label} className="text-sm">
                        <dt className="inline font-medium text-fg">
                          {detail.label}:{" "}
                        </dt>
                        <dd className="inline text-fg-muted">
                          {detail.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {project?.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-bg-subtle px-2 py-1 font-mono text-xs text-fg-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
