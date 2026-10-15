import { experience, owner, topSkills } from "../data/projects";
import { Briefcase, GraduationCap, MapPin, Sparkle } from "@phosphor-icons/react";
import { InteractiveCard, InteractiveBadge } from "./Interactive";

export default function Experience() {
  return (
    <section id="pengalaman" className="relative overflow-hidden py-28">
      <div aria-hidden className="ambient ambient-kerja" />
      <div className="dot-grid pointer-events-none absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />

      <div className="mx-auto max-w-[1324px] px-6">
        <header className="mb-14 max-w-2xl">
          <p className="mb-3 text-[13px] font-medium tracking-[0.01em] text-accent-soft">
            Pengalaman
          </p>
          <h2 className="text-4xl font-bold tracking-[-0.02em] text-white md:text-5xl">
            Dari operasional sampai membangun produk.
          </h2>
          <p className="mt-5 max-w-[65ch] text-[15px] leading-relaxed text-white/50">
            Pengalaman gabungan: manajemen aset & operasional, pemasaran, perencanaan strategis, dan
            pengembangan produk teknologi.
          </p>
        </header>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          {/* ── kolom kiri: linimasa pengalaman ───────────────────────── */}
          <div>
            <h3 className="mb-6 flex items-center gap-2.5 text-lg font-semibold text-white">
              <Briefcase size={17} className="text-accent-soft" /> Pengalaman kerja
            </h3>

            <div className="space-y-4">
              {experience.map((e) => (
                <div key={`${e.role}-${e.org}`}>
                  <InteractiveCard
                    className={`surface p-5 ${e.highlight ? "border-white/20" : ""}`}
                    accent="#5b7cfa"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h4 className="text-[16px] font-semibold text-white">{e.role}</h4>
                      <span className="text-[11px] text-white/55">{e.period}</span>
                    </div>
                    <p className="mt-0.5 text-[14px] text-accent-soft">{e.org}</p>
                    {e.location && (
                      <p className="mt-1 flex items-center gap-1.5 text-[11px] text-white/55">
                        <MapPin size={11} /> {e.location}
                      </p>
                    )}
                    <p className="mt-3 text-[13px] leading-relaxed text-white/50">{e.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {e.tags.map((t) => (
                        <InteractiveBadge
                          key={t}
                          className="rounded-lg border border-line bg-ink px-2.5 py-1 text-[11px] text-white/55"
                          accent="#5b7cfa"
                        >
                          {t}
                        </InteractiveBadge>
                      ))}
                    </div>
                  </InteractiveCard>
                </div>
              ))}
            </div>
          </div>

          {/* ── kolom kanan: pendidikan + keahlian ────────────────────── */}
          <div className="space-y-6">
            <div>
              <h3 className="mb-6 flex items-center gap-2.5 text-lg font-semibold text-white">
                <GraduationCap size={18} className="text-accent-soft" /> Pendidikan
              </h3>
              <InteractiveCard className="surface p-5" accent="#9db2ff">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h4 className="text-[16px] font-semibold text-white">{owner.education.school}</h4>
                  <span className="text-[11px] text-white/55">{owner.education.period}</span>
                </div>
                <p className="mt-0.5 text-[14px] text-accent-soft">{owner.education.degree}</p>
                <p className="mt-2 inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.06] px-3 py-1 font-mono text-[12px] text-white">
                  IPK {owner.education.gpa}
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-white/50">{owner.education.note}</p>
              </InteractiveCard>
            </div>

            <div>
              <h3 className="mb-6 flex items-center gap-2.5 text-lg font-semibold text-white">
                <Sparkle size={17} className="text-accent-soft" /> Keahlian utama
              </h3>
              <InteractiveCard className="surface p-5" accent="#5b7cfa">
                <div className="flex flex-wrap gap-2">
                  {topSkills.map((s) => (
                    <InteractiveBadge
                      key={s}
                      className="rounded-lg border border-line bg-ink px-3 py-1.5 text-[12px] text-white/60"
                      accent="#5b7cfa"
                    >
                      {s}
                    </InteractiveBadge>
                  ))}
                </div>
              </InteractiveCard>
            </div>

            {/* kartu Xinet */}
            <InteractiveCard className="surface relative overflow-hidden p-6" accent="#9db2ff">
              <p className="text-[11px] text-white/55">
                Perusahaan
              </p>
              <h4 className="mt-1.5 text-xl font-bold text-white">Xinet.id</h4>
              <p className="mt-1 text-[12px] text-accent-soft">Build what&apos;s next.</p>
              <p className="mt-4 text-[13px] leading-relaxed text-white/50">
                Ekosistem produk digital: commerce, komunikasi, alat bisnis, otomasi, dan AI. NexShop,
                SayBot, dan AkunTuntas dibangun di dalamnya.
              </p>
              <div className="mt-5 grid grid-cols-3 gap-3 pt-1">
                {[
                  { n: "NexShop", d: "Commerce" },
                  { n: "SayBot", d: "Pesan" },
                  { n: "AkunTuntas", d: "Pembukuan" },
                ].map((x) => (
                  <div key={x.n}>
                    <p className="text-[13px] font-semibold text-white">{x.n}</p>
                    <p className="text-[10px] text-white/55">{x.d}</p>
                  </div>
                ))}
              </div>
            </InteractiveCard>
          </div>
        </div>
      </div>
    </section>
  );
}
