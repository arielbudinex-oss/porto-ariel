// ─────────────────────────────────────────────────────────────────────────────
// InteractiveCard — pembungkus universal supaya SEMUA kartu di halaman hidup:
//   • sorotan lembut mengikuti kursor di permukaan (spotlight)
//   • kartu terangkat + membesar sedikit saat kursor di atasnya
//   • garis tepi menyala mengikuti warna aksen
// Dipakai di Experience, Skills, Journey, Lab, dan Contact.
// ─────────────────────────────────────────────────────────────────────────────
import { useRef, useCallback } from "react";

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

  const onMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--ix", `${e.clientX - r.left}px`);
      el.style.setProperty("--iy", `${e.clientY - r.top}px`);
    },
    []
  );

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
