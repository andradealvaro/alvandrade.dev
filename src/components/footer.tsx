import { personal } from "@/data/resumeData";
import { DownloadPdfButton } from "./download-pdf-button";
import { ContactTerminal } from "./contact-terminal";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pt-16">
      <ContactTerminal />
      <div className="mx-auto flex max-w-4xl flex-col items-start gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-fg-muted">
          © {year} {personal.name}
        </p>
        <DownloadPdfButton variant="ghost" />
      </div>
    </footer>
  );
}
