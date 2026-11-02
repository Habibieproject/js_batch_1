import { useState } from 'react'
import produk from '../data/produk.json'
import KartuProduk from '../components/KartuProduk'

import './App.css'

function App() {
  const [hanyaMenipis, setHanyaMenipis] = useState(false);
const tampil = hanyaMenipis
    ? produk.filter((p) => p.stok < 5)
    : produk;
  return (
    <main>
      <h1>Daftar Produk</h1>
      <button onClick={() => setHanyaMenipis(!hanyaMenipis)}>
 {hanyaMenipis ? "Tampilkan semua" : "Stok menipis saja"}
 </button>
      <div className="daftar-kartu">
        {tampil.map((p) => (
 <KartuProduk
 nama={p.nama}
 harga={p.harga}
 stok={p.stok}
 />
 ))}
        {/* <KartuProduk nama="Beras 5kg" harga={75000} stok={8} />
        <KartuProduk nama="Gula 1kg" harga={16000} stok={0} /> */}
      </div>
    </main>
  );
}

export default App



