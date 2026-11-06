import { useEffect, useState } from "react";
import { getProduk } from "../../api/produk";
import { getPengguna } from "../../api/pengguna";
import type { Produk } from "../../models/produk";
import type { Pengguna } from "../../data/pengguna";

export default function Beranda() {
  const [daftarProduk, setDaftarProduk] = useState<Produk[]>([]);
  const [daftarPengguna, setDaftarPengguna] = useState<Pengguna[]>([]);

  useEffect(() => {
    // Dua request berjalan bersamaan
    Promise.all([getProduk(), getPengguna()])
      .then(([produk, pengguna]) => {
        setDaftarProduk(produk);
        setDaftarPengguna(pengguna);
      })
      .catch(() => {}); // angka tetap 0 bila server mati
  }, []);

  const perluRestok = daftarProduk.filter((p) => p.status() !== "Aman");
  return (
    <section>
      <h1>Beranda</h1>
      <div className="ringkasan">
        <div className="kartu-ringkas">
          <span>Produk</span>
          <strong>{daftarProduk.length}</strong>
        </div>
        <div className="kartu-ringkas">
          <span>Perlu restok</span>
          <strong>{perluRestok.length}</strong>
        </div>
        <div className="kartu-ringkas">
          <span>Pengguna</span>
          <strong>{daftarPengguna.length}</strong>
        </div>
      </div>
    </section>
  );
}
