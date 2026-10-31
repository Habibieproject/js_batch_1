// =====================================================================
// KasirKu — src/index.js (Hari 4: Node.js, Menu CLI & Fungsi)
// Jalankan: npm start   ·   Mode pengembangan: npm run dev
// =====================================================================
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });

// ---------- Data contoh (logika murni dari Hari 3) ----------
const daftar = [
  { nama: "Kopi Sachet", kategori: "Minuman", harga: 2500, stok: 40 },
  { nama: "Teh Celup", kategori: "Minuman", harga: 2000, stok: 15 },
  { nama: "Gula 1kg", kategori: "Sembako", harga: 16000, stok: 12 },
  { nama: "Beras 5kg", kategori: "Sembako", harga: 75000, stok: 8 },
  { nama: "Sabun Mandi", kategori: "Kebersihan", harga: 4000, stok: 25 },
];
const KATEGORI = ["Minuman", "Sembako", "Kebersihan"];
const BATAS_STOK_TIPIS = 20;

const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

// ===================== FUNGSI (menghasilkan nilai) =====================

// Mengubah angka menjadi teks Rupiah, mis. 16000 → "Rp 16.000"
function formatRupiah(angka) {
  return rupiah.format(angka);
}

// Aturan bisnis: diskon bertingkat (kondisi terbesar lebih dulu)
function hitungDiskon(total) {
  if (total >= 100000) return total * 0.1;
  if (total >= 50000) return total * 0.05;
  return 0;
}

// Aturan bisnis: biaya per metode bayar
function hitungBiaya(metode, total) {
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

// Menghitung subtotal satu barang
const hitungSubtotal = (harga, jumlah) => harga * jumlah;

// Bertanya sampai jawabannya tidak kosong
async function tanyaTeks(pertanyaan) {
  while (true) {
    const jawab = (await rl.question(pertanyaan)).trim();
    if (jawab !== "") return jawab;
    console.log("✖ Wajib diisi, tidak boleh kosong.");
  }
}

// Bertanya sampai jawabannya angka yang valid
async function tanyaAngka(pertanyaan, { min = 1, max = Infinity, bulat = false } = {}) {
  while (true) {
    const jawab = (await rl.question(pertanyaan)).trim();
    const n = Number(jawab);
    const valid = jawab !== "" && !Number.isNaN(n) && n >= min && n <= max && (!bulat || Number.isInteger(n));
    if (valid) return n;
    const batas = max === Infinity ? `minimal ${min}` : `${min}–${max}`;
    console.log(`✖ Harus ${bulat ? "bilangan bulat" : "angka"} ${batas}.`);
  }
}

// ===================== PROSEDUR (melakukan sesuatu) =====================

function tampilkanMenu() {
  console.log("\n=== KasirKu ===");
  console.log("1 Tambah · 2 Lihat · 3 Cari · 4 Hitung Belanja · 5 Keluar");
}

function tampilkanTabel(data) {
  console.table(
    data.map((p) => ({
      nama: p.nama,
      kategori: p.kategori,
      harga: formatRupiah(p.harga),
      stok: p.stok < BATAS_STOK_TIPIS ? `${p.stok} (tipis)` : p.stok,
    })),
  );
}

async function tambahData() {
  const nama = await tanyaTeks("Nama produk: ");
  console.log(`Kategori: ${KATEGORI.map((k, i) => `${i + 1} ${k}`).join(" · ")}`);
  const noKategori = await tanyaAngka("Pilih kategori (1-3): ", { min: 1, max: KATEGORI.length, bulat: true });
  const kategori = KATEGORI[noKategori - 1];
  const harga = await tanyaAngka("Harga: ");
  const stok = await tanyaAngka("Stok: ", { min: 0, bulat: true });

  daftar.push({ nama, kategori, harga, stok });
  console.log(`✓ ${nama} ditambahkan (${formatRupiah(harga)}, stok ${stok}).`);
}

function lihatData() {
  if (daftar.length === 0) return console.log("Belum ada produk.");
  tampilkanTabel(daftar);
  let nilaiStok = 0;
  for (const p of daftar) nilaiStok += hitungSubtotal(p.harga, p.stok);
  console.log(`${daftar.length} produk · nilai stok ${formatRupiah(nilaiStok)}`);
}

async function cariData() {
  const kata = (await tanyaTeks("Cari nama: ")).toLowerCase();
  const hasil = [];
  for (const p of daftar) {
    if (p.nama.toLowerCase().includes(kata)) hasil.push(p);
  }
  if (hasil.length === 0) return console.log("Tidak ditemukan.");
  tampilkanTabel(hasil);
}

async function hitungBelanja() {
  let subtotal = 0;
  let lagi = "y";
  do {
    lihatNomorProduk();
    const no = await tanyaAngka(`Nomor produk (1-${daftar.length}): `, { min: 1, max: daftar.length, bulat: true });
    const p = daftar[no - 1];
    const jumlah = await tanyaAngka("Jumlah: ", { min: 1, bulat: true });
    subtotal += hitungSubtotal(p.harga, jumlah);
    console.log(`+ ${p.nama} × ${jumlah} = ${formatRupiah(hitungSubtotal(p.harga, jumlah))}`);
    lagi = (await rl.question("Tambah barang lagi? (y/N): ")).trim().toLowerCase();
  } while (lagi === "y");

  const metode = await tanyaMetode();
  const diskon = hitungDiskon(subtotal);
  const biaya = hitungBiaya(metode, subtotal - diskon);
  console.log(`Subtotal   ${formatRupiah(subtotal)}`);
  console.log(`Diskon    -${formatRupiah(diskon)}`);
  console.log(`Biaya      ${formatRupiah(biaya)} (${metode})`);
  console.log(`TOTAL      ${formatRupiah(subtotal - diskon + biaya)}`);
}

async function tanyaMetode() {
  while (true) {
    const m = (await rl.question("Metode (tunai/qris/transfer) [tunai]: ")).trim().toLowerCase() || "tunai";
    if (["tunai", "qris", "transfer"].includes(m)) return m;
    console.log("✖ Metode tidak dikenal. Ketik tunai, qris, atau transfer.");
  }
}

function lihatNomorProduk() {
  daftar.forEach((p, i) => console.log(`${i + 1}. ${p.nama} — ${formatRupiah(p.harga)}`));
}

// ===================== PROGRAM UTAMA =====================
console.log(`KasirKu siap — ${daftar.length} produk contoh dimuat.`);

let pilihan;
do {
  tampilkanMenu();
  pilihan = (await rl.question("Pilih menu: ")).trim();

  switch (pilihan) {
    case "1":
      await tambahData();
      break;
    case "2":
      lihatData();
      break;
    case "3":
      await cariData();
      break;
    case "4":
      await hitungBelanja();
      break;
    case "5":
      console.log("Sampai jumpa!");
      break;
    default:
      console.log(`✖ Pilihan "${pilihan}" tidak ada. Ketik 1–5.`);
  }
} while (pilihan !== "5");

rl.close();
