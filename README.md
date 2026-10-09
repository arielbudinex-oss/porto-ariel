# Porto Ariel — Portofolio Ariel Osaze

Portofolio interaktif yang merangkum **8 proyek nyata** yang dibangun dari nol sampai produksi — dari marketplace pembayaran, gateway pesan multi-akun, wallpaper engine GPU, sampai aplikasi desktop pembukuan pajak.

## Isi halaman

| Bagian | Isi |
|---|---|
| **Hero** | Terminal hidup berisi daftar produk live + statistik yang menghitung naik (8 proyek, 265rb+ baris, 4 produk live, 265+ skrip uji) |
| **Proyek** | 8 kartu proyek yang bisa dibuka: konteks, daftar fitur bernomor, metrik terukur, bukti, galeri screenshot asli, dan slider sebelum/sesudah |
| **Keahlian** | 49 teknologi di 6 bidang, dihimpun dari `package.json` & source code semua proyek |
| **Lab Efek** | 20 efek bergaya ReactBits Pro yang ditulis ulang dari nol + komponen ReactBits open-source |
| **Perjalanan** | Linimasa 5 tahap dari eksperimen sampai produk produksi |
| **Kontak** | Kartu stiker yang bisa diseret (fisika pegas) |

## Efek & animasi

Halaman ini memakai **semua 215 komponen animasi ReactBits** (open-source) yang disalin ke `src/components/rb/`, plus **20 efek bergaya ReactBits Pro** di `src/components/pro/` yang ditulis ulang sendiri dari nol (canvas, WebGL, CSS) — karena katalog Pro berlisensi tidak bisa di-install tanpa membeli.

### 20 efek Pro-mirror (karya sendiri)

| # | Komponen | Meniru efek Pro | Teknik |
|---|---|---|---|
| 1 | `CipherReveal` | Cipher Reveal | requestAnimationFrame + charset |
| 2 | `SpeedText` | Speeding Text | IntersectionObserver + easing |
| 3 | `StarfieldWarp` | Lightspeed | Canvas 2D proyeksi 3D |
| 4 | `HalftoneCursor` | Halftone Reveal | Canvas grid + falloff |
| 5 | `GlowBorder` | Frame Border | CSS radial-gradient + mask |
| 6 | `ElasticSticker` | Elastic Sticker | pointer events + pegas CSS |
| 7 | `PixelDissolve` | Pixel Transition | grid sel + delay acak |
| 8 | `OrbitRing` | Orbit Reel | CSS 3D transform |
| 9 | `BlinkingGrid` | Blinking Squares | grid + keyframes |
| 10 | `ComparisonSlider` | Comparison Slider | pointer drag |
| 11 | `Preloader` | Preloader | progres aset |
| 12 | `SpotlightCard` | Shader Card | tilt 3D + spotlight |
| 13 | `DottedGlobe` | Globe | fibonacci sphere + busur |
| 14 | `LightDroplets` | Light Droplets | Canvas 2D hujan cahaya |
| 15 | `NeonReveal` | Neon Reveal | keyframes kedip tak beraturan |
| 16 | `GradientBars` | Gradient Bars | CSS transform wave |
| 17 | `TextCube` | Text Cube | CSS 3D kubus |
| 18 | `TumbleWall` | Tumble Wall | fisika gravitasi + pantulan + drag |
| 19 | `DepthCarousel` | Depth Carousel | rel 3D + auto-advance |
| 20 | `MosaicWaves` | Mosaic Waves | grid + delay gelombang |

## Teknologi

React 19 · Vite 7 · Tailwind CSS 4 · GSAP · Motion · Three.js · OGL · Lenis · ReactBits

## Menjalankan

```bash
npm install
npm run dev      # pengembangan
npm run build    # produksi
npm run preview  # pratinjau hasil build
```

## Struktur

```
src/
  components/
    rb/            # 215 komponen ReactBits open-source (JS + Tailwind)
    pro/           # 20 efek Pro-mirror (karya sendiri)
    Nav.jsx        # navigasi + indikator seksi aktif
    Hero.jsx       # pembuka + terminal
    Projects.jsx   # 8 kartu proyek detail
    Skills.jsx     # keahlian + prinsip
    Lab.jsx        # lab efek animasi
    Sections.jsx   # perjalanan + kontak + footer
  data/projects.js # semua data proyek (diukur dari source code)
public/
  assets/projects/ # screenshot asli tiap proyek
  assets/fonts/    # font lokal (tanpa CDN)
```

## Catatan kejujuran

Semua angka di halaman ini **diukur dari source code proyek** (jumlah baris file, migrasi SQL, skrip uji, jumlah rilis) — bukan estimasi. Setiap klaim fitur punya bukti yang bisa diverifikasi di repositori masing-masing proyek.

---

Dibangun oleh [Ariel Osaze](https://github.com/ArielOsaze).
