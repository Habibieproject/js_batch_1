import { House, Package, Users, Settings } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface MenuItem {
  label: string;
  path: string;
  ikon: LucideIcon;
}

export const menuAdmin: MenuItem[] = [
  { label: "Beranda", path: "/admin", ikon: House },
  { label: "Produk", path: "/admin/produk", ikon: Package },
  { label: "Pengguna", path: "/admin/pengguna", ikon: Users },
  { label: "Pengaturan", path: "/admin/pengaturan", ikon: Settings },
];
