"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Alternar tema"
      className="relative flex h-9 w-16 shrink-0 items-center rounded-full border border-border bg-bg-subtle px-1"
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-fg"
        style={{ marginLeft: isDark ? "auto" : 0 }}
      >
        {isDark ? <Moon size={14} /> : <Sun size={14} />}
      </motion.span>
    </button>
  );
}
