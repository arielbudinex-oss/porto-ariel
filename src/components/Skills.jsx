import { skills, principles } from "../data/projects";
import CountUp from "./rb/TextAnimations/CountUp/CountUp";
import BlurText from "./rb/TextAnimations/BlurText/BlurText";
import { HalftoneCursor, BlinkingGrid, OrbitRing } from "./pro/ProMirror";
import { Terminal, Cpu, Database, Cloud, Lock, Plug } from "lucide-react";

const ICONS = {
  "Backend & API": Terminal,
  Frontend: Cpu,
  Database: Database,
  Infrastruktur: Cloud,
  Keamanan: Lock,
  "Integrasi & AI": Plug,
};

export default function Skills() {
  const entries = Object.entries(skills);
  const total = entries.reduce((n, [, v]) => n + v.length, 0);

  return (
    <section id="keahlian" className="relative overflow-hidden py-28">
      {/* latar: tiruan Pro "Blinking Squares" + halftone */}
      <BlinkingGrid className="absolute inset-0 -z-20 h-full w-full opacity-25" cols={44} rows={18} />
      <HalftoneCursor className="absolute inset-0 -z-10 h-full w-full opacity-40" size={26} radius={190} />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/80 to-ink" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <header className="mb-14 max-w-2xl">
          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-neon uppercase">
            02 — Keahlian
          </p>
          <BlurText
            text="Tumpukan teknologi yang benar-benar kupakai di produksi."
            delay={28}
            animateBy="words"
            direction="top"
            className="font-display text-4xl font-bold tracking-tight md:text-5xl"
          />
          <p className="mt-5 text-sm text-mist">
            Dihimpun dari package.json, source code, dan konfigurasi deploy semua proyek — bukan daftar
            hafalan. <span className="text-frost">{total} teknologi</span> di enam bidang.
          </p>
        </header>

        <div className="grid gap-5 lg:grid-cols-3">
          {entries.map(([group, items], gi) => {
            const Icon = ICONS[group] ?? Terminal;
            return (
              <div
                key={group}
                className="group glass relative overflow-hidden rounded-3xl p-6 transition-transform duration-500 hover:-translate-y-1"
                style={{ animationDelay: `${gi * 60}ms` }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-neon/25 bg-neon/8 text-neon transition-transform duration-500 group-hover:rotate-6">
                    <Icon size={17} />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-frost">{group}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="rounded-lg border border-line bg-ink-2/60 px-2.5 py-1 font-mono text-[11px] text-mist transition-all hover:border-neon/40 hover:text-neon"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <span className="absolute -right-8 -bottom-8 h-24 w-24 rounded-full bg-neon/5 blur-2xl transition-opacity group-hover:opacity-100" />
              </div>
            );
          })}

          {/* kartu orbit — tiruan Pro "Orbit Reel" */}
          <div className="glass relative grid place-items-center overflow-hidden rounded-3xl p-6">
            <OrbitRing
              className="h-56"
              radius={92}
              duration={30}
              items={["⚛", "▲", "🐍", "C#", "PG", "◈"]}
            />
            <p className="mt-3 text-center font-mono text-[11px] text-mist">
              React · Next · Python · C# · Postgres · Redis
            </p>
          </div>
        </div>

        {/* prinsip kerja */}
        <div className="mt-16">
          <h3 className="mb-6 font-display text-2xl font-semibold text-frost">Cara aku bekerja</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {principles.map((pr, i) => (
              <div
                key={pr.title}
                className="glass rounded-2xl p-5 transition-transform duration-500 hover:-translate-y-1"
              >
                <span className="font-mono text-[11px] text-neon">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="mt-2 font-display text-base font-semibold text-frost">{pr.title}</h4>
                <p className="mt-2 text-[13px] leading-relaxed text-mist">{pr.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
