// =====================================================================
// KasirKu — js/script.js (Hari 3: JavaScript di Browser)
// Dipasang di setiap halaman dengan <script src="js/script.js" defer>
// =====================================================================

// ---------- Bagian 1 · Tipe data & variabel ----------
const NAMA_TOKO = "KasirKu";
const daftarProduk = [
  { nama: "Kopi Sachet", kategori: "Minuman", harga: 2500, stok: 40 },
  { nama: "Teh Celup", kategori: "Minuman", harga: 2000, stok: 15 },
  { nama: "Gula 1kg", kategori: "Sembako", harga: 16000, stok: 12 },
  { nama: "Beras 5kg", kategori: "Sembako", harga: 75000, stok: 8 },
  { nama: "Sabun Mandi", kategori: "Kebersihan", harga: 4000, stok: 25 },
];
console.log(`${NAMA_TOKO}: ${daftarProduk.length} produk contoh`);
console.table(daftarProduk);

// ---------- Bagian 2 · Operator & struktur kontrol (aturan bisnis) ----------
function formatRupiah(angka) {
  return "Rp" + angka.toLocaleString("id-ID");
}

// Diskon bertingkat: kondisi terbesar ditulis lebih dulu
function hitungDiskon(total) {
  if (total >= 100000) {
    return total * 0.1;
  } else if (total >= 50000) {
    return total * 0.05;
  } else {
    return 0;
  }
}

// Biaya per metode bayar
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

// Total nilai stok dengan for...of
let nilaiStok = 0;
for (const p of daftarProduk) {
  nilaiStok += p.harga * p.stok;
}
console.log("Nilai stok:", formatRupiah(nilaiStok));

// Uji aturan bisnis dengan 3 nilai (salah satunya tepat di batas)
console.log("Diskon 120000 →", hitungDiskon(120000)); // 12000
console.log("Diskon 50000  →", hitungDiskon(50000));  // 2500
console.log("Diskon 30000  →", hitungDiskon(30000));  // 0

// ---------- Bagian 3 · DOM: helper bersama ----------
function tampilPesan(elemen, teks, error = false) {
  elemen.textContent = teks;
  elemen.classList.toggle("error", error);
  elemen.classList.toggle("sukses", !error);
}

// textContent (bukan innerHTML) agar isian pengguna tidak dijalankan sebagai kode
function tambahSel(tr, isi) {
  const td = document.createElement("td");
  td.textContent = isi;
  tr.append(td);
}

// ---------- Halaman index.html: cari produk ----------
const inputCari = document.querySelector("#cari");
if (inputCari) {
  const baris = document.querySelectorAll("#tabel-produk tr");
  const infoCari = document.querySelector("#info-cari");

  inputCari.addEventListener("input", () => {
    const kata = inputCari.value.trim().toLowerCase();
    let ketemu = 0;
    for (const tr of baris) {
      const nama = tr.cells[0].textContent.toLowerCase();
      const cocok = nama.includes(kata);
      tr.classList.toggle("tersembunyi", !cocok);
      if (cocok) ketemu++;
    }
    infoCari.textContent = ketemu === 0 ? `Tidak ada produk dengan kata "${inputCari.value}".` : "";
  });
}

// ---------- Halaman form.html: form tambah produk ----------
const formProduk = document.querySelector("#form-produk");
if (formProduk) {
  const nama = document.querySelector("#nama");
  const kategori = document.querySelector("#kategori");
  const harga = document.querySelector("#harga");
  const stok = document.querySelector("#stok");
  const pesan = document.querySelector("#pesan");
  const tabel = document.querySelector("#tabel tbody");

  formProduk.addEventListener("submit", (e) => {
    e.preventDefault(); // jangan muat ulang halaman

    const n = nama.value.trim();
    const h = Number(harga.value);
    const s = Number(stok.value);

    // validasi — tampilkan pesan yang spesifik
    nama.classList.remove("salah");
    harga.classList.remove("salah");
    stok.classList.remove("salah");

    if (n === "") {
      nama.classList.add("salah");
      return tampilPesan(pesan, "✖ Nama produk wajib diisi", true);
    }
    if (harga.value === "" || Number.isNaN(h) || h <= 0) {
      harga.classList.add("salah");
      return tampilPesan(pesan, "✖ Harga harus angka lebih dari 0, mis. 2000", true);
    }
    if (stok.value === "" || !Number.isInteger(s) || s < 0) {
      stok.classList.add("salah");
      return tampilPesan(pesan, "✖ Stok harus bilangan bulat 0 atau lebih", true);
    }

    // tambah baris ke tabel
    const tr = document.createElement("tr");
    tambahSel(tr, n);
    tambahSel(tr, kategori.value);
    tambahSel(tr, formatRupiah(h));
    tambahSel(tr, s);
    tabel.append(tr);

    formProduk.reset();
    nama.focus();
    tampilPesan(pesan, `✓ ${n} tersimpan`);
  });
}

// ---------- Halaman proses.html: transaksi kasir ----------
const formKeranjang = document.querySelector("#form-keranjang");
if (formKeranjang) {
  const produk = document.querySelector("#produk");
  const jumlah = document.querySelector("#jumlah");
  const metode = document.querySelector("#metode");
  const pesanKeranjang = document.querySelector("#pesan-keranjang");
  const isiKeranjang = document.querySelector("#isi-keranjang");
  const keranjang = [];

  function perbaruiRingkasan() {
    let subtotal = 0;
    for (const item of keranjang) subtotal += item.harga * item.jumlah;
    const diskon = hitungDiskon(subtotal);
    const biaya = keranjang.length > 0 ? hitungBiaya(metode.value, subtotal - diskon) : 0;
    const total = subtotal - diskon + biaya;

    document.querySelector("#subtotal").textContent = formatRupiah(subtotal);
    document.querySelector("#diskon").textContent = "−" + formatRupiah(diskon);
    document.querySelector("#biaya").textContent = formatRupiah(biaya);
    document.querySelector("#total").textContent = formatRupiah(total);
  }

  formKeranjang.addEventListener("submit", (e) => {
    e.preventDefault();
    const [namaProduk, hargaTeks] = produk.value.split("|");
    const j = Number(jumlah.value);

    if (!Number.isInteger(j) || j < 1) {
      return tampilPesan(pesanKeranjang, "✖ Jumlah minimal 1", true);
    }

    keranjang.push({ nama: namaProduk, harga: Number(hargaTeks), jumlah: j });
    const tr = document.createElement("tr");
    tambahSel(tr, namaProduk);
    tambahSel(tr, j);
    tambahSel(tr, formatRupiah(Number(hargaTeks) * j));
    isiKeranjang.append(tr);

    jumlah.value = 1;
    tampilPesan(pesanKeranjang, `✓ ${namaProduk} × ${j} masuk keranjang`);
    perbaruiRingkasan();
  });

  metode.addEventListener("change", perbaruiRingkasan);

  document.querySelector("#tombol-selesai").addEventListener("click", () => {
    if (keranjang.length === 0) {
      return tampilPesan(pesanKeranjang, "✖ Keranjang masih kosong", true);
    }
    const total = document.querySelector("#total").textContent;
    keranjang.length = 0;
    isiKeranjang.textContent = "";
    perbaruiRingkasan();
    tampilPesan(pesanKeranjang, `✓ Transaksi selesai — total ${total}`);
  });
}
