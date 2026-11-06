export class Akun {
  nama: string;
  email: string;

  constructor(nama: string, email: string) {
    this.nama = nama;
    this.email = email;
  }

  peran(): string {
    return "Akun";
  }
  hakAkses(): string[] {
    return ["Beranda"];
  }

  info(): string {
    return `${this.nama} (${this.peran()}) → ${this.hakAkses().join(", ")}`;
  }
}

export class Admin extends Akun {
  override peran(): string {
    return "Admin";
  }
  override hakAkses(): string[] {
    return ["Beranda", "Produk", "Pengguna", "Pengaturan"];
  }
}

export class Kasir extends Akun {
  override peran(): string {
    return "Kasir";
  }
  override hakAkses(): string[] {
    return [...super.hakAkses(), "Produk"];
  }
}
