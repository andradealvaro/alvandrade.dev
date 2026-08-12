"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { personal } from "@/data/resumeData";
import { BOOT_REVEAL_DELAY_MS } from "../boot-sequence";
import { DownloadPdfButton } from "../download-pdf-button";
import { HeroTerminal } from "./hero-terminal";
import { useTypewriter } from "../use-typewriter";

// Hero mounts hidden behind the boot-sequence overlay, so every entrance
// animation here is offset to start right as that overlay begins fading —
// otherwise it'd finish invisibly underneath it.
const REVEAL_S = BOOT_REVEAL_DELAY_MS / 1000;

const ROLES = [
  ">_ Engenharia de Computação",
  ">_ Tecnologia da Informação",
  ">_ Full-Stack Developer",
  ">_ :)",
];

export function Hero() {
  const badge = useTypewriter({
    words: [">_ INITIALIZING_PROFILE..."],
    typingSpeed: 35,
    startDelayMs: BOOT_REVEAL_DELAY_MS,
  });
  const role = useTypewriter({
    words: ROLES,
    loop: true,
    pauseDuration: 1400,
    startDelayMs: BOOT_REVEAL_DELAY_MS + 700,
  });
  const [firstName, ...restName] = personal.name.split(" ");
  const lastName = restName.join(" ");

  return (
    <section id="top" className="border-b border-border">
      <div className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-14 px-6 py-24 md:grid-cols-[1.15fr_0.85fr] md:py-32">
        <div>
          <motion.p
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: REVEAL_S, ease: "easeOut" }}
            className="mb-3 inline-flex items-center gap-1 font-mono text-xs font-medium uppercase tracking-widest text-accent"
          >
            {badge.text}
            <span className="blinking-cursor">▍</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: REVEAL_S, ease: "easeOut" }}
            className="mb-4 h-4 font-mono text-xs text-fg-muted"
          >
            {role.text}
            <span className="blinking-cursor">▍</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.55, delay: REVEAL_S + 0.05, ease: "easeOut" }}
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl"
          >
            <span className="text-fg">{firstName} </span>
            <span className="text-emerald-400">{lastName}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: REVEAL_S + 0.15, ease: "easeOut" }}
            className="mt-6 max-w-md text-base leading-relaxed text-fg-muted"
          >
            {personal.heroIntro}
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: REVEAL_S + 0.2, ease: "easeOut" }}
            className="mt-5 max-w-md space-y-3"
          >
            {personal.heroPoints.map((point) => (
              <li key={point.label} className="flex gap-2.5 text-sm leading-relaxed">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="text-fg-muted">
                  <strong className="font-semibold text-fg">{point.label}:</strong>{" "}
                  {point.text}
                </span>
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: REVEAL_S + 0.25, ease: "easeOut" }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <DownloadPdfButton />
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              href={personal.email ? `mailto:${personal.email}` : "#contato"}
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:border-accent hover:text-accent"
            >
              <Mail size={15} />
              Entrar em contato
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: REVEAL_S + 0.35 }}
            className="mt-8 font-mono text-xs text-fg-muted"
          >
            {personal.location}
            {personal.phone ? `  ·  ${personal.phone}` : ""}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: REVEAL_S + 0.1, ease: "easeOut" }}
          className="relative mx-auto before:absolute before:-bottom-3 before:-right-3 before:-z-10 before:h-full before:w-full before:rounded-xl before:border before:border-slate-800 before:bg-slate-900/90"
        >
          <HeroTerminal />
        </motion.div>
      </div>
    </section>
  );
}
