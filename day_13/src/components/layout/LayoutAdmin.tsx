import { useState } from "react";
import { Navigate, Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Header from "./Header";
import type { Pengguna } from "../../data/pengguna";

type Props = {
  pengguna: Pengguna | null;
  onKeluar: () => void;
};

export default function LayoutAdmin({ pengguna, onKeluar }: Props) {
  const [sidebarTerbuka, setSidebarTerbuka] = useState(false);

  // Proteksi: bila belum login, otomatis kembali ke /login
  if (!pengguna) return <Navigate to="/login" replace />;

  return (
    <div className="admin">
      <Sidebar
        terbuka={sidebarTerbuka}
        onTutup={() => setSidebarTerbuka(false)}
        onKeluar={onKeluar}
      />
      <div className="admin-utama">
        <Header
          nama={pengguna.nama}
          peran={pengguna.peran}
          onMenu={() => setSidebarTerbuka(!sidebarTerbuka)}
        />
        <main className="admin-konten">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
