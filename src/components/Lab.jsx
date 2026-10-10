import { owner } from "../data/projects";
import GlitchText from "./rb/TextAnimations/GlitchText/GlitchText";
import GradientText from "./rb/TextAnimations/GradientText/GradientText";
import DecryptedText from "./rb/TextAnimations/DecryptedText/DecryptedText";
import CountUp from "./rb/TextAnimations/CountUp/CountUp";
import StarBorder from "./rb/Animations/StarBorder/StarBorder";
import SpotlightCard from "./rb/Components/SpotlightCard/SpotlightCard";
import TiltedCard from "./rb/Components/TiltedCard/TiltedCard";
import Aurora from "./rb/Backgrounds/Aurora/Aurora";
import Particles from "./rb/Backgrounds/Particles/Particles";
import LetterGlitch from "./rb/Backgrounds/LetterGlitch/LetterGlitch";
import Orb from "./rb/Backgrounds/Orb/Orb";
import Hyperspeed from "./rb/Backgrounds/Hyperspeed/Hyperspeed";
import Balatro from "./rb/Backgrounds/Balatro/Balatro";
import DarkVeil from "./rb/Backgrounds/DarkVeil/DarkVeil";
import LightRays from "./rb/Backgrounds/LightRays/LightRays";
import Threads from "./rb/Backgrounds/Threads/Threads";
import Beams from "./rb/Backgrounds/Beams/Beams";
import Silk from "./rb/Backgrounds/Silk/Silk";
import Iridescence from "./rb/Backgrounds/Iridescence/Iridescence";
import Galaxy from "./rb/Backgrounds/Galaxy/Galaxy";
import DotGrid from "./rb/Backgrounds/DotGrid/DotGrid";
import { Radio, Sparkles, Move3d, Layers3 } from "lucide-react";

const CARDS = [
  { kicker: "Latar", title: "Aurora", desc: "Cahaya utara bergelombang dengan warna yang mengalir pelan.", C: Aurora, span: "lg:col-span-2", props: { colorStops: ["#22d3ee", "#0891b2", "#67e8f9"], amplitude: 1.0, blend: 0.5 } },
  { kicker: "Partikel", title: "Particles", desc: "Partikel 3D yang bergerak lembut dan bereaksi pada kursor.", C: Particles, props: { particleCount: 180, particleSpread: 12, speed: 0.08, particleColors: ["#67e8f9", "#22d3ee", "#ffffff"], moveParticlesOnHover: true, particleBaseSize: 90, alphaParticles: true } },
  { kicker: "Teks", title: "Letter Glitch", desc: "Grid huruf yang berkedip acak seperti sinyal rusak.", C: LetterGlitch, props: { glitchColors: ["#0e7490", "#22d3ee", "#67e8f9"], glitchSpeed: 60, smooth: true, outerVignette: true } },
  { kicker: "Latar", title: "Orb", desc: "Bola energi yang berdenyut dan bereaksi pada kursor.", C: Orb, props: { hue: 187, hoverIntensity: 0.4, rotateOnHover: true, backgroundColor: "#0a0d10" } },
  { kicker: "Latar", title: "Hyperspeed", desc: "Terowongan cahaya melaju seperti lompatan antar bintang.", C: Hyperspeed, span: "lg:col-span-2" },
  { kicker: "Latar", title: "Balatro", desc: "Pola fraktal berputar dengan kontras tinggi.", C: Balatro, props: { color1: "#22d3ee", color2: "#0a0d10", color3: "#67e8f9", speed: 0.6, spinAmount: 0.6, contrast: 3.2 } },
  { kicker: "Latar", title: "Dark Veil", desc: "Tirai gelap bergelombang yang bergerak perlahan.", C: DarkVeil, props: { hueShift: 187, speed: 0.5 } },
  { kicker: "Latar", title: "Light Rays", desc: "Berkas cahaya dari atas yang mengikuti kursor.", C: LightRays, props: { raysOrigin: "top-center", raysColor: "#67e8f9", raysSpeed: 0.8, lightSpread: 1.1, rayLength: 1.6, followMouse: true, pulsating: false } },
  { kicker: "Latar", title: "Threads", desc: "Benang-benang halus yang mengalir seperti kain.", C: Threads, props: { color: [0.13, 0.83, 0.93], amplitude: 1.4, distance: 0.4, lineCount: 70, thickness: 0.7, speed: 0.5 } },
  { kicker: "Latar", title: "Beams", desc: "Balok cahaya bersilangan dengan noise halus.", C: Beams, props: { beamWidth: 2.2, beamHeight: 16, beamNumber: 10, lightColor: "#d4d4d8", beamColor: "#ffffff", backgroundColor: "#0a0d10", speed: 2, noiseIntensity: 1.6, scale: 0.22 } },
  { kicker: "Latar", title: "Silk", desc: "Kain sutra yang bergelombang lembut.", C: Silk, props: { speed: 3, scale: 1.1, color: "#ffffff", noiseIntensity: 1.2 } },
  { kicker: "Latar", title: "Iridescence", desc: "Warna pelangi tipis yang berpendar seperti minyak.", C: Iridescence, props: { color: [0.13, 0.83, 0.93], speed: 0.9, amplitude: 0.12 } },
  { kicker: "Latar", title: "Galaxy", desc: "Galaksi berputar dengan bintang-bintang kecil.", C: Galaxy, props: { hueShift: 187, density: 1.1, speed: 0.8 } },
  { kicker: "Interaktif", title: "Dot Grid", desc: "Titik-titik yang memantul mengikuti gerak kursor.", C: DotGrid, props: { dotSize: 3, gap: 22, baseColor: "#232b33", activeColor: "#ffffff", proximity: 110, shockRadius: 220, resistance: 750, returnDuration: 1.4 } },
];

export default function Lab() {
  return (
    <section id="lab" className="relative overflow-hidden py-28">
      <div className="mx-auto max-w-[1324px] px-6">
        <header className="mb-12 max-w-3xl">
          <p className="mb-3 font-mono text-xs tracking-[0.3em] text-[#67e8f9] uppercase">04 — Lab Efek</p>
          <h2 className="text-4xl font-bold tracking-[-0.02em] md:text-5xl">
            <GradientText
              colors={["#fff", "#a1a1aa", "#d4d4d8", "#fff"]}
              animationSpeed={8}
              className="text-4xl font-bold md:text-5xl"
            >
              Efek animasi
            </GradientText>{" "}
            <span className="text-white">yang kupakai di halaman ini.</span>
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-white/50">
            Semua efek di bawah berjalan sungguhan — canvas, WebGL, dan CSS. Ditulis sebagai komponen
            lepas supaya bisa dipakai ulang di proyek lain tanpa ketergantungan berat.
          </p>
        </header>

        {/* grid efek */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((c, i) => {
            const Comp = c.C;
            return (
              <article
                key={c.title}
                className={`surface group relative overflow-hidden transition-colors duration-300 hover:border-[#22d3ee]/30 ${c.span ?? ""}`}
              >
                <div className="flex items-start justify-between gap-3 p-5 pb-3">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.2em] text-[#67e8f9] uppercase">{c.kicker}</p>
                    <h3 className="mt-1 text-[17px] font-semibold text-white">{c.title}</h3>
                  </div>
                  <span className="rounded-lg border border-[#232b33] bg-[#0a0d10] p-1.5 text-white/40">
                    {i % 4 === 0 ? <Radio size={13} /> : i % 4 === 1 ? <Move3d size={13} /> : i % 4 === 2 ? <Layers3 size={13} /> : <Sparkles size={13} />}
                  </span>
                </div>

                <div className="relative mx-5 mb-3 h-52 overflow-hidden rounded-[10px] border border-[#232b33] bg-[#0f0f0f]">
                  <div className="absolute inset-0">
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
          <SpotlightCard
            className="surface rounded-[14px]"
            spotlightColor="rgba(168,85,247,0.22)"
            intensity={0.4}
          >
            <div className="p-6">
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#67e8f9] uppercase">Interaktif</p>
              <h3 className="mt-1 text-[17px] font-semibold text-white">Spotlight Card</h3>
              <p className="mt-2 text-[13px] text-white/45">
                Sorotan lembut mengikuti kursor di permukaan kartu.
              </p>
            </div>
          </SpotlightCard>

          <div className="surface p-6">
            <p className="font-mono text-[10px] tracking-[0.2em] text-[#67e8f9] uppercase">Teks</p>
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
              <StarBorder as="span" color="#ffffff" speed="4s" thickness={1}>
                <span className="px-3 py-1.5 font-mono text-[11px] text-[#67e8f9]">Star Border</span>
              </StarBorder>
              <span className="rounded-lg border border-[#232b33] bg-[#0a0d10] px-3 py-1.5 font-mono text-[11px] text-white/45">
                215 komponen animasi
              </span>
            </div>
          </div>

          <div className="surface p-6">
            <p className="font-mono text-[10px] tracking-[0.2em] text-[#67e8f9] uppercase">Menyala</p>
            <h3 className="mt-1 text-[17px] font-semibold text-white">Glitch Text</h3>
            <div className="mt-4 grid place-items-center py-2">
              <GlitchText speed={1.3} enableShadows enableOnHover={false} className="text-2xl font-bold">
                PORTOFOLIO
              </GlitchText>
            </div>
            <p className="mt-3 text-center text-[13px] text-white/45">
              Huruf bergetar dengan bayangan merah-biru.
            </p>
          </div>
        </div>

        {/* baris angka & kartu miring */}
        <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
          <div className="surface flex flex-col justify-center p-7">
            <p className="font-mono text-[10px] tracking-[0.2em] text-[#67e8f9] uppercase">Hitungan</p>
            <h3 className="mt-1 text-[17px] font-semibold text-white">Angka yang naik</h3>
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
                    <span className="text-[#22d3ee]">{x.s ?? ""}</span>
                  </p>
                  <p className="mt-1 text-[11px] tracking-[0.06em] text-white/40 uppercase">{x.l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="surface p-7">
            <p className="font-mono text-[10px] tracking-[0.2em] text-[#67e8f9] uppercase">Miring</p>
            <h3 className="mt-1 text-[17px] font-semibold text-white">Kartu yang mengikuti kursor</h3>
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
