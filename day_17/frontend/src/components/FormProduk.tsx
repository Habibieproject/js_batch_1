import { useState } from "react";
import type { FormEvent } from "react";
import type { DataProduk } from "../api/produk";
import type { Produk } from "../models/produk";

type Props = {
  produkDiubah: Produk | null;
  onSimpan: (data: DataProduk) => Promise<boolean>;
  onBatal: () => void;
};

export default function FormProduk({ produkDiubah, onSimpan, onBatal }: Props) {
  const [nama, setNama] = useState(produkDiubah?.nama ?? "");
  const [harga, setHarga] = useState(
    produkDiubah ? String(produkDiubah.harga) : "",
  );
  const [stok, setStok] = useState(
    produkDiubah ? String(produkDiubah.stok) : "",
  );
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (nama.trim() === "") return setError("Nama produk wajib diisi");
    if (Number(harga) <= 0) return setError("Harga harus lebih dari 0");
    setError("");

    const berhasil = await onSimpan({
      nama: nama.trim(),
      harga: Number(harga),
      stok: Number(stok || 0),
    });
    if (berhasil && !produkDiubah) {
      setNama("");
      setHarga("");
      setStok("");
    }
  }
  return (
    <form className="form-produk" onSubmit={handleSubmit} noValidate>
      <h2>{produkDiubah ? `Ubah: ${produkDiubah.nama}` : "Tambah Produk"}</h2>
      <div className="form-produk-isi">
        <input
          aria-label="Nama"
          placeholder="Nama produk"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
        />
        <input
          aria-label="Harga"
          type="number"
          placeholder="Harga"
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
        />
        <input
          aria-label="Stok"
          type="number"
          placeholder="Stok"
          value={stok}
          onChange={(e) => setStok(e.target.value)}
        />
        <button type="submit">{produkDiubah ? "Simpan" : "Tambah"}</button>
        {produkDiubah && (
          <button type="button" className="btn-batal" onClick={onBatal}>
            Batal
          </button>
        )}
      </div>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}
