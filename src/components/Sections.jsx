import { lazy, Suspense } from "react";
import { journey, owner } from "../data/projects";
import { ElasticSticker } from "./pro/ProMirror";
import { LazyEffect } from "./Interactive";
import { GithubLogo, EnvelopeSimple, MapPin, LinkedinLogo, InstagramLogo, WhatsappLogo, ArrowUpRight } from "@phosphor-icons/react";
import { InteractiveCard } from "./Interactive";

// Lanyard memakai three.js (~240KB gzip) — dimuat hanya saat kartu mendekat viewport
const Lanyard = lazy(() => import("./rb/Components/Lanyard/Lanyard"));

export function Journey() {
  return (
    <section id="cara-kerja" className="relative py-28">
      <div aria-hidden className="ambient ambient-jalan" />
      <div className="mx-auto max-w-[1324px] px-6">
        <header className="mb-14 max-w-2xl">
          <p className="mb-3 text-[13px] font-medium tracking-[0.01em] text-accent-soft">
            Perjalanan
          </p>
          <h2 className="text-4xl font-bold tracking-[-0.02em] text-white md:text-5xl">
            Dari eksperimen jadi <span className="text-accent-soft">produk produksi</span>
          </h2>
          <p className="mt-5 max-w-[65ch] text-[15px] leading-relaxed text-white/50">
            Tiap proyek mengajarkan sesuatu yang langsung dipakai proyek berikutnya, bukan dikerjakan
            sendiri-sendiri.
          </p>
        </header>

        {/* perjalanan: grid rapi */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {journey.map((j) => (
            <InteractiveCard
              key={j.step}
              className="surface flex flex-col p-6"
              accent="#5b7cfa"
            >
              <span className="text-[12px] font-medium text-accent-soft">{j.step}</span>
              <h3 className="mt-3 text-lg font-semibold text-white">{j.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/55">{j.desc}</p>
            </InteractiveCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="kontak" className="relative overflow-hidden py-28">
      <div aria-hidden className="ambient ambient-kontak" />

      <div className="mx-auto grid max-w-[1324px] gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,.9fr)] lg:items-center">
        <div>
          <p className="mb-3 text-[13px] font-medium tracking-[0.01em] text-accent-soft">Kontak</p>
          <h2 className="text-4xl font-bold tracking-[-0.02em] text-white md:text-5xl">
            Ada produk yang perlu <span className="text-accent-soft">dibangun benar?</span>
          </h2>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/50">
            Aku terbuka untuk proyek full-stack: marketplace, gateway pesan, aplikasi desktop, atau
            alat internal. Cara kerjaku sederhana, ukur dulu, bangun, buktikan dengan angka.
          </p>

          <div className="mt-9 space-y-3">
            <InteractiveCard
              as="a"
              href={`mailto:${owner.email}`}
              className="surface flex items-center gap-4 p-4"
              accent="#5b7cfa"
            >
              <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-accent/12 text-accent-soft">
                <EnvelopeSimple size={16} />
              </span>
              <span className="flex flex-1 items-center justify-between">
                <span>
                  <span className="block text-[11px] text-white/55">Email</span>
                  <span className="text-[15px] text-white/80">Kirim pesan langsung</span>
                </span>
                <ArrowUpRight size={14} className="text-white/55" />
              </span>
            </InteractiveCard>

            <InteractiveCard
              as="a"
              href={owner.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              className="surface flex items-center gap-4 p-4"
              accent="#4ade80"
            >
              <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-green/15 text-green">
                <WhatsappLogo size={16} weight="fill" />
              </span>
              <span className="flex flex-1 items-center justify-between">
                <span>
                  <span className="block text-[11px] text-white/55">WhatsApp</span>
                  <span className="text-[15px] text-white/80">Chat sekarang</span>
                </span>
                <ArrowUpRight size={14} className="text-white/55" />
              </span>
            </InteractiveCard>

            <InteractiveCard
              as="a"
              href={owner.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="surface flex items-center gap-4 p-4"
              accent="#e668a7"
            >
              <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-rose/15 text-rose">
                <InstagramLogo size={16} weight="fill" />
              </span>
              <span className="flex flex-1 items-center justify-between">
                <span>
                  <span className="block text-[11px] text-white/55">Instagram</span>
                  <span className="text-[15px] text-white/80">Ikuti keseharianku</span>
                </span>
                <ArrowUpRight size={14} className="text-white/55" />
              </span>
            </InteractiveCard>

            <InteractiveCard
              as="a"
              href={owner.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="surface flex items-center gap-4 p-4"
              accent="#5b7cfa"
            >
              <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-accent/12 text-accent-soft">
                <LinkedinLogo size={16} />
              </span>
              <span className="flex flex-1 items-center justify-between">
                <span>
                  <span className="block text-[11px] text-white/55">LinkedIn</span>
                  <span className="text-[15px] text-white/80">Terhubung profesional</span>
                </span>
                <ArrowUpRight size={14} className="text-white/55" />
              </span>
            </InteractiveCard>

            <InteractiveCard
              as="a"
              href={owner.github}
              target="_blank"
              rel="noreferrer noopener"
              className="surface flex items-center gap-4 p-4"
              accent="#9aa3ad"
            >
              <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-white/[0.06] text-white/70">
                <GithubLogo size={16} />
              </span>
              <span className="flex flex-1 items-center justify-between">
                <span>
                  <span className="block text-[11px] text-white/55">GitHub</span>
                  <span className="text-[15px] text-white/80">Lihat source code</span>
                </span>
                <ArrowUpRight size={14} className="text-white/55" />
              </span>
            </InteractiveCard>

            <InteractiveCard className="surface flex items-center gap-4 p-4" accent="#9db2ff">
              <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-white/[0.06] text-white/70">
                <MapPin size={16} />
              </span>
              <span>
                <span className="block text-[11px] text-white/55">Lokasi</span>
                <span className="text-[15px] text-white/80">{owner.location} · WIB (UTC+7)</span>
              </span>
            </InteractiveCard>
          </div>
        </div>

        {/* kartu ajakan, bisa diseret */}
        <div className="mx-auto w-full max-w-md space-y-5">
          {/* kartu nama 3D — bisa digoyang & dibalik */}
          <div className="group/lanyard relative">
            <div aria-hidden="true" className="relative h-[380px] w-full overflow-hidden rounded-2xl border border-line bg-ink">
              <LazyEffect className="absolute inset-0" rootMargin="600px">
                <Suspense fallback={<div className="grid h-full place-items-center text-[12px] text-white/55">memuat kartu…</div>}>
                  <Lanyard
                frontImage="/assets/profile/ariel-portrait.webp"
                backImage="/assets/profile/ariel-avatar.webp"
                orientation="portrait"
                finish="glossy"
                size={0.72}
                anchor="center"
                strapLength={0.42}
                strapColor="#1a1f26"
                metal="silver"
                gravity={1}
                damping={0.5}
                elasticity={0.55}
                breeze={0.35}
                interactive
                intro
                cardColor="#14181d"
              />
                </Suspense>
              </LazyEffect>
            </div>
            <span
              aria-hidden
              className="hint-cursor pointer-events-none absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 translate-y-1.5 items-center gap-1.5 rounded-full border border-accent-soft/45 bg-ink/85 px-3 py-1.5 text-[11px] font-medium whitespace-nowrap text-accent-soft opacity-0 backdrop-blur transition-[opacity,transform] duration-300 group-hover/lanyard:translate-y-0 group-hover/lanyard:opacity-100"
            >
              goyang & klik untuk membalik kartunya
            </span>
          </div>

          <ElasticSticker>
            <div className="surface relative overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,.5)]">
              {/* identitas */}
              <div className="p-7">
                <h3 className="text-2xl leading-snug font-bold text-white">{owner.name}</h3>
                <p className="mt-1 text-[13px] text-accent-soft">{owner.role}</p>
                <p className="mt-5 text-[13px] leading-relaxed text-white/55">{owner.bio[1]}</p>

                <div className="mt-7 grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <p className="text-2xl font-bold text-white">7</p>
                    <p className="text-[11px] text-white/55">proyek nyata</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">265rb+</p>
                    <p className="text-[11px] text-white/55">baris kode</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">4</p>
                    <p className="text-[11px] text-white/55">produk live</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">265+</p>
                    <p className="text-[11px] text-white/55">skrip uji</p>
                  </div>
                </div>

                <p className="mt-6 text-center text-[11px] text-white/55">
                  Geser kartunya, memang bisa digeser
                </p>
              </div>
            </div>
          </ElasticSticker>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="py-10">
      <div className="mx-auto flex max-w-[1324px] flex-col items-center justify-between gap-4 px-6 text-center md:flex-row md:text-left">
        <p className="font-mono text-[11px] text-white/55">
          © {new Date().getFullYear()} {owner.name}. React, Tailwind, GSAP, dan komponen animasi
          buatan sendiri.
        </p>
        <p className="font-mono text-[11px] text-white/55">
          Semua angka di halaman ini diukur dari source code, bukan estimasi.
        </p>
      </div>
      <div className="mx-auto mt-6 max-w-[1324px] px-6">
        <p className="text-center text-[11px] text-white/55">
          psst, coba ketik <span className="text-accent-soft">ariel</span> di keyboard untuk membuka terminal rahasia
        </p>
      </div>
    </footer>
  );
}
