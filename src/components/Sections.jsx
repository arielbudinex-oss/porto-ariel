import { journey, owner } from "../data/projects";
import { ElasticSticker } from "./pro/ProMirror";
import { GithubLogo, EnvelopeSimple, MapPin, Sparkle, LinkedinLogo } from "@phosphor-icons/react";
import { InteractiveCard } from "./Interactive";

export function Journey() {
  return (
    <section id="cara-kerja" className="relative py-28">
      <div className="mx-auto max-w-[1324px] px-6">
        <header className="mb-14 max-w-2xl">
          <p className="mb-3 text-[13px] font-medium tracking-[0.01em] text-[#9db2ff]">
            Perjalanan
          </p>
          <h2 className="text-4xl font-bold tracking-[-0.02em] text-white md:text-5xl">
            Dari eksperimen jadi <span className="text-grad">produk produksi</span>
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-white/50">
            Tiap proyek mengajarkan sesuatu yang langsung dipakai proyek berikutnya, bukan dikerjakan
            sendiri-sendiri.
          </p>
        </header>

        {/* perjalanan: grid rapi dengan penanda tahap */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {journey.map((j, i) => (
            <InteractiveCard
              key={j.step}
              className="surface flex flex-col p-6"
              accent="#5b7cfa"
            >
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-medium text-[#9db2ff]">{j.step}</span>
                <span className="text-[11px] text-white/25">Tahap {i + 1}</span>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-white">{j.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/45">{j.desc}</p>
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

      <div className="mx-auto grid max-w-[1324px] gap-12 px-6 lg:grid-cols-[1fr_.9fr] lg:items-center">
        <div>
          <p className="mb-3 text-[13px] font-medium tracking-[0.01em] text-[#9db2ff]">Kontak</p>
          <h2 className="text-4xl font-bold tracking-[-0.02em] text-white md:text-5xl">
            Ada produk yang perlu <span className="text-grad">dibangun benar?</span>
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
              <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-[#5b7cfa]/12 text-[#9db2ff]">
                <EnvelopeSimple size={16} />
              </span>
              <span>
                <span className="block text-[11px] text-white/40">
                  Email
                </span>
                <span className="text-[15px] text-white/80">{owner.email}</span>
              </span>
            </InteractiveCard>
            <InteractiveCard
              as="a"
              href={owner.github}
              target="_blank"
              rel="noreferrer noopener"
              className="surface flex items-center gap-4 p-4"
              accent="#5b7cfa"
            >
              <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-white/[0.06] text-white/70">
                <GithubLogo size={16} />
              </span>
              <span>
                <span className="block text-[11px] text-white/40">
                  GitHub
                </span>
                <span className="text-[15px] text-white/80">
                  github.com/ArielOsaze
                </span>
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
              <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-[#5b7cfa]/12 text-[#9db2ff]">
                <LinkedinLogo size={16} />
              </span>
              <span>
                <span className="block text-[11px] text-white/40">LinkedIn</span>
                <span className="text-[15px] text-white/80">
                  linkedin.com/in/ariel-osaze-koinda-budi
                </span>
              </span>
            </InteractiveCard>
            <InteractiveCard className="surface flex items-center gap-4 p-4" accent="#9db2ff">
              <span className="grid h-10 w-10 place-items-center rounded-[10px] bg-white/[0.06] text-white/70">
                <MapPin size={16} />
              </span>
              <span>
                <span className="block text-[11px] text-white/40">Lokasi</span>
                <span className="text-[15px] text-white/80">{owner.location} · WIB (UTC+7)</span>
              </span>
            </InteractiveCard>
          </div>
        </div>

        {/* kartu ajakan, bisa diseret */}
        <ElasticSticker className="mx-auto w-full max-w-md">
          <div className="surface relative overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,.5)]">
            {/* foto portrait */}
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <img
                src="/assets/profile/ariel-portrait.webp"
                alt={`${owner.name}, ${owner.role}`}
                className="h-full w-full object-cover object-top"
                loading="lazy"
              />
              {/* gradient bawah agar teks menyatu */}
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#16191d] via-[#16191d]/70 to-transparent" />
              {/* identitas di atas gradient */}
              <div className="absolute inset-x-0 bottom-0 p-7">
                <h3 className="text-2xl leading-snug font-bold text-white">{owner.name}</h3>
                <p className="mt-1 text-[13px] text-[#9db2ff]">{owner.role}</p>
              </div>
            </div>

            <div className="p-7 pt-0">
              <p className="text-[13px] leading-relaxed text-white/45">{owner.bio[1]}</p>

              <div className="mt-7 grid grid-cols-2 gap-3 pt-2">
                <div>
                  <p className="text-2xl font-bold text-white">7</p>
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

              <p className="mt-6 text-center text-[11px] text-white/25">
               , geser kartunya, memang bisa digeser ,
              </p>
            </div>
          </div>
        </ElasticSticker>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="py-10">
      <div className="mx-auto flex max-w-[1324px] flex-col items-center justify-between gap-4 px-6 text-center md:flex-row md:text-left">
        <p className="font-mono text-[11px] text-white/35">
          © {new Date().getFullYear()} {owner.name}. React, Tailwind, GSAP, dan komponen animasi
          buatan sendiri.
        </p>
        <p className="font-mono text-[11px] text-white/35">
          Semua angka di halaman ini diukur dari source code, bukan estimasi.
        </p>
      </div>
      <div className="mx-auto mt-6 max-w-[1324px] px-6">
        <p className="text-center text-[11px] text-white/20">
          psst, coba ketik <span className="text-[#9db2ff]/60">ariel</span> di keyboard
        </p>
      </div>
    </footer>
  );
}
