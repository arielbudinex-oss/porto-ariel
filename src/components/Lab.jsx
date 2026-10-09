import { owner } from "../data/projects";
import ScrollVelocity from "./rb/TextAnimations/ScrollVelocity/ScrollVelocity";
import GlitchText from "./rb/TextAnimations/GlitchText/GlitchText";
import GradientText from "./rb/TextAnimations/GradientText/GradientText";
import StarBorder from "./rb/Animations/StarBorder/StarBorder";
import {
  DottedGlobe,
  LightDroplets,
  NeonReveal,
  GradientBars,
  TextCube,
  TumbleWall,
  DepthCarousel,
  MosaicWaves,
  AuroraTide,
} from "./pro/ProMirror2";
import { HalftoneCursor, StarfieldWarp, CipherReveal } from "./pro/ProMirror";
import { Radio, Move3d, Layers3, Sparkle } from "lucide-react";

const CARDS = [
  {
    kicker: "Pro · Background",
    title: "Lightspeed",
    desc: "Lompatan hyperspace: bintang memanjang dari pusat, mengikuti kursor.",
    span: "lg:col-span-2",
  },
  {
    kicker: "Pro · 3D & Shaders",
    title: "Globe",
    desc: "Bola dunia titik dengan busur yang menyala dan mengalir.",
  },
  {
    kicker: "Pro · Background",
    title: "Light Droplets",
    desc: "Hujan garis cahaya yang jatuh perlahan.",
  },
  {
    kicker: "Pro · Text",
    title: "Text Cube",
    desc: "Kubus 3D berisi nama teknologi — gerakkan kursormu di atasnya.",
  },
  {
    kicker: "Pro · Background",
    title: "Gradient Bars",
    desc: "Bar gradien bergelombang yang bergerak naik-turun.",
  },
  {
    kicker: "Pro · UI",
    title: "Depth Carousel",
    desc: "Kartu mundur ke kedalaman 3D; berhenti saat kursor mendekat.",
  },
  {
    kicker: "Pro · UI",
    title: "Tumble Wall",
    desc: "Tag-tag berjatuhan dengan fisika — seret dan lemparkan!",
    span: "lg:col-span-2",
  },
  {
    kicker: "Pro · Background",
    title: "Mosaic Waves",
    desc: "Gelombang yang bergulir lewat mosaik kotak.",
  },
  {
    kicker: "Pro · Animation",
    title: "Halftone Reveal",
    desc: "Matriks titik halftone yang menyala di sekitar kursor.",
  },
  {
    kicker: "Pro · Background",
    title: "Satin Ridges",
    desc: "Pita aurora lembut yang mengalir di belakang konten.",
      span: "lg:col-span-2",
  },
];

const SLIDES = [
  { kicker: "Skala", title: "NexShop — 153rb baris", desc: "Marketplace dengan pembayaran, KYC, dan AI." },
  { kicker: "Platform", title: "SayBot — multi-kanal", desc: "WhatsApp + Telegram dengan antrean dan dashboard." },
  { kicker: "Produk", title: "LumaWall — 58 rilis", desc: "Wallpaper engine GPU dengan pause per-monitor." },
  { kicker: "Vertikal", title: "AkunTuntas — pajak UMKM", desc: "Pembukuan offline-first, dua mode belajar." },
];

export default function Lab() {
  return (
    <section id="lab" className="relative overflow-hidden py-28">
      <AuroraTide className="absolute inset-0 -z-20" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <header className="mb-12 max-w-3xl">
          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-neon uppercase">05 — Lab Efek</p>
          <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            <GradientText
              colors={["#64e6ff", "#8b5cf6", "#ff5c9d", "#64e6ff"]}
              animationSpeed={7}
              className="font-display text-4xl font-bold md:text-5xl"
            >
              Seluruh efek animasi
            </GradientText>{" "}
            hidup di sini.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-mist">
            Halaman ini memakai <span className="text-frost">semua komponen animasi ReactBits</span>{" "}
            (215 komponen open-source) plus <span className="text-frost">20 efek bergaya ReactBits Pro</span>{" "}
            yang kutulis ulang sendiri dari nol — canvas, WebGL, dan CSS murni — karena katalog Pro
            berlisensi tidak bisa di-install tanpa membeli. Desain animasinya yang kupelajari, kodenya
            milikku.
          </p>
        </header>

        {/* marquee teknologi */}
        <div className="mb-14 -mx-5 md:-mx-8">
          <ScrollVelocity
            texts={["ReactBits 215 komponen · 20 efek Pro-mirror · Canvas · WebGL · GSAP · Motion · Three.js"]}
            velocity={42}
            className="font-display text-lg font-semibold text-mist/60 md:text-xl"
            numCopies={4}
          />
        </div>

        {/* grid efek */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c, i) => (
            <article
              key={c.title}
              className={`glass group relative overflow-hidden rounded-3xl p-5 transition-transform duration-500 hover:-translate-y-1 ${c.span ?? ""}`}
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-neon uppercase">{c.kicker}</p>
                  <h3 className="mt-1 font-display text-lg font-semibold text-frost">{c.title}</h3>
                </div>
                <span className="rounded-lg border border-line bg-ink-2/70 p-1.5 text-mist">
                  {i % 4 === 0 ? <Radio size={13} /> : i % 4 === 1 ? <Move3d size={13} /> : i % 4 === 2 ? <Layers3 size={13} /> : <Sparkle size={13} />}
                </span>
              </div>

              {/* panggung efek */}
              <div className="relative mb-3 h-52 overflow-hidden rounded-2xl border border-line bg-ink/60">
                {c.title === "Lightspeed" && <StarfieldWarp className="h-full w-full" density={240} speed={1.05} />}
                {c.title === "Globe" && <DottedGlobe className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size={210} />}
                {c.title === "Light Droplets" && <LightDroplets className="h-full w-full" count={46} />}
                {c.title === "Text Cube" && (
                  <div className="grid h-full place-items-center">
                    <TextCube size={112} />
                  </div>
                )}
                {c.title === "Gradient Bars" && (
                  <div className="grid h-full items-end p-3">
                    <GradientBars className="h-full w-full" bars={22} />
                  </div>
                )}
                {c.title === "Depth Carousel" && (
                  <div className="grid h-full place-items-center px-2">
                    <DepthCarousel className="w-full max-w-xs" slides={SLIDES} />
                  </div>
                )}
                {c.title === "Tumble Wall" && (
                  <TumbleWall
                    className="h-full w-full"
                    height={208}
                    items={["NexShop", "SayBot", "LumaWall", "AkunTuntas", "iPaymu", "Baileys", "Supabase", "GSAP", "ReactBits", "Nginx"]}
                  />
                )}
                {c.title === "Mosaic Waves" && (
                  <div className="grid h-full place-items-center p-4">
                    <MosaicWaves className="h-full w-full" cols={16} rows={6} />
                  </div>
                )}
                {c.title === "Halftone Reveal" && (
                  <HalftoneCursor className="h-full w-full" size={17} radius={120} />
                )}
                {c.title === "Satin Ridges" && (
                  <div className="relative h-full">
                    <AuroraTide className="absolute inset-0" />
                    <div className="relative grid h-full place-items-center">
                      <GlitchText speed={1.4} enableShadows enableOnHover={false} className="font-display text-2xl font-bold">
                        REACTBITS
                      </GlitchText>
                    </div>
                  </div>
                )}
              </div>

              <p className="text-[13px] leading-relaxed text-mist">{c.desc}</p>
            </article>
          ))}
        </div>

        {/* demo Neon Reveal + Cipher */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <NeonReveal className="glass rounded-3xl p-7" color="#64e6ff">
            <p className="font-mono text-[10px] tracking-[0.22em] text-neon uppercase">Pro · Background</p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-frost">Neon Reveal</h3>
            <p className="mt-3 text-sm leading-relaxed text-mist">
              Tabung neon yang berkedip menyala lalu menyinari isi di bawahnya. Coba perhatikan garis di
              tepi atas kartu ini — nyala dan redupnya sengaja tidak beraturan, persis tabung neon asli.
            </p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {["NexShop", "SayBot", "LumaWall"].map((n) => (
                <div key={n} className="rounded-xl border border-line bg-ink/50 px-3 py-2 text-center">
                  <p className="font-mono text-[11px] text-neon">{n}</p>
                </div>
              ))}
            </div>
          </NeonReveal>

          <div className="glass rounded-3xl p-7">
            <p className="font-mono text-[10px] tracking-[0.22em] text-neon uppercase">Pro · Text</p>
            <h3 className="mt-2 font-display text-2xl font-semibold text-frost">Cipher Reveal</h3>
            <p className="mt-3 text-sm leading-relaxed text-mist">
              Headline yang terdekode dari karakter acak — dipakai di bagian pembuka halaman ini.
              Contoh hidup:
            </p>
            <p className="mt-5 font-mono text-sm text-frost">
              <CipherReveal
                text={`> ${owner.short} membangun produk yang dipakai nyata_`}
                speed={26}
                delay={200}
              />
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <StarBorder as="span" color="#64e6ff" speed="4s" thickness={1}>
                <span className="px-3 py-1.5 font-mono text-[11px] text-neon">StarBorder</span>
              </StarBorder>
              <span className="rounded-lg border border-line bg-ink-2/70 px-3 py-1.5 font-mono text-[11px] text-mist">
                + 19 efek Pro-mirror lainnya
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
