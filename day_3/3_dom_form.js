// =====================================================================
// DAY 3 — Latihan 3: DOM Form Tambah Produk & Keamanan XSS
// Berdasarkan silabus: Bagian 3 · querySelector, submit, validasi, textContent
// =====================================================================

function formatRupiah(angka) {
  return "Rp" + angka.toLocaleString("id-ID");
}

function tampilPesan(elemen, teks, error = false) {
  elemen.textContent = teks;
  elemen.style.color = error ? "#dc2626" : "#16a34a";
  elemen.style.fontWeight = "600";
}

// textContent (bukan innerHTML) agar isian pengguna tidak dieksekusi sebagai HTML/script (Aman dari XSS)
function tambahSel(tr, isi) {
  const td = document.createElement("td");
  td.textContent = isi;
  tr.append(td);
}

const formProduk = document.querySelector("#form-produk");
if (formProduk) {
  const nama = document.querySelector("#nama");
  const kategori = document.querySelector("#kategori");
  const harga = document.querySelector("#harga");
  const stok = document.querySelector("#stok");
  const pesan = document.querySelector("#pesan");
  const tabel = document.querySelector("#tabel tbody");

  formProduk.addEventListener("submit", (e) => {
    e.preventDefault(); // 1. Mencegah reload halaman secara default

    const n = nama.value.trim();
    const h = Number(harga.value);
    const s = Number(stok.value);

    // Reset style error
    nama.style.borderColor = "";
    harga.style.borderColor = "";
    stok.style.borderColor = "";

    // 2. Validasi spesifik
    if (n === "") {
      nama.style.borderColor = "#dc2626";
      return tampilPesan(pesan, "✖ Nama produk wajib diisi", true);
    }
    if (harga.value === "" || Number.isNaN(h) || h <= 0) {
      harga.style.borderColor = "#dc2626";
      return tampilPesan(pesan, "✖ Harga harus angka lebih dari 0, mis. 2000", true);
    }
    if (stok.value === "" || !Number.isInteger(s) || s < 0) {
      stok.style.borderColor = "#dc2626";
      return tampilPesan(pesan, "✖ Stok harus bilangan bulat 0 atau lebih", true);
    }

    // 3. Tambah baris baru ke tabel menggunakan DOM createElement
    const tr = document.createElement("tr");
    tambahSel(tr, n);
    tambahSel(tr, kategori.value);
    tambahSel(tr, formatRupiah(h));
    tambahSel(tr, s);
    tabel.append(tr);

    // 4. Reset form & beri feedback sukses
    formProduk.reset();
    nama.focus();
    tampilPesan(pesan, `✓ ${n} tersimpan`);
  });
}
