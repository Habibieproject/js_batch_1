import { Menu } from "lucide-react";

type Props = {
  nama: string;
  peran: string;
  onMenu: () => void;
};

export default function Header({ nama, peran, onMenu }: Props) {
  return (
    <header className="header">
      <button
        type="button"
        className="header-menu"
        onClick={onMenu}
        aria-label="Buka menu"
      >
        <Menu size={20} />
      </button>
      <span className="header-judul">Panel Admin</span>
      <span className="header-pengguna">
        {nama} <span className="badge">{peran}</span>
      </span>
    </header>
  );
}
