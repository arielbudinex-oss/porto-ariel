import { useState, useMemo, useRef, useEffect } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Github,
  Globe,
  Layers,
  ShieldCheck,
  Activity,
} from "lucide-react";
import { projects } from "../data/projects";
import ScrollReveal from "./rb/TextAnimations/ScrollReveal/ScrollReveal";
import CountUp from "./rb/TextAnimations/CountUp/CountUp";
import SpotlightCard from "./rb/Components/SpotlightCard/SpotlightCard";
import {
  GlowBorder,
  ComparisonSlider,
  PixelDissolve,
  ElasticSticker,
} from "./pro/ProMirror";

const FILTERS = [
  { id: "all", label: "Semua" },
  { id: "live", label: "Live di produksi" },
  { id: "desktop", label: "Aplikasi desktop" },
  { id: "backend", label: "Backend & API" },
];

function matchesFilter(p, f) {
  if (f === "all") return true;
  if (f === "live") return Boolean(p.url);
  if (f === "desktop") return ["lumawall", "akuntuntas"].includes(p.id);
  if (f === "backend") return ["saybot", "waapi", "loadtest", "nexshop"].includes(p.id);
  return true;
}

/**
 * ShotImage — gambar screenshot dengan rasio yang benar.
 * Semua preview memakai bingkai 16:9. Screenshot desktop (landscape) mengisi
 * penuh bingkai (object-cover, jangkar atas). Screenshot mobile (portrait)
 * TIDAK boleh di-crop — ditampilkan utuh (object-contain) di tengah bingkai
 * dengan latar netral, sehingga tidak ada bagian antarmuka yang terpotong.
 */
function ShotImage({ src, alt, thumb = false }) {
  const [portrait, setPortrait] = useState(false);

  return (
    <span className={`relative block w-full overflow-hidden bg-ink-3 ${thumb ? "" : "aspect-video"}`}>
      {/* lapisan latar: mengisi bingkai tanpa memotong konten utama */}
      {portrait && !thumb && (
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-25 blur-2xl"
          loading="lazy"
        />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={(e) => setPortrait(e.currentTarget.naturalHeight > e.currentTarget.naturalWidth)}
        className={
          thumb
            ? "h-14 w-24 object-cover object-top"
            : `relative mx-auto block h-full ${portrait ? "w-auto object-contain" : "w-full object-cover object-top"}`
        }
        loading="lazy"
      />
    </span>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const [openId, setOpenId] = useState(projects[0].id);

  const shown = useMemo(() => projects.filter((p) => matchesFilter(p, filter)), [filter]);

  useEffect(() => {
    if (!shown.some((p) => p.id === openId) && shown[0]) setOpenId(shown[0].id);
  }, [shown, openId]);

  return (
    <section id="proyek" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <header className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 font-mono text-xs tracking-[0.3em] text-neon uppercase">
              01 — Portofolio
            </p>
            <ScrollReveal
              text="Semua yang kubangun, dengan angkanya."
              baseOpacity={0.08}
              enableBlur
              baseRotation={2}
              containerClassName="font-display text-4xl font-bold tracking-tight md:text-5xl"
            />
          </div>
          <div className="no-bar flex gap-2 overflow-x-auto pb-1">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs transition-all ${
                  filter === f.id
                    ? "border-neon/50 bg-neon/12 text-neon"
                    : "border-line bg-ink-2/50 text-mist hover:border-line hover:text-frost"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </header>

        <div className="space-y-5">
          {shown.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              open={openId === p.id}
              onToggle={() => setOpenId(openId === p.id ? null : p.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p, open, onToggle }) {
  const [shot, setShot] = useState(0);
  const contentRef = useRef(null);
  const hasShots = p.screenshots.length > 0;

  return (
    <SpotlightCard
      className={`group overflow-hidden rounded-3xl ${open ? "" : ""}`}
      glow={p.accent}
      tilt={2}
    >
      <div
        className="glass relative overflow-hidden rounded-3xl transition-colors duration-500"
        style={{
          borderColor: open ? `color-mix(in srgb, ${p.accent} 35%, #2a2a2c)` : undefined,
        }}
      >
        {/* garis aksen atas */}
        <div
          className="h-px w-full transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent, ${p.accent}, ${p.accent2}, transparent)`,
            opacity: open ? 1 : 0.25,
          }}
        />

        {/* ── header kartu ─────────────────────────────────────────── */}
        <button
          onClick={onToggle}
          className="flex w-full items-center gap-5 px-5 py-5 text-left md:px-8 md:py-6"
        >
          <span
            className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border font-display text-lg font-bold"
            style={{
              borderColor: `color-mix(in srgb, ${p.accent} 30%, transparent)`,
              background: `color-mix(in srgb, ${p.accent} 10%, transparent)`,
              color: p.accent,
            }}
          >
            {p.name.slice(0, 2).toUpperCase()}
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="font-display text-xl font-semibold text-frost md:text-2xl">{p.name}</h3>
              <span className="rounded-full border border-line bg-ink-2/70 px-2.5 py-0.5 font-mono text-[10px] text-mist">
                {p.tag}
              </span>
              {p.url && (
                <span className="flex items-center gap-1 rounded-full border border-lime/25 bg-lime/10 px-2.5 py-0.5 font-mono text-[10px] text-lime">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" /> LIVE
                </span>
              )}
            </div>
            <p className="mt-1.5 line-clamp-2 text-sm text-mist">{p.blurb}</p>
          </div>

          <span className="hidden shrink-0 flex-col items-end gap-1 md:flex">
            {p.metrics.slice(0, 2).map((m) => (
              <span key={m.label} className="font-mono text-[11px] text-mist">
                <span className="text-frost">{m.value}</span> {m.label}
              </span>
            ))}
          </span>

          <ChevronDown
            size={20}
            className={`shrink-0 text-mist transition-transform duration-500 ${open ? "rotate-180 text-neon" : ""}`}
          />
        </button>

        {/* ── isi yang bisa dibuka ─────────────────────────────────── */}
        <div
          ref={contentRef}
          className="grid transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="grid gap-8 px-5 pb-8 md:px-8 lg:grid-cols-[1fr_1.1fr]">
              {/* kiri: cerita + fitur */}
              <div className="space-y-7">
                <div>
                  <h4 className="mb-3 font-mono text-[11px] tracking-[0.25em] text-neon uppercase">
                    Konteks
                  </h4>
                  <p className="text-sm leading-relaxed text-mist">{p.story}</p>
                </div>

                <div>
                  <h4 className="mb-4 font-mono text-[11px] tracking-[0.25em] text-neon uppercase">
                    Yang dibangun
                  </h4>
                  <ul className="space-y-4">
                    {p.features.map((f, i) => (
                      <li key={f.title} className="group/f flex gap-4">
                        <span
                          className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg border font-mono text-[11px] transition-transform group-hover/f:scale-110"
                          style={{
                            borderColor: `color-mix(in srgb, ${p.accent} 25%, transparent)`,
                            color: p.accent,
                            background: `color-mix(in srgb, ${p.accent} 8%, transparent)`,
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-frost">{f.title}</p>
                          <p className="mt-1 text-[13px] leading-relaxed text-mist">{f.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* bukti */}
                <div>
                  <h4 className="mb-3 flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-neon uppercase">
                    <ShieldCheck size={13} /> Bukti
                  </h4>
                  <ul className="space-y-2">
                    {p.proof.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-[13px] text-mist">
                        <Activity size={13} className="mt-0.5 shrink-0 text-lime" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* stack */}
                <div>
                  <h4 className="mb-3 flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-neon uppercase">
                    <Layers size={13} /> Teknologi
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-lg border border-line bg-ink-2/60 px-2.5 py-1 font-mono text-[11px] text-mist transition-colors hover:border-neon/30 hover:text-frost"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* tautan */}
                <div className="flex flex-wrap gap-3 pt-1">
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-ink transition-transform hover:scale-105"
                      style={{ background: `linear-gradient(90deg, ${p.accent}, ${p.accent2})` }}
                    >
                      <Globe size={14} /> Buka situs
                    </a>
                  )}
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-2 rounded-full border border-line bg-ink-2/60 px-5 py-2.5 text-sm text-frost transition-colors hover:border-neon/40 hover:text-neon"
                  >
                    <Github size={14} /> Repositori
                  </a>
                </div>
              </div>

              {/* kanan: metrik + screenshot */}
              <div className="space-y-5">
                {/* metrik besar dengan CountUp */}
                <div className="grid grid-cols-2 gap-3">
                  {p.metrics.map((m) => (
                    <GlowBorder key={m.label} className="group rounded-2xl" color={p.accent} radius="16px">
                      <div className="rounded-2xl border border-line bg-ink-2/60 p-4">
                        <p className="font-display text-2xl font-bold text-frost">{m.value}</p>
                        <p className="mt-1 text-[11px] tracking-wide text-mist uppercase">{m.label}</p>
                      </div>
                    </GlowBorder>
                  ))}
                </div>

                {/* galeri screenshot */}
                {hasShots ? (
                  <div className="space-y-3">
                    <PixelDissolve trigger={shot} className="rounded-2xl border border-line">
                      <ShotImage src={p.screenshots[shot].src} alt={p.screenshots[shot].caption} />
                    </PixelDissolve>
                    <p className="px-1 text-[12px] text-mist">{p.screenshots[shot].caption}</p>
                    {p.screenshots.length > 1 && (
                      <div className="no-bar flex gap-2 overflow-x-auto pb-1">
                        {p.screenshots.map((s, i) => (
                          <button
                            key={s.src}
                            onClick={() => setShot(i)}
                            className={`relative shrink-0 overflow-hidden rounded-xl border transition-all ${
                              i === shot ? "border-neon/60 opacity-100" : "border-line opacity-50 hover:opacity-80"
                            }`}
                          >
                            <ShotImage src={s.src} alt="" thumb />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="grid h-44 place-items-center rounded-2xl border border-dashed border-line bg-ink-2/40">
                    <div className="text-center">
                      <p className="font-mono text-[11px] text-mist">
                        {p.id === "waapi" ? "Layanan internal — tanpa antarmuka publik" : "Alat CLI / pustaka"}
                      </p>
                      <p className="mt-1 text-[11px] text-mist/60">
                        Detail lengkap ada di daftar fitur & bukti
                      </p>
                    </div>
                  </div>
                )}

                {/* slider sebelum/sesudah */}
                {p.compare && (
                  <div className="space-y-2">
                    <p className="flex items-center gap-2 px-1 font-mono text-[11px] text-mist">
                      <span className="h-px w-4 bg-neon" /> Geser untuk membandingkan
                    </p>
                    <ComparisonSlider
                      before={p.compare.before}
                      after={p.compare.after}
                      label={p.compare.label}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
