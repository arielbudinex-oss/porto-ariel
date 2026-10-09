import { journey, owner } from "../data/projects";
import ScrollVelocity from "./rb/TextAnimations/ScrollVelocity/ScrollVelocity";
import { ElasticSticker } from "./pro/ProMirror";
import { Github, Mail, MapPin, Sparkles } from "lucide-react";

export function Journey() {
  return (
    <section id="cara-kerja" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <header className="mb-14 max-w-2xl">
          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-neon uppercase">
            03 — Perjalanan
          </p>
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            Dari eksperimen jadi <span className="text-grad">produk produksi</span>
          </h2>
          <p className="mt-5 text-sm text-mist">
            Tiap proyek mengajarkan sesuatu yang langsung dipakai proyek berikutnya — bukan dikerjakan
            sendiri-sendiri.
          </p>
        </header>

        <div className="relative">
          {/* garis linimasa */}
          <div className="absolute top-0 bottom-0 left-[19px] w-px bg-gradient-to-b from-neon via-violet to-transparent md:left-1/2" />

          <div className="space-y-10">
            {journey.map((j, i) => {
              const left = i % 2 === 0;
              return (
                <div key={j.step} className="relative md:grid md:grid-cols-2 md:gap-14">
                  {/* titik simpul — selalu menempel ke garis */}
                  <span className="absolute top-6 left-[13px] z-10 grid h-3.5 w-3.5 place-items-center rounded-full border-2 border-ink bg-neon md:left-1/2 md:-translate-x-1/2">
                    <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                  </span>

                  <div
                    className={`glass ml-12 rounded-2xl p-5 transition-transform duration-500 hover:-translate-y-1 md:ml-0 ${
                      left ? "md:col-start-1 md:mr-2 md:text-right" : "md:col-start-2 md:ml-2"
                    }`}
                  >
                    <span className="font-mono text-[11px] tracking-widest text-neon uppercase">
                      {j.step}
                    </span>
                    <h3 className="mt-1.5 font-display text-lg font-semibold text-frost">{j.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-mist">{j.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="kontak" className="relative overflow-hidden py-28">
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-line to-transparent" />

      {/* marquee nama — tiruan gaya "Scroll Velocity" tapi berjalan terus */}
      <div className="pointer-events-none mb-16 select-none opacity-[0.07]">
        <div className="marquee-track" style={{ "--marquee-speed": "50s" }}>
          {[0, 1].map((k) => (
            <span key={k} className="pr-10 font-display text-[9vw] font-bold whitespace-nowrap">
              FULL-STACK · PRODUCT BUILDER · SHIP IT · UKUR BUKTI ·&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[1fr_.9fr] lg:items-center">
        <div>
          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-neon uppercase">04 — Kontak</p>
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            Ada produk yang perlu <span className="text-grad">dibangun benar?</span>
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-mist">
            Aku terbuka untuk proyek full-stack: marketplace, gateway pesan, aplikasi desktop, atau
            alat internal. Cara kerjaku sederhana — ukur dulu, bangun, buktikan dengan angka.
          </p>

          <div className="mt-9 space-y-3">
            <a
              href={`mailto:${owner.email}`}
              className="group flex items-center gap-4 rounded-2xl border border-line bg-ink-2/50 p-4 transition-colors hover:border-neon/40"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-neon/10 text-neon">
                <Mail size={16} />
              </span>
              <span>
                <span className="block font-mono text-[10px] tracking-widest text-mist uppercase">
                  Email
                </span>
                <span className="text-sm text-frost group-hover:text-neon">{owner.email}</span>
              </span>
            </a>
            <a
              href={owner.github}
              target="_blank"
              rel="noreferrer noopener"
              className="group flex items-center gap-4 rounded-2xl border border-line bg-ink-2/50 p-4 transition-colors hover:border-neon/40"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet/10 text-violet">
                <Github size={16} />
              </span>
              <span>
                <span className="block font-mono text-[10px] tracking-widest text-mist uppercase">
                  GitHub
                </span>
                <span className="text-sm text-frost group-hover:text-neon">
                  github.com/ArielOsaze
                </span>
              </span>
            </a>
            <div className="flex items-center gap-4 rounded-2xl border border-line bg-ink-2/50 p-4">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-amber/10 text-amber">
                <MapPin size={16} />
              </span>
              <span>
                <span className="block font-mono text-[10px] tracking-widest text-mist uppercase">
                  Lokasi
                </span>
                <span className="text-sm text-frost">{owner.location} · WIB (UTC+7)</span>
              </span>
            </div>
          </div>
        </div>

        {/* kartu ajakan — stiker elastis (tiruan Pro "Elastic Sticker") */}
        <ElasticSticker className="mx-auto w-full max-w-md">
          <div className="relative overflow-hidden rounded-3xl border border-neon/25 bg-gradient-to-br from-ink-2 via-ink-3 to-ink p-8 shadow-2xl">
            <div className="absolute -top-16 -right-16 h-44 w-44 rounded-full bg-neon/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-violet/10 blur-3xl" />

            <Sparkles className="text-amber" size={22} />
            <h3 className="mt-4 font-display text-2xl leading-snug font-bold text-frost">
              {owner.name}
            </h3>
            <p className="mt-1 font-mono text-xs text-neon">{owner.role}</p>
            <p className="mt-5 text-[13px] leading-relaxed text-mist">{owner.bio[1]}</p>

            <div className="mt-7 grid grid-cols-2 gap-3 border-t border-line pt-6">
              <div>
                <p className="font-display text-2xl font-bold text-frost">8</p>
                <p className="text-[11px] text-mist">proyek nyata</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-frost">265rb+</p>
                <p className="text-[11px] text-mist">baris kode</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-frost">4</p>
                <p className="text-[11px] text-mist">produk live</p>
              </div>
              <div>
                <p className="font-display text-2xl font-bold text-frost">265+</p>
                <p className="text-[11px] text-mist">skrip uji</p>
              </div>
            </div>

            <p className="mt-6 text-center font-mono text-[10px] text-mist/70">
              — geser stikernya, memang bisa digeser —
            </p>
          </div>
        </ElasticSticker>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 text-center md:flex-row md:px-8 md:text-left">
        <p className="font-mono text-[11px] text-mist">
          © {new Date().getFullYear()} {owner.name} — dibangun dengan React, Tailwind, GSAP, dan
          komponen <span className="text-neon">ReactBits</span>.
        </p>
        <p className="font-mono text-[11px] text-mist">
          Semua angka di halaman ini diukur dari source code, bukan estimasi.
        </p>
      </div>
    </footer>
  );
}
