import { useEffect, useState } from "react";
import type { Produk } from "../../models/produk";
import * as api from "../../api/produk";
import type { DataProduk } from "../../api/produk";
import FormProduk from "../../components/FormProduk";
import Toast from "../../components/Toast";

type InfoToast = { teks: string; jenis: "sukses" | "gagal" };

export default function HalamanProduk() {
  const [daftarProduk, setDaftarProduk] = useState<Produk[]>([]);
  const [memuat, setMemuat] = useState(true);
  const [produkDiubah, setProdukDiubah] = useState<Produk | null>(null);
  const [toast, setToast] = useState<InfoToast | null>(null);

  function tampilkanToast(teks: string, jenis: "sukses" | "gagal") {
    setToast({ teks, jenis });
    setTimeout(() => setToast(null), 3000);
  }

  async function muatProduk() {
    try {
      setDaftarProduk(await api.getProduk());
    } catch (error) {
      tampilkanToast((error as Error).message, "gagal");
    } finally {
      setMemuat(false);
    }
  }

  useEffect(() => {
    muatProduk();
  }, []);
  async function simpan(data: DataProduk): Promise<boolean> {
    try {
      if (produkDiubah) {
        await api.ubahProduk(produkDiubah.id, data);
        tampilkanToast(`${data.nama} berhasil diubah`, "sukses");
      } else {
        await api.tambahProduk(data);
        tampilkanToast(`${data.nama} berhasil ditambah`, "sukses");
      }
      setProdukDiubah(null);
      await muatProduk();
      return true;
    } catch (error) {
      tampilkanToast((error as Error).message, "gagal");
      return false;
    }
  }

  async function hapus(p: Produk) {
    if (!confirm(`Hapus ${p.nama}?`)) return;
    try {
      await api.hapusProduk(p.id);
      tampilkanToast(`${p.nama} dihapus`, "sukses");
      await muatProduk();
    } catch (error) {
      tampilkanToast((error as Error).message, "gagal");
    }
  }
  return (
    <section>
      <h1>Produk</h1>
      <FormProduk
        key={produkDiubah?.id ?? "baru"}
        produkDiubah={produkDiubah}
        onSimpan={simpan}
        onBatal={() => setProdukDiubah(null)}
      />
      {memuat && <p>Memuat data...</p>}
      {!memuat && daftarProduk.length === 0 && <p>Belum ada produk.</p>}

      <div className="tabel-wrap">
        <table className="tabel">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Harga</th>
              <th>Stok</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {daftarProduk.map((p) => (
              <tr key={p.id}>
                <td>{p.nama}</td>
                <td>Rp {p.harga.toLocaleString("id-ID")}</td>
                <td>{p.stok}</td>
                <td>
                  <span className={`status ${p.status().toLowerCase()}`}>
                    {p.status()}
                  </span>
                </td>
                <td>
                  <div className="aksi">
                    <button onClick={() => setProdukDiubah(p)}>Ubah</button>
                    <button className="btn-hapus" onClick={() => hapus(p)}>
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {toast && <Toast teks={toast.teks} jenis={toast.jenis} />}
    </section>
  );
}
