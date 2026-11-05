import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import HalamanLogin from "./pages/HalamanLogin";
import HalamanRegister from "./pages/HalamanRegister";
import LayoutAdmin from "./components/layout/LayoutAdmin";
import Beranda from "./pages/admin/Beranda";
import HalamanProduk from "./pages/admin/HalamanProduk";
import HalamanPengguna from "./pages/admin/HalamanPengguna";
import HalamanPengaturan from "./pages/admin/HalamanPengaturan";
import { penggunaAwal } from "./data/pengguna";
import type { Pengguna } from "./data/pengguna";

export default function App() {
  const [pengguna, setPengguna] = useState<Pengguna[]>(penggunaAwal);
  const [penggunaAktif, setPenggunaAktif] = useState<Pengguna | null>(null);

  function tambahPengguna(baru: Pengguna) {
    setPengguna([...pengguna, baru]);
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={
            <HalamanLogin
              daftarPengguna={pengguna}
              onMasuk={setPenggunaAktif}
            />
          }
        />
        <Route
          path="/daftar"
          element={
            <HalamanRegister
              daftarPengguna={pengguna}
              onDaftar={tambahPengguna}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <LayoutAdmin
              pengguna={penggunaAktif}
              onKeluar={() => setPenggunaAktif(null)}
            />
          }
        >
          <Route index element={<Beranda daftarPengguna={pengguna} />} />
          <Route path="produk" element={<HalamanProduk />} />
          <Route
            path="pengguna"
            element={<HalamanPengguna daftarPengguna={pengguna} />}
          />
          <Route path="pengaturan" element={<HalamanPengaturan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
