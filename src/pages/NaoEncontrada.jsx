import { Link } from "react-router-dom";

export default function NaoEncontrada() {
  return (
    <section className="container secao centralizado">
      <h1>Página não encontrada 🌾</h1>
      <p className="texto-suave">O endereço que você procurou não existe.</p>
      <Link to="/" className="botao">Voltar ao início</Link>
    </section>
  );
}