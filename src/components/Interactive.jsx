// ─────────────────────────────────────────────────────────────────────────────
// InteractiveCard — pembungkus kartu: satu bahasa gerak, yaitu cahaya.
//   • sorotan lembut mengikuti kursor di permukaan kartu
//   • garis tepi menyala tipis mengikuti warna aksen saat kursor masuk
// Dipakai di Experience, Skills, Journey, Lab, dan Contact.
// ─────────────────────────────────────────────────────────────────────────────
import { useRef, useCallback, useEffect, useState } from "react";

export function InteractiveCard({
  children,
  className = "",
  accent = "#5b7cfa",
  radius = "14px",
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

  return (
    <Tag
      ref={ref}
      onPointerMove={onMove}
      className={`group/interactive relative ${className}`}
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
      className={`inline-flex cursor-default items-center transition-colors duration-200 ${className}`}
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
// LazyEffect — hanya merender efek berat (WebGL/canvas) saat elemen masuk
// viewport, dan berhenti merender saat keluar. Ini penghematan terbesar:
// 24 efek Lab tidak lagi jalan bersamaan.
// ─────────────────────────────────────────────────────────────────────────────
export function LazyEffect({ children, className = "", rootMargin = "200px" }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => setShow(entry.isIntersecting),
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {show ? children : null}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tilt3D — kartu yang miring mengikuti posisi kursor (efek kedalaman).
// Ringan: hanya transform CSS, tanpa library.
// ─────────────────────────────────────────────────────────────────────────────
export function Tilt3D({ children, className = "", max = 7, scale = 1.015, glare = true, accent = "#5b7cfa" }) {
  const ref = useRef(null);
  const raf = useRef(0);

  const onMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (0.5 - py) * max * 2;
      const ry = (px - 0.5) * max * 2;
      el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale3d(${scale},${scale},1)`;
      if (glare) {
        el.style.setProperty("--tx-glare-x", `${(px * 100).toFixed(1)}%`);
        el.style.setProperty("--tx-glare-y", `${(py * 100).toFixed(1)}%`);
      }
    });
  }, [max, scale, glare]);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  }, []);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`relative transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{ transformStyle: "preserve-3d", "--tx-accent": accent }}
    >
      {glare && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 hover:opacity-100"
          style={{
            background: `radial-gradient(340px circle at var(--tx-glare-x,50%) var(--tx-glare-y,50%), color-mix(in srgb, var(--tx-accent) 12%, transparent), transparent 65%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SecretTerminal — easter egg "gong": mode terminal rahasia yang bisa diajak
// ngobrol. Pengunjung bisa mengetik perintah dan terminal menjawab dengan gaya
// developer. Ada perintah rahasia tersembunyi di dalamnya.
// Dipicu dengan mengetik "ariel" atau klik logo 5x.
// ─────────────────────────────────────────────────────────────────────────────
const COMMANDS = {
  help: [
    "Perintah yang tersedia:",
    "  whoami            siapa yang membangun halaman ini",
    "  ls                lihat isi folder rahasia",
    "  cat rahasia.txt   baca file rahasia",
    "  npm run gong      jalankan sesuatu",
    "  sudo make me a sandwich",
    "  clear             bersihkan layar",
    "  exit              keluar dari terminal",
  ],
  whoami: [
    "Ariel Osaze Koinda Budi",
    "Full-stack developer. Membangun produk dari nol sampai produksi:",
    "backend, frontend, database, deployment, sampai halaman jualan.",
    "7 proyek nyata. 265rb+ baris kode. 4 produk live.",
  ],
  ls: [
    "drwxr-xr-x  proyek/         7 item",
    "drwxr-xr-x  rahasia/        1 item",
    "-rw-r--r--  rahasia.txt     kamu berani buka?",
    "-rw-r--r--  easter-egg.md   kamu sedang membacanya",
  ],
  "cat rahasia.txt": [
    "================================================",
    "  Selamat. Kamu benar-benar membuka filenya.",
    "================================================",
    "",
    "Kebanyakan orang menutup halaman setelah 30 detik.",
    "Kamu malah mengetik perintah di terminal tersembunyi.",
    "",
    "Itu persis sikap yang kupakai membangun semua produk di sini:",
    "penasaran, coba-coba, ukur, lalu buktikan.",
    "",
    "Kalau kamu juga tipe seperti itu, kirim email ke:",
    "  arielbudi4@gmail.com",
    "dengan judul 'EASTER EGG'.",
    "Akan kubalas dengan cerita di balik layar. Gratis.",
  ],
  "npm run gong": [
    "> porto-ariel@1.0.0 gong",
    "> menjalankan ritual rahasia…",
    "",
    "  GONG!  GONG!  GONG!",
    "",
    "Build berhasil. Kamu resmi jadi bagian dari 0,1% pengunjung",
    "yang menemukan terminal ini.",
  ],
  "sudo make me a sandwich": [
    "Baik, ini sandwich virtual untukmu:",
    "",
    "     [sandwich]",
    "  +-------------+",
    "  |    roti     |",
    "  |    keju     |",
    "  |   selada    |",
    "  |    roti     |",
    "  +-------------+",
    "",
    "Karena kamu sopan dan sudah pakai sudo. Terima kasih sudah mampir.",
  ],
};

const EASTER_TRIGGERS = ["ariel", "ariel osaze", "porto", "gong"];

export function EasterEgg() {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [booted, setBooted] = useState(false);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  // pemicu
  useEffect(() => {
    let buffer = "";
    let clicks = 0;
    let clickTimer;

    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (open) return;
      if (["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)) return;
      if (e.key.length === 1) {
        buffer = (buffer + e.key.toLowerCase()).slice(-14);
        if (EASTER_TRIGGERS.some((t) => buffer.includes(t))) {
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
  }, [open]);

  // boot sequence saat terbuka
  useEffect(() => {
    if (!open) {
      setBooted(false);
      setHistory([]);
      return;
    }

    setHistory([]);
    setBooted(false);

    const bootLines = [
      { t: 0, text: "terminal-ariel v1.0 · kanal rahasia" },
      { t: 420, text: "memuat data pengunjung…" },
      { t: 900, text: "status: PENASARAN TERDETEKSI" },
      { t: 1350, text: "" },
      { t: 1500, text: "Selamat. Kamu menemukan terminal yang tidak ada di peta." },
      { t: 1900, text: "Ketik 'help' untuk lihat perintah yang tersedia." },
    ];

    const timers = bootLines.map((b) =>
      setTimeout(() => {
        setHistory((h) => [...h, { type: "out", text: b.text }]);
        if (b.text.includes("help")) setBooted(true);
      }, b.t)
    );

    const focusT = setTimeout(() => inputRef.current?.focus(), 2100);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(focusT);
    };
  }, [open]);

  // auto scroll
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const runCommand = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    setHistory((h) => [...h, { type: "in", text: raw }]);

    if (cmd === "clear") {
      setTimeout(() => setHistory([]), 80);
      return;
    }
    if (cmd === "exit" || cmd === "quit") {
      setTimeout(() => setOpen(false), 250);
      setHistory((h) => [...h, { type: "out", text: "Menutup terminal… sampai jumpa." }]);
      return;
    }

    const out = COMMANDS[cmd];
    setTimeout(() => {
      if (out) {
        setHistory((h) => [...h, ...out.map((line) => ({ type: "out", text: line }))]);
      } else {
        setHistory((h) => [
          ...h,
          { type: "out", text: `perintah tidak dikenal: ${cmd}` },
          { type: "out", text: "ketik 'help' untuk daftar perintah." },
        ]);
      }
    }, 160);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    runCommand(input);
    setInput("");
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[200] grid place-items-center p-4 sm:p-6"
      style={{ background: "rgba(6,7,10,.9)", backdropFilter: "blur(14px)" }}
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-line bg-console-2 shadow-[0_30px_120px_rgba(0,0,0,.7)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header terminal */}
        <div className="flex items-center gap-2 border-b border-line bg-ink px-4 py-3">
          <span className="font-mono text-[12px] text-white/55">rahasia@arielbudi.web.id ~ %</span>
          <button
            onClick={() => setOpen(false)}
            className="ml-auto rounded-md px-2 py-1 font-mono text-[11px] text-white/55 transition-colors hover:bg-white/5 hover:text-white"
          >
            esc
          </button>
        </div>

        {/* isi terminal */}
        <div
          ref={scrollRef}
          className="no-bar h-[52vh] max-h-[460px] overflow-y-auto bg-console-2 p-5 font-mono text-[13px] leading-relaxed"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap">
              {line.type === "in" ? (
                <p className="text-white/80">
                  <span className="text-accent">➜</span> <span className="text-accent-soft">~</span> {line.text}
                </p>
              ) : (
                <p className={line.text.startsWith("  ") || line.text.includes("===") ? "text-accent-soft" : "text-white/55"}>
                  {line.text}
                </p>
              )}
            </div>
          ))}

          {booted && (
            <form onSubmit={onSubmit} className="mt-1 flex items-center gap-2">
              <span className="shrink-0 text-accent">➜</span>
              <span className="shrink-0 text-accent-soft">~</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full flex-1 bg-transparent font-mono text-[13px] text-white/85 placeholder:text-white/55"
                placeholder="ketik perintah di sini…"
                autoComplete="off"
                spellCheck={false}
                aria-label="Terminal rahasia"
              />
            </form>
          )}
          {!booted && <span className="caret inline-block h-3.5 w-[7px] bg-accent-soft align-middle" />}
        </div>

        {/* footer */}
        <div className="flex items-center justify-between border-t border-line bg-ink px-4 py-2.5">
          <p className="font-mono text-[11px] text-white/55">
            kamu menemukan terminal rahasia, ketik <span className="text-accent-soft">help</span>
          </p>
          <p className="font-mono text-[11px] text-white/55">easter egg</p>
        </div>
      </div>
    </div>
  );
}

