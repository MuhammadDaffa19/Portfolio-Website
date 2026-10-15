# Daffa Project Index

**Interactive Web Developer Portfolio — Cosmic / Orbital Navigation**

Daffa Project Index adalah website portfolio pribadi yang menampilkan proyek pengembangan web, keahlian, pengalaman, perjalanan pembelajaran, dan informasi kontak dalam antarmuka interaktif bertema kosmik. Halaman utama menggunakan navigasi orbital sebagai pintu masuk ke setiap bagian portfolio.

- **Website:** [portfolio-website.daffajowis.workers.dev](https://portfolio-website.daffajowis.workers.dev/)
- **Repository:** [MuhammadDaffa19/Portfolio-Website](https://github.com/MuhammadDaffa19/Portfolio-Website)
- **Release baseline:** `portfolio-v1.0.0`

## Fitur utama

- **Interactive orbital navigation** — navigasi utama bergaya orbital dengan dukungan desktop, tablet, dan mobile.
- **Responsive layout** — tampilan disesuaikan untuk beberapa ukuran layar tanpa mengubah identitas visual utama.
- **Bilingual interface** — pilihan bahasa Indonesia dan Inggris.
- **Project case studies** — kartu proyek dan dialog detail yang membahas masalah, solusi, dampak, serta fitur utama.
- **Keyboard accessibility** — peningkatan pengelolaan fokus dialog, navigasi keyboard, dan dukungan preferensi *reduced motion*.
- **Route-level code splitting** — halaman dimuat sesuai rute yang dikunjungi menggunakan fitur lazy loading React Router.
- **Per-page metadata** — judul dan deskripsi halaman diperbarui berdasarkan rute serta bahasa yang aktif.

## Teknologi

| Kategori | Teknologi |
| --- | --- |
| Frontend | React, JavaScript, Vite |
| Styling | Tailwind CSS, CSS |
| Routing | React Router |
| Animasi | Motion, GSAP |
| Ikon | Lucide React |
| Deployment | Cloudflare Workers Static Assets |
| Quality checks | ESLint, Node.js test runner, Vite production build |

## Halaman portfolio

| Rute | Konten |
| --- | --- |
| `/` | Beranda dan navigasi orbital |
| `/about` | Tentang saya |
| `/projects` | Proyek dan studi kasus |
| `/skills` | Keahlian dan teknologi |
| `/experience` | Pengalaman |
| `/certificates` | Pembelajaran dan sertifikasi |
| `/contact` | Informasi kontak |

## Proyek yang ditampilkan

| Proyek | Keterangan |
| --- | --- |
| **Chatbot AI BAA** | Prototipe asisten informasi akademik berbasis knowledge base FAQ dan SOP untuk BAA ITPLN. |
| **CashMate** | Aplikasi kasir web dengan transaksi, riwayat penjualan, BonLater, dan integrasi Firebase. |
| **EduLens** | Aplikasi analisis kesulitan soal untuk guru dengan data Excel, visualisasi, dan laporan PDF. |
| **K3Connect** | Website pengelolaan data personel dan sertifikat K3 menggunakan JavaScript serta LocalStorage. |

Detail setiap proyek tersedia di halaman [Projects](https://portfolio-website.daffajowis.workers.dev/projects).

## Menjalankan project secara lokal

**Persyaratan:** Node.js versi yang kompatibel dengan Vite 8 dan npm.

```bash
# 1. Clone repository
git clone https://github.com/MuhammadDaffa19/Portfolio-Website.git

# 2. Masuk ke direktori project
cd Portfolio-Website

# 3. Instal dependencies sesuai lockfile
npm ci

# 4. Jalankan development server
npm run dev
```

Development server dikonfigurasi menggunakan port **5173**. Buka `http://localhost:5173` di browser.

Untuk melihat hasil production build secara lokal:

```bash
npm run build
npm run preview
```

## Validasi sebelum rilis

Jalankan seluruh quality gate menggunakan:

```bash
npm run verify
```

Perintah tersebut menjalankan ESLint, smoke tests, validasi aset, production build, dan pemeriksaan artefak produksi secara berurutan. Jika salah satu pemeriksaan gagal, proses verifikasi juga gagal.

Perintah terkait:

```bash
npm run lint
npm run test:smoke
npm run check:assets
npm run build
npm run check:production
```

> `check:production` memeriksa folder `dist`, sehingga jalankan setelah `npm run build` atau gunakan `npm run verify`.

## Deployment

Website dipublikasikan menggunakan **Cloudflare Workers Static Assets**. Konfigurasi deployment berada di `wrangler.jsonc`, dengan output Vite dari folder `dist` dan fallback untuk client-side routing SPA.

Repository terhubung dengan Cloudflare Builds menggunakan branch produksi `main`. Pipeline produksi dikonfigurasi untuk menjalankan `npm run verify`, kemudian `npx wrangler deploy` apabila verifikasi berhasil.

Untuk menjaga rilis tetap aman, perubahan sebaiknya dikerjakan pada branch terpisah, diverifikasi, lalu digabungkan ke `main` melalui Pull Request.

## Struktur direktori utama

```text
src/
  components/   # Komponen UI dan navigasi
  config/       # Konfigurasi fitur dan metadata
  context/      # Konteks bahasa
  data/         # Data proyek dan terjemahan
  hooks/        # Reusable React hooks
  pages/        # Implementasi setiap halaman
  styles/       # Global dan responsive styles
scripts/        # Asset dan production checks
tests/          # Smoke tests
public/         # Static assets
wrangler.jsonc  # Cloudflare Workers configuration
```

## Catatan rilis

- Baseline produksi pertama ditandai dengan Git tag `portfolio-v1.0.0`.
- Publikasi CV untuk sementara **dinonaktifkan** sampai dokumen final siap. Tombol CV tidak ditampilkan selama fitur tersebut nonaktif.
- Pemeriksaan browser dan visual regression juga telah dilakukan dalam proses audit rilis. Perangkat uji Playwright tersebut masih dikelola secara terpisah dari repository utama.

---

**Daffa Project Index** — dokumentasi karya, proses belajar, dan solusi web yang dibangun.
