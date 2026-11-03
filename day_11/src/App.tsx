import { useState } from "react";
import produk from "../data/produk.json";
import KartuProduk from "../components/KartuProduk";

import "./App.css";

function App() {
  const [hanyaMenipis, setHanyaMenipis] = useState(false);
  const [sudahMasuk, setSudahMasuk] = useState(false);
  const [email, setEmail] = useState("");

  const handleMasuk = (e) => {
    e.preventDefault();
    if (email.trim()) return setSudahMasuk(true);
  };

  const handleKeluar = (e) => {
    setEmail("");
    return setSudahMasuk(false);
  };

  const tampil = hanyaMenipis ? produk.filter((p) => p.stok < 5) : produk;
  return (
    <main>
      <h1>Daftar Produk</h1>
      <button onClick={() => setHanyaMenipis(!hanyaMenipis)}>
        {hanyaMenipis ? "Tampilkan semua" : "Stok menipis saja"}
      </button>
      <div className="daftar-kartu">
        {tampil.map((p) => (
          <KartuProduk nama={p.nama} harga={p.harga} stok={p.stok} />
        ))}
        {/* <KartuProduk nama="Beras 5kg" harga={75000} stok={8} />
        <KartuProduk nama="Gula 1kg" harga={16000} stok={0} /> */}
      </div>

      <div>
        <button onClick={() => setSudahMasuk(!sudahMasuk)}>
          {sudahMasuk ? "Keluar" : "Simulasi Masuk"}
        </button>

        {sudahMasuk && <p className="sapaan">Selamat datang kembali, Sari!</p>}
      </div>

      {sudahMasuk ? (
        <div>
          <p className="sapaan">Selamat datang kembali, {email}!</p>
          <button onClick={handleKeluar}> Keluar</button>
        </div>
      ) : (
        <form onSubmit={handleMasuk}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@domain.com"
              required
            />
          </div>
          <button>Masuk</button>
        </form>
      )}
    </main>
  );
}

export default App;
