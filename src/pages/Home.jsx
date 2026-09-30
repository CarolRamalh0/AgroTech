import { Link } from "react-router-dom";
import { SITE } from "../data/siteConfig";
import { getYouTubeId } from "../utils/youtube";

const FUNCIONALIDADES = [
  {
    icone: "🌾",
    titulo: "Catálogo de Culturas",
    texto: "Consulte o ciclo, o tipo e o solo ideal das principais culturas.",
    link: "/culturas",
  },
  {
    icone: "📋",
    titulo: "Gestão de Plantações",
    texto: "Cadastre plantios, acompanhe o status e saiba quando colher.",
    link: "/plantacoes",
    destaque: true,
  },
];

export default function Home() {
  const videoId = getYouTubeId(SITE.videoUrl);

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>{SITE.slogan}</h1>
          <p>
            O Agrotech ajuda pequenos produtores a organizar suas plantações,
            acompanhar cada fase do cultivo e planejar a colheita.
          </p>
          <Link to="/plantacoes" className="botao">
            Começar agora
          </Link>
        </div>
      </section>

      <section className="container secao">
        <h2>Funcionalidades</h2>
        <div className="grade">
          {FUNCIONALIDADES.map((f) => (
            <Link key={f.link} to={f.link} className="card card--link">
              {f.destaque && <span className="selo">Nova na Fase 6</span>}
              <span className="card__icone" aria-hidden="true">{f.icone}</span>
              <h3>{f.titulo}</h3>
              <p className="texto-suave">{f.texto}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container secao">
        <h2>Pitch do projeto</h2>
        {videoId ? (
          <>
            <div className="video">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Pitch do projeto Agrotech"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="video__link">
              Assista no YouTube:{" "}
              <a href={SITE.videoUrl} target="_blank" rel="noreferrer">
                {SITE.videoUrl}
              </a>
            </p>
          </>
        ) : (
          <div className="card video--vazio">
            <p>🎬 O vídeo de apresentação será publicado em breve.</p>
          </div>
        )}
      </section>
    </>
  );
}