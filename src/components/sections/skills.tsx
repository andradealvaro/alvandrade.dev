import { skills } from "@/data/resumeData";
import { SectionHeading } from "./section-heading";

export function Skills() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <SectionHeading eyebrow="Ferramentas" title="Habilidades técnicas" />

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {skills.map((group) => (
            <div key={group.category}>
              <h3 className="text-sm font-medium text-fg">{group.category}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-border px-2.5 py-1 text-xs text-fg-muted"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
