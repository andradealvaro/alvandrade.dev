import type { ComponentType } from "react";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons/brand-icons";
import { personal } from "@/data/resumeData";

type IconComponent = ComponentType<{ size?: number }>;

const LINKS: { href: string; Icon: IconComponent; label: string }[] = [
  { href: personal.github || "#", Icon: GithubIcon, label: "GitHub" },
  { href: personal.linkedin || "#", Icon: LinkedinIcon, label: "LinkedIn" },
  {
    href: personal.email ? `mailto:${personal.email}` : "#",
    Icon: Mail,
    label: "E-mail",
  },
];

export function SocialSidebar() {
  return (
    <div className="fixed inset-y-0 left-0 z-30 hidden w-16 flex-col items-center justify-between border-r border-slate-800/60 bg-slate-950/40 py-8 backdrop-blur-md xl:flex">
      <div className="flex flex-col items-center gap-6">
        {LINKS.map(({ href, Icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="text-slate-400 transition-colors hover:text-emerald-400"
          >
            <Icon size={18} />
          </a>
        ))}
      </div>

      <span className="font-mono text-xs uppercase tracking-widest text-slate-500 [writing-mode:vertical-rl]">
        alv.dev
      </span>
    </div>
  );
}
