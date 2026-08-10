"use client";

import { useEffect, useState } from "react";

interface UseTypewriterOptions {
  words: string[];
  loop?: boolean;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function useTypewriter({
  words,
  loop = false,
  typingSpeed = 45,
  deletingSpeed = 28,
  pauseDuration = 1600,
}: UseTypewriterOptions) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;

    const current = words[wordIndex % words.length];
    const atWordEnd = text === current;
    const atWordStart = text === "";

    if (!deleting && atWordEnd) {
      const isLastWord = !loop && wordIndex === words.length - 1;
      if (isLastWord) {
        const doneTimeout = setTimeout(() => setDone(true), pauseDuration);
        return () => clearTimeout(doneTimeout);
      }
      const pauseTimeout = setTimeout(() => setDeleting(true), pauseDuration);
      return () => clearTimeout(pauseTimeout);
    }

    if (deleting && atWordStart) {
      const advanceTimeout = setTimeout(() => {
        setDeleting(false);
        setWordIndex((index) => index + 1);
      }, typingSpeed);
      return () => clearTimeout(advanceTimeout);
    }

    const timeout = setTimeout(
      () => {
        setText((current2) => {
          const target = words[wordIndex % words.length];
          return deleting
            ? target.slice(0, current2.length - 1)
            : target.slice(0, current2.length + 1);
        });
      },
      deleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, loop, typingSpeed, deletingSpeed, pauseDuration, done]);

  return { text, done };
}
