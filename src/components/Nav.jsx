import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { owner } from "../data/projects";
import ShinyText from "./rb/TextAnimations/ShinyText/ShinyText";

const LINKS = [
  { href: "#proyek", label: "Proyek" },
  { href: "#keahlian", label: "Keahlian" },
  { href: "#lab", label: "Lab Efek" },
  { href: "#cara-kerja", label: "Cara Kerja" },
  { href: "#kontak", label: "Kontak" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong py-2.5" : "py-4"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8">
        <a href="#atas" className="group flex items-center gap-3">
          <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl border border-line bg-ink-2 font-display text-sm font-bold text-neon">
            AO
            <span className="absolute inset-0 shimmer" />
          </span>
          <span className="hidden font-display text-sm font-semibold tracking-wide sm:block">
            <ShinyText text="Ariel Osaze" speed={4} color="#8b93a7" shineColor="#e8ecf4" />
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                active === l.href ? "text-neon" : "text-mist hover:text-frost"
              }`}
            >
              {l.label}
              {active === l.href && (
                <span className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-neon to-transparent" />
              )}
            </a>
          ))}
          <a
            href={owner.github}
            target="_blank"
            rel="noreferrer noopener"
            className="ml-2 rounded-full border border-neon/30 bg-neon/10 px-4 py-2 text-sm text-neon transition-colors hover:bg-neon/20"
          >
            GitHub
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-ink-2/70 text-frost md:hidden"
          aria-label="Menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div className="glass-strong mx-4 mt-2 rounded-2xl p-3 md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm text-mist transition-colors hover:bg-ink-3 hover:text-frost"
            >
              {l.label}
            </a>
          ))}
          <a
            href={owner.github}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => setOpen(false)}
            className="mt-1 block rounded-xl bg-neon/10 px-4 py-3 text-sm text-neon"
          >
            GitHub — ArielOsaze
          </a>
        </div>
      )}
    </header>
  );
}
