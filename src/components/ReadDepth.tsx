"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string | number>) => void };
  }
}

const MARKS = [25, 50, 75, 100];

// Page views alone can't tell a reader from someone who bounced, so this reports
// how far through the <article> each visitor got and how long it took them.
export default function ReadDepth({ post }: { post: string }) {
  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;
    const start = Date.now();
    const sent = new Set<number>();

    const check = () => {
      const { top, height } = article.getBoundingClientRect();
      const seen = ((window.innerHeight - top) / height) * 100;
      for (const mark of MARKS) {
        if (seen >= mark && !sent.has(mark)) {
          sent.add(mark);
          window.umami?.track("read-depth", {
            post,
            depth: mark,
            seconds: Math.round((Date.now() - start) / 1000),
          });
        }
      }
      if (sent.size === MARKS.length) window.removeEventListener("scroll", check);
    };

    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [post]);

  return null;
}
