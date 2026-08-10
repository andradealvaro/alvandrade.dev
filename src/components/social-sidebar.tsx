import type { ComponentType } from "react";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons/brand-icons";
import { personal } from "@/data/resumeData";

type IconComponent = ComponentType<{ size?: number }>;

export function SocialSidebar() {
  const links = [
    personal.github && {
      href: personal.github,
      Icon: GithubIcon as IconComponent,
      label: "GitHub",
    },
    personal.linkedin && {
      href: personal.linkedin,
      Icon: LinkedinIcon as IconComponent,
      label: "LinkedIn",
    },
    personal.email && {
      href: `mailto:${personal.email}`,
      Icon: Mail as IconComponent,
      label: "E-mail",
    },
  ].filter((link): link is { href: string; Icon: IconComponent; label: string } =>
    Boolean(link)
  );

  if (links.length === 0) return null;

  return (
    <div className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-6 xl:flex">
      {links.map(({ href, Icon, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="text-fg-muted transition-colors hover:text-accent"
        >
          <Icon size={18} />
        </a>
      ))}
      <span className="h-24 w-px bg-border" />
    </div>
  );
}
