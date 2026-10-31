// =====================================================================
// src/bug-hunt.js — Latihan Hari 4 Bagian 2 (VERSI SUDAH DIPERBAIKI)
// Hasil benar: Total barang: 26 · Menipis: Teh Celup · Nilai stok: 225000
// =====================================================================
const stok = [
  { nama: "Kopi Sachet", jumlah: "10", min: "9" },
  { nama: "Teh Celup",   jumlah: "4",  min: "5" },
  { nama: "Gula 1kg",    jumlah: "12", min: "3" },
];

// 1. Total barang
let total = 0;
for (let i = 0; i < stok.length; i++) {          // BUG 1: dulu i <= stok.length
  total = total + Number(stok[i].jumlah);
}
console.log("Total barang:", total);

// 2. Barang yang menipis (jumlah < min)
for (const s of stok) {
  if (Number(s.jumlah) < Number(s.min)) {        // BUG 2: dulu "10" < "9" (teks)
    console.log("Menipis:", s.nama);
  }
}

// 3. Nilai stok
const harga = [2500, 2000, 16000];
let nilai = 0;
for (let i = 0; i < stok.length; i++) {
  nilai += harga[i] * Number(stok[i].jumlah);     // BUG 3: dulu nilai = …
}
console.log("Nilai stok:", nilai);
