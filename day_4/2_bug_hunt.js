// =====================================================================
// DAY 4 — Latihan 2: Latihan Debugging (3 Bug Klasik Pemula)
// Jalankan di terminal: node 2_bug_hunt.js
// Target hasil benar: Total barang: 26 · Menipis: Teh Celup · Nilai stok: 225000
// =====================================================================

const stok = [
  { nama: "Kopi Sachet", jumlah: "10", min: "9" },
  { nama: "Teh Celup",   jumlah: "4",  min: "5" },
  { nama: "Gula 1kg",    jumlah: "12", min: "3" },
];

console.log("=== Latihan Debugging Hari 4 ===");

// ---------------------------------------------------------------------
// 1. Total Barang
// PENJELASAN BUG 1 (Off-by-one):
// Jika menggunakan `i <= stok.length`, pada perulangan terakhir stok[3] akan `undefined`!
// Perbaikan: gunakan operator `<` (`i < stok.length`).
// Jangan lupa konversi teks ke angka dengan `Number()`.
// ---------------------------------------------------------------------
let total = 0;
for (let i = 0; i < stok.length; i++) { // BUG 1 diperbaiki: dulu i <= stok.length
  total = total + Number(stok[i].jumlah);
}
console.log("1. Total barang:", total); // Harapan: 26

// ---------------------------------------------------------------------
// 2. Barang yang Menipis (jumlah < min)
// PENJELASAN BUG 2 (Type Coercion pada perbandingan string):
// Nilai string "10" < "9" bernilai TRUE dalam JavaScript karena perbandingan leksikografis (huruf '1' < huruf '9')!
// Perbaikan: Konversi keduanya menjadi Number() sebelum dibandingkan.
// ---------------------------------------------------------------------
for (const s of stok) {
  if (Number(s.jumlah) < Number(s.min)) { // BUG 2 diperbaiki: dulu "10" < "9" (string)
    console.log("2. Menipis:", s.nama);   // Harapan: Teh Celup
  }
}

// ---------------------------------------------------------------------
// 3. Nilai Stok
// PENJELASAN BUG 3 (Variabel penampung tertimpa):
// Menggunakan `nilai = harga[i] * ...` akan menimpa total sebelumnya dengan nilai item terakhir saja!
// Perbaikan: gunakan operator akumulasi `nilai += harga[i] * Number(stok[i].jumlah)`.
// ---------------------------------------------------------------------
const harga = [2500, 2000, 16000];
let nilai = 0;
for (let i = 0; i < stok.length; i++) {
  nilai += harga[i] * Number(stok[i].jumlah); // BUG 3 diperbaiki: dulu nilai = ...
}
console.log("3. Nilai stok:", nilai); // Harapan: 225000 (25000 + 8000 + 192000)
