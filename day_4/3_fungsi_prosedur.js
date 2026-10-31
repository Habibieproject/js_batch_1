// =====================================================================
// DAY 4 — Latihan 3: Fungsi Murni vs Prosedur I/O
// Berdasarkan silabus: Bagian 4 · Menu dipecah >= 4 fungsi murni & prosedur
// Jalankan di terminal: node 3_fungsi_prosedur.js
// =====================================================================

// =====================================================================
// 1. FUNGSI MURNI (Pure Functions)
// Ciri-ciri: Menerima argumen input, mengembalikan nilai (return),
// dan tidak mengubah variabel di luar lingkupnya (tanpa efek samping/side effect).
// =====================================================================

const rupiahFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

// Mengubah angka menjadi string Rupiah
export function formatRupiah(angka) {
  return rupiahFormatter.format(angka);
}

// Menghitung diskon belanja bertingkat
export function hitungDiskon(total) {
  if (total >= 100000) return total * 0.1;
  if (total >= 50000) return total * 0.05;
  return 0;
}

// Menghitung biaya per metode bayar
export function hitungBiaya(metode, total) {
  switch (metode) {
    case "tunai":
      return 0;
    case "qris":
      return Math.round(total * 0.007);
    case "transfer":
      return 2500;
    default:
      return 0;
  }
}

// Arrow function untuk menghitung subtotal satu barang
export const hitungSubtotal = (harga, jumlah) => harga * jumlah;

// =====================================================================
// 2. PROSEDUR (Melakukan Aksi / I/O)
// Ciri-ciri: Tidak mengembalikan nilai, melainkan melakukan interaksi
// seperti mencetak ke konsol, menampilkan tabel, atau meminta input.
// =====================================================================

export function tampilkanMenu() {
  console.log("\n=== MENU KasirKu ===");
  console.log("1 Tambah · 2 Lihat · 3 Cari · 4 Hitung Belanja · 5 Keluar");
}

export function tampilkanTabel(data, batasStokTipis = 20) {
  console.table(
    data.map((p) => ({
      nama: p.nama,
      kategori: p.kategori,
      harga: formatRupiah(p.harga),
      stok: p.stok < batasStokTipis ? `${p.stok} (tipis)` : p.stok,
    })),
  );
}

// =====================================================================
// DEMO PENGUJIAN FUNGSI MURNI
// =====================================================================
console.log("=== Demo Fungsi Murni ===");
console.log("formatRupiah(50000)      :", formatRupiah(50000));
console.log("hitungDiskon(120000)     :", formatRupiah(hitungDiskon(120000)));
console.log("hitungBiaya('qris', 90000):", formatRupiah(hitungBiaya("qris", 90000)));
console.log("hitungSubtotal(2500, 4)  :", formatRupiah(hitungSubtotal(2500, 4)));

console.log("\n=== Demo Prosedur Tampilan ===");
tampilkanMenu();
const contohData = [
  { nama: "Kopi Sachet", kategori: "Minuman", harga: 2500, stok: 40 },
  { nama: "Teh Celup", kategori: "Minuman", harga: 2000, stok: 15 },
];
tampilkanTabel(contohData);
