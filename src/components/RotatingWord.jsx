// ─────────────────────────────────────────────────────────────────────────────
// RotatingWord — satu frasa berganti kata sebagai satu blok (naik + pudar),
// tanpa memotong huruf berekor. Berhenti saat kursor/fokus di atasnya dan
// saat pengguna memilih gerak minimal (prefers-reduced-motion).
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useState } from "react";

export function RotatingWord({ words = [], interval = 2600, className = "" }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (words.length < 2 || paused) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let swap;
    const t = setInterval(() => {
      setVisible(false);
      swap = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setVisible(true);
      }, 320);
    }, interval);
    return () => {
      clearInterval(t);
      clearTimeout(swap);
    };
  }, [words.length, interval, paused]);

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span
      className={`relative inline-grid overflow-visible align-baseline ${className}`}
      style={{ lineHeight: 1.18 }}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      tabIndex={0}
    >
      {/* penanda lebar — kata terpanjang, tak terlihat, tata letak tak bergeser */}
      <span className="invisible col-start-1 row-start-1 whitespace-nowrap" aria-hidden="true">
        {longest}
      </span>

      <span
        className="col-start-1 row-start-1 justify-self-start font-semibold whitespace-nowrap text-accent-soft"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-0.3em)",
          transition: "opacity .32s var(--ease-out), transform .32s var(--ease-out)",
        }}
      >
        {words[index]}
      </span>
    </span>
  );
}
