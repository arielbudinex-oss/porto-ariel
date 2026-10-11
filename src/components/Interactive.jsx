// ─────────────────────────────────────────────────────────────────────────────
// ScrollProgress — garis tipis di atas layar yang menunjukkan seberapa jauh
// pengunjung sudah membaca. Memberi rasa "kemajuan" saat menjelajah.
// ─────────────────────────────────────────────────────────────────────────────
import { useRef, useCallback, useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(1, window.scrollY / h) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div aria-hidden className="fixed top-0 left-0 z-[150] h-[2.5px] w-full bg-transparent">
      <div
        className="h-full rounded-r-full bg-gradient-to-r from-[#3a55c9] via-[#5b7cfa] to-[#9db2ff] transition-[width] duration-150 ease-out"
        style={{ width: `${progress * 100}%`, boxShadow: "0 0 12px rgba(91,124,250,.6)" }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ScrollProgress selesai. InteractiveCard dst di bawah.
// ─────────────────────────────────────────────────────────────────────────────
//   • sorotan lembut mengikuti kursor di permukaan (spotlight)
//   • kartu terangkat + membesar sedikit saat kursor di atasnya
//   • garis tepi menyala mengikuti warna aksen
// Dipakai di Experience, Skills, Journey, Lab, dan Contact.
// ─────────────────────────────────────────────────────────────────────────────

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
    "> menjalankan ritual rahasia...",
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
      if (open) return;
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
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
      { t: 0, text: "terminal-ariel v1.0 — kanal rahasia" },
      { t: 420, text: "memuat data pengunjung..." },
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
      setHistory((h) => [...h, { type: "out", text: "Menutup terminal... sampai jumpa." }]);
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
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-[#2b3037] bg-[#0b0d10] shadow-[0_30px_120px_rgba(0,0,0,.7)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* header terminal */}
        <div className="flex items-center gap-2 border-b border-[#2b3037] bg-[#0e1013] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-[12px] text-white/40">rahasia@arielbudi.web.id ~ %</span>
          <button
            onClick={() => setOpen(false)}
            className="ml-auto rounded-md px-2 py-1 font-mono text-[11px] text-white/40 transition-colors hover:bg-white/5 hover:text-white"
          >
            esc
          </button>
        </div>

        {/* isi terminal */}
        <div
          ref={scrollRef}
          className="no-bar h-[52vh] max-h-[460px] overflow-y-auto bg-[#0b0d10] p-5 font-mono text-[13px] leading-relaxed"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((line, i) => (
            <div key={i} className="whitespace-pre-wrap">
              {line.type === "in" ? (
                <p className="text-white/80">
                  <span className="text-[#5b7cfa]">➜</span> <span className="text-[#9db2ff]">~</span> {line.text}
                </p>
              ) : (
                <p className={line.text.startsWith("  ") || line.text.includes("===") ? "text-[#9db2ff]" : "text-white/55"}>
                  {line.text}
                </p>
              )}
            </div>
          ))}

          {booted && (
            <form onSubmit={onSubmit} className="mt-1 flex items-center gap-2">
              <span className="shrink-0 text-[#5b7cfa]">➜</span>
              <span className="shrink-0 text-[#9db2ff]">~</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full flex-1 bg-transparent font-mono text-[13px] text-white/85 outline-none placeholder:text-white/25"
                placeholder="ketik perintah di sini..."
                autoComplete="off"
                spellCheck={false}
                aria-label="Terminal rahasia"
              />
            </form>
          )}
          {!booted && <span className="caret inline-block h-3.5 w-[7px] bg-[#9db2ff] align-middle" />}
        </div>

        {/* footer */}
        <div className="flex items-center justify-between border-t border-[#2b3037] bg-[#0e1013] px-4 py-2.5">
          <p className="font-mono text-[11px] text-white/30">
            kamu menemukan terminal rahasia — coba <span className="text-[#9db2ff]">help</span>
          </p>
          <p className="font-mono text-[11px] text-white/25">easter egg</p>
        </div>
      </div>
    </div>
  );
}

