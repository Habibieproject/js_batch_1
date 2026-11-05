import { NavLink, useNavigate } from "react-router";
import { LogOut } from "lucide-react";
import { menuAdmin } from "../../config/menu";

type Props = {
  terbuka: boolean;
  onTutup: () => void;
  onKeluar: () => void;
};

export default function Sidebar({ terbuka, onTutup, onKeluar }: Props) {
  const navigate = useNavigate();

  function handleKeluar() {
    onKeluar();
    navigate("/login");
  }

  return (
    <>
      <aside className={terbuka ? "sidebar terbuka" : "sidebar"}>
        <div className="sidebar-brand">KasirKu</div>
        <nav className="sidebar-menu">
          {menuAdmin.map((menu) => (
            <NavLink
              key={menu.path}
              to={menu.path}
              end={menu.path === "/admin"}
              className="sidebar-link"
              onClick={onTutup}
            >
              <menu.ikon size={18} />
              {menu.label}
            </NavLink>
          ))}
        </nav>
        <button type="button" className="sidebar-keluar" onClick={handleKeluar}>
          <LogOut size={18} />
          Keluar
        </button>
      </aside>
      {terbuka && <div className="sidebar-latar" onClick={onTutup} />}
    </>
  );
}
