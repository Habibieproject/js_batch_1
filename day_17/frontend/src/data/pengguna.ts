import { Akun, Admin, Kasir } from "../models/akun";

export type Peran = "admin" | "kasir";

// Bentuk data pengguna dari API (password tidak pernah dikirim ke browser)
export type Pengguna = {
  id: number;
  nama: string;
  email: string;
  peran: Peran;
};

// Data biasa → objek class. Admin atau Kasir dipilih dari peran.
export function keAkun(p: Pengguna): Akun {
  return p.peran === "admin"
    ? new Admin(p.nama, p.email)
    : new Kasir(p.nama, p.email);
}
