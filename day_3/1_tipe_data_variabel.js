// =====================================================================
// DAY 3 — Latihan 1: Tipe Data & Variabel
// Berdasarkan silabus: Bagian 1 · Tipe data & variabel (const, array of object)
// =====================================================================

// 1. Deklarasi konstanta (const tidak bisa di-reassign)
const NAMA_TOKO = "KasirKu";

// 2. Array of Objects untuk menyimpan kumpulan data produk
const daftarProduk = [
  { nama: "Kopi Sachet", kategori: "Minuman", harga: 2500, stok: 40 },
  { nama: "Teh Celup", kategori: "Minuman", harga: 2000, stok: 15 },
  { nama: "Gula 1kg", kategori: "Sembako", harga: 16000, stok: 12 },
  { nama: "Beras 5kg", kategori: "Sembako", harga: 75000, stok: 8 },
  { nama: "Sabun Mandi", kategori: "Kebersihan", harga: 4000, stok: 25 },
];

// 3. Menampilkan jumlah data dengan template literal (` `)
console.log(`${NAMA_TOKO}: ${daftarProduk.length} produk contoh`);

// 4. Menampilkan tabel data yang rapi di browser console
console.table(daftarProduk);

// 5. Tampilkan juga ke elemen HTML jika file ini dibuka di browser
const outputEl = document.getElementById("output");
if (outputEl) {
  outputEl.textContent = JSON.stringify(daftarProduk, null, 2);
}
