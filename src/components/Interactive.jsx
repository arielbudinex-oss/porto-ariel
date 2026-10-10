// ─────────────────────────────────────────────────────────────────────────────
// InteractiveCard — pembungkus universal supaya SEMUA kartu di halaman hidup:
//   • sorotan lembut mengikuti kursor di permukaan (spotlight)
//   • kartu terangkat + membesar sedikit saat kursor di atasnya
//   • garis tepi menyala mengikuti warna aksen
// Dipakai di Experience, Skills, Journey, Lab, dan Contact.
// ─────────────────────────────────────────────────────────────────────────────
import { useRef, useCallback, useEffect, useState } from "react";

export function InteractiveCard({
  children,
  className = "",
  accent = "#5b7cfa",
  radius = "14px",
  lift = 4,
  as: Tag = "div",
  ...rest
}) {
  const ref = useRef(null);

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--ix", `${e.clientX - r.left}px`);
    el.style.setProperty("--iy", `${e.clientY - r.top}px`);
  }, []);

  const onEnter = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `translate3d(0, -${lift}px, 0)`;
  }, [lift]);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate3d(0, 0, 0)";
  }, []);

  return (
    <Tag
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
      className={`group/interactive relative transition-[transform,border-color] duration-300 ease-out will-change-transform ${className}`}
      style={{ "--i-accent": accent, borderRadius: radius }}
      {...rest}
    >
      {/* sorotan mengikuti kursor */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover/interactive:opacity-100"
        style={{
          borderRadius: radius,
          background: `radial-gradient(300px circle at var(--ix, 50%) var(--iy, 50%), color-mix(in srgb, var(--i-accent) 14%, transparent), transparent 62%)`,
        }}
      />
      {/* garis tepi menyala */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover/interactive:opacity-100"
        style={{
          borderRadius: radius,
          border: `1px solid color-mix(in srgb, var(--i-accent) 45%, transparent)`,
        }}
      />
      <span className="relative z-10 flex h-full flex-col">{children}</span>
    </Tag>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// InteractiveBadge — untuk tag/chip kecil supaya ikut hidup saat disentuh.
// ─────────────────────────────────────────────────────────────────────────────
export function InteractiveBadge({ children, className = "", accent = "#5b7cfa", as: Tag = "span", ...rest }) {
  return (
    <Tag
      className={`inline-flex cursor-default items-center transition-all duration-200 hover:-translate-y-0.5 ${className}`}
      style={{ "--b-accent": accent }}
      onPointerEnter={(e) => {
        e.currentTarget.style.borderColor = `color-mix(in srgb, ${accent} 55%, transparent)`;
        e.currentTarget.style.color = `color-mix(in srgb, ${accent} 90%, #ffffff)`;
        e.currentTarget.style.background = `color-mix(in srgb, ${accent} 10%, transparent)`;
      }}
      onPointerLeave={(e) => {
        e.currentTarget.style.borderColor = "";
        e.currentTarget.style.color = "";
        e.currentTarget.style.background = "";
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// InteractiveStat — angka besar yang terangkat + menyala saat disentuh.
// ─────────────────────────────────────────────────────────────────────────────
export function InteractiveStat({ children, className = "", accent = "#5b7cfa" }) {
  return (
    <div
      className={`transition-transform duration-300 ease-out hover:-translate-y-1 ${className}`}
      onPointerEnter={(e) => {
        e.currentTarget.style.textShadow = `0 0 24px color-mix(in srgb, ${accent} 45%, transparent)`;
      }}
      onPointerLeave={(e) => {
        e.currentTarget.style.textShadow = "";
      }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// InteractiveHint — label kecil yang muncul saat kursor masuk supaya pengunjung
// TAHU elemen itu bisa diapain ("geser", "klik", "tarik"). Ini yang bikin
// interaktivitas terasa "dikasih tau", bukan cuma diam-diam bisa.
// ─────────────────────────────────────────────────────────────────────────────
export function InteractiveHint({ children, text = "geser", icon = "⇄", position = "top", accent = "#9db2ff" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const enter = () => setVisible(true);
    const leave = () => setVisible(false);
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  const posClass =
    position === "top"
      ? "top-3 left-1/2 -translate-x-1/2"
      : position === "bottom"
        ? "bottom-3 left-1/2 -translate-x-1/2"
        : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";

  return (
    <span ref={ref} className="relative inline-block w-full">
      {children}
      <span
        aria-hidden
        className={`pointer-events-none absolute z-30 flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium whitespace-nowrap backdrop-blur transition-all duration-300 ${posClass}`}
        style={{
          borderColor: `color-mix(in srgb, ${accent} 45%, transparent)`,
          background: "rgba(14,16,19,.85)",
          color: accent,
          opacity: visible ? 1 : 0,
          transform: `${position === "center" ? "translate(-50%, -50%)" : "translateX(-50%)"} ${
            visible ? "translateY(0)" : position === "top" ? "translateY(6px)" : "translateY(-6px)"
          }`,
          boxShadow: "0 6px 24px rgba(0,0,0,.4)",
        }}
      >
        <span className="text-[13px] leading-none">{icon}</span>
        {text}
      </span>
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EasterEgg — panel rahasia. Dipicu dengan mengetik "ariel" di keyboard
// (atau klik logo AO 5x). Ada petunjuk halus di footer.
// ─────────────────────────────────────────────────────────────────────────────
export function EasterEgg() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let buffer = "";
    let clicks = 0;
    let clickTimer;

    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      // jangan trigger saat mengetik di input
      if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;
      if (e.key.length === 1) {
        buffer = (buffer + e.key.toLowerCase()).slice(-8);
        if (buffer.includes("ariel")) {
          buffer = "";
          setOpen(true);
        }
      }
    };

    const onLogoClick = () => {
      clicks += 1;
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => (clicks = 0), 900);
      if (clicks >= 5) {
        clicks = 0;
        setOpen(true);
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("hermes:easteregg", () => setOpen(true));
    window.addEventListener("hermes:logoclick", onLogoClick);

    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(clickTimer);
    };
  }, []);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] grid place-items-center p-6"
      style={{ background: "rgba(8,9,12,.84)", backdropFilter: "blur(12px)" }}
      onClick={() => setOpen(false)}
    >
      <div
        className="surface relative w-full max-w-lg overflow-hidden p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-none absolute -top-24 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-[#5b7cfa]/20 blur-3xl" />

        <p className="text-[13px] font-medium text-[#9db2ff]">Kamu menemukannya</p>
        <h3 className="mt-3 text-3xl font-bold text-white">Easter egg</h3>
        <p className="mx-auto mt-4 max-w-sm text-[14px] leading-relaxed text-white/60">
          Kamu salah satu dari sedikit orang yang penasaran sampai ke sini. Itu sikap yang sama
          yang kupakai membangun semua produk di halaman ini: coba, ukur, lalu buktikan.
        </p>
        <p className="mx-auto mt-5 max-w-sm text-[13px] leading-relaxed text-white/45">
          Kalau kamu juga tipe yang suka mengulik, kirim pesan ke{" "}
          <span className="text-[#9db2ff]">arielbudi4@gmail.com</span> dengan judul
          &ldquo;EASTER EGG&rdquo;. Akan kubalas dengan cerita di balik layar.
        </p>

        <div className="mt-7 flex items-center justify-center gap-3">
          <button
            onClick={() => setOpen(false)}
            className="rounded-full bg-white px-5 py-2.5 text-[14px] font-semibold text-[#14171b] transition-transform hover:scale-105"
          >
            Tutup
          </button>
          <span className="text-[12px] text-white/35">atau tekan Esc</span>
        </div>
      </div>
    </div>
  );
}
