export type StatusStok = "Habis" | "Menipis" | "Aman";

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

  kurangiStok(jumlah: number): string {
    if (jumlah <= 0) return "Jumlah harus lebih dari 0";
    if (jumlah > this.#stok) return `Stok ${this.nama} tidak cukup`;
    this.#stok -= jumlah;
    return `Terjual ${jumlah}, sisa ${this.#stok}`;
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
