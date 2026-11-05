import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router";
import Toast from "../components/Toast";
import type { Pengguna } from "../data/pengguna";

type Props = {
  daftarPengguna: Pengguna[];
  onDaftar: (baru: Pengguna) => void;
};
type FormErrors = {
  nama?: string;
  email?: string;
  password?: string;
  ulangiPassword?: string;
  setuju?: string;
};
type InfoToast = { teks: string; jenis: "sukses" | "gagal" };

export default function HalamanRegister({ daftarPengguna, onDaftar }: Props) {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ulangiPassword, setUlangiPassword] = useState("");
  const [setuju, setSetuju] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState<InfoToast | null>(null);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (nama === "") errs.nama = "Nama wajib diisi";
    if (email === "") errs.email = "Email wajib diisi";
    else if (!email.includes("@")) errs.email = "Format email salah";
    else if (daftarPengguna.some((p) => p.email === email)) {
      errs.email = "Email sudah terdaftar";
    }
    if (password.length < 8) errs.password = "Minimal 8 karakter";
    if (ulangiPassword !== password)
      errs.ulangiPassword = "Password tidak sama";
    if (!setuju) errs.setuju = "Wajib centang setuju";
    return errs;
  }

  function tampilkanToast(teks: string, jenis: "sukses" | "gagal") {
    setToast({ teks, jenis });
    setTimeout(() => setToast(null), 3000);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      tampilkanToast("Periksa lagi isian yang merah", "gagal");
      return;
    }
    onDaftar({ nama, email, password, peran: "kasir" });
    tampilkanToast("Pendaftaran berhasil, silakan masuk", "sukses");
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <h2>Daftar Kasir</h2>
        <label htmlFor="nama">Nama</label>
        <input
          id="nama"
          value={nama}
          className={errors.nama ? "error" : ""}
          onChange={(e) => setNama(e.target.value)}
        />
        {errors.nama && <small className="error-message">{errors.nama}</small>}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          className={errors.email ? "error" : ""}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <small className="error-message">{errors.email}</small>
        )}
        <label htmlFor="password">Password</label>
        <div className="password-row">
          <input
            id="password"
            value={password}
            type={showPassword ? "text" : "password"}
            className={errors.password ? "error" : ""}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Sembunyikan" : "Lihat"}
          </button>
        </div>
        {errors.password && (
          <small className="error-message">{errors.password}</small>
        )}

        <label htmlFor="ulangi">Ulangi password</label>
        <input
          id="ulangi"
          value={ulangiPassword}
          type={showPassword ? "text" : "password"}
          className={errors.ulangiPassword ? "error" : ""}
          onChange={(e) => setUlangiPassword(e.target.value)}
        />
        {errors.ulangiPassword && (
          <small className="error-message">{errors.ulangiPassword}</small>
        )}
        <label>
          <input
            type="checkbox"
            checked={setuju}
            onChange={(e) => setSetuju(e.target.checked)}
          />{" "}
          Saya setuju dengan syarat & ketentuan
        </label>
        {errors.setuju && (
          <small className="error-message">{errors.setuju}</small>
        )}

        <button type="submit">Daftar</button>
        <p>
          Sudah punya akun? <Link to="/login">Masuk</Link>
        </p>
      </form>
      {toast && <Toast teks={toast.teks} jenis={toast.jenis} />}
    </>
  );
}
