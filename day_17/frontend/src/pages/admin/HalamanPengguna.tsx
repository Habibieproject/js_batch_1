import { useEffect, useState } from "react";
import * as api from "../../api/pengguna";
import { keAkun } from "../../data/pengguna";
import type { Pengguna } from "../../data/pengguna";

export default function HalamanPengguna() {
  const [daftarPengguna, setDaftarPengguna] = useState<Pengguna[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .getPengguna()
      .then(setDaftarPengguna)
      .catch((err: Error) => setError(err.message));
  }, []);

  const daftarAkun = daftarPengguna.map(keAkun);

  return (
    <section>
      <h1>Pengguna</h1>
      {error && <p className="error-message">{error}</p>}
      <table className="tabel">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>Peran</th>
            <th>Hak akses</th>
          </tr>
        </thead>
        <tbody>
          {daftarAkun.map((a) => (
            <tr key={a.email}>
              <td>{a.nama}</td>
              <td>{a.email}</td>
              <td>{a.peran()}</td>
              <td>{a.hakAkses().join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
