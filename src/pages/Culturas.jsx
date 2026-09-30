import { useMemo, useState } from "react";
import CulturaCard from "../components/CulturaCard";
import { CULTURAS } from "../data/culturas";

const CATEGORIAS = ["Todas", "Grãos", "Hortaliças", "Frutas"];

function normalizar(texto) {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export default function Culturas() {
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("Todas");

  const culturasFiltradas = useMemo(
    () =>
      CULTURAS.filter(
        (cultura) =>
          (categoria === "Todas" || cultura.getCategoria() === categoria) &&
          normalizar(cultura.nome).includes(normalizar(busca))
      ),
    [busca, categoria]
  );

  return (
    <section className="container secao">
      <h1>Catálogo de Culturas</h1>
      <p className="texto-suave">
        Consulte as principais culturas, seus ciclos e o solo ideal para cada uma.
      </p>

      <div className="filtros">
        <input
          type="search"
          className="campo"
          placeholder="Buscar cultura..."
          aria-label="Buscar cultura"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <div className="chips">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat}
              className={`chip ${categoria === cat ? "chip--ativo" : ""}`}
              onClick={() => setCategoria(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <p className="texto-suave contador">
        {culturasFiltradas.length} cultura(s) encontrada(s)
      </p>

      {culturasFiltradas.length > 0 ? (
        <div className="grade">
          {culturasFiltradas.map((cultura) => (
            <CulturaCard key={cultura.id} cultura={cultura} />
          ))}
        </div>
      ) : (
        <p className="vazio">Nenhuma cultura encontrada. Tente outro termo.</p>
      )}
    </section>
  );
}