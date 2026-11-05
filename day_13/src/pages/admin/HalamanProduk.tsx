import { Produk } from "../../models/produk";
import { produkAwal } from "../../data/produk";

export default function HalamanProduk() {
  const daftarProduk = produkAwal.map((d) => Produk.fromJSON(d));

  return (
    <section>
      <h1>Produk</h1>
      <table className="tabel">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Harga</th>
            <th>Stok</th>
            <th>Status</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
