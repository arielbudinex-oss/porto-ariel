import { useEffect, useState } from "react";
import { ArrowDown, ExternalLink, Github, Sparkles } from "lucide-react";
import { owner, stats, projects } from "../data/projects";
import SplitText from "./rb/TextAnimations/SplitText/SplitText";
import CountUp from "./rb/TextAnimations/CountUp/CountUp";
import RotatingText from "./rb/TextAnimations/RotatingText/RotatingText";
import Aurora from "./rb/Backgrounds/Aurora/Aurora";
import { CipherReveal, SpeedText, StarfieldWarp } from "./pro/ProMirror";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const live = projects.filter((p) => p.url);

  return (
    <section id="atas" className="relative isolate min-h-[100svh] overflow-hidden pt-28">
      {/* ── lapisan latar: StarfieldWarp (tiruan Pro "Lightspeed") + Aurora ── */}
      <StarfieldWarp className="absolute inset-0 -z-30 h-full w-full opacity-70" density={300} speed={0.75} />
      <div className="absolute inset-0 -z-20 opacity-60">
        <Aurora colorStops={["#64e6ff", "#8b5cf6", "#ff5c9d"]} amplitude={0.9} blend={0.55} />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/30 via-ink/70 to-ink" />

      <div className="mx-auto grid max-w-7xl gap-14 px-5 pt-10 pb-24 md:px-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
        {/* ── kolom kiri ─────────────────────────────────────────────── */}
        <div className={mounted ? "animate-[fadeUp_.9s_cubic-bezier(.22,1,.36,1)_both]" : "opacity-0"}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-neon/25 bg-neon/8 px-4 py-1.5 text-xs text-neon">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neon" />
            </span>
            {live.length} produk live · {projects.length} proyek nyata
          </div>

          <h1 className="font-display text-[13vw] leading-[0.95] font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="block text-frost">Aku membangun</span>
            <span className="block">
              <RotatingText
                texts={["marketplace", "gateway pesan", "wallpaper engine", "pembukuan pajak", "alat uji server"]}
                mainClassName="text-grad inline-flex overflow-hidden"
                staggerFrom="last"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.018}
                splitLevelClassName="overflow-hidden pb-1"
                transition={{ type: "spring", damping: 28, stiffness: 380 }}
                rotationInterval={2400}
              />
            </span>
            <span className="block text-frost">yang dipakai nyata.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-mist md:text-lg">
            <CipherReveal
              text={owner.bio[0]}
              speed={14}
              delay={600}
            />
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#proyek"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-neon to-violet px-7 py-3.5 text-sm font-semibold text-ink transition-transform hover:scale-[1.03]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Lihat {projects.length} proyek <ArrowDown size={15} />
              </span>
              <span className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
            </a>
            <a
              href={owner.github}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-2 rounded-full border border-line bg-ink-2/60 px-6 py-3.5 text-sm text-frost backdrop-blur transition-colors hover:border-neon/40 hover:text-neon"
            >
              <Github size={15} /> github.com/ArielOsaze
            </a>
          </div>

          {/* statistik dengan SpeedText (tiruan Pro "Speeding Text") */}
          <dl className="mt-12 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="font-display text-2xl font-bold text-frost md:text-3xl">
                  <SpeedText value={s.value} suffix={s.suffix} />
                </dt>
                <dd className="mt-1 text-[11px] tracking-wide text-mist uppercase">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── kolom kanan: kartu terminal ────────────────────────────── */}
        <div className={`relative ${mounted ? "animate-[fadeUp_1.1s_.15s_cubic-bezier(.22,1,.36,1)_both]" : "opacity-0"}`}>
          <div className="group relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-neon/20 via-violet/10 to-magenta/20 opacity-60 blur-2xl transition-opacity group-hover:opacity-90" />
            <div className="glass-strong relative overflow-hidden rounded-3xl">
              <div className="flex items-center gap-2 border-b border-line/70 px-5 py-3.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 font-mono text-xs text-mist">ariel@produksi ~ %</span>
              </div>
              <div className="space-y-3 p-6 font-mono text-[13px] leading-relaxed">
                <p className="text-mist">
                  <span className="text-lime">➜</span> <span className="text-neon">whoami</span>
                </p>
                <p className="pl-4 text-frost">
                  Full-stack developer — backend, frontend, database, deploy, sampai halaman jualan.
                </p>
                <p className="text-mist">
                  <span className="text-lime">➜</span> <span className="text-neon">ls proyek-live/</span>
                </p>
                <ul className="space-y-2 pl-4">
                  {live.map((p, i) => (
                    <li key={p.id} className="flex items-center gap-2">
                      <span className="text-violet">{String(i + 1).padStart(2, "0")}</span>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-frost underline decoration-line decoration-dotted underline-offset-4 transition-colors hover:text-neon"
                      >
                        {p.name}
                      </a>
                      <ExternalLink size={11} className="text-mist" />
                    </li>
                  ))}
                </ul>
                <p className="text-mist">
                  <span className="text-lime">➜</span>{" "}
                  <span className="text-neon">npm run build</span>
                  <span className="ml-2 inline-block h-3.5 w-1.5 animate-pulse bg-neon align-middle" />
                </p>
                <div className="space-y-1 pl-4 text-[12px]">
                  <p className="text-mist">
                    <span className="text-amber">✓</span> 265.000+ baris kode · 8 proyek
                  </p>
                  <p className="text-mist">
                    <span className="text-amber">✓</span> 265+ skrip uji otomatis
                  </p>
                  <p className="text-mist">
                    <span className="text-amber">✓</span> 4 domain produksi
                  </p>
                </div>
              </div>
            </div>
            <div className="floaty absolute -right-3 -bottom-5 hidden rounded-2xl border border-line bg-ink-2/95 px-4 py-3 shadow-2xl backdrop-blur lg:block">
              <div className="flex items-center gap-2.5">
                <Sparkles size={15} className="text-amber" />
                <div>
                  <p className="font-mono text-[10px] text-mist">UPTIME SERVER</p>
                  <p className="font-display text-sm font-semibold text-frost">99,9%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#proyek"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-mist transition-colors hover:text-neon md:flex"
      >
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase">gulir</span>
        <span className="grid h-9 w-5 place-items-start rounded-full border border-line p-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-neon" />
        </span>
      </a>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(34px) }
          to { opacity: 1; transform: translateY(0) }
        }
      `}</style>
    </section>
  );
}
