"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const BAR_LENGTH = 28;
const DURATION_MS = 1700;
const HOLD_MS = 350;

// Exported so other above-the-fold components (Hero) can time their own
// entrance to start exactly as this overlay begins fading away, instead of
// finishing invisibly underneath it.
export const BOOT_REVEAL_DELAY_MS = DURATION_MS + HOLD_MS;

const CHECKPOINTS = [
  { at: 15, label: "loading kernel" },
  { at: 40, label: "mounting ~/skills" },
  { at: 65, label: "authenticating user: alvaro" },
  { at: 90, label: "compiling experience" },
];

export function BootSequence() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const start = performance.now();
    let frame: number;

    function tick(now: number) {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / DURATION_MS) * 100));
      setProgress(pct);

      if (pct < 100) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setVisible(false), HOLD_MS);
      }
    }

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = "";
    };
  }, []);

  const filled = Math.round((progress / 100) * BAR_LENGTH);
  const bar = "█".repeat(filled) + "░".repeat(BAR_LENGTH - filled);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = "";
      }}
    >
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-bg px-4 font-mono"
        >
          <p className="text-xs tracking-widest text-fg-muted">
            <span className="text-accent">$</span> booting alv.dev
            <span className="blinking-cursor text-accent">_</span>
          </p>

          <p className="text-5xl font-bold tabular-nums text-accent [text-shadow:0_0_18px_rgba(52,211,153,0.35)]">
            {progress}%
          </p>

          <p className="select-none whitespace-nowrap text-sm text-fg-muted sm:text-base">
            <span className="text-accent">[</span>
            {bar}
            <span className="text-accent">]</span>
          </p>

          <div className="flex w-full max-w-[280px] flex-col gap-1 text-[11px] text-fg-muted">
            {CHECKPOINTS.map((c) => (
              <div key={c.label} className="flex items-center gap-2">
                <span
                  className={
                    progress >= c.at ? "text-accent" : "text-fg-muted/40"
                  }
                >
                  {progress >= c.at ? "✓" : "·"}
                </span>
                <span
                  className={progress >= c.at ? "text-fg-muted" : "text-fg-muted/40"}
                >
                  {c.label}
                  {progress >= c.at && "... OK"}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
