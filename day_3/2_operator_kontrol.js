// =====================================================================
// DAY 3 — Latihan 2: Operator & Struktur Kontrol (Aturan Bisnis)
// Berdasarkan silabus: Bagian 2 · hitungDiskon, hitungBiaya, for...of
// =====================================================================

const daftarProduk = [
  { nama: "Kopi Sachet", kategori: "Minuman", harga: 2500, stok: 40 },
  { nama: "Teh Celup", kategori: "Minuman", harga: 2000, stok: 15 },
  { nama: "Gula 1kg", kategori: "Sembako", harga: 16000, stok: 12 },
  { nama: "Beras 5kg", kategori: "Sembako", harga: 75000, stok: 8 },
  { nama: "Sabun Mandi", kategori: "Kebersihan", harga: 4000, stok: 25 },
];

// Helper: Format angka ke Rupiah
function formatRupiah(angka) {
  return "Rp" + angka.toLocaleString("id-ID");
}

// Aturan Bisnis 1: Diskon bertingkat
// PENTING: Kondisi terbesar ditulis terlebih dahulu (>= 100000, baru >= 50000)
function hitungDiskon(total) {
  if (total >= 100000) {
    return total * 0.1; // Diskon 10%
  } else if (total >= 50000) {
    return total * 0.05; // Diskon 5%
  } else {
    return 0; // Tanpa diskon
  }
}

// Aturan Bisnis 2: Biaya metode bayar
function hitungBiaya(metode, total) {
  switch (metode) {
    case "tunai":
      return 0;
    case "qris":
      return Math.round(total * 0.007); // Biaya QRIS 0.7%
    case "transfer":
      return 2500; // Biaya transfer flat Rp2.500
    default:
      return 0;
  }
}

// Perulangan for...of untuk menghitung total nilai seluruh stok
let nilaiStok = 0;
for (const p of daftarProduk) {
  nilaiStok += p.harga * p.stok;
}

// Cetak ke Console Browser (F12)
console.log("=== Hasil Perhitungan Nilai Stok ===");
console.log("Total nilai stok warung:", formatRupiah(nilaiStok));

console.log("\n=== Uji Aturan Bisnis Diskon (3 Nilai Batas) ===");
console.log("Belanja Rp120.000 -> Diskon:", formatRupiah(hitungDiskon(120000))); // Rp12.000
console.log("Belanja  Rp50.000 -> Diskon:", formatRupiah(hitungDiskon(50000)));  // Rp2.500
console.log("Belanja  Rp30.000 -> Diskon:", formatRupiah(hitungDiskon(30000)));  // Rp0
