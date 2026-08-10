import { ThemeToggle } from "./theme-toggle";
import { DownloadPdfButton } from "./download-pdf-button";
import { personal } from "@/data/resumeData";

const NAV_LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#experiencia", label: "Experiência" },
  { href: "#projetos", label: "Projetos" },
  { href: "#formacao", label: "Formação" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <a href="#top" className="text-sm font-medium text-fg">
          {personal.name}
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-fg-muted transition-colors hover:text-fg"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden sm:block">
            <DownloadPdfButton variant="ghost" />
          </div>
        </div>
      </div>
    </header>
  );
}
