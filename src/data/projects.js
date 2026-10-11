// ─────────────────────────────────────────────────────────────────────────────
// Data lengkap semua proyek, dihimpun langsung dari source code di mesin ini.
// Semua angka diverifikasi (jumlah baris, file, migrasi, rilis) bukan estimasi.
// ─────────────────────────────────────────────────────────────────────────────

export const owner = {
  name: "Ariel Osaze Koinda Budi",
  short: "Ariel Osaze Koinda Budi",
  role: "Founder & Product Engineer di Xinet.id",
  location: "Indonesia",
  email: "arielbudi4@gmail.com",
  github: "https://github.com/ArielOsaze",
  linkedin: "https://www.linkedin.com/in/ariel-osaze-koinda-budi-991b5a284",
  xinet: "Xinet.id. Build what's next",
  tagline:
    "Membangun produk digital yang benar-benar dipakai, dari marketplace pembayaran, gateway pesan multi-akun, sampai aplikasi desktop pembukuan pajak.",
  bio: [
    "Aku membangun produk dari nol sampai produksi: backend, frontend, database, deployment, sampai halaman jualannya. Semua proyek di bawah ini berjalan nyata, punya pengguna, transaksi, dan server yang harus tetap hidup.",
    "Cara kerjaku: ukur, bukan menebak. Setiap perbaikan punya bukti, skrip uji otomatis, screenshot piksel, atau angka pengukuran. Kalau sebuah klaim tidak bisa diukur, itu belum selesai.",
  ],
  about:
    "Founder & Owner Xinet.id, perusahaan produk digital yang membangun produk teknologi mandiri di bidang commerce, komunikasi, alat bisnis, otomasi, dan AI. Fokus: strategi produk, arsitektur sistem, pengembangan, integrasi API, desain basis data, keamanan, deployment, dan UI/UX. Pengalaman gabungan: operasi & manajemen aset, pemasaran, perencanaan strategis, dan pengembangan teknologi, berfokus menyelesaikan masalah praktis dengan produk yang berguna, skalabel, dan aman.",
  education: {
    school: "Universitas Terbuka",
    degree: "Manajemen. Business Administration and Management",
    period: "Feb 2026 – Jun 2030",
    gpa: "3,53 / 4,00",
    note: "Menyelesaikan 18 SKS dengan IPK semester 3,53. Mempelajari Manajemen, Dasar Bisnis, Studi Organisasi, dan Bahasa Inggris.",
  },
};

// ── Pengalaman kerja (dari profil profesional) ───────────────────────────────
export const experience = [
  {
    role: "Founder & Owner",
    org: "Xinet.id",
    period: "Feb 2023 – sekarang",
    location: "Semarang, Jawa Tengah · Remote",
    desc: "Perusahaan produk digital: commerce, komunikasi, alat bisnis, otomasi, dan AI. Strategi produk, arsitektur sistem, pengembangan, integrasi API, desain basis data, keamanan, deployment, dan UI/UX.",
    tags: ["Product Strategy", "System Architecture", "Full-Stack Development"],
    highlight: true,
  },
  {
    role: "Founder & Product Engineer",
    org: "NexShop",
    period: "Jul 2026 – sekarang",
    location: "Indonesia · Remote",
    desc: "Membangun dan memimpin pengembangan NexShop, platform commerce digital untuk produk digital, pembayaran, dan layanan reseller.",
    tags: ["Product Development", "Full-Stack Development", "Payment Integration"],
    highlight: true,
  },
  {
    role: "Software Engineer",
    org: "AkunTuntas",
    period: "Sep 2026 – sekarang",
    location: "Surakarta, Jawa Tengah · On-site",
    desc: "Membangun sistem pembukuan & pajak yang sepenuhnya offline untuk bisnis Indonesia, penjualan, pembelian, arus kas, jurnal, dan laporan keuangan dalam satu aplikasi.",
    tags: ["Software Development", "Product Development"],
    highlight: true,
  },
  {
    role: "Asset Management Specialist",
    org: "PT Pusat Gadai Indonesia",
    period: "Sep 2024 – sekarang",
    location: "Jawa Tengah, Indonesia · Kontrak",
    desc: "Manajemen gudang dan layanan pelanggan di industri pegadaian: penyimpanan aset, perawatan, kepatuhan audit, dan efisiensi operasional harian.",
    tags: ["Asset Management", "Operational Compliance", "Customer Service"],
  },
  {
    role: "Ex Branch Marketing",
    org: "Deltalube",
    period: "Mei 2023 – Des 2023",
    location: "Indonesia",
    desc: "Pemasaran cabang: akuisisi pelanggan, kualitas layanan, membangun hubungan, dan mendukung pertumbuhan bisnis.",
    tags: ["Marketing", "Customer Acquisition"],
  },
];

// ── Top skills (dari profil profesional) ────────────────────────────────────
export const topSkills = [
  "Full-Stack Development",
  "Product Management",
  "System Architecture",
  "Strategic Planning for Growth",
  "Problem Solving",
  "Strategic Asset Management",
  "Payment Integration",
  "API Integration",
  "Database Design",
  "UI/UX Improvement",
  "Security & Deployment",
  "Growth Marketing",
];

export const stats = [
  { label: "Proyek nyata", value: 7, suffix: "" },
  { label: "Baris kode ditulis", value: 265, suffix: "rb+" },
  { label: "Produk live", value: 4, suffix: "" },
  { label: "Skrip uji otomatis", value: 265, suffix: "+" },
];

// ── Stack skill, dihimpun dari package.json & source semua proyek ────────────
export const skills = {
  "Backend & API": [
    "Node.js", "Express 5", "TypeScript", "Python 3.11", "C# / .NET 4.8",
    "REST API", "JWT Auth", "BullMQ", "Redis", "Webhook Relay",
  ],
  "Frontend": [
    "React 19", "Next.js", "Vite", "Tailwind CSS 4", "GSAP",
    "Motion (Framer)", "Three.js", "OGL / WebGL", "Lenis", "Canvas 2D",
  ],
  "Database": [
    "PostgreSQL", "Supabase", "SQLite", "Redis", "35+ migrasi SQL",
  ],
  "Infrastruktur": [
    "Nginx", "Docker", "VPS + pm2", "Vercel", "GitHub Actions", "Linux",
  ],
  "Keamanan": [
    "AES-256-GCM", "bcrypt", "CSP + hash", "Rate limiting", "Cloudflare Turnstile",
    "2FA / OTP", "Face Recognition", "Enkripsi dokumen KYC", "Hash-chain audit",
  ],
  "Integrasi & AI": [
    "iPaymu (QRIS/VA)", "TokoVoucher", "Baileys (WhatsApp)", "GramJS (Telegram)",
    "Google OAuth", "Gemini", "Groq", "OpenRouter", "RAG knowledge base",
  ],
};

// ── Semua proyek ─────────────────────────────────────────────────────────────
export const projects = [
  {
    id: "nexshop",
    name: "NexShop",
    tag: "Marketplace Digital & Top-Up",
    url: "https://nexshop.cloud",
    github: "https://github.com/ArielOsaze/NEXSHOP_ALL",
    accent: "#38bdf8",
    accent2: "#7dd3fc",
    blurb:
      "Marketplace top-up game & produk digital dengan pembayaran iPaymu, program reseller berjenjang, verifikasi KYC terenkripsi, dan asisten AI yang membaca katalog harga live.",
    role: "Full-stack, arsitektur, backend, frontend, keamanan, deployment",
    status: "Live di produksi",
    story:
      "NexShop adalah proyek terbesar: toko digital yang memproses pembayaran sungguhan lewat iPaymu (QRIS & VA), melayani reseller dengan harga berjenjang, dan punya portal berita editorial 309 artikel. Backend Express 5 melayani 31 controller dan 35 service di atas Supabase Postgres dengan 35 migrasi SQL. Semua alur uang (checkout, webhook, refund) dijaga jejak audit.",
    metrics: [
      { value: "52.868", label: "baris backend" },
      { value: "100.827", label: "baris frontend" },
      { value: "35", label: "migrasi SQL" },
      { value: "221", label: "skrip uji" },
    ],
    features: [
      {
        title: "Pembayaran iPaymu penuh",
        desc: "Checkout QRIS & Virtual Account, polling status pembayaran, webhook tervalidasi, dan halaman status publik per pesanan. Nominal dicocokkan sampai sen terakhir sebelum pesanan dianggap lunas.",
      },
      {
        title: "Program reseller berjenjang",
        desc: "Harga reseller dihitung saat request dari tabel tier (tidak pernah disimpan per produk), dengan lantai harga agar tidak pernah jatuh di bawah harga pokok + 1% margin.",
      },
      {
        title: "KYC terenkripsi AES-256-GCM",
        desc: "Foto KTP pendaftar reseller dienkripsi sebelum disimpan ke bucket privat; hanya admin terverifikasi bisa membuka lewat endpoint ber-audit. Sistem menolak menyimpan (503) bila kunci enkripsi belum di-set, lebih baik tertahan daripada identitas bocor.",
      },
      {
        title: "NexBot, asisten AI harga live",
        desc: "Bot menjawab dari lima sumber berurutan: kontak, kalkulator budget, pencarian pesanan, katalog harga live, lalu basis pengetahuan RAG. Harga tidak pernah ditulis di teks pengetahuan, selalu dibaca dari database saat itu juga, karena model kecil gemar mengarang angka.",
      },
      {
        title: "Webhook Relay TokoVoucher",
        desc: "Karena TokoVoucher hanya menerima satu URL callback per akun, relay menerima sekali lalu meneruskan ke semua toko terdaftar dengan antrean + retry. Forwarding tidak pernah memblokir balasan 200 ke pengirim.",
      },
      {
        title: "Mode uji pesanan ber-audit",
        desc: "Pemilik toko bisa menguji alur checkout tanpa menyentuh data operasional: tidak memanggil payment gateway, tidak muncul di statistik/publik. Tapi setiap aksinya justru paling ketat, terikat hash-chain ke baris sebelumnya.",
      },
      {
        title: "Portal berita editorial",
        desc: "309 artikel berita orisinal dengan halaman artikel SSR, sitemap, dan struktur SEO lengkap, dibangun dan dibersihkan lewat 8 iterasi audit antarmuka.",
      },
      {
        title: "Keamanan berlapis",
        desc: "Rate limiting per endpoint, CSP dengan hash inline script, Turnstile captcha, 2FA reseller, deteksi anomali, dan net-monitor yang mengawasi koneksi jaringan server.",
      },
    ],
    stack: [
      "Node.js", "Express 5", "Supabase", "PostgreSQL", "JWT", "bcrypt",
      "iPaymu", "TokoVoucher", "Nginx", "Tailwind CSS", "Gemini/Groq/OpenRouter", "Puppeteer",
    ],
    screenshots: [
      { src: "/assets/projects/nexshop/01-admin.webp", caption: "Dashboard admin, desain baru, terang dan berbasis kartu" },
      { src: "/assets/projects/nexshop/05-before.webp", caption: "Desain lama, tema gelap, sebelum redesign" },
      { src: "/assets/projects/nexshop/02-admin-mobile.webp", caption: "Versi mobile, tata letak bertumpuk, bukan zoom" },
      { src: "/assets/projects/nexshop/03-staff.webp", caption: "Tampilan staf, peran terpisah dari admin" },
      { src: "/assets/projects/nexshop/04-staff-mobile.webp", caption: "Mobile staf, tata letak menyesuaikan" },
    ],
    compare: {
      before: "/assets/projects/nexshop/05-before.webp",
      after: "/assets/projects/nexshop/01-admin.webp",
      label: "Redesign panel admin, tema gelap lama vs terang baru",
    },
    proof: [
      "221 skrip regtest memverifikasi logika tanpa perlu database",
      "8 iterasi audit UI admin dengan bukti piksel, bukan penilaian mata",
      "Fixture uji memakai angka besar menyerupai data produksi",
    ],
  },
  {
    id: "saybot",
    name: "SayBot Messaging Gateway",
    tag: "Gateway Pesan Multi-Akun",
    url: "https://saybot.nexshop.cloud",
    github: "https://github.com/ArielOsaze/Whatsapp-Gateaway",
    accent: "#f9a9b0",
    accent2: "#f7ce7a",
    blurb:
      "Sistem manajemen pesan multi-akun untuk WhatsApp & Telegram: banyak sesi berjalan paralel, broadcast berantre dengan throttling, dashboard statistik real-time.",
    role: "Full-stack, gateway TypeScript, dashboard Next.js, deployment VPS + Vercel",
    status: "Live di produksi",
    story:
      "SayBot menjalankan banyak akun WhatsApp (Baileys) dan Telegram (GramJS) sekaligus, masing-masing dengan status autentikasi terenkripsi sendiri di Supabase. Broadcast masuk antrean BullMQ/Redis di mode VPS, atau eksekusi langsung di mode Vercel. Dashboard Next.js memberi kendali penuh: buat sesi, hubungkan lewat QR/pairing code, kirim kampanye, dan pantau pengiriman per penerima.",
    metrics: [
      { value: "36.119", label: "baris gateway" },
      { value: "31.485", label: "baris dashboard" },
      { value: "35", label: "modul route" },
      { value: "44", label: "skrip kontrak" },
    ],
    features: [
      {
        title: "Multi-akun terisolasi",
        desc: "Tambah/hapus akun WhatsApp tanpa mengubah kode. Setiap sesi punya state autentikasi terenkripsi sendiri, koneksi independen, dan pengaturan delay/batch/cooldown per sesi.",
      },
      {
        title: "Broadcast anti-spam",
        desc: "Antrean BullMQ dengan throttling global & per-sesi, cooldown per chat, dan proteksi duplikat lintas sesi, satu penerima tidak pernah menerima kampanye yang sama dua kali.",
      },
      {
        title: "Dashboard real-time",
        desc: "Kelola sesi (connect/disconnect/restart/logout), buat broadcast dengan tempel-daftar penerima, jelajahi grup & anggota, dan pantau statistik pengiriman per penerima.",
      },
      {
        title: "Webhook dengan retry",
        desc: "Pengiriman webhook keluar dengan logika retry, rate limiting, dan autentikasi API key, plus health check untuk orkestrasi container.",
      },
      {
        title: "Kontrak desain di CI",
        desc: "Skrip kontrak memverifikasi palet merek (biru #0090f0 / cyan #00c2d4 / latar hitam murni) dan kontrol responsif langsung di pipeline, warna brand tidak bisa bergeser tanpa ketahuan.",
      },
      {
        title: "Perbaikan crash kelas sistem",
        desc: "Ditemukan bahwa satu route async yang melempar error bisa mematikan seluruh proses, dan 93 route berpotensi melakukannya. Semua ditutup, dengan uji regresi yang membuktikan request buruk tidak lagi menjatuhkan proses.",
      },
    ],
    stack: [
      "TypeScript", "Node.js", "Baileys", "GramJS", "Next.js", "Supabase",
      "PostgreSQL", "BullMQ", "Redis", "Docker", "Vercel", "pm2",
    ],
    screenshots: [
      { src: "/assets/projects/saybot/01-og.webp", caption: "Kartu merek SayBot, biru #0090f0 & cyan #00c2d4 yang dikunci kontrak CI" },
    ],
    proof: [
      "44 skrip kontrak & regtest: palet, responsif, inbox, drawer mobile, menu landing",
      "Bukti pemisahan deploy: dashboard ke Vercel, gateway ke VPS lewat SSH + pm2",
      "Uji khusus membedakan restart deploy vs restart crash",
    ],
  },
  {
    id: "lumawall",
    name: "LumaWall",
    tag: "Live Wallpaper Engine Windows",
    url: "https://lumawall.xinet.id",
    github: "https://github.com/ArielOsaze/Lumawall",
    accent: "#ff3b57",
    accent2: "#ff7a8d",
    blurb:
      "Wallpaper video untuk setiap monitor Windows, didekode GPU, bukan CPU. Pause bekerja per-monitor, kembali dalam 4 milidetik. 58 rilis, katalog 5.000+ wallpaper, empat bahasa.",
    role: "Pembuat tunggal, aplikasi C#, situs, sistem pembayaran, distribusi",
    status: "58 rilis · versi 4.5.23",
    story:
      "LumaWall menempatkan wallpaper video di lapisan desktop Windows (WorkerW) untuk setiap monitor, dengan hardware decode (NVDEC/DXVA) dan kompositing DWM. Berbeda dari wallpaper engine lain: pause bekerja per-monitor (game fullscreen di satu layar tidak menghentikan layar lain) dan wallpaper kembali ~4 ms setelah game ditutup karena dipicu event sistem Windows, bukan polling. Riset kompetitor dilakukan serius: dokumen 100+ baris yang membedah perilaku Wallpaper Engine & Lively langsung dari dokumentasi developer dan source code upstream.",
    metrics: [
      { value: "58", label: "rilis berurutan" },
      { value: "5.000+", label: "wallpaper katalog" },
      { value: "4 ms", label: "respons resume" },
      { value: "<1%", label: "CPU 3× 1080p" },
    ],
    features: [
      {
        title: "GPU hardware decode",
        desc: "NVDEC / DXVA mendekode video langsung di GPU, kompositing lewat DWM. Tiga wallpaper 1080p berjalan bersamaan dengan pemakaian CPU di bawah 1%.",
      },
      {
        title: "Pause per-monitor",
        desc: "Fullscreen atau maximized di satu layar hanya menghentikan wallpaper di layar itu. Layar lain tetap hidup, perilaku yang tidak dimiliki wallpaper engine populer.",
      },
      {
        title: "Respons 4 milidetik",
        desc: "Dipicu WinEvent hook dari sistem Windows, bukan polling: terukur 4 ms saat pause dan 1 ms saat resume. Begitu game ditutup, wallpaper sudah berjalan lagi sebelum mata sempat menangkap layar kosong.",
      },
      {
        title: "Pulih sendiri",
        desc: "Explorer restart atau crash? Wallpaper dibangun ulang otomatis dalam kurang dari 4 detik, diuji dengan stress test dan crash explorer yang disengaja.",
      },
      {
        title: "Hemat RAM",
        desc: "Wallpaper statis dirender langsung tanpa WebView2, menghemat sekitar 130 MB per layar dibanding pendekatan web-based.",
      },
      {
        title: "Katalog 5.000+ & empat bahasa",
        desc: "Pencarian, filter, unduhan dengan berkas lisensi per item. Antarmuka tersedia dalam Indonesia, English, 简体中文, dan 日本語.",
      },
      {
        title: "Distribusi lengkap",
        desc: "Installer EXE + paket MSIX (Microsoft Store), versi portable, aset store resmi (BoxArt, HeroArt, PosterArt), dan situs produk dengan sistem pembayaran sendiri.",
      },
    ],
    stack: [
      "C# / .NET Framework 4.8", "WinForms", "WebView2", "NVDEC/DXVA",
      "WinEvent Hooks", "DWM", "MSIX", "Inno Setup", "Vercel Serverless",
    ],
    screenshots: [
      { src: "/assets/projects/lumawall/01-dashboard.webp", caption: "Dashboard, wallpaper unggulan, statistik, dan katalog" },
      { src: "/assets/projects/lumawall/02-catalog.webp", caption: "Katalog 5.000+ wallpaper dengan pencarian & filter" },
      { src: "/assets/projects/lumawall/03-displays.webp", caption: "Manajemen multi-monitor per layar" },
      { src: "/assets/projects/lumawall/04-library.webp", caption: "Pustaka pribadi dengan pengaturan per wallpaper" },
      { src: "/assets/projects/lumawall/05-performance.webp", caption: "Panel performa, kontrol decode & pause" },
    ],
    proof: [
      "Riset kompetitor bertag [DOC]/[DEV]/[SRC], klaim dipisah dari spekulasi",
      "Uji A/B decode dan stress-test flicker tiga display",
      "Versi dinaikkan 58 kali dengan catatan installer dan log uji tersimpan",
    ],
  },
  {
    id: "akuntuntas",
    name: "AkunTuntas",
    tag: "Pembukuan & Pajak Desktop",
    url: "https://akuntuntas.xinet.id",
    github: "https://github.com/ArielOsaze/akuntuntas",
    accent: "#3b6fb5",
    accent2: "#c08a3e",
    blurb:
      "Aplikasi desktop Windows untuk pembukuan dan perpajakan UMKM Indonesia. 100% offline, data tersimpan lokal, dari pembukuan harian sampai SPT.",
    role: "Pembuat tunggal, aplikasi, mode belajar, lisensi, situs penjualan",
    status: "Versi 1.0.0 · Edisi Regulasi 2026",
    story:
      "AkunTuntas dirancang untuk usaha mikro sampai PT: pembukuan lengkap, pajak dasar, dan laporan SAK EMKM, seluruhnya di komputer pengguna. Tidak ada koneksi internet, tidak ada server, tidak ada data yang dikirim ke mana pun. Aplikasi punya dua mode: Pemula (setiap halaman menjelaskan konsep akuntansi dalam bahasa sehari-hari, lengkap dasar hukumnya) dan Ahli (antarmuka ringkas).",
    metrics: [
      { value: "100%", label: "offline, tanpa server" },
      { value: "2", label: "mode: pemula & ahli" },
      { value: "SAK", label: "EMKM compliant" },
      { value: "2026", label: "edisi regulasi" },
    ],
    features: [
      {
        title: "Pembukuan lengkap",
        desc: "Jurnal umum, penjualan, pembelian, biaya & pengeluaran, kas & bank, dengan pemeriksaan keseimbangan (double-entry) yang selalu terlihat statusnya.",
      },
      {
        title: "Perpajakan Indonesia",
        desc: "Estimasi PPh terutang dengan fasilitas Pasal 31E (tarif efektif 11% untuk seluruh PKP), pemantauan ambang wajib PKP Rp4,8 M, dan laporan pajak.",
      },
      {
        title: "Dua mode belajar",
        desc: "Mode Pemula menampilkan panel penjelasan konsep akuntansi & pajak dalam bahasa sehari-hari lengkap dengan contoh dan dasar hukum. Mode Ahli menyembunyikannya.",
      },
      {
        title: "Payroll",
        desc: "Penggajian karyawan terintegrasi dengan pembukuan, satu alur dari absensi sampai jurnal.",
      },
      {
        title: "Privasi total",
        desc: "Data pembukuan tidak pernah meninggalkan komputer. Aktivasi lisensi sekali di awal; setelah aktif, aplikasi berjalan penuh tanpa internet.",
      },
      {
        title: "Lisensi jelas",
        desc: "Sekali bayar berlaku selamanya. Standar Rp3.499.000 (1 perangkat) dan Enterprise Rp5.499.000 (5 perangkat + konsolidasi & pajak lanjutan).",
      },
    ],
    stack: [
      "Python 3.11", "PyInstaller", "SQLite", "Desktop Windows", "Sistem Lisensi", "Offline-first",
    ],
    screenshots: [
      { src: "/assets/projects/akuntuntas/01-dashboard.webp", caption: "Dashboard, omzet, laba, kas, aset, pajak, ekuitas dalam satu layar" },
      { src: "/assets/projects/akuntuntas/02-penjualan.webp", caption: "Transaksi penjualan dengan alur pembukuan ganda" },
      { src: "/assets/projects/akuntuntas/03-pajak.webp", caption: "Modul pajak. PPh 31E dan ambang PKP" },
      { src: "/assets/projects/akuntuntas/04-laporan.webp", caption: "Laporan keuangan sesuai SAK EMKM" },
      { src: "/assets/projects/akuntuntas/05-payroll.webp", caption: "Payroll terintegrasi pembukuan" },
      { src: "/assets/projects/akuntuntas/06-produk.webp", caption: "Data produk & inventaris" },
    ],
    proof: [
      "Mode pemula mengutip dasar hukum per konsep pajak",
      "Edisi regulasi mengikuti aturan 2026 yang berlaku",
      "Distribusi lewat Microsoft Store (MSIX) + installer mandiri",
    ],
  },
  {
    id: "waapi",
    name: "WhatsApp WA API",
    tag: "REST API WhatsApp",
    url: null,
    github: "https://github.com/ArielOsaze",
  linkedin: "https://www.linkedin.com/in/ariel-osaze-koinda-budi-991b5a284",
    accent: "#25d366",
    accent2: "#5ee98a",
    blurb:
      "API WhatsApp mandiri berbasis Baileys dengan penyimpanan sesi PostgreSQL, fondasi integrasi notifikasi pesanan NexShop.",
    role: "Backend. API & integrasi",
    status: "Berjalan sebagai layanan internal",
    story:
      "Layanan ini menjembatani NexShop dengan WhatsApp: kirim pesan teks, media, dokumen, dan audio dengan pemrosesan gambar (Sharp) serta pembacaan metadata musik. Sesi Baileys disimpan di PostgreSQL sehingga tidak hilang saat restart.",
    metrics: [
      { value: "1", label: "layanan fokus" },
      { value: "QR", label: "autentikasi sesi" },
      { value: "PG", label: "sesi persisten" },
      { value: "Media", label: "gambar/audio/dokumen" },
    ],
    features: [
      {
        title: "Kirim serba bisa",
        desc: "Teks, gambar (dikompresi Sharp), audio dengan metadata, dokumen, semua lewat satu API.",
      },
      {
        title: "Sesi tahan restart",
        desc: "State autentikasi Baileys disimpan di PostgreSQL; server bisa restart tanpa perlu scan QR ulang.",
      },
      {
        title: "Contoh integrasi",
        desc: "Menyertakan berkas contoh integrasi NexShop dan backup service, dipakai untuk notifikasi pesanan.",
      },
    ],
    stack: ["Node.js", "Baileys", "PostgreSQL", "Sharp", "music-metadata"],
    screenshots: [],
    proof: ["Terhubung langsung ke alur notifikasi NexShop"],
  },
  {
    id: "loadtest",
    name: "Safe Loadtest",
    tag: "Alat Uji Ketahanan Berizin",
    url: null,
    github: "https://github.com/ArielOsaze",
  linkedin: "https://www.linkedin.com/in/ariel-osaze-koinda-budi-991b5a284",
    accent: "#3776ab",
    accent2: "#ffd43b",
    blurb:
      "Penguji ketahanan HTTP yang aman dipakai: hanya untuk server yang kamu miliki, dengan pagar pengaman keras di dalam kodenya.",
    role: "Pembuat tunggal, alat + dokumentasi",
    status: "Dipakai untuk uji server sendiri",
    story:
      "Alat uji beban biasanya berbahaya. Safe Loadtest dibangun dengan pagar di dalam kode: host target harus sama persis dengan yang diizinkan, wajib konfirmasi otorisasi, hanya GET satu origin, dan batas keras 60 detik / 20 concurrency / 50 rps / 1.000 request. Berhenti otomatis bila tingkat kegagalan melewati ambang setelah minimal 10 request.",
    metrics: [
      { value: "60s", label: "batas waktu keras" },
      { value: "20", label: "batas concurrency" },
      { value: "50", label: "batas rps" },
      { value: "1.000", label: "batas request" },
    ],
    features: [
      {
        title: "Pagar pengaman di kode",
        desc: "--allow-host wajib cocok persis, --confirm-authorized wajib diisi. Tidak ada credential di URL, tidak ada spoofing.",
      },
      {
        title: "Berhenti sendiri",
        desc: "Otomatis stop bila failure rate mencapai threshold setelah minimal 10 request, mencegah kerusakan berlanjut.",
      },
      {
        title: "Panduan pemakaian",
        desc: "Dokumentasi menyarankan mulai dari angka kecil di jendela pemeliharaan, sambil memantau CPU, RAM, bandwidth, dan latency.",
      },
    ],
    stack: ["Python", "Standard Library", "HTTP", "Concurrency"],
    screenshots: [],
    proof: ["Memiliki test suite sendiri (test_safe_loadtest.py)"],
  },
  {
    id: "lumawall-site",
    name: "LumaWall Site & Payment",
    tag: "Situs Produk + Checkout",
    url: "https://lumawall.xinet.id",
    github: "https://github.com/ArielOsaze/Lumawall",
    accent: "#ff3b57",
    accent2: "#ff9a6c",
    blurb:
      "Situs produk LumaWall empat bahasa dengan sistem pembayaran sendiri: checkout iPaymu, halaman sukses, dan pembuat kartu promo.",
    role: "Pembuat tunggal, situs, serverless API, renderer promo",
    status: "Live di produksi",
    story:
      "Situs ini bukan sekadar halaman statis: ada endpoint serverless untuk checkout, callback iPaymu, status pembayaran, dan unduhan, plus pemulihan QR cerdas (bila iPaymu gagal mengirim gambar QR, QR dibuat ulang dari QrString yang sama persis). Versi promo dirender dengan React + Vite.",
    metrics: [
      { value: "4", label: "bahasa (id/en/zh/ja)" },
      { value: "7", label: "endpoint serverless" },
      { value: "QR", label: "pemulihan mandiri" },
      { value: "OG", label: "kartu berbagi 1200×630" },
    ],
    features: [
      {
        title: "Checkout iPaymu",
        desc: "Endpoint checkout, callback, status pembayaran, dan halaman sukses, semua serverless, siap di Vercel.",
      },
      {
        title: "Pemulihan QR",
        desc: "Bila pengambilan gambar QR dari iPaymu gagal, QR dibuat ulang dari QrString, pembeli tidak pernah terjebak 'QR gagal dimuat'.",
      },
      {
        title: "SEO & berbagi lintas bahasa",
        desc: "Hreflang empat bahasa, canonical absolut, kartu OG 1200×630 per bahasa. URL relatif pernah jadi bug, sekarang semua absolut dan diuji.",
      },
      {
        title: "Renderer promo",
        desc: "Paket terpisah React + Vite untuk merender poster promo (16:9, 9:16, 19:6) secara otomatis.",
      },
    ],
    stack: ["HTML/CSS/JS", "Vercel Serverless", "iPaymu", "React", "Vite", "SEO"],
    screenshots: [],
    proof: ["Komentar kode menjelaskan alasan setiap keputusan, termasuk bug OG image yang pernah terjadi"],
  },
];

// ── Linimasa cara kerja, dari proyek ke proyek ─────────────────────────────
export const journey = [
  {
    step: "Fondasi",
    title: "Pola dasar & disiplin struktur",
    desc: "Auth JWT, route terpisah, validasi input, pola yang dipakai semua proyek setelahnya.",
  },
  {
    step: "Skala",
    title: "NexShop naik produksi",
    desc: "153rb+ baris kode, pembayaran sungguhan, KYC terenkripsi, AI, dan 221 skrip uji.",
  },
  {
    step: "Platform",
    title: "SayBot menyatukan kanal",
    desc: "Gateway WhatsApp/Telegram multi-akun dengan antrean, dashboard, dan kontrak desain di CI.",
  },
  {
    step: "Produk",
    title: "LumaWall 58 rilis",
    desc: "Aplikasi desktop C# yang dioptimasi sampai milidetik, dengan situs + pembayaran sendiri.",
  },
  {
    step: "Vertikal baru",
    title: "AkunTuntas untuk UMKM",
    desc: "Aplikasi pembukuan pajak offline-first dengan dua mode belajar dan lisensi komersial.",
  },
];

export const principles = [
  {
    title: "Ukur, jangan menebak",
    desc: "Setiap klaim punya bukti: screenshot piksel, angka pengukuran, atau skrip uji yang bisa dijalankan ulang.",
  },
  {
    title: "Pagar di dalam kode",
    desc: "Keamanan bukan tambahan belakangan: enkripsi KYC, hash-chain audit, batas keras di alat uji, semuanya di lapisan kode.",
  },
  {
    title: "Produk, bukan demo",
    desc: "Semua yang ada di sini punya pengguna, transaksi, atau rilis. Kalau tidak dipakai, tidak masuk portofolio.",
  },
  {
    title: "Tulis alasannya",
    desc: "Komentar dan dokumen menjelaskan kenapa sebuah keputusan diambil, supaya bisa dipelajari dan tidak diulang kesalahannya.",
  },
];
