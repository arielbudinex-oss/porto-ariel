import { useEffect, useState } from "react";
import { ArrowDown, ExternalLink, Github } from "lucide-react";
import { owner, stats, projects } from "../data/projects";
import RotatingText from "./rb/TextAnimations/RotatingText/RotatingText";
import CountUp from "./rb/TextAnimations/CountUp/CountUp";
import DotField from "./rb/Backgrounds/DotField/DotField";
import ShinyText from "./rb/TextAnimations/ShinyText/ShinyText";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  const live = projects.filter((p) => p.url);
  const [first, second, ...rest] = owner.name.split(" ");

  return (
    <section id="atas" className="relative isolate min-h-[100svh] overflow-hidden pt-28">
      {/* latar: titik-titik interaktif yang mengikuti kursor */}
      <DotField
        className="absolute inset-0 -z-20 h-full w-full"
        dotRadius={1.5}
        dotSpacing={16}
        cursorRadius={520}
        cursorForce={0.12}
        bulgeStrength={68}
        glowRadius={180}
        gradientFrom="rgba(168, 85, 247, 0.30)"
        gradientTo="rgba(180, 151, 207, 0.20)"
        glowColor="#0A0A0A"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#0a0d10]/60 to-[#0a0d10]" />

      <div className="mx-auto grid max-w-[1324px] gap-14 px-6 pt-12 pb-24 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        {/* ── kolom kiri ─────────────────────────────────────────────── */}
        <div className={mounted ? "rise" : "opacity-0"}>
          <div className="mb-7 inline-flex flex-wrap items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] py-1 pr-4 pl-1.5 text-[13px] text-white/70">
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white">
              Founder Xinet.id
            </span>
            {live.length} live · {projects.length} proyek nyata
          </div>

          <h1 className="text-[11.5vw] leading-[1.02] font-bold tracking-[-0.03em] sm:text-6xl lg:text-[64px]">
            <span className="block text-white">
              {first} {second}
            </span>
            <span className="block text-white/35">{rest.join(" ")}</span>
          </h1>

          <p className="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-2 text-xl text-white/85 sm:text-2xl">
            <span className="text-white/55">Aku membangun</span>
            <RotatingText
              texts={["marketplace", "gateway pesan", "wallpaper engine", "pembukuan pajak", "alat uji server"]}
              mainClassName="inline-flex min-w-[9ch] justify-center overflow-hidden rounded-lg bg-[#22d3ee]/15 px-2.5 py-0.5 text-[#67e8f9]"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.015}
              splitLevelClassName="overflow-hidden pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2300}
            />
          </p>

          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/65">{owner.bio[0]}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#proyek" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-[15px]">
              Lihat {projects.length} proyek
              <ArrowDown size={16} />
            </a>
            <a
              href={owner.github}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-ghost inline-flex items-center gap-2 px-6 py-3.5 text-[15px] font-medium"
            >
              <Github size={16} /> github.com/ArielOsaze
            </a>
          </div>

          {/* statistik — menghitung naik saat terlihat */}
          <dl className="mt-14 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                  <CountUp to={s.value} duration={1.6} separator="." />
                  <span className="text-[#22d3ee]">{s.suffix}</span>
                </dt>
                <dd className="mt-1.5 text-[11px] tracking-[0.08em] text-white/40 uppercase">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── kolom kanan: panel terminal ────────────────────────────── */}
        <div className={`relative ${mounted ? "rise" : "opacity-0"}`} style={{ animationDelay: "120ms" }}>
          <div className="surface overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,.5)]">
            <div className="flex items-center gap-2 border-b border-[#232b33] px-5 py-3.5">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-xs text-white/40">ariel@produksi ~ %</span>
            </div>

            <div className="space-y-3.5 bg-[#0f0f0f] p-6 font-mono text-[13px] leading-relaxed">
              <p className="text-white/35">
                <span className="text-[#22d3ee]">➜</span> <span className="text-white/80">whoami</span>
              </p>
              <p className="pl-4 text-white/60">
                {owner.name} — full-stack developer.
                <br />
                Backend, frontend, database, deploy, sampai halaman jualan.
              </p>

              <p className="text-white/35">
                <span className="text-[#22d3ee]">➜</span> <span className="text-white/80">ls proyek-live/</span>
              </p>
              <ul className="space-y-1.5 pl-4">
                {live.map((p, i) => (
                  <li key={p.id} className="flex items-center gap-2">
                    <span className="text-white/25">{String(i + 1).padStart(2, "0")}</span>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-white/75 transition-colors hover:text-[#67e8f9]"
                    >
                      {p.name}
                    </a>
                    <ExternalLink size={11} className="text-white/25" />
                  </li>
                ))}
              </ul>

              <p className="text-white/35">
                <span className="text-[#22d3ee]">➜</span> <span className="text-white/80">npm run build</span>
                <span className="caret ml-2 inline-block h-3.5 w-[7px] bg-[#22d3ee] align-middle" />
              </p>
              <div className="space-y-1 pl-4 text-[12px] text-white/50">
                <p>✓ 265.000+ baris kode · 8 proyek</p>
                <p>✓ 265+ skrip uji otomatis</p>
                <p>✓ 4 domain produksi</p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#232b33] px-5 py-3">
              <ShinyText
                text="Semua angka diukur dari source code"
                speed={5}
                color="#6b6478"
                shineColor="#d4d4d8"
                className="font-mono text-[11px]"
              />
              <span className="font-mono text-[11px] text-white/25">v1.0</span>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#proyek"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/35 transition-colors hover:text-[#67e8f9] md:flex"
      >
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase">gulir</span>
        <span className="grid h-9 w-5 place-items-start rounded-full border border-white/15 p-1">
          <span className="h-2 w-2 animate-bounce rounded-full bg-[#22d3ee]" />
        </span>
      </a>
    </section>
  );
}
