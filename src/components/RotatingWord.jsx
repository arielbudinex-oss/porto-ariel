// ─────────────────────────────────────────────────────────────────────────────
// RotatingWord — teks berganti kata dengan animasi bersih.
// Seluruh frasa bergerak sebagai satu blok (naik + pudar + blur halus),
// tanpa overflow-hidden yang memotong huruf berekor (g, y, p).
// Warna: gradien emas metalik supaya terasa premium, bukan blok warna kusam.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useState } from "react";

export function RotatingWord({ words = [], interval = 2600, className = "" }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (words.length < 2) return;
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
  }, [words.length, interval]);

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span
      className={`relative inline-grid overflow-visible align-baseline ${className}`}
      style={{ lineHeight: 1.18 }}
    >
      {/* penanda lebar — kata terpanjang, tak terlihat, supaya tata letak tidak bergeser */}
      <span className="invisible col-start-1 row-start-1 whitespace-nowrap" aria-hidden="true">
        {longest}
      </span>

      <span
        className="col-start-1 row-start-1 justify-self-start font-semibold whitespace-nowrap"
        style={{
          // gradien sapphire — senada chrome situs
          backgroundImage:
            "linear-gradient(180deg, #c9d6ff 0%, #9db2ff 24%, #5b7cfa 52%, #3a55c9 68%, #7b93f5 85%, #b9c8ff 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(-0.35em)",
          filter: visible ? "blur(0)" : "blur(5px)",
          transition:
            "opacity .32s cubic-bezier(.23,1,.32,1), transform .32s cubic-bezier(.23,1,.32,1), filter .32s cubic-bezier(.23,1,.32,1)",
          willChange: "transform, opacity, filter",
        }}
        aria-live="polite"
      >
        {words[index]}
      </span>
    </span>
  );
}
