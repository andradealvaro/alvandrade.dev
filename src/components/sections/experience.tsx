"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/resumeData";
import { SectionHeading } from "./section-heading";

export function Experience() {
  return (
    <section id="experiencia" className="border-b border-border">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <SectionHeading eyebrow="Trajetória" title="Experiência profissional" />

        <div className="mt-12 space-y-6">
          {experience.map((job, index) => (
            <motion.div
              key={job.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
              whileHover={{ y: -3 }}
              className="grid grid-cols-1 gap-3 rounded-xl border border-transparent p-5 transition-all duration-200 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10 md:grid-cols-[170px_1fr]"
            >
              <div className="font-mono text-xs text-fg-muted">
                <p className="font-medium text-accent">{job.period}</p>
                <p className="mt-1">{job.location}</p>
              </div>

              <div>
                <h3 className="font-display text-lg font-semibold text-fg">
                  {job.role}
                </h3>
                <p className="mt-0.5 text-sm text-fg-muted">{job.company}</p>

                <ul className="mt-4 space-y-2.5">
                  {job.bullets.map((bullet, bulletIndex) => (
                    <li
                      key={bulletIndex}
                      className="flex gap-3 text-sm leading-relaxed text-fg-muted"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
