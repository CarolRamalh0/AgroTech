import { SITE } from "../data/siteConfig";

export default function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <p>© {ano} {SITE.nome} · Projeto acadêmico PBL · Fase 6</p>
      </div>
    </footer>
  );
}