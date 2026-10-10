# Porto Ariel — Portofolio Ariel Osaze Koinda Budi

Portofolio interaktif yang merangkum **8 proyek nyata** yang dibangun dari nol sampai produksi — dari marketplace pembayaran, gateway pesan multi-akun, wallpaper engine GPU, sampai aplikasi desktop pembukuan pajak.

Live: **https://www.arielbudi.web.id**

## Isi halaman

| Bagian | Isi |
|---|---|
| **Hero** | Terminal hidup berisi daftar produk live + statistik yang menghitung naik (8 proyek, 265rb+ baris, 4 produk live, 265+ skrip uji) |
| **Proyek** | 8 kartu proyek yang bisa dibuka: konteks, daftar fitur bernomor, metrik terukur, bukti, galeri screenshot asli, dan slider sebelum/sesudah |
| **Keahlian** | 49 teknologi di 6 bidang, dihimpun dari `package.json` & source code semua proyek, dengan baris logo berjalan |
| **Lab Efek** | 14 efek latar/partikel/teks yang berjalan sungguhan + komponen interaktif |
| **Perjalanan** | Linimasa 5 tahap dari eksperimen sampai produk produksi |
| **Kontak** | Kartu stiker yang bisa diseret (fisika pegas) |

## Efek & animasi

Semua animasi di halaman ini berjalan sungguhan — canvas 2D, WebGL (OGL/Three.js), dan CSS murni. Tidak ada video latar atau gambar animasi; setiap efek adalah komponen React yang bisa dipakai ulang.

Efek yang tampil di bagian **Lab Efek**: Aurora, Particles, Letter Glitch, Orb, Hyperspeed, Balatro, Dark Veil, Light Rays, Threads, Beams, Silk, Iridescence, Galaxy, dan Dot Grid — ditambah Spotlight Card, Decrypted Text, Glitch Text, Star Border, Count Up, dan Tilted Card.

Komponen animasi disimpan sebagai kode sumber di dalam repo (bukan paket eksternal), sehingga bisa disesuaikan penuh:

```
src/components/rb/     # 215 komponen animasi siap pakai
src/components/pro/    # efek tambahan yang ditulis sendiri dari nol
```

## Palet & tipografi

| Peran | Nilai |
|---|---|
| Latar utama | `#120f17` |
| Permukaan kartu | `#1b1722` |
| Garis batas | `#2f293a` |
| Aksen utama | `#a855f7` |
| Aksen lembut | `#c7a0ff` |
| Teks utama | `#ffffff` |
| Teks redup | `#aaa` |
| Font | **Geist** (sans) & **Geist Mono** — dimuat lokal dari `public/assets/fonts/`, tanpa CDN |

Prinsipnya: satu aksen dipakai hemat, tombol primer putih solid, sisanya hitam-putih-abu.

## Teknologi

React 19 · Vite 7 · Tailwind CSS 4 · GSAP · Motion · Three.js · OGL · Lenis

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
    rb/            # 215 komponen animasi siap pakai
    pro/           # efek tambahan (karya sendiri)
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

Dibangun oleh [Ariel Osaze Koinda Budi](https://github.com/ArielOsaze).
