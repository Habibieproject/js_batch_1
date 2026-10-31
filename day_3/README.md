# Hari 3 · JavaScript di Browser → Halaman Interaktif

Berdasarkan modul: **Kode_KasirKu_Hari01-04.md (HARI 3)**  
*Milestone 1: Web App Interaktif KasirKu Siap Tayang di GitHub Pages.*

---

## 📚 Struktur Berkas & Latihan di Folder Ini

### 1. File Latihan Bertahap:
- **`1_tipe_data_variabel.html` & `.js`**:
  - Konsep variabel `const`, array of objects `daftarProduk`, dan `console.table()`.
- **`2_operator_kontrol.html` & `.js`**:
  - Logika aturan bisnis:
    - `hitungDiskon(total)`: Diskon bertingkat (&ge; 100rb = 10%, &ge; 50rb = 5%, 0).
    - `hitungBiaya(metode, total)`: Biaya metode bayar (tunai, qris, transfer).
    - Menghitung total nilai stok menggunakan `for...of`.
- **`3_dom_form.html` & `.js`**:
  - Manipulasi DOM pada form:
    - `e.preventDefault()` agar form tidak merefresh halaman.
    - Validasi input spesifik (nama wajib diisi, harga > 0, stok integer &ge; 0).
    - `createElement` + `textContent` untuk keamanan dari serangan XSS.

---

### 2. Aplikasi Penuh KasirKu (Milestone 1):
- **`index.html`**: Halaman daftar produk dengan fitur pencarian real-time via input event filter tabel.
- **`form.html`**: Halaman tambah produk dengan validasi pesan error dan penambahan baris tabel baru.
- **`proses.html`**: Halaman kasir untuk menambah belanja ke keranjang, memilih metode bayar, dan menghitung total bayar otomatis.
- **`css/style.css`**: Desain visual terpusat menggunakan variabel CSS dari `DESIGN.md`.
- **`js/script.js`**: Satu file JavaScript yang menangani logika ketiga halaman web di atas secara modular.

---

## 🧪 Lembar Pengujian Form (Lembar Kerja B3)
| # | Isian Skenario | Hasil yang Diharapkan |
|---|---|---|
| 1 | Semua input kosong | ✖ Nama produk wajib diisi |
| 2 | Nama: Teh, Harga: -3 | ✖ Harga harus angka lebih dari 0, mis. 2000 |
| 3 | Teh Celup / 2000 / 15 | ✓ tersimpan, baris baru masuk tabel, form reset |
| 4 | `<b>Gula</b>` / 16000 / 12 | Tampil apa adanya sebagai teks (aman dari XSS) |
