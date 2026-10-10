// ─────────────────────────────────────────────────────────────────────────────
// EFEK KHUSUS 2 — kumpulan kedua animasi yang ditulis dari nol.
// Canvas/WebGL/CSS murni, tanpa ketergantungan pustaka animasi.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from "react";

/* ── 13. DottedGlobe ────────────────────────────────────────────────────────
   Mirip "Globe" (Pro/3D): bola dunia titik-titik dengan busur yang
   beranimasi. Canvas 2D: proyeksi bola + rotasi + busur antar titik. */
export function DottedGlobe({ className = "", size = 260 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf, rot = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const S = size;
    canvas.width = S * dpr;
    canvas.height = S * dpr;
    canvas.style.width = `${S}px`;
    canvas.style.height = `${S}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // titik-titik di permukaan bola (fibonacci sphere)
    const N = 420;
    const pts = [];
    for (let i = 0; i < N; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      pts.push({
        x: Math.cos(theta) * Math.sin(phi),
        y: Math.cos(phi),
        z: Math.sin(theta) * Math.sin(phi),
      });
    }
    // busur: pasangan titik acak untuk garis penghubung
    const arcs = Array.from({ length: 14 }, () => ({
      a: Math.floor(Math.random() * N),
      b: Math.floor(Math.random() * N),
      t: Math.random(),
      speed: 0.0016 + Math.random() * 0.003,
    }));

    const project = (p) => {
      const cy = Math.cos(rot), sy = Math.sin(rot);
      const x = p.x * cy - p.z * sy;
      const z = p.x * sy + p.z * cy;
      const tilt = 0.42;
      const y = p.y * Math.cos(tilt) - z * Math.sin(tilt);
      const z2 = p.y * Math.sin(tilt) + z * Math.cos(tilt);
      const persp = 1 / (1.9 - z2 * 0.55);
      return { x: S / 2 + x * S * 0.34 * persp * 1.7, y: S / 2 + y * S * 0.34 * persp * 1.7, z: z2, s: persp };
    };

    const draw = () => {
      ctx.clearRect(0, 0, S, S);
      rot += 0.0042;
      const projected = pts.map(project);

      // busur
      for (const arc of arcs) {
        arc.t += arc.speed;
        if (arc.t > 1) {
          arc.t = 0;
          arc.a = Math.floor(Math.random() * N);
          arc.b = Math.floor(Math.random() * N);
        }
        const A = projected[arc.a];
        const B = projected[arc.b];
        if (!A || !B || A.z < -0.1 || B.z < -0.1) continue;
        const mx = (A.x + B.x) / 2;
        const my = (A.y + B.y) / 2 - 26;
        const seg = Math.min(1, arc.t * 1.4);
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.quadraticCurveTo(mx, my, A.x + (B.x - A.x) * seg, A.y + (B.y - A.y) * seg);
        ctx.strokeStyle = `rgba(100,230,255,${0.35 * (1 - arc.t)})`;
        ctx.lineWidth = 1.1;
        ctx.stroke();
        // kepala busur
        const hx = A.x + (B.x - A.x) * seg;
        const hy = A.y + (B.y - A.y) * seg;
        ctx.beginPath();
        ctx.arc(hx, hy, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,92,157,${0.9 * (1 - arc.t)})`;
        ctx.fill();
      }

      // titik bola
      for (const p of projected) {
        const front = p.z > 0;
        const a = front ? 0.12 + p.z * 0.6 : 0.05;
        ctx.beginPath();
        ctx.arc(p.x, p.y, front ? 1.5 : 0.9, 0, Math.PI * 2);
        ctx.fillStyle = front ? `rgba(100,230,255,${a})` : `rgba(139,147,167,${a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [size]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

/* ── 14. LightDroplets ──────────────────────────────────────────────────────
   Mirip "Light Droplets" (Pro/Background): garis-garis cahaya jatuh seperti
   hujan. Canvas 2D, murah dan halus. */
export function LightDroplets({ className = "", count = 60, color = "100,230,255" }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf, w, h, dpr;
    const drops = [];

    const reset = (d) => {
      d.x = Math.random() * w;
      d.y = -Math.random() * h;
      d.len = 30 + Math.random() * 130;
      d.speed = 1.4 + Math.random() * 4.2;
      d.alpha = 0.08 + Math.random() * 0.35;
      d.w = 0.6 + Math.random() * 1.1;
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drops.length = 0;
      for (let i = 0; i < count; i++) {
        const d = {};
        reset(d);
        d.y = Math.random() * h;
        drops.push(d);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of drops) {
        d.y += d.speed;
        if (d.y - d.len > h) reset(d);
        const g = ctx.createLinearGradient(d.x, d.y - d.len, d.x, d.y);
        g.addColorStop(0, `rgba(${color},0)`);
        g.addColorStop(1, `rgba(${color},${d.alpha})`);
        ctx.strokeStyle = g;
        ctx.lineWidth = d.w;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y - d.len);
        ctx.lineTo(d.x, d.y);
        ctx.stroke();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [count, color]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

/* ── 15. NeonReveal ─────────────────────────────────────────────────────────
   Mirip "Neon Reveal" (Pro/Background): tabung neon yang menyala lalu
   menyinari isi di bawahnya. CSS + keyframes, tanpa canvas. */
export function NeonReveal({ children, className = "", color = "#64e6ff" }) {
  return (
    <div className={`relative ${className}`} style={{ "--neon": color }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 -top-px h-px"
        style={{
          background: `linear-gradient(90deg, transparent, var(--neon), transparent)`,
          boxShadow: `0 0 14px 2px var(--neon)`,
          animation: "neonFlicker 5.2s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{
          background: `radial-gradient(60% 100% at 50% 0%, color-mix(in srgb, var(--neon) 16%, transparent), transparent 70%)`,
          animation: "neonGlow 5.2s ease-in-out infinite",
        }}
      />
      {children}
      <style>{`
        @keyframes neonFlicker {
          0%, 100% { opacity: .55 }
          42% { opacity: .55 }
          45% { opacity: 1 }
          48% { opacity: .3 }
          52% { opacity: 1 }
          70% { opacity: .75 }
        }
        @keyframes neonGlow {
          0%, 100% { opacity: .5 }
          45% { opacity: 1 }
          48% { opacity: .35 }
          52% { opacity: .95 }
        }
      `}</style>
    </div>
  );
}

/* ── 16. GradientBars ───────────────────────────────────────────────────────
   Mirip "Gradient Bars" (Pro/Background): bar gradien vertikal yang bergeser
   membentuk gelombang. Ringan (CSS transform + delay). */
export function GradientBars({ className = "", bars = 26 }) {
  const list = Array.from({ length: bars });
  return (
    <div className={`pointer-events-none flex items-end gap-1 ${className}`} aria-hidden="true">
      {list.map((_, i) => (
        <span
          key={i}
          className="flex-1 rounded-t-full"
          style={{
            height: `${28 + Math.sin(i * 0.55) * 22 + (i % 3) * 9}%`,
            background: `linear-gradient(180deg, rgba(100,230,255,0) 0%, rgba(100,230,255,.5) 45%, rgba(139,92,246,.75) 100%)`,
            animation: `barWave ${3.4 + (i % 5) * 0.42}s ${i * 0.07}s ease-in-out infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes barWave {
          from { transform: scaleY(.55) translateY(12%); opacity: .35 }
          to   { transform: scaleY(1) translateY(0);     opacity: .95 }
        }
      `}</style>
    </div>
  );
}

/* ── 17. TextCube ───────────────────────────────────────────────────────────
   Mirip "Text Cube" (Pro/Text): kubus 3D dari teks yang mengikuti kursor.
   CSS 3D transform murni. */
export function TextCube({ faces = ["REACT", "NODE", "NEXT", "POSTGRE", "GSAP", "THREE"], className = "", size = 130 }) {
  const ref = useRef(null);
  const [rot, setRot] = useState({ x: -18, y: 28 });
  const drag = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const py = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      setRot({ x: -18 - py * 22, y: 28 + px * 34 });
    };
    const zone = el.parentElement;
    zone?.addEventListener("pointermove", onMove, { passive: true });
    return () => zone?.removeEventListener("pointermove", onMove);
  }, []);

  const half = size / 2;
  const transforms = [
    `rotateY(0deg) translateZ(${half}px)`,
    `rotateY(90deg) translateZ(${half}px)`,
    `rotateY(180deg) translateZ(${half}px)`,
    `rotateY(-90deg) translateZ(${half}px)`,
    `rotateX(90deg) translateZ(${half}px)`,
    `rotateX(-90deg) translateZ(${half}px)`,
  ];

  return (
    <div ref={ref} className={`grid place-items-center ${className}`} style={{ perspective: 800, width: size, height: size }}>
      <div
        className="preserve-3d relative transition-transform duration-200 ease-out"
        style={{ width: size, height: size, transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)` }}
      >
        {transforms.map((t, i) => (
          <div
            key={i}
            className="absolute inset-0 grid place-items-center rounded-xl border border-neon/25 font-display text-sm font-bold tracking-wider text-neon"
            style={{
              transform: t,
              background: "color-mix(in srgb, #64e6ff 7%, rgba(10,12,18,.9))",
              boxShadow: "inset 0 0 30px color-mix(in srgb, #64e6ff 14%, transparent)",
              backfaceVisibility: "visible",
            }}
          >
            {faces[i]}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 18. TumbleWall ─────────────────────────────────────────────────────────
   Mirip "Tumble Wall" (Pro/UI): tumpukan foto/tag yang berjatuhan dan bisa
   dilempar. Fisika sederhana ditulis sendiri (gravitasi + pantulan + drag). */
export function TumbleWall({ items = [], className = "", height = 260 }) {
  const ref = useRef(null);
  const bodies = useRef([]);
  const raf = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const W = el.clientWidth;
    const H = height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const canvas = document.createElement("canvas");
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = "100%";
    canvas.style.height = `${H}px`;
    canvas.style.display = "block";
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    el.appendChild(canvas);

    const pal = ["#64e6ff", "#8b5cf6", "#ff5c9d", "#a3e635", "#ffb347"];
    bodies.current = items.map((label, i) => ({
      label,
      x: 30 + Math.random() * (W - 60),
      y: -40 - i * 55 - Math.random() * 80,
      vx: (Math.random() - 0.5) * 1.4,
      vy: 1.2 + Math.random() * 1.6,
      rot: (Math.random() - 0.5) * 0.5,
      vr: (Math.random() - 0.5) * 0.03,
      w: Math.min(180, 34 + label.length * 7.6),
      h: 30,
      color: pal[i % pal.length],
      held: false,
    }));

    const gravity = 0.19;
    const floor = H - 8;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const b of bodies.current) {
        if (!b.held) {
          b.vy += gravity;
          b.vx *= 0.995;
          b.x += b.vx;
          b.y += b.vy;
          b.rot += b.vr;
          // pantulan lantai
          if (b.y + b.h / 2 > floor) {
            b.y = floor - b.h / 2;
            b.vy *= -0.42;
            b.vx *= 0.86;
            b.vr *= 0.7;
            if (Math.abs(b.vy) < 0.5) b.vy = 0;
          }
          // dinding
          if (b.x - b.w / 2 < 0) { b.x = b.w / 2; b.vx *= -0.6; }
          if (b.x + b.w / 2 > W) { b.x = W - b.w / 2; b.vx *= -0.6; }
          // tumpukan sederhana: dorong keluar bila bertumpuk
          for (const o of bodies.current) {
            if (o === b || o.held) continue;
            const dx = b.x - o.x;
            const dy = b.y - o.y;
            if (Math.abs(dx) < (b.w + o.w) / 2 - 6 && Math.abs(dy) < b.h - 8) {
              const push = dx === 0 ? (Math.random() - 0.5) * 2 : Math.sign(dx);
              b.x += push * 1.6;
              b.vy *= 0.94;
            }
          }
        }
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.rot);
        ctx.fillStyle = "rgba(10,12,18,.92)";
        ctx.strokeStyle = b.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(-b.w / 2, -b.h / 2, b.w, b.h, 8);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = b.color;
        ctx.font = "600 12px 'JetBrains Mono', monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(b.label, 0, 1);
        ctx.restore();
      }
      raf.current = requestAnimationFrame(draw);
    };
    draw();

    // interaksi: lempar dengan kursor
    const pick = (e) => {
      const r = canvas.getBoundingClientRect();
      const mx = e.clientX - r.left;
      const my = e.clientY - r.top;
      for (let i = bodies.current.length - 1; i >= 0; i--) {
        const b = bodies.current[i];
        if (Math.abs(mx - b.x) < b.w / 2 && Math.abs(my - b.y) < b.h / 2) {
          b.held = true;
          b.dx = mx - b.x;
          b.dy = my - b.y;
          break;
        }
      }
    };
    const move = (e) => {
      const r = canvas.getBoundingClientRect();
      const mx = e.clientX - r.left;
      const my = e.clientY - r.top;
      for (const b of bodies.current) {
        if (b.held) {
          b.vx = (mx - b.dx - b.x) * 0.42;
          b.vy = (my - b.dy - b.y) * 0.42;
          b.x = mx - b.dx;
          b.y = my - b.dy;
        }
      }
    };
    const drop = () => bodies.current.forEach((b) => (b.held = false));

    canvas.addEventListener("pointerdown", pick);
    canvas.addEventListener("pointermove", move);
    window.addEventListener("pointerup", drop);

    return () => {
      cancelAnimationFrame(raf.current);
      canvas.removeEventListener("pointerdown", pick);
      canvas.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", drop);
      canvas.remove();
    };
  }, [items, height]);

  return <div ref={ref} className={`relative ${className}`} />;
}

/* ── 19. DepthCarousel ──────────────────────────────────────────────────────
   Mirip "Depth Carousel" (Pro/UI): kartu yang mundur ke kedalaman di rel 3D,
   bisa digeser & maju otomatis. */
export function DepthCarousel({ slides = [], className = "", auto = 3600 }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const t = setInterval(() => setIdx((v) => (v + 1) % slides.length), auto);
    return () => clearInterval(t);
  }, [paused, slides.length, auto]);

  return (
    <div
      className={`relative ${className}`}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      style={{ perspective: 1100 }}
    >
      <div className="preserve-3d relative h-52">
        {slides.map((s, i) => {
          let off = i - idx;
          const n = slides.length;
          if (off > n / 2) off -= n;
          if (off < -n / 2) off += n;
          const abs = Math.abs(off);
          return (
            <div
              key={s.title}
              className="absolute inset-x-6 top-0 rounded-2xl border border-line bg-ink-2/90 p-5 transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
              style={{
                transform: `translateZ(${-abs * 130}px) translateX(${off * 46}px) rotateY(${off * -9}deg)`,
                opacity: abs > 2 ? 0 : 1 - abs * 0.32,
                zIndex: 10 - abs,
                filter: abs > 0 ? `blur(${abs * 1.4}px)` : "none",
              }}
            >
              <p className="font-mono text-[10px] tracking-[0.22em] text-neon uppercase">{s.kicker}</p>
              <p className="mt-2 font-display text-lg font-semibold text-frost">{s.title}</p>
              <p className="mt-1.5 text-[13px] text-mist">{s.desc}</p>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.title}
            onClick={() => setIdx(i)}
            aria-label={s.title}
            className={`h-1.5 rounded-full transition-all ${i === idx ? "w-7 bg-neon" : "w-1.5 bg-line hover:bg-mist"}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ── 20. MosaicWaves ────────────────────────────────────────────────────────
   Mirip "Mosaic Waves" (Pro/Background): gelombang yang bergulir lewat
   mosaik kotak yang bergeser. Grid CSS + delay gelombang. */
export function MosaicWaves({ className = "", cols = 18, rows = 7 }) {
  const cells = Array.from({ length: cols * rows });
  return (
    <div
      aria-hidden
      className={`pointer-events-none grid gap-[3px] ${className}`}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}
    >
      {cells.map((_, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        return (
          <span
            key={i}
            className="rounded-[3px]"
            style={{
              background: "linear-gradient(140deg, rgba(100,230,255,.32), rgba(139,92,246,.22))",
              animation: `mosaicShift ${2.8 + (c % 5) * 0.3}s ${(c * 0.11 + r * 0.16).toFixed(2)}s ease-in-out infinite`,
            }}
          />
        );
      })}
      <style>{`
        @keyframes mosaicShift {
          0%, 100% { opacity: .12; transform: scale(.82) }
          50%      { opacity: .78; transform: scale(1) }
        }
      `}</style>
    </div>
  );
}

/* ── 21. AuroraTide ─────────────────────────────────────────────────────────
   Mirip "Blurred Tides / Satin Ridges" (Pro/Background): pita aurora lembut
   yang mengalir. Gradien berlapis + animasi posisi. */
export function AuroraTide({ className = "" }) {
  return (
    <div className={`pointer-events-none overflow-hidden ${className}`} aria-hidden="true">
      {[
        { c: "rgba(100,230,255,.32)", d: 22, y: "-18%" },
        { c: "rgba(139,92,246,.30)", d: 27, y: "-6%" },
        { c: "rgba(255,92,157,.26)", d: 33, y: "6%" },
      ].map((l, i) => (
        <span
          key={i}
          className="absolute inset-x-[-30%] h-[46%] blur-3xl"
          style={{
            top: l.y,
            background: `linear-gradient(100deg, transparent, ${l.c}, transparent)`,
            animation: `tide ${l.d}s ${i * 1.4}s ease-in-out infinite alternate`,
          }}
        />
      ))}
      <style>{`
        @keyframes tide {
          from { transform: translateX(-8%) skewY(-2deg) scaleY(.85) }
          to   { transform: translateX(8%)  skewY(2deg)  scaleY(1.15) }
        }
      `}</style>
    </div>
  );
}
