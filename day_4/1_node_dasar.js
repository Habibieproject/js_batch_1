// =====================================================================
// DAY 4 — Latihan 1: Pengenalan Node.js & ES Modules
// Berdasarkan silabus: Bagian 1 · Logika Proyek di Node.js (Terminal)
// Jalankan di terminal: node 1_node_dasar.js
// =====================================================================

import { version, platform } from "node:process";

console.log("=== Selamat Datang di Node.js ===");
console.log(`Node.js Version : ${version}`);
console.log(`Operating System: ${platform}`);

// Data contoh logika warung (murni data, tanpa ketergantungan DOM browser)
const toko = {
  nama: "KasirKu",
  pemilik: "Andrea Surya Habibie",
  alamat: "Jl. Warung Sederhana No. 1",
  daftarProduk: [
    { nama: "Kopi Sachet", harga: 2500, stok: 40 },
    { nama: "Teh Celup", harga: 2000, stok: 15 },
    { nama: "Gula 1kg", harga: 16000, stok: 12 },
  ],
};

console.log(`\nInformasi Toko: ${toko.nama} - Pemilik: ${toko.pemilik}`);
console.log("Daftar Produk Awal:");
console.table(toko.daftarProduk);

console.log("\n💡 Konsep Hari 4:");
console.log("Kode logika murni (perhitungan diskon, format rupiah, manipulasi stok)");
console.log("dibuat mandiri agar kelak dapat digunakan baik di Backend API maupun Frontend React!");
