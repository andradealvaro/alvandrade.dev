"use client";

import { motion } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import { DownloadPdfButton } from "./download-pdf-button";
import { useActiveSection } from "./use-active-section";

const NAV_LINKS = [
  { id: "sobre", href: "#sobre", label: "Sobre" },
  { id: "experiencia", href: "#experiencia", label: "Experiência" },
  { id: "projetos", href: "#projetos", label: "Projetos" },
  { id: "formacao", href: "#formacao", label: "Formação" },
];

const NAV_IDS = NAV_LINKS.map((link) => link.id);

export function Header() {
  const activeId = useActiveSection(NAV_IDS);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/50 bg-[#0a0f1d]/75 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <a href="#top" className="[perspective:600px]">
          <motion.span
            whileHover={{ rotateY: 360 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="inline-block font-display text-sm font-semibold text-slate-100"
          >
            alv<span className="text-emerald-400">.dev</span>
          </motion.span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = link.id === activeId;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`font-mono text-xs uppercase tracking-wider transition-colors ${
                  isActive
                    ? "border-b-2 border-emerald-400 pb-1 text-emerald-400"
                    : "text-slate-400 hover:text-slate-100"
                }`}
              >
                {link.label}
              </a>
            );
          })}
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
