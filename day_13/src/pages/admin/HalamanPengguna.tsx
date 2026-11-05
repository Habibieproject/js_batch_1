import { keAkun } from "../../data/pengguna";
import type { Pengguna } from "../../data/pengguna";

type Props = { daftarPengguna: Pengguna[] };

export default function HalamanPengguna({ daftarPengguna }: Props) {
  const daftarAkun = daftarPengguna.map(keAkun);

  return (
    <section>
      <h1>Pengguna</h1>
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
