import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import Toast from "../components/Toast";
import type { Pengguna } from "../data/pengguna";

type Props = {
  daftarPengguna: Pengguna[];
  onMasuk: (p: Pengguna) => void;
};
type FormErrors = { email?: string; password?: string };
type InfoToast = { teks: string; jenis: "sukses" | "gagal" };

export default function HalamanLogin({ daftarPengguna, onMasuk }: Props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState<InfoToast | null>(null);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (email === "") errs.email = "Email wajib diisi";
    else if (!email.includes("@")) errs.email = "Format email salah";
    if (password === "") errs.password = "Password wajib diisi";
    else if (password.length < 8) errs.password = "Minimal 8 karakter";
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
    if (Object.keys(validationErrors).length > 0) return;

    const cocok = daftarPengguna.find(
      (p) => p.email === email && p.password === password,
    );
    if (!cocok) {
      tampilkanToast("Email atau password salah", "gagal");
      return;
    }
    onMasuk(cocok);
    navigate("/admin");
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <h2>Masuk KasirKu</h2>
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

        <button type="submit">Masuk</button>
        <p>
          Belum punya akun? <Link to="/daftar">Daftar</Link>
        </p>
      </form>
      {toast && <Toast teks={toast.teks} jenis={toast.jenis} />}
    </>
  );
}
