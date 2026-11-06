import { kirim } from "./client";
import type { Pengguna } from "../data/pengguna";

export type DataDaftar = { nama: string; email: string; password: string };

export function login(email: string, password: string): Promise<Pengguna> {
  return kirim<Pengguna>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function daftar(data: DataDaftar): Promise<Pengguna> {
  return kirim<Pengguna>("/api/auth/daftar", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function getPengguna(): Promise<Pengguna[]> {
  return kirim<Pengguna[]>("/api/pengguna");
}
