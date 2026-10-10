import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Lenis from "lenis";

import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Lab from "./components/Lab";
import { Journey, Contact, Footer } from "./components/Sections";
import { Preloader } from "./components/pro/ProMirror";
import ClickSpark from "./components/rb/Animations/ClickSpark/ClickSpark";
import TargetCursor from "./components/rb/Animations/TargetCursor/TargetCursor";

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
    <ClickSpark
      sparkColor="#9db2ff"
      sparkSize={18}
      sparkRadius={28}
      sparkCount={10}
      duration={520}
      extraScale={1.35}
    >
      <TargetCursor
        spinDuration={2.2}
        hideDefaultCursor={false}
        hoverDuration={0.25}
        parallaxOn
        cursorColor="#9db2ff"
        cursorColorOnTarget="#5b7cfa"
      />
      <div className="grain relative min-h-screen">
        {loading && <Preloader onDone={() => setLoading(false)} />}
        <Nav />
        <main>
          <Hero />
          <Projects />
          <Experience />
          <Skills />
          <Lab />
          <Journey />
          <Contact />
        </main>
        <Footer />
      </div>
    </ClickSpark>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
