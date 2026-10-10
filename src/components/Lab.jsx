import { owner } from "../data/projects";
import GradientText from "./rb/TextAnimations/GradientText/GradientText";
import DecryptedText from "./rb/TextAnimations/DecryptedText/DecryptedText";
import CountUp from "./rb/TextAnimations/CountUp/CountUp";
import ShinyText from "./rb/TextAnimations/ShinyText/ShinyText";
import StarBorder from "./rb/Animations/StarBorder/StarBorder";
import SpotlightCard from "./rb/Components/SpotlightCard/SpotlightCard";
import TiltedCard from "./rb/Components/TiltedCard/TiltedCard";
import Aurora from "./rb/Backgrounds/Aurora/Aurora";
import Particles from "./rb/Backgrounds/Particles/Particles";
import Orb from "./rb/Backgrounds/Orb/Orb";
import Balatro from "./rb/Backgrounds/Balatro/Balatro";
import DarkVeil from "./rb/Backgrounds/DarkVeil/DarkVeil";
import LightRays from "./rb/Backgrounds/LightRays/LightRays";
import Threads from "./rb/Backgrounds/Threads/Threads";
import Beams from "./rb/Backgrounds/Beams/Beams";
import Silk from "./rb/Backgrounds/Silk/Silk";
import Topography from "./rb/Backgrounds/Topography/Topography";
import Galaxy from "./rb/Backgrounds/Galaxy/Galaxy";
import DotGrid from "./rb/Backgrounds/DotGrid/DotGrid";
import { Radio, Sparkles, Move3d, Layers3 } from "lucide-react";

// Aksen palet — emerald tua + krem hangat
const EMERALD = "#2e7d5b";
const EMERALD_SOFT = "#a8d4b8";
const CREAM = "#e8dcc4";

const CARDS = [
  {
    kicker: "Latar",
    title: "Aurora",
    desc: "Cahaya bergelombang yang mengalir pelan — dipakai sebagai latar hero saat halaman dibuka.",
    C: Aurora,
    span: "lg:col-span-2",
    props: { colorStops: [EMERALD, "#1b5e42", EMERALD_SOFT], amplitude: 1.0, blend: 0.5 },
  },
  {
    kicker: "Partikel",
    title: "Particles",
    desc: "Serbuk cahaya 3D yang bergeser halus; makin dekat kursor, makin reaktif.",
    C: Particles,
    props: {
      particleCount: 180,
      particleSpread: 12,
      speed: 0.08,
      particleColors: [EMERALD_SOFT, EMERALD, CREAM],
      moveParticlesOnHover: true,
      particleBaseSize: 90,
      alphaParticles: true,
    },
  },
  {
    kicker: "Latar",
    title: "Topography",
    desc: "Garis kontur yang bergerak seperti peta topografi — aksen kedalaman tanpa ramai.",
    C: Topography,
    props: {
      lowColor: "#1b5e42",
      midColor: EMERALD,
      highColor: EMERALD_SOFT,
      speed: 0.3,
      morphAmount: 2.4,
      bands: 2.4,
      thickness: 0.012,
      glow: 0.45,
      colorMode: "elevation",
      contrast: 2.6,
      grain: true,
      mouseInteraction: true,
    },
  },
  {
    kicker: "Latar",
    title: "Orb",
    desc: "Bola cahaya yang berdenyut tenang dan menoleh mengikuti kursor.",
    C: Orb,
    props: { hue: 0, hoverIntensity: 0.4, rotateOnHover: true, backgroundColor: "#0c120e" },
  },
  {
    kicker: "Latar",
    title: "Balatro",
    desc: "Pola fraktal berputar dengan kontras tinggi — dipakai sebagai tekstur bagian penutup.",
    C: Balatro,
    props: { color1: EMERALD, color2: "#0c120e", color3: EMERALD_SOFT, speed: 0.6, spinAmount: 0.6, contrast: 3.2 },
  },
  {
    kicker: "Latar",
    title: "Dark Veil",
    desc: "Tirai gelap yang mengalun perlahan; pergerakannya sengaja dibuat lambat agar tidak mengganggu bacaan.",
    C: DarkVeil,
    props: { hueShift: 0, speed: 0.5 },
    filter: "sepia(1) hue-rotate(70deg) saturate(1.9) brightness(1.02)",
  },
  {
    kicker: "Latar",
    title: "Light Rays",
    desc: "Berkas cahaya dari atas yang mengikuti kursor — memberi kesan sorot panggung.",
    C: LightRays,
    props: {
      raysOrigin: "top-center",
      raysColor: EMERALD_SOFT,
      raysSpeed: 0.8,
      lightSpread: 1.1,
      rayLength: 1.6,
      followMouse: true,
      pulsating: false,
    },
  },
  {
    kicker: "Latar",
    title: "Threads",
    desc: "Benang halus yang mengalir seperti lipatan kain — gerakannya menenangkan.",
    C: Threads,
    props: { color: [0.62, 0.78, 0.67], amplitude: 1.4, distance: 0.4, lineCount: 70, thickness: 0.7, speed: 0.5 },
  },
  {
    kicker: "Latar",
    title: "Beams",
    desc: "Balok cahaya bersilangan dengan butiran halus, seperti cahaya menembus jendela.",
    C: Beams,
    props: {
      beamWidth: 2.2,
      beamHeight: 16,
      beamNumber: 10,
      lightColor: "#d4d4d8",
      beamColor: "#ffffff",
      backgroundColor: "#0c120e",
      speed: 2,
      noiseIntensity: 1.6,
      scale: 0.22,
    },
  },
  {
    kicker: "Latar",
    title: "Silk",
    desc: "Permukaan sutra yang bergelombang lembut — dipakai di bagian ajakan menghubungi.",
    C: Silk,
    props: { speed: 3, scale: 1.1, color: "#ffffff", noiseIntensity: 1.2 },
  },
  {
    kicker: "Latar",
    title: "Galaxy",
    desc: "Bintang kecil yang berputar perlahan — latar bagian keahlian.",
    C: Galaxy,
    props: { hueShift: 42, density: 1.1, speed: 0.8 },
  },
  {
    kicker: "Interaktif",
    title: "Dot Grid",
    desc: "Titik-titik yang memantul saat kursor mendekat, lalu kembali tenang sendiri.",
    C: DotGrid,
    props: {
      dotSize: 3,
      gap: 22,
      baseColor: "#2a3d31",
      activeColor: "#ffffff",
      proximity: 110,
      shockRadius: 220,
      resistance: 750,
      returnDuration: 1.4,
    },
  },
];

export default function Lab() {
  return (
    <section id="lab" className="relative overflow-hidden py-28">
      <div className="mx-auto max-w-[1324px] px-6">
        <header className="mb-12 max-w-3xl">
          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-[#a8d4b8] uppercase">04 — Lab Efek</p>
          <h2 className="text-4xl font-bold tracking-[-0.02em] md:text-5xl">
            <GradientText colors={["#fff", "#a3aca6", "#a8d4b8", "#fff"]} animationSpeed={8} className="text-4xl font-bold md:text-5xl">
              Efek yang kupakai
            </GradientText>{" "}
            <span className="text-white">di halaman ini.</span>
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-white/50">
            Bukan galeri tempelan — semua efek di bawah benar-benar berjalan di halaman ini: canvas, WebGL, dan CSS.
            Tiap efek kutulis sebagai komponen lepas, jadi bisa dipindah ke proyek lain tanpa membawa ketergantungan berat.
          </p>
        </header>

        {/* grid efek */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c, i) => {
            const Comp = c.C;
            return (
              <article
                key={c.title}
                className={`surface group relative overflow-hidden transition-colors duration-300 hover:border-[#2e7d5b]/50 ${c.span ?? ""}`}
              >
                <div className="flex items-start justify-between gap-3 p-5 pb-3">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.2em] text-[#a8d4b8] uppercase">{c.kicker}</p>
                    <h3 className="mt-1 text-[17px] font-semibold text-white">{c.title}</h3>
                  </div>
                  <span className="rounded-lg border border-[#2a3d31] bg-[#0c120e] p-1.5 text-white/40">
                    {i % 4 === 0 ? <Radio size={13} /> : i % 4 === 1 ? <Move3d size={13} /> : i % 4 === 2 ? <Layers3 size={13} /> : <Sparkles size={13} />}
                  </span>
                </div>

                <div className="relative mx-5 mb-3 h-52 overflow-hidden rounded-[10px] border border-[#2a3d31] bg-[#0f1512]">
                  <div className="absolute inset-0" style={c.filter ? { filter: c.filter } : undefined}>
                    <Comp {...(c.props ?? {})} />
                  </div>
                </div>

                <p className="px-5 pb-5 text-[13px] leading-relaxed text-white/45">{c.desc}</p>
              </article>
            );
          })}
        </div>

        {/* baris komponen interaktif */}
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          <SpotlightCard className="surface rounded-[14px]" spotlightColor="rgba(46,125,91,0.28)" intensity={0.4}>
            <div className="p-6">
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#a8d4b8] uppercase">Interaktif</p>
              <h3 className="mt-1 text-[17px] font-semibold text-white">Spotlight Card</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-white/45">
                Sorotan lembut mengikuti kursor di permukaan kartu — kupakai untuk kartu proyek supaya terasa hidup tanpa ramai.
              </p>
            </div>
          </SpotlightCard>

          <div className="surface p-6">
            <p className="font-mono text-[10px] tracking-[0.2em] text-[#a8d4b8] uppercase">Teks</p>
            <h3 className="mt-1 text-[17px] font-semibold text-white">Decrypted Text</h3>
            <p className="mt-3 font-mono text-[13px] text-white/70">
              <DecryptedText
                text={`> ${owner.name} membangun produk yang dipakai nyata_`}
                speed={45}
                maxIterations={14}
                characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
                animateOn="view"
                revealDirection="start"
              />
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <StarBorder as="span" color="#a8d4b8" speed="4s" thickness={1}>
                <span className="px-3 py-1.5 font-mono text-[11px] text-[#a8d4b8]">Star Border</span>
              </StarBorder>
              <span className="rounded-lg border border-[#2a3d31] bg-[#0c120e] px-3 py-1.5 font-mono text-[11px] text-white/45">
                komponen lepas, tanpa pustaka animasi berat
              </span>
            </div>
          </div>

          <div className="surface p-6">
            <p className="font-mono text-[10px] tracking-[0.2em] text-[#a8d4b8] uppercase">Teks</p>
            <h3 className="mt-1 text-[17px] font-semibold text-white">Shiny Text</h3>
            <div className="mt-5 grid place-items-center py-3">
              <ShinyText
                text="Ariel Osaze Koinda Budi"
                color="#a8d4b8"
                shineColor="#f6f4ee"
                speed={3.2}
                shineWidth={110}
                direction="left"
                trigger="loop"
                className="text-2xl font-bold tracking-[-0.01em]"
              />
            </div>
            <p className="mt-3 text-center text-[13px] leading-relaxed text-white/45">
              Kilau cahaya yang menyapu teks secara berkala — kupakai untuk penegasan nama, tanpa getaran yang mengganggu.
            </p>
          </div>
        </div>

        {/* baris angka & kartu miring */}
        <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
          <div className="surface flex flex-col justify-center p-7">
            <p className="font-mono text-[10px] tracking-[0.2em] text-[#a8d4b8] uppercase">Hitungan</p>
            <h3 className="mt-1 text-[17px] font-semibold text-white">Angka yang naik</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-white/45">
              Angka bergerak naik saat masuk layar — dipakai di ringkasan supaya capaian terasa, bukan sekadar terbaca.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-5">
              {[
                { v: 8, l: "proyek" },
                { v: 265, s: "rb+", l: "baris kode" },
                { v: 4, l: "produk live" },
                { v: 265, s: "+", l: "skrip uji" },
              ].map((x) => (
                <div key={x.l}>
                  <p className="text-3xl font-bold text-white">
                    <CountUp to={x.v} duration={1.5} separator="." />
                    <span className="text-[#a8d4b8]">{x.s ?? ""}</span>
                  </p>
                  <p className="mt-1 text-[11px] tracking-[0.06em] text-white/40 uppercase">{x.l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface p-7">
            <p className="font-mono text-[10px] tracking-[0.2em] text-[#a8d4b8] uppercase">Miring</p>
            <h3 className="mt-1 text-[17px] font-semibold text-white">Kartu yang mengikuti kursor</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-white/45">
              Kartu miring mengikuti arah kursor, seperti memegang foto — kupakai untuk pratinjau karya.
            </p>
            <div className="mt-5 grid place-items-center">
              <TiltedCard
                imageSrc="/assets/projects/lumawall/01-dashboard.png"
                altText="LumaWall dashboard"
                captionText="LumaWall — 58 rilis"
                containerHeight="240px"
                containerWidth="380px"
                imageHeight="240px"
                imageWidth="380px"
                rotateAmplitude={14}
                scaleOnHover={1.06}
                showMobileWarning={false}
                showTooltip
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
