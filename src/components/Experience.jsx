import { experience, owner, topSkills } from "../data/projects";
import BlurText from "./rb/TextAnimations/BlurText/BlurText";
import { Briefcase, GraduationCap, MapPin, Sparkles } from "lucide-react";

export default function Experience() {
  return (
    <section id="pengalaman" className="relative overflow-hidden py-28">
      <div className="dot-grid pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />

      <div className="mx-auto max-w-[1324px] px-6">
        <header className="mb-14 max-w-2xl">
          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-[#d4d4d8] uppercase">
            02 — Pengalaman
          </p>
          <BlurText
            text="Dari operasional sampai membangun produk."
            delay={26}
            animateBy="words"
            direction="top"
            className="text-4xl font-bold tracking-[-0.02em] text-white md:text-5xl"
          />
          <p className="mt-5 text-[15px] leading-relaxed text-white/50">
            Pengalaman gabungan: manajemen aset & operasional, pemasaran, perencanaan strategis, dan
            pengembangan produk teknologi.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr]">
          {/* ── kolom kiri: linimasa pengalaman ───────────────────────── */}
          <div>
            <h3 className="mb-6 flex items-center gap-2.5 text-lg font-semibold text-white">
              <Briefcase size={17} className="text-[#d4d4d8]" /> Pengalaman kerja
            </h3>

            <div className="relative space-y-4">
              <div className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-white/40 via-[#262626] to-transparent" />

              {experience.map((e) => (
                <div key={`${e.role}-${e.org}`} className="relative flex gap-5">
                  <span
                    className={`relative z-10 mt-6 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-[#0a0a0a] ${
                      e.highlight ? "bg-white" : "bg-[#525252]"
                    }`}
                  />
                  <div
                    className={`surface flex-1 p-5 transition-colors duration-300 hover:border-white/25 ${
                      e.highlight ? "border-white/20" : ""
                    }`}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h4 className="text-[16px] font-semibold text-white">{e.role}</h4>
                      <span className="font-mono text-[11px] text-white/40">{e.period}</span>
                    </div>
                    <p className="mt-0.5 text-[14px] text-[#d4d4d8]">{e.org}</p>
                    {e.location && (
                      <p className="mt-1 flex items-center gap-1.5 font-mono text-[11px] text-white/35">
                        <MapPin size={11} /> {e.location}
                      </p>
                    )}
                    <p className="mt-3 text-[13px] leading-relaxed text-white/50">{e.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {e.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-lg border border-[#262626] bg-[#0a0a0a] px-2.5 py-1 font-mono text-[11px] text-white/45"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── kolom kanan: pendidikan + keahlian ────────────────────── */}
          <div className="space-y-6">
            <div>
              <h3 className="mb-6 flex items-center gap-2.5 text-lg font-semibold text-white">
                <GraduationCap size={18} className="text-[#d4d4d8]" /> Pendidikan
              </h3>
              <div className="surface p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h4 className="text-[16px] font-semibold text-white">{owner.education.school}</h4>
                  <span className="font-mono text-[11px] text-white/40">{owner.education.period}</span>
                </div>
                <p className="mt-0.5 text-[14px] text-[#d4d4d8]">{owner.education.degree}</p>
                <p className="mt-2 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.06] px-3 py-1 font-mono text-[12px] text-white">
                  IPK {owner.education.gpa}
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-white/50">{owner.education.note}</p>
              </div>
            </div>

            <div>
              <h3 className="mb-6 flex items-center gap-2.5 text-lg font-semibold text-white">
                <Sparkles size={17} className="text-[#d4d4d8]" /> Keahlian utama
              </h3>
              <div className="surface p-5">
                <div className="flex flex-wrap gap-2">
                  {topSkills.map((s) => (
                    <span
                      key={s}
                      className="rounded-lg border border-[#262626] bg-[#0a0a0a] px-3 py-1.5 text-[12px] text-white/60 transition-colors hover:border-white/25 hover:text-white"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* kartu Xinet */}
            <div className="surface relative overflow-hidden p-6">
              <div className="absolute -top-14 -right-14 h-40 w-40 rounded-full bg-white/[0.04] blur-3xl" />
              <p className="font-mono text-[10px] tracking-[0.22em] text-white/40 uppercase">
                Perusahaan
              </p>
              <h4 className="mt-1.5 text-xl font-bold text-white">Xinet.id</h4>
              <p className="mt-1 font-mono text-[12px] text-[#d4d4d8]">Build what&apos;s next.</p>
              <p className="mt-4 text-[13px] leading-relaxed text-white/50">
                Ekosistem produk digital: commerce, komunikasi, alat bisnis, otomasi, dan AI. NexShop,
                SayBot, dan AkunTuntas dibangun di dalamnya.
              </p>
              <div className="mt-5 grid grid-cols-3 gap-3 border-t border-[#262626] pt-4">
                {[
                  { n: "NexShop", d: "Commerce" },
                  { n: "SayBot", d: "Pesan" },
                  { n: "AkunTuntas", d: "Pembukuan" },
                ].map((x) => (
                  <div key={x.n}>
                    <p className="text-[13px] font-semibold text-white">{x.n}</p>
                    <p className="font-mono text-[10px] text-white/35">{x.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
