import { ContactTerminal } from "./contact-terminal";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pt-16">
      <ContactTerminal />
      <div className="mx-auto max-w-4xl px-6 py-10">
        <p className="font-mono text-xs text-fg-muted">© {year} alv.dev</p>
      </div>
    </footer>
  );
}
