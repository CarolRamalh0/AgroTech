import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const LINKS = [
  { para: "/", texto: "Início" },
  { para: "/culturas", texto: "Culturas" },
  { para: "/plantacoes", texto: "Plantações" },
  { para: "/sobre", texto: "Equipe" },
];

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const fecharMenu = () => setMenuAberto(false);

  return (
    <header className="header">
      <div className="container header__conteudo">
        <Link to="/" className="logo" onClick={fecharMenu}>
          <span aria-hidden="true">🌱</span> Agrotech
        </Link>

        <button
          className="menu-botao"
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
          onClick={() => setMenuAberto(!menuAberto)}
        >
          {menuAberto ? "✕" : "☰"}
        </button>

        <nav className={`nav ${menuAberto ? "nav--aberto" : ""}`}>
          {LINKS.map((link) => (
            <NavLink
              key={link.para}
              to={link.para}
              end={link.para === "/"}
              className={({ isActive }) =>
                `nav__link ${isActive ? "nav__link--ativo" : ""}`
              }
              onClick={fecharMenu}
            >
              {link.texto}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}