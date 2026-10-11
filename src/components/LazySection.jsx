import { Suspense, lazy, useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// LazySection — hanya merender (dan memuat JS) isinya saat pengunjung mendekat.
// Dipakai untuk section berat seperti Lab Efek (24 komponen WebGL) supaya
// halaman pertama tetap ringan. Placeholder-nya mempertahankan tinggi supaya
// tidak ada lompatan layout.
// ─────────────────────────────────────────────────────────────────────────────
export function LazySection({ children, minHeight = 600, rootMargin = "900px" }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} style={show ? undefined : { minHeight }}>
      {show ? <Suspense fallback={<div style={{ minHeight }} />}>{children}</Suspense> : null}
    </div>
  );
}

// LazyLab — Lab Efek dipecah jadi chunk sendiri, dimuat saat hampir terlihat.
export const LazyLab = lazy(() => import("./Lab"));
