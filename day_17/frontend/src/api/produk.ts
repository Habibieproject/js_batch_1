import { Produk } from "../models/produk";
import { kirim } from "./client";

export type DataProduk = { nama: string; harga: number; stok: number };
type ProdukJSON = { id: number; nama: string; harga: number; stok: number };

const URL_PRODUK = "/api/produk";

export async function getProduk(): Promise<Produk[]> {
  const data = await kirim<ProdukJSON[]>(URL_PRODUK);
  return data.map((d) => Produk.fromJSON(d));
}

export async function tambahProduk(data: DataProduk): Promise<Produk> {
  const d = await kirim<ProdukJSON>(URL_PRODUK, {
    method: "POST",
    body: JSON.stringify(data),
  });
  return Produk.fromJSON(d);
}

export async function ubahProduk(
  id: number,
  data: DataProduk,
): Promise<Produk> {
  const d = await kirim<ProdukJSON>(`${URL_PRODUK}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
  return Produk.fromJSON(d);
}

export async function hapusProduk(id: number): Promise<void> {
  await kirim(`${URL_PRODUK}/${id}`, { method: "DELETE" });
}
