import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Lenis from "lenis";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import { LazySection, LazyLab } from "./components/LazySection";
import { Journey, Contact, Footer } from "./components/Sections";
import { Preloader } from "./components/pro/ProMirror";
import ClickSpark from "./components/rb/Animations/ClickSpark/ClickSpark";
import GlowCursor from "./components/rb/Animations/GlowCursor/GlowCursor";
import { EasterEgg } from "./components/Interactive";

function App() {
  const [loading, setLoading] = useState(true);

  // ── smooth scroll ────────────────────────────────────────────────────────
  useEffect(() => {
    if (loading) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1 });
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // jangkar tetap bekerja dengan Lenis
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const el = document.querySelector(a.getAttribute("href"));
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el, { offset: -80 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, [loading]);

  return (
    <>
      <ClickSpark
        sparkColor="#9db2ff"
        sparkSize={18}
        sparkRadius={28}
        sparkCount={10}
        duration={520}
        extraScale={1.35}
      >
        <div className="pointer-events-none fixed inset-0 z-[90]">
          <GlowCursor
            color="#5b7cfa"
            secondaryColor="#9db2ff"
            trailLength={46}
            trailWidth={7}
            followSpeed={0.18}
            glowIntensity={1.6}
            glowSpread={1.1}
            brightness={1.15}
            pulseSpeed={0.9}
            noiseStrength={0.03}
            idleFade
            idleTimeout={500}
            fadeDuration={700}
            maxDevicePixelRatio={1}
            opacity={0.9}
            blendMode="screen"
          />
        </div>
        <div className="grain relative min-h-screen">
          {loading && <Preloader onDone={() => setLoading(false)} />}
          <Nav />
          <main>
            <Hero />
            <Projects />
            <Experience />
            <Skills />
            <LazySection minHeight={1400}>
              <LazyLab />
            </LazySection>
            <Journey />
            <Contact />
          </main>
          <Footer />
          <EasterEgg />
        </div>
      </ClickSpark>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
