import { Produk } from "../../models/produk";
import { produkAwal } from "../../data/produk";
import type { Pengguna } from "../../data/pengguna";

type Props = { daftarPengguna: Pengguna[] };

export default function Beranda({ daftarPengguna }: Props) {
  const daftarProduk = produkAwal.map((d) => Produk.fromJSON(d));
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
