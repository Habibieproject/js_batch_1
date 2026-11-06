export type StatusStok = "Habis" | "Menipis" | "Aman";
export type DataProduk = { nama: string; harga: number; stok: number };

export class Produk {
  readonly id: number;
  nama: string;
  #harga: number;
  #stok: number;

  constructor(id: number, nama: string, harga: number, stok: number) {
    this.id = id;
    this.nama = nama;
    this.#harga = harga;
    this.#stok = stok;
  }

  get harga(): number {
    return this.#harga;
  }
  get stok(): number {
    return this.#stok;
  }

  status(): StatusStok {
    if (this.#stok === 0) return "Habis";
    if (this.#stok < 5) return "Menipis";
    return "Aman";
  }

  // Dipanggil otomatis oleh res.json() → #private ikut dikirim
  toJSON() {
    return {
      id: this.id,
      nama: this.nama,
      harga: this.#harga,
      stok: this.#stok,
    };
  }

  static fromJSON(d: {
    id: number;
    nama: string;
    harga: number;
    stok: number;
  }) {
    return new Produk(d.id, d.nama, d.harga, d.stok);
  }
}
