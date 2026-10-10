import { journey, owner } from "../data/projects";
import { ElasticSticker } from "./pro/ProMirror";
import { Github, Mail, MapPin, Sparkles } from "lucide-react";

export function Journey() {
  return (
    <section id="cara-kerja" className="relative py-28">
      <div className="mx-auto max-w-[1324px] px-6">
        <header className="mb-14 max-w-2xl">
          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-[#d4d4d8] uppercase">
            05 — Perjalanan
          </p>
          <h2 className="text-4xl font-bold tracking-[-0.02em] text-white md:text-5xl">
            Dari eksperimen jadi <span className="text-grad">produk produksi</span>
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-white/50">
            Tiap proyek mengajarkan sesuatu yang langsung dipakai proyek berikutnya — bukan dikerjakan
            sendiri-sendiri.
          </p>
        </header>

        <div className="relative">
          {/* garis linimasa */}
          <div className="absolute top-0 bottom-0 left-[19px] w-px bg-gradient-to-b from-[#ffffff] via-[#262626] to-transparent md:left-1/2" />

          <div className="space-y-10">
            {journey.map((j, i) => {
              const left = i % 2 === 0;
              return (
                <div key={j.step} className="relative md:grid md:grid-cols-2 md:gap-14">
                  <span className="absolute top-6 left-[13px] z-10 grid h-3.5 w-3.5 place-items-center rounded-full border-2 border-[#0a0a0a] bg-[#ffffff] md:left-1/2 md:-translate-x-1/2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0a0a0a]" />
                  </span>

                  <div
                    className={`surface ml-12 p-5 transition-colors duration-300 hover:border-[#ffffff]/30 md:ml-0 ${
                      left ? "md:col-start-1 md:mr-2 md:text-right" : "md:col-start-2 md:ml-2"
                    }`}
                  >
                    <span className="font-mono text-[11px] tracking-widest text-[#d4d4d8] uppercase">
                      {j.step}
                    </span>
                    <h3 className="mt-1.5 text-lg font-semibold text-white">{j.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-white/45">{j.desc}</p>
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
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#262626] to-transparent" />

      <div className="mx-auto grid max-w-[1324px] gap-12 px-6 lg:grid-cols-[1fr_.9fr] lg:items-center">
        <div>
          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-[#d4d4d8] uppercase">06 — Kontak</p>
          <h2 className="text-4xl font-bold tracking-[-0.02em] text-white md:text-5xl">
            Ada produk yang perlu <span className="text-grad">dibangun benar?</span>
          </h2>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/50">
            Aku terbuka untuk proyek full-stack: marketplace, gateway pesan, aplikasi desktop, atau
            alat internal. Cara kerjaku sederhana — ukur dulu, bangun, buktikan dengan angka.
          </p>

          <div className="mt-9 space-y-3">
            <a
              href={`mailto:${owner.email}`}
              className="group surface flex items-center gap-4 p-4 transition-colors hover:border-[#ffffff]/40"
            >
              <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-[#ffffff]/12 text-[#d4d4d8]">
                <Mail size={16} />
              </span>
              <span>
                <span className="block font-mono text-[10px] tracking-widest text-white/40 uppercase">
                  Email
                </span>
                <span className="text-[15px] text-white/80 group-hover:text-[#d4d4d8]">{owner.email}</span>
              </span>
            </a>
            <a
              href={owner.github}
              target="_blank"
              rel="noreferrer noopener"
              className="group surface flex items-center gap-4 p-4 transition-colors hover:border-[#ffffff]/40"
            >
              <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-white/[0.06] text-white/70">
                <Github size={16} />
              </span>
              <span>
                <span className="block font-mono text-[10px] tracking-widest text-white/40 uppercase">
                  GitHub
                </span>
                <span className="text-[15px] text-white/80 group-hover:text-[#d4d4d8]">
                  github.com/ArielOsaze
                </span>
              </span>
            </a>
            <div className="surface flex items-center gap-4 p-4">
              <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-white/[0.06] text-white/70">
                <MapPin size={16} />
              </span>
              <span>
                <span className="block font-mono text-[10px] tracking-widest text-white/40 uppercase">
                  Lokasi
                </span>
                <span className="text-[15px] text-white/80">{owner.location} · WIB (UTC+7)</span>
              </span>
            </div>
          </div>
        </div>

        {/* kartu ajakan — bisa diseret */}
        <ElasticSticker className="mx-auto w-full max-w-md">
          <div className="surface relative overflow-hidden p-8 shadow-[0_24px_80px_rgba(0,0,0,.5)]">
            <div className="absolute -top-16 -right-16 h-44 w-44 rounded-full bg-[#ffffff]/10 blur-3xl" />

            <Sparkles className="text-[#d4d4d8]" size={22} />
            <h3 className="mt-4 text-2xl leading-snug font-bold text-white">{owner.name}</h3>
            <p className="mt-1 font-mono text-xs text-[#d4d4d8]">{owner.role}</p>
            <p className="mt-5 text-[13px] leading-relaxed text-white/45">{owner.bio[1]}</p>

            <div className="mt-7 grid grid-cols-2 gap-3 border-t border-[#262626] pt-6">
              <div>
                <p className="text-2xl font-bold text-white">8</p>
                <p className="text-[11px] text-white/40">proyek nyata</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">265rb+</p>
                <p className="text-[11px] text-white/40">baris kode</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">4</p>
                <p className="text-[11px] text-white/40">produk live</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">265+</p>
                <p className="text-[11px] text-white/40">skrip uji</p>
              </div>
            </div>

            <p className="mt-6 text-center font-mono text-[10px] text-white/25">
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
    <footer className="border-t border-[#262626] py-10">
      <div className="mx-auto flex max-w-[1324px] flex-col items-center justify-between gap-4 px-6 text-center md:flex-row md:text-left">
        <p className="font-mono text-[11px] text-white/35">
          © {new Date().getFullYear()} {owner.name} — React, Tailwind, GSAP, dan komponen animasi
          buatan sendiri.
        </p>
        <p className="font-mono text-[11px] text-white/35">
          Semua angka di halaman ini diukur dari source code, bukan estimasi.
        </p>
      </div>
    </footer>
  );
}
