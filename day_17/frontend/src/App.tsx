import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import HalamanLogin from "./pages/HalamanLogin";
import HalamanRegister from "./pages/HalamanRegister";
import LayoutAdmin from "./components/layout/LayoutAdmin";
import Beranda from "./pages/admin/Beranda";
import HalamanProduk from "./pages/admin/HalamanProduk";
import HalamanPengguna from "./pages/admin/HalamanPengguna";
import HalamanPengaturan from "./pages/admin/HalamanPengaturan";
import type { Pengguna } from "./data/pengguna";

export default function App() {
  // Daftar pengguna kini ada di database. App hanya menyimpan siapa yang sedang login.
  const [penggunaAktif, setPenggunaAktif] = useState<Pengguna | null>(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={<HalamanLogin onMasuk={setPenggunaAktif} />}
        />
        <Route path="/daftar" element={<HalamanRegister />} />
        <Route
          path="/admin"
          element={
            <LayoutAdmin
              pengguna={penggunaAktif}
              onKeluar={() => setPenggunaAktif(null)}
            />
          }
        >
          <Route index element={<Beranda />} />
          <Route path="produk" element={<HalamanProduk />} />
          <Route path="pengguna" element={<HalamanPengguna />} />
          <Route path="pengaturan" element={<HalamanPengaturan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
