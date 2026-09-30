import { EQUIPE } from "../data/siteConfig";

export default function Sobre() {
  return (
    <section className="container secao">
      <h1>Equipe</h1>
      <p className="texto-suave">Projeto desenvolvido para o PBL Agrotech, Fase 6.</p>
      <div className="grade">
        {EQUIPE.map((pessoa) => (
          <div key={pessoa.nome} className="card">
            <span className="avatar" aria-hidden="true">
              {pessoa.nome.charAt(0)}
            </span>
            <h3>{pessoa.nome}</h3>
            <p className="texto-suave">{pessoa.papel}</p>
          </div>
        ))}
      </div>
    </section>
  );
}