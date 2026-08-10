import { education, languages } from "@/data/resumeData";
import { SectionHeading } from "./section-heading";

export function Education() {
  return (
    <section id="formacao" className="border-b border-border">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <SectionHeading eyebrow="Formação" title="Formação acadêmica" />

        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-[1fr_260px]">
          <div className="space-y-8">
            {education.map((item) => (
              <div key={item.institution}>
                <h3 className="text-sm font-medium text-fg">{item.degree}</h3>
                <p className="mt-1 text-sm text-fg-muted">{item.institution}</p>
                <p className="mt-1 text-xs text-fg-muted">{item.period}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-wide text-fg-muted">
              Idiomas
            </h3>
            <ul className="mt-3 space-y-2">
              {languages.map((lang) => (
                <li
                  key={lang.name}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-fg">{lang.name}</span>
                  <span className="text-fg-muted">{lang.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
