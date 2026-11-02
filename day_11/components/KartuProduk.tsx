type KartuProdukProps = {
  nama: string;
  harga: number;
  stok: number;
};

export default function KartuProduk(
  { nama, harga, stok }: KartuProdukProps
) {
  return (
    <div className="kartu-produk">
      <h3>{nama}</h3>
      <p>Rp {harga.toLocaleString("id-ID")}</p>
      <p>Stok: {stok}</p>
    </div>
  );
}
