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
  const [stage, setStage] = useState(0); // 0=flash, 1=boom, 2=pesan
  const confettiRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    let buffer = "";
    let clicks = 0;
    let clickTimer;

    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        setStage(0);
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

    const onTrigger = () => setOpen(true);

    window.addEventListener("keydown", onKey);
    window.addEventListener("hermes:easteregg", onTrigger);
    window.addEventListener("hermes:logoclick", onLogoClick);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("hermes:easteregg", onTrigger);
      window.removeEventListener("hermes:logoclick", onLogoClick);
      clearTimeout(clickTimer);
    };
  }, []);

  // ── saat easter egg terbuka: gong sound + konfeti + reveal bertahap ──────
  useEffect(() => {
    if (!open) return;
    setStage(0);

    // 1. Suara gong — dibuat pakai Web Audio (tanpa file)
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      const ctx = new AC();
      audioRef.current = ctx;
      const now = ctx.currentTime;

      // gong = nada dasar rendah + harmonik + decay panjang
      [72, 145, 219, 291, 367, 441].forEach((f, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = f;
        const amp = 0.34 / (i + 1.4);
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(amp, now + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.4 - i * 0.35);
        osc.connect(gain).connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 3.6);
      });
      // dentuman awal
      const thump = ctx.createOscillator();
      const thumpGain = ctx.createGain();
      thump.type = "triangle";
      thump.frequency.setValueAtTime(120, now);
      thump.frequency.exponentialRampToValueAtTime(38, now + 0.6);
      thumpGain.gain.setValueAtTime(0.42, now);
      thumpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);
      thump.connect(thumpGain).connect(ctx.destination);
      thump.start(now);
      thump.stop(now + 1);
    } catch {
      /* browser tanpa audio: lewati */
    }

    // 2. Konfeti canvas — 260 partikel meledak dari tengah
    const canvas = confettiRef.current;
    let raf;
    if (canvas) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      const ctx2 = canvas.getContext("2d");
      ctx2.scale(dpr, dpr);
      const W = window.innerWidth;
      const H = window.innerHeight;
      const COLORS = ["#5b7cfa", "#9db2ff", "#ffffff", "#e9e6df", "#3a55c9", "#7fb0a4", "#c94f4f"];

      const parts = Array.from({ length: 260 }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 6 + Math.random() * 16;
        return {
          x: W / 2,
          y: H / 2 - 60,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 5,
          w: 6 + Math.random() * 8,
          h: 8 + Math.random() * 12,
          rot: Math.random() * Math.PI,
          vr: (Math.random() - 0.5) * 0.32,
          color: COLORS[(Math.random() * COLORS.length) | 0],
          life: 1,
        };
      });

      const t0 = performance.now();
      const draw = (t) => {
        const el = (t - t0) / 1000;
        ctx2.clearRect(0, 0, W, H);
        parts.forEach((p) => {
          p.vy += 0.32;          // gravitasi
          p.vx *= 0.992;         // gesekan udara
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.vr;
          p.life = Math.max(0, 1 - el / 4.6);
          ctx2.save();
          ctx2.globalAlpha = p.life;
          ctx2.translate(p.x, p.y);
          ctx2.rotate(p.rot);
          ctx2.fillStyle = p.color;
          ctx2.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx2.restore();
        });
        if (el < 4.8) raf = requestAnimationFrame(draw);
        else ctx2.clearRect(0, 0, W, H);
      };
      raf = requestAnimationFrame(draw);
    }

    // 3. Reveal bertahap: flash -> boom -> pesan
    const s1 = setTimeout(() => setStage(1), 160);
    const s2 = setTimeout(() => setStage(2), 900);

    return () => {
      clearTimeout(s1);
      clearTimeout(s2);
      cancelAnimationFrame(raf);
      try {
        audioRef.current?.close();
      } catch {
        /* noop */
      }
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] overflow-hidden"
      style={{ background: stage >= 1 ? "rgba(8,9,12,.93)" : "rgba(8,9,12,.55)", backdropFilter: "blur(6px)", transition: "background .7s ease" }}
      onClick={() => {
        setOpen(false);
        setStage(0);
      }}
    >
      {/* kilatan cahaya putih saat pertama terbuka */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-white"
        style={{
          opacity: stage === 0 ? 0.85 : 0,
          transition: "opacity .55s ease-out",
        }}
      />

      {/* cincin gelombang kejut */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#9db2ff]"
        style={{
          width: stage >= 1 ? "160vmax" : "8vmax",
          height: stage >= 1 ? "160vmax" : "8vmax",
          opacity: stage === 0 ? 0.9 : 0,
          transition: "all 1.1s cubic-bezier(.2,.8,.2,1)",
        }}
      />

      {/* konfeti */}
      <canvas ref={confettiRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden />

      {/* isi pesan */}
      <div className="relative grid h-full place-items-center p-6">
        <div
          className="relative w-full max-w-xl text-center transition-all duration-700"
          style={{
            opacity: stage >= 2 ? 1 : 0,
            transform: stage >= 2 ? "translateY(0) scale(1)" : "translateY(28px) scale(.94)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-[13px] font-medium tracking-[0.24em] text-[#9db2ff] uppercase">kamu menemukannya</p>

          <h3 className="mt-4 text-[clamp(2.4rem,7vw,4.6rem)] leading-[1.02] font-black tracking-[-0.03em] text-white">
            GONG<span className="text-[#5b7cfa]">!</span>
          </h3>
          <p className="mt-2 text-[15px] text-white/60">
            Ini bukan halaman biasa, dan kamu bukan pengunjung biasa.
          </p>

          <div className="mx-auto mt-8 max-w-md space-y-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 text-left backdrop-blur">
            <p className="text-[14px] leading-relaxed text-white/70">
              Kamu salah satu dari sedikit orang yang penasaran sampai sejauh ini. Itu sikap yang
              sama yang kupakai membangun semua produk di halaman ini: <span className="text-white">coba, ukur, lalu buktikan.</span>
            </p>
            <p className="text-[13px] leading-relaxed text-white/50">
              Kalau kamu juga tipe yang suka mengulik, kirim pesan ke{" "}
              <span className="text-[#9db2ff]">arielbudi4@gmail.com</span> dengan judul{" "}
              <span className="font-semibold text-white">&ldquo;EASTER EGG&rdquo;</span>.
              Akan kubalas dengan cerita di balik layar — gratis, cuma untuk yang menemukan ini.
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <a
              href="mailto:arielbudi4@gmail.com?subject=EASTER%20EGG"
              className="rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-[#14171b] transition-transform hover:scale-105"
            >
              Kirim pesan
            </a>
            <button
              onClick={() => {
                setOpen(false);
                setStage(0);
              }}
              className="rounded-full border border-white/15 px-5 py-3 text-[14px] text-white/70 transition-colors hover:border-white/30 hover:text-white"
            >
              Tutup
            </button>
          </div>
          <p className="mt-4 text-[12px] text-white/25">tekan Esc untuk menutup</p>
        </div>
      </div>
    </div>
  );
}
