import { SectionHeading } from "./section-heading";

const POINTS = [
  {
    title: "Desenvolvimento full-stack",
    body: "Concepção, modelagem de dados e implementação de sistemas web de ponta a ponta, de banco de dados a interface.",
  },
  {
    title: "Automação de processos",
    body: "Substituição de planilhas e rotinas manuais por scripts e sistemas com trilha de auditoria e controle de permissão.",
  },
  {
    title: "Suporte de infraestrutura",
    body: "Diagnóstico de hardware, redes, Active Directory e administração de acesso em ambiente corporativo.",
  },
];

export function About() {
  return (
    <section id="sobre" className="border-b border-border">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <SectionHeading eyebrow="Perfil" title="Sobre" />

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {POINTS.map((point) => (
            <div key={point.title}>
              <h3 className="text-sm font-medium text-fg">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {point.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
