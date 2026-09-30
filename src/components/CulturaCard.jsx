import { hojeISO, formatarData } from "../utils/datas";

export default function CulturaCard({ cultura }) {
  const detalhe = cultura.getDetalhe();
  const colheitaSeHoje = cultura.calcularDataColheita(hojeISO());

  return (
    <article className="card">
      <div className="cultura__topo">
        <span className="card__icone" aria-hidden="true">{cultura.icone}</span>
        <span className="badge">{cultura.getCategoria()}</span>
      </div>
      <h3>{cultura.nome}</h3>
      <ul className="info-lista">
        <li><strong>Ciclo:</strong> {cultura.cicloDias} dias</li>
        <li><strong>Solo ideal:</strong> {cultura.tipoSolo}</li>
        <li><strong>{detalhe.rotulo}:</strong> {detalhe.valor}</li>
      </ul>
      <p className="dica">
        🗓️ Plantando hoje, colheita prevista em{" "}
        <strong>{formatarData(colheitaSeHoje)}</strong>
      </p>
    </article>
  );
}