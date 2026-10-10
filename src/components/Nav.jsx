import { useEffect, useState } from "react";
import { Menu, X, Github } from "lucide-react";
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
    <header className="fixed top-5 right-0 left-0 z-50 px-6">
      <nav
        className={`mx-auto flex max-w-[1324px] items-center justify-between rounded-[14px] px-2 py-2 pl-5 transition-all duration-500 ${
          scrolled
            ? "border border-white/[0.07] bg-[#0a0a0a]/45 shadow-[0_8px_32px_rgba(0,0,0,.28),inset_0_.5px_0_rgba(255,255,255,.08)] backdrop-blur-2xl backdrop-saturate-150"
            : "border border-transparent"
        }`}
      >
        <a href="#atas" className="flex items-center gap-3">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 font-mono text-[13px] font-bold text-white">
            AO
          </span>
          <span className="hidden text-[15px] font-medium sm:block">
            <ShinyText text={owner.name} speed={6} color="#a1a1aa" shineColor="#fff" />
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative rounded-lg px-3.5 py-2 text-[14px] transition-colors ${
                active === l.href ? "text-white" : "text-white/50 hover:text-white/85"
              }`}
            >
              {l.label}
              {active === l.href && <span className="absolute inset-x-3.5 bottom-1 h-px bg-[#ffffff]" />}
            </a>
          ))}
          <a
            href={owner.github}
            target="_blank"
            rel="noreferrer noopener"
            className="ml-2 inline-flex items-center gap-2 rounded-full bg-[#ffffff] px-4 py-2 text-[14px] font-medium text-white transition-opacity hover:opacity-90"
          >
            <Github size={15} /> GitHub
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.05] text-white md:hidden"
          aria-label="Menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div className="surface-ghost mx-auto mt-2 max-w-[1324px] rounded-[14px] p-3 md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-4 py-3 text-[14px] text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a
            href={owner.github}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => setOpen(false)}
            className="mt-1 flex items-center gap-2 rounded-xl bg-[#ffffff]/15 px-4 py-3 text-[14px] text-[#d4d4d8]"
          >
            <Github size={15} /> github.com/ArielOsaze
          </a>
        </div>
      )}
    </header>
  );
}
