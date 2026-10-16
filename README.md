# ALVA STUDIO — struktur modular

Website ini dipecah menjadi partial HTML, stylesheet CSS per bagian, dan satu file JavaScript terpisah. Konten, gaya utama, dan interaksi dari versi awal dipertahankan; gambar yang sebelumnya ditanam sebagai Base64 dipindahkan ke `assets/images/` agar konfigurasi lebih mudah dibaca.

## Struktur penting

- `src/sections/` — satu file HTML untuk setiap section: beranda, tentang, layanan, portofolio, paket, booking, galeri, testimoni, FAQ, kontak, dan lainnya.
- `src/layout/` — header, footer, serta elemen mengambang (tombol WhatsApp, kembali ke atas, lightbox).
- `css/base.css` — variabel warna, tipografi, dan aturan global.
- `css/<section>.css` — gaya khusus tiap section.
- `css/responsive.css` — aturan breakpoint responsif dan preferensi gerak.
- `js/app.js` — konfigurasi situs dan seluruh interaksi JavaScript.
- `assets/images/` — aset gambar terpisah.
- `index.html` — hasil gabungan siap dijalankan/dipublikasikan.
- `build.py` — menggabungkan template dan partial HTML menjadi `index.html`.

## Cara mengubah website

1. Edit section yang diperlukan di `src/sections/`.
2. Edit CSS pada file yang namanya sesuai section. Untuk warna dan font global, gunakan `css/base.css`.
3. Edit nomor WhatsApp, sosial media, alamat, harga, atau data lain di bagian `CONFIG` pada `js/app.js`.
4. Jika mengubah HTML partial, jalankan kembali proses build:

   ```bash
   python build.py
   ```

5. Buka `index.html` melalui browser atau gunakan ekstensi Live Server di VS Code.

Catatan: `index.html` merupakan hasil build. Perubahan pada partial sumber baru masuk ke halaman hasil setelah `python build.py` dijalankan kembali. Jika hanya mengubah CSS atau JS, file hasil langsung menggunakan file tersebut sehingga tidak perlu build ulang.
