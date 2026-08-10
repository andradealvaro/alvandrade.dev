import { experience } from "@/data/resumeData";
import { SectionHeading } from "./section-heading";

export function Experience() {
  return (
    <section id="experiencia" className="border-b border-border">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <SectionHeading eyebrow="Trajetória" title="Experiência profissional" />

        <div className="mt-12 space-y-12">
          {experience.map((job) => (
            <div
              key={job.company}
              className="grid grid-cols-1 gap-2 md:grid-cols-[180px_1fr]"
            >
              <div className="text-sm text-fg-muted">
                <p>{job.period}</p>
                <p className="mt-1">{job.location}</p>
              </div>

              <div>
                <h3 className="text-base font-medium text-fg">{job.role}</h3>
                <p className="mt-0.5 text-sm text-fg-muted">{job.company}</p>

                <ul className="mt-4 space-y-2.5">
                  {job.bullets.map((bullet, index) => (
                    <li
                      key={index}
                      className="flex gap-3 text-sm leading-relaxed text-fg-muted"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fg-muted" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
