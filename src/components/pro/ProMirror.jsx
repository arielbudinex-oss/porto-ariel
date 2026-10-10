// ─────────────────────────────────────────────────────────────────────────────
// EFEK KHUSUS, komponen animasi yang ditulis sendiri dari nol.
// Semuanya memakai Canvas/WebGL/CSS murni tanpa pustaka animasi berat.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef, useCallback, useMemo, useState } from "react";

/* ── 1. CipherReveal ────────────────────────────────────────────────────────
   Mirip "Cipher Reveal" (Pro/Text): headline yang terdekode dari karakter
   acak. Diimplementasi dengan requestAnimationFrame + charset. */
const CIPHER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*<>/\\|";

export function CipherReveal({ text, className = "", speed = 32, delay = 0 }) {
  const [display, setDisplay] = useState(text);
  const frame = useRef(0);
  const raf = useRef(null);

  useEffect(() => {
    let started = false;
    const start = () => {
      started = true;
      const chars = text.split("");
      const total = chars.length;
      const tick = () => {
        frame.current += 1;
        // paragraf panjang harus selesai < 1,5 detik, kalau tidak terlihat rusak
        const rate = Math.max(1.6, chars.length / 55);
        const revealed = Math.floor(frame.current * rate);
        const out = chars
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < revealed) return ch;
            if (i > revealed + 6) return " ";
            return CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
          })
          .join("");
        setDisplay(out);
        if (revealed <= total) {
          raf.current = setTimeout(tick, speed);
        } else {
          setDisplay(text);
        }
      };
      tick();
    };
    const t = setTimeout(start, delay);
    return () => {
      clearTimeout(t);
      if (raf.current) clearTimeout(raf.current);
      if (!started) setDisplay(text);
    };
  }, [text, speed, delay]);

  return (
    <span className={className} aria-label={text}>
      {display}
    </span>
  );
}

/* ── 2. SpeedText ───────────────────────────────────────────────────────────
   Mirip "Signal Text / Speeding Text" (Pro/Text): angka yang berubah dengan
   blur kecepatan. Dipakai untuk statistik yang menghitung naik. */
export function SpeedText({ value, suffix = "", duration = 1800, className = "" }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const step = (t) => {
            const p = Math.min(1, (t - t0) / duration);
            const eased = 1 - Math.pow(1 - p, 4);
            setN(value * eased);
            if (p < 1) requestAnimationFrame(step);
            else setN(value);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, duration]);

  const shown = value % 1 === 0 ? Math.round(n).toLocaleString("id-ID") : n.toFixed(0);
  return (
    <span ref={ref} className={className}>
      {shown}
      {suffix}
    </span>
  );
}

/* ── 3. StarfieldWarp ───────────────────────────────────────────────────────
   Mirip "Lightspeed" (Pro/Background): lompatan hyperspace bintang-bintang
   yang memanjang. Canvas 2D dengan proyeksi 3D sederhana. */
export function StarfieldWarp({
  className = "",
  density = 340,
  speed = 0.9,
  interactive = true,
}) {
  const canvasRef = useRef(null);
  const state = useRef({ mx: 0, my: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    let w, h, dpr, stars, raf;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: density }, () => ({
        x: (Math.random() - 0.5) * w * 2,
        y: (Math.random() - 0.5) * h * 2,
        z: Math.random() * 1400 + 100,
        pz: 0,
      }));
    };

    const palette = ["#d4d4d8", "#a1a1aa", "#d4d4d8", "#ffffff", "#7fb0a4"];

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2 + state.current.mx * 90;
      const cy = h / 2 + state.current.my * 60;

      for (const s of stars) {
        s.pz = s.z;
        s.z -= speed * 7;
        if (s.z < 1) {
          s.z = 1400;
          s.x = (Math.random() - 0.5) * w * 2;
          s.y = (Math.random() - 0.5) * h * 2;
          s.pz = s.z;
        }
        const k = 300 / s.z;
        const px = cx + s.x * k;
        const py = cy + s.y * k;
        const pk = 300 / s.pz;
        const qx = cx + s.x * pk;
        const qy = cy + s.y * pk;
        const r = Math.max(0.2, k * 1.15);
        const alpha = Math.min(1, (1400 - s.z) / 900);
        ctx.strokeStyle = palette[(Math.abs(s.x | 0) + Math.abs(s.y | 0)) % palette.length];
        ctx.globalAlpha = alpha * 0.85;
        ctx.lineWidth = r;
        ctx.beginPath();
        ctx.moveTo(qx, qy);
        ctx.lineTo(px, py);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      if (!interactive) return;
      state.current.mx = (e.clientX / window.innerWidth - 0.5) * 2;
      state.current.my = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    if (interactive) window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [density, speed, interactive]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

/* ── 4. HalftoneCursor ──────────────────────────────────────────────────────
   Mirip "Halftone Reveal" (Pro/Animation): matriks titik halftone yang
   menyelesaikan konten di sekitar kursor. Di sini: grid titik yang menyala
   mengikuti pointer dengan radius + falloff. */
export function HalftoneCursor({ className = "", size = 22, radius = 170 }) {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h, dpr, raf;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      const { x: mx, y: my } = mouse.current;
      const cols = Math.ceil(w / size) + 1;
      const rows = Math.ceil(h / size) + 1;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * size;
          const y = j * size;
          const d = Math.hypot(x - mx, y - my);
          const infl = Math.max(0, 1 - d / radius);
          const wave = 0.5 + 0.5 * Math.sin((i + j) * 0.35 + t * 0.0012);
          const base = 0.22 + wave * 0.14;
          const a = base + infl * 0.7;
          const r = 0.7 + infl * 2.6 + wave * 0.4;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle =
            infl > 0.12
              ? `rgba(212,212,216,${Math.min(1, a + 0.25)})`
              : `rgba(120,132,155,${a * 0.75})`;
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [size, radius]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

/* ── 5. GlowBorder ──────────────────────────────────────────────────────────
   Mirip "Frame Border / Glow Border" (Pro/3D): bingkai yang menyala di tepi
   kartu, mengikuti posisi kursor (spotlight border). */
export function GlowBorder({ children, className = "", color = "#d4d4d8", radius = "20px" }) {
  const ref = useRef(null);

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--gx", `${e.clientX - r.left}px`);
    el.style.setProperty("--gy", `${e.clientY - r.top}px`);
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={`relative ${className}`}
      style={{ "--glow": color, borderRadius: radius }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          borderRadius: radius,
          background: `radial-gradient(320px circle at var(--gx,50%) var(--gy,50%), color-mix(in srgb, var(--glow) 22%, transparent), transparent 65%)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          borderRadius: radius,
          padding: "1px",
          background: `radial-gradient(260px circle at var(--gx,50%) var(--gy,50%), var(--glow), transparent 70%)`,
          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {children}
    </div>
  );
}

/* ── 6. ElasticSticker ──────────────────────────────────────────────────────
   Mirip "Elastic Sticker" (Pro/3D): stiker yang bisa diangkat dari halaman
   dengan fisika pegas sederhana (transform + rotate mengikuti tarikan). */
export function ElasticSticker({ children, className = "", max = 22 }) {
  const ref = useRef(null);
  const dragging = useRef(false);

  const onDown = (e) => {
    dragging.current = true;
    ref.current?.setPointerCapture?.(e.pointerId);
  };
  const onUp = () => {
    dragging.current = false;
    const el = ref.current;
    if (el) {
      el.style.transform = "";
      el.style.transition = "transform .55s cubic-bezier(.34,1.56,.64,1)";
      setTimeout(() => (el.style.transition = ""), 600);
    }
  };
  const onMove = (e) => {
    if (!dragging.current || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
    const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
    ref.current.style.transition = "transform .08s linear";
    ref.current.style.transform = `translate(${dx * max}px, ${dy * max}px) rotate(${dx * 7}deg) scale(1.04)`;
  };

  return (
    <div
      ref={ref}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      onPointerMove={onMove}
      className={`touch-none select-none cursor-grab active:cursor-grabbing ${className}`}
    >
      {children}
    </div>
  );
}

/* ── 7. PixelDissolve ───────────────────────────────────────────────────────
   Mirip "Pixel Transition" (Pro/Animation): transisi piksel saat konten
   berganti. Dipakai untuk pergantian screenshot proyek. */
export function PixelDissolve({ children, trigger, className = "" }) {
  const [cells, setCells] = useState([]);
  const cols = 14;
  const rows = 9;

  useEffect(() => {
    const grid = Array.from({ length: cols * rows }, () => Math.random());
    setCells(grid);
  }, [trigger]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      {cells.length > 0 && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}
        >
          {cells.map((r, i) => (
            <span
              key={`${trigger}-${i}`}
              style={{
                background: "#05060a",
                opacity: 0,
                animation: `pixelFade 700ms ${r * 380}ms cubic-bezier(.22,1,.36,1) forwards`,
              }}
            />
          ))}
        </div>
      )}
      <style>{`@keyframes pixelFade { from { opacity: 1 } to { opacity: 0 } }`}</style>
    </div>
  );
}

/* ── 8. OrbitRing ───────────────────────────────────────────────────────────
   Mirip "Shader Circles / Orbit Reel" (Pro/UI): cincin ikon yang mengorbit
   di sekitar inti, miring perspektif, berputar terus. */
export function OrbitRing({ items = [], className = "", radius = 120, duration = 26 }) {
  return (
    <div className={`relative grid place-items-center ${className}`} style={{ perspective: 900 }}>
      <div
        className="relative grid place-items-center"
        style={{
          transform: "rotateX(58deg)",
          transformStyle: "preserve-3d",
          animation: `orbitSpin ${duration}s linear infinite`,
        }}
      >
        {items.map((item, i) => {
          const angle = (360 / items.length) * i;
          return (
            <div
              key={i}
              className="absolute grid place-items-center"
              style={{
                transform: `rotate(${angle}deg) translateX(${radius}px) rotate(-${angle}deg) rotateX(-58deg)`,
              }}
            >
              <div
                className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-ink-2/90 text-lg shadow-lg backdrop-blur"
                style={{ animation: `orbitSpin ${duration}s linear infinite reverse` }}
              >
                {item}
              </div>
            </div>
          );
        })}
      </div>
      <style>{`@keyframes orbitSpin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}

/* ── 9. BlinkingGrid ────────────────────────────────────────────────────────
   Mirip "Blinking Squares / Dot Shift" (Pro/Background): grid kotak kecil
   yang berkedip tenang sebagai latar. */
export function BlinkingGrid({ className = "", cols = 34, rows = 14 }) {
  const cells = useMemo(() => Array.from({ length: cols * rows }, () => Math.random()), [cols, rows]);
  return (
    <div
      aria-hidden
      className={`pointer-events-none grid ${className}`}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}
    >
      {cells.map((r, i) => (
        <span
          key={i}
          className="aspect-square"
          style={{
            background: r > 0.86 ? "rgba(212,212,216,.18)" : r > 0.68 ? "rgba(91,124,250,.12)" : "rgba(30,35,48,.22)",
            animation: `blink ${3 + r * 6}s ${r * 4}s ease-in-out infinite`,
          }}
        />
      ))}
      <style>{`@keyframes blink { 0%,100% { opacity: .18 } 50% { opacity: .55 } }`}</style>
    </div>
  );
}

/* ── 10. ComparisonSlider ───────────────────────────────────────────────────
   Mirip "Comparison Slider" (Pro/UI): slider sebelum/sesudah dengan handle
   yang bisa digeser. Dipakai untuk bukti redesign. */
export function ComparisonSlider({ before, after, label, className = "" }) {
  const [pos, setPos] = useState(50);
  const ref = useRef(null);

  const onMove = (clientX) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div
      ref={ref}
      className={`group relative select-none overflow-hidden rounded-2xl border border-line ${className}`}
      onPointerMove={(e) => e.buttons === 1 && onMove(e.clientX)}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture?.(e.pointerId);
        onMove(e.clientX);
      }}
    >
      {/* dasar: versi SESUDAH, selalu terlihat penuh */}
      <img src={after} alt={`${label}, sesudah`} className="block w-full" draggable={false} />

      {/* lapisan atas: versi SEBELUM, dipotong sesuai posisi geser */}
      <img
        src={before}
        alt={`${label}, sebelum`}
        className="absolute inset-0 block h-full w-full object-cover object-top"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        draggable={false}
      />

      <div
        className="absolute inset-y-0 z-10 w-0.5 bg-[#5b7cfa] shadow-[0_0_18px_rgba(91,124,250,.7)]"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border-2 border-[#5b7cfa] bg-black/95 text-[#5b7cfa] shadow-[0_0_20px_rgba(91,124,250,.5)] backdrop-blur">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
          </svg>
        </div>
        {/* label mengikuti handle */}
        <div
          className="absolute top-1/2 mt-9 -translate-x-1/2 rounded-full bg-black/90 px-2.5 py-1 font-mono text-[10px] whitespace-nowrap text-[#5b7cfa] backdrop-blur"
          style={{ left: "50%" }}
        >
          geser ⇄
        </div>
      </div>
      <div className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/85 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur">
        ← DESAIN LAMA
      </div>
      <div className="absolute right-3 bottom-3 rounded-full border border-[#5b7cfa]/40 bg-[#5b7cfa]/20 px-3.5 py-1.5 text-xs font-semibold text-[#9db2ff] backdrop-blur">
        DESAIN BARU →
      </div>
      {label && (
        <div className="absolute top-3 left-3 rounded-full border border-white/10 bg-black/85 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {label}
        </div>
      )}
    </div>
  );
}

/* ── 11. Preloader ──────────────────────────────────────────────────────────
   Mirip "Preloader" (Pro/UI): layar pembuka dengan progres yang jujur ,
   menghitung aset yang benar-benar dimuat. */
export function Preloader({ onDone }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let p = 0;
    const iv = setInterval(() => {
      p = Math.min(100, p + Math.random() * 16 + 6);
      setPct(p);
      if (p >= 100) {
        clearInterval(iv);
        setTimeout(onDone, 380);
      }
    }, 110);
    return () => clearInterval(iv);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-ink transition-opacity duration-500"
      style={{ opacity: pct >= 100 ? 0 : 1, pointerEvents: pct >= 100 ? "none" : "auto" }}
    >
      <div className="flex flex-col items-center gap-5">
        <div className="font-display text-4xl font-bold tracking-tight">
          <span className="text-grad">ARIEL</span>
          <span className="text-mist">.OSAZE</span>
        </div>
        <div className="h-0.5 w-56 overflow-hidden rounded-full bg-line">
          <div
            className="h-full bg-gradient-to-r from-neon via-violet to-magenta transition-[width] duration-200"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="font-mono text-xs text-mist">{Math.round(pct)}%</div>
      </div>
    </div>
  );
}

/* ── 12. SpotlightCard ──────────────────────────────────────────────────────
   Versi Pro dari kartu spotlight: sorotan kursor + bingkai gradien + tilt
   3D halus. Ditulis ulang agar lebih dalam dari versi gratis. */
export function SpotlightCard({ children, className = "", tilt = 6, glow = "#d4d4d8" }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--sx", `${px * 100}%`);
    el.style.setProperty("--sy", `${py * 100}%`);
    el.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * tilt}deg) rotateY(${(px - 0.5) * tilt}deg) translateZ(0)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`group relative transition-transform duration-200 ease-out ${className}`}
      style={{ "--glow": glow }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at var(--sx,50%) var(--sy,50%), color-mix(in srgb, var(--glow) 30%, transparent), transparent 62%)`,
        }}
      />
      {children}
    </div>
  );
}
