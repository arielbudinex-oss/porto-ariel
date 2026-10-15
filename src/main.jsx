import { StrictMode, useEffect } from "react";
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
import { EasterEgg } from "./components/Interactive";

function App() {
  // ── smooth scroll (dilewati bila pengguna memilih gerak minimal) ─────────
  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

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
  }, []);

  return (
    <div className="relative min-h-screen">
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
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
