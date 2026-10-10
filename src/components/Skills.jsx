import { skills, principles } from "../data/projects";
import CountUp from "./rb/TextAnimations/CountUp/CountUp";
import BlurText from "./rb/TextAnimations/BlurText/BlurText";
import { Terminal, Cpu, Database, Cloud, Lock, Plug } from "lucide-react";
import {
  SiReact, SiNodedotjs, SiTypescript, SiPython, SiSharp, SiPostgresql,
  SiSupabase, SiRedis, SiDocker, SiNginx, SiVercel, SiTailwindcss,
  SiNextdotjs, SiThreedotjs, SiGreensock, SiGit, SiLinux, SiCloudflare,
  SiExpress, SiJavascript, SiHtml5,
} from "react-icons/si";

const ICONS = {
  "Backend & API": Terminal,
  Frontend: Cpu,
  Database: Database,
  Infrastruktur: Cloud,
  Keamanan: Lock,
  "Integrasi & AI": Plug,
};

// logo untuk baris berjalan
const LOGOS = [
  { Icon: SiReact, label: "React", color: "#61dafb" },
  { Icon: SiNodedotjs, label: "Node.js", color: "#5fa04e" },
  { Icon: SiTypescript, label: "TypeScript", color: "#3178c6" },
  { Icon: SiPython, label: "Python", color: "#ffd43b" },
  { Icon: SiSharp, label: "C#", color: "#a179dc" },
  { Icon: SiPostgresql, label: "PostgreSQL", color: "#699eca" },
  { Icon: SiSupabase, label: "Supabase", color: "#3ecf8e" },
  { Icon: SiRedis, label: "Redis", color: "#ff4438" },
  { Icon: SiDocker, label: "Docker", color: "#2496ed" },
  { Icon: SiNginx, label: "Nginx", color: "#009639" },
  { Icon: SiVercel, label: "Vercel", color: "#ffffff" },
  { Icon: SiTailwindcss, label: "Tailwind", color: "#38bdf8" },
  { Icon: SiNextdotjs, label: "Next.js", color: "#ffffff" },
  { Icon: SiThreedotjs, label: "Three.js", color: "#ffffff" },
  { Icon: SiGreensock, label: "GSAP", color: "#88ce02" },
  { Icon: SiGit, label: "Git", color: "#f05032" },
  { Icon: SiLinux, label: "Linux", color: "#f6c33f" },
  { Icon: SiCloudflare, label: "Cloudflare", color: "#f38020" },
  { Icon: SiExpress, label: "Express", color: "#ffffff" },
  { Icon: SiJavascript, label: "JavaScript", color: "#f7df1e" },
  { Icon: SiHtml5, label: "HTML5", color: "#e34f26" },
];

export default function Skills() {
  const entries = Object.entries(skills);
  const total = entries.reduce((n, [, v]) => n + v.length, 0);

  return (
    <section id="keahlian" className="relative overflow-hidden py-28">
      <div className="dot-grid pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <div className="mx-auto max-w-[1324px] px-6">
        <header className="mb-12 max-w-2xl">
          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-[#d4d4d8] uppercase">02 — Keahlian</p>
          <BlurText
            text="Tumpukan teknologi yang benar-benar kupakai di produksi."
            delay={26}
            animateBy="words"
            direction="top"
            className="text-4xl font-bold tracking-[-0.02em] text-white md:text-5xl"
          />
          <p className="mt-5 text-[15px] leading-relaxed text-white/50">
            Dihimpun dari package.json, source code, dan konfigurasi deploy semua proyek — bukan daftar
            hafalan. <span className="text-white/85">{total} teknologi</span> di enam bidang.
          </p>
        </header>

        {/* grid logo statis — tanpa strip berjalan */}
        <div className="mb-12 grid grid-cols-3 gap-x-4 gap-y-6 border-y border-[#262626] py-8 sm:grid-cols-5 lg:grid-cols-7">
          {LOGOS.map((item) => (
            <span key={item.label} className="flex items-center gap-2.5" title={item.label}>
              <item.Icon size={20} color={item.color} />
              <span className="truncate text-[12px] whitespace-nowrap text-white/40">{item.label}</span>
            </span>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {entries.map(([group, items]) => {
            const Icon = ICONS[group] ?? Terminal;
            return (
              <div key={group} className="surface p-6 transition-colors duration-300 hover:border-[#ffffff]/30">
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-[#ffffff]/12 text-[#d4d4d8]">
                    <Icon size={17} />
                  </span>
                  <h3 className="text-[17px] font-semibold text-white">{group}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="rounded-lg border border-[#262626] bg-[#0a0a0a] px-2.5 py-1 font-mono text-[11px] text-white/55 transition-colors hover:border-[#ffffff]/40 hover:text-[#d4d4d8]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}

          {/* kartu ringkasan angka */}
          <div className="surface flex flex-col justify-center p-6">
            <p className="font-mono text-[10px] tracking-[0.22em] text-white/35 uppercase">Total</p>
            <p className="mt-2 text-4xl font-bold text-white">
              <CountUp to={total} duration={1.4} />
            </p>
            <p className="mt-1 text-[13px] text-white/45">teknologi di 6 bidang</p>
            <div className="mt-5 space-y-2 border-t border-[#262626] pt-4 text-[12px] text-white/45">
              <p className="flex justify-between">
                <span>Bahasa</span> <span className="text-white/70">JS · TS · Python · C#</span>
              </p>
              <p className="flex justify-between">
                <span>Basis data</span> <span className="text-white/70">Postgres · SQLite · Redis</span>
              </p>
              <p className="flex justify-between">
                <span>Deploy</span> <span className="text-white/70">Nginx · pm2 · Vercel · Docker</span>
              </p>
            </div>
          </div>
        </div>

        {/* prinsip kerja */}
        <div className="mt-16">
          <h3 className="mb-6 text-2xl font-semibold text-white">Cara aku bekerja</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {principles.map((pr, i) => (
              <div key={pr.title} className="surface p-5 transition-colors duration-300 hover:border-[#ffffff]/30">
                <span className="font-mono text-[11px] text-[#d4d4d8]">{String(i + 1).padStart(2, "0")}</span>
                <h4 className="mt-2 text-[15px] font-semibold text-white">{pr.title}</h4>
                <p className="mt-2 text-[13px] leading-relaxed text-white/45">{pr.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
