# Hari 4 · Node.js, Debugging, Menu CLI & Fungsi

Berdasarkan modul: **Kode_KasirKu_Hari01-04.md (HARI 4)**  
*Membangun program mandiri di terminal dengan Node.js, pemecahan bug, dan menu interaktif.*

---

## 🚀 Cara Menjalankan Program (Terminal)

Masuk ke folder `day_4/` (atau jalankan dari root workspace):
```bash
# 1. Menjalankan Menu CLI KasirKu
npm start
# atau
node src/index.js

# 2. Mode Pengembangan (Otomatis reload saat file disimpan)
npm run dev

# 3. Menjalankan Latihan Debugging (versi sudah diperbaiki)
npm run bug
# atau
node src/bug-hunt.js
```

---

## 📁 Struktur Berkas di `day_4/`

### 1. File Latihan Konsep:
- **`1_node_dasar.js`**:
  - Menjalankan JavaScript di luar browser menggunakan Node.js LTS dan ES Modules (`type: module`).
- **`2_bug_hunt.js`**:
  - Penjelasan mendalam mengenai 3 bug klasik pemula:
    1. *Off-by-one loop*: `i <= stok.length` vs `i < stok.length`.
    2. *Type coercion perbandingan string*: `"10" < "9"` bernilai true vs `Number(s.jumlah) < Number(s.min)`.
    3. *Akumulator tertimpa*: `nilai = ...` vs `nilai += ...`.
- **`3_fungsi_prosedur.js`**:
  - Pemisahan kode antara **Fungsi Murni** (menghasilkan return value tanpa efek samping) dan **Prosedur** (I/O, tampilan tabel, console).

### 2. Proyek CLI KasirKu:
- **`package.json`**: Konfigurasi ES Modules dan scripts (`start`, `dev`, `bug`).
- **`src/index.js`**: Program menu interaktif CLI penuh dengan 5 fitur:
  1. Tambah Data Produk (dengan validasi nama, kategori, harga, stok).
  2. Lihat Daftar Produk (format tabel rapi + peringatan stok tipis).
  3. Cari Produk berdasarkan nama (case-insensitive).
  4. Hitung Belanja & Transaksi Kasir (perhitungan diskon & metode bayar).
  5. Keluar program.
- **`src/bug-hunt.js`**: Berkas latihan debugging resmi.

---

## 🧪 Tabel Uji Skenario Menu CLI (Lembar Kerja B3 & B4)
| # | Skenario Pengujian | Input yang Diketik | Hasil yang Diharapkan |
|---|---|---|---|
| 1 | Pilihan menu di luar 1–5 | `9` | ✖ Pilihan "9" tidak ada. Ketik 1–5. |
| 2 | Nama produk kosong | `1` &rarr; langsung Enter | ✖ Wajib diisi, tidak boleh kosong. (ditanya ulang) |
| 3 | Harga bukan angka / negatif | `abc`, `-5` | ✖ Harus angka minimal 1. (ditanya ulang) |
| 4 | Tambah produk valid lalu Lihat | Teh Melati &rarr; 2 &rarr; 3000 &rarr; 10 &rarr; menu `2` | ✓ ditambahkan, muncul di tabel console |
| 5 | Cari data tidak ada / beda huruf | `zzz` &middot; `KOPI` | Tidak ditemukan &middot; Kopi Sachet berhasil tampil |
| 6 | Hitung belanja (aturan bisnis) | Beras &times; 2 + Teh &times; 5, QRIS | Subtotal Rp 160.000 &middot; Diskon −Rp 16.000 &middot; Biaya Rp 1.008 &middot; TOTAL Rp 145.008 |
| 7 | Keluar program | `5` | Sampai jumpa! (program berhenti dengan bersih) |
