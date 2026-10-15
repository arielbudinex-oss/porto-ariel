import { useEffect, useState } from "react";
import { ArrowDown, ArrowSquareOut, GithubLogo } from "@phosphor-icons/react";
import Magnet from "./rb/Animations/Magnet/Magnet";
import { owner, stats, projects } from "../data/projects";
import { RotatingWord } from "./RotatingWord";
import CountUp from "./rb/TextAnimations/CountUp/CountUp";
import DotField from "./rb/Backgrounds/DotField/DotField";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 40);
    return () => clearTimeout(t);
  }, []);

  // "live" = produk dengan domain produksi; proyek yang berbagi domain
  // yang sama dengan produk lain tidak dihitung dua kali.
  const live = projects.filter(
    (p, i, arr) => p.url && arr.findIndex((x) => x.url === p.url) === i
  );
  const [first, second, ...rest] = owner.name.split(" ");

  return (
    <section id="atas" className="relative isolate min-h-[100svh] overflow-hidden pt-24">
      <div aria-hidden className="ambient ambient-hero" />
      {/* latar: titik-titik interaktif yang mengikuti kursor */}
      <DotField
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full"
        dotRadius={1.5}
        dotSpacing={16}
        cursorRadius={520}
        cursorForce={0.12}
        bulgeStrength={68}
        glowRadius={180}
        gradientFrom="rgba(91, 124, 250, 0.30)"
        gradientTo="rgba(157, 178, 255, 0.20)"
        glowColor="#0e1013"
      />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-ink/60 to-ink" />

      <div className="mx-auto grid max-w-[1324px] gap-14 px-6 pt-6 pb-40 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)] lg:items-center">
        {/* ── kolom kiri ─────────────────────────────────────────────── */}
        <div className={mounted ? "rise" : "opacity-0"}>
          <div className="mb-7 inline-flex flex-wrap items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.05] py-1 pr-4 pl-1.5 text-[13px] text-white/70">
            <span className="rounded-full border border-accent/35 bg-accent/12 px-2.5 py-1 text-[11px] font-semibold text-accent-soft">
              Founder Xinet.id
            </span>
            {live.length} live · {projects.length} proyek nyata
          </div>

          <h1 className="text-[11.5vw] leading-[1.02] font-bold tracking-[-0.03em] sm:text-6xl lg:text-[64px]">
            <span className="block text-white">
              {first} {second}
            </span>
            <span className="block text-white/55">{rest.join(" ")}</span>
          </h1>

          <p className="mt-6 flex flex-wrap items-baseline gap-x-2.5 gap-y-2 text-xl text-white/85 sm:text-2xl">
            <span className="text-white/55">Aku membangun</span>
            <RotatingWord
              words={["marketplace", "gateway pesan", "wallpaper engine", "pembukuan pajak", "alat uji server"]}
              interval={2600}
            />
          </p>

          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/65">{owner.bio[0]}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <span className="group/cta relative inline-block">
              <Magnet padding={60} magnetStrength={4}>
                <a href="#proyek" className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-[15px]">
                  Lihat {projects.length} proyek
                  <ArrowDown size={16} />
                </a>
              </Magnet>
              <span
                aria-hidden
                className="hint-cursor pointer-events-none absolute -top-9 left-2 flex items-center gap-1.5 rounded-full border border-accent-soft/40 bg-ink/90 px-3 py-1 text-[11px] whitespace-nowrap text-accent-soft opacity-0 backdrop-blur transition-opacity duration-300 group-hover/cta:opacity-100 group-focus-within/cta:opacity-100"
              >
                coba dekatkan kursor
              </span>
            </span>
            <Magnet padding={60} magnetStrength={3}>
              <a
                href={owner.github}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-ghost inline-flex items-center gap-2 px-6 py-3.5 text-[15px] font-medium"
              >
                <GithubLogo size={16} /> github.com/ArielOsaze
              </a>
            </Magnet>
          </div>

          {/* statistik, menghitung naik saat terlihat */}
          <dl className="mt-14 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                  <CountUp to={s.value} duration={1.1} separator="." />
                  <span className="text-accent">{s.suffix}</span>
                </dt>
                <dd className="mt-1.5 text-[11px] tracking-[0.08em] text-white/55 uppercase">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ── kolom kanan: panel terminal ────────────────────────────── */}
        <div className={`relative ${mounted ? "rise" : "opacity-0"}`} style={{ animationDelay: "120ms" }}>
          <div className="surface overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,.5)]">
            <div className="space-y-3.5 bg-console p-6 font-mono text-[13px] leading-relaxed">
              <p className="text-white/55">
                <span className="text-accent">➜</span> <span className="text-white/80">whoami</span>
              </p>
              <p className="pl-4 text-white/60">
                {owner.name}, full-stack developer.
                <br />
                Backend, frontend, database, deploy, sampai halaman jualan.
              </p>

              <p className="text-white/55">
                <span className="text-accent">➜</span> <span className="text-white/80">ls proyek-live/</span>
              </p>
              <ul className="space-y-1.5 pl-4">
                {live.map((p) => (
                  <li key={p.id} className="flex items-center gap-2">
                    <img src={p.icon} alt="" className="h-4 w-4 rounded object-contain" loading="lazy" />
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-white/75 transition-colors hover:text-accent-soft"
                    >
                      {p.name}
                    </a>
                    <ArrowSquareOut size={13} className="text-white/55" />
                  </li>
                ))}
              </ul>

              <p className="text-white/55">
                <span className="text-accent">➜</span> <span className="text-white/80">npm run build</span>
                <span className="caret ml-2 inline-block h-3.5 w-[7px] bg-accent align-middle" />
              </p>
              <div className="space-y-1 pl-4 text-[12px] text-white/50">
                <p>✓ 265.000+ baris kode · 7 proyek</p>
                <p>✓ 265+ skrip uji otomatis</p>
                <p>✓ 4 domain produksi</p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-line px-5 py-3">
              <span className="font-mono text-[11px] text-white/55">Semua angka diukur dari source code</span>
              <span className="font-mono text-[11px] text-white/55">v1.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* tombol gulir: muncul saat hero, hilang saat sudah masuk proyek */}
      <button
        onClick={() => {
          const el = document.querySelector("#proyek");
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        aria-label="Gulir ke proyek"
        className="group/scroll absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="grid h-10 w-10 place-items-center rounded-full border border-white/12 bg-white/[0.03] backdrop-blur transition-colors duration-300 group-hover/scroll:border-accent/60 group-hover/scroll:bg-accent/10">
          <ArrowDown size={15} className="text-white/55" />
        </span>
        <span className="text-[10px] tracking-[0.14em] text-white/55 uppercase">
          proyek
        </span>
      </button>
    </section>
  );
}
