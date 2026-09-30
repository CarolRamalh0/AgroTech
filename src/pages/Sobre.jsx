import { AUTORA, SITE } from "../data/siteConfig";

const TECNOLOGIAS = [
  "React",
  "Vite",
  "React Router",
  "JavaScript (classes e POO)",
  "localStorage",
  "PlantUML",
  "Vercel",
];

export default function Sobre() {
  return (
    <section className="container secao">
      <h1>Sobre o projeto</h1>
      <p className="texto-suave">
        Projeto desenvolvido para o PBL Agrotech, Fase 6.
      </p>

      <div className="grade">
        <div className="card">
          <span className="avatar" aria-hidden="true">
            {AUTORA.nome.charAt(0)}
          </span>
          <h3>{AUTORA.nome}</h3>
          <p className="texto-suave">{AUTORA.papel}</p>
        </div>

        <div className="card">
          <h3>Tecnologias</h3>
          <div className="tags">
            {TECNOLOGIAS.map((tec) => (
              <span key={tec} className="badge">{tec}</span>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>Links</h3>
          <ul className="info-lista">
            <li>
              <a href={SITE.repositorio} target="_blank" rel="noreferrer">
                Repositório no GitHub
              </a>
            </li>
            {SITE.videoUrl && (
              <li>
                <a href={SITE.videoUrl} target="_blank" rel="noreferrer">
                  Vídeo pitch no YouTube
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}