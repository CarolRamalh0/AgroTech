import { STATUS } from "../models/Plantacao";
import { formatarData } from "../utils/datas";

const CLASSE_STATUS = {
  [STATUS.PLANEJADA]: "status--planejada",
  [STATUS.CRESCIMENTO]: "status--crescimento",
  [STATUS.PRONTA]: "status--pronta",
  [STATUS.COLHIDA]: "status--colhida",
};

function textoPrazo(plantacao, status) {
  const dias = plantacao.getDiasParaColheita();
  if (status === STATUS.COLHIDA) return `Colhida em ${formatarData(plantacao.dataColheitaReal)}`;
  if (status === STATUS.PLANEJADA) return `Plantio em ${formatarData(plantacao.dataPlantio)}`;
  if (status === STATUS.PRONTA) {
    return dias === 0 ? "Pronta para colher hoje" : `Pronta há ${Math.abs(dias)} dia(s)`;
  }
  return `Faltam ${dias} dia(s) para a colheita`;
}

export default function PlantacaoCard({ plantacao, onEditar, onExcluir, onColher }) {
  const status = plantacao.getStatus();
  const progresso = plantacao.getProgresso();
  const podeColher = status === STATUS.CRESCIMENTO || status === STATUS.PRONTA;
  const { cultura } = plantacao;

  return (
    <article className="card">
      <div className="cultura__topo">
        <span className="card__icone" aria-hidden="true">{cultura.icone}</span>
        <span className={`status ${CLASSE_STATUS[status]}`}>{status}</span>
      </div>

      <h3>{cultura.nome}</h3>

      <ul className="info-lista">
        <li><strong>Área:</strong> {plantacao.areaHectares.toLocaleString("pt-BR")} ha</li>
        <li><strong>Plantio:</strong> {formatarData(plantacao.dataPlantio)}</li>
        <li><strong>Colheita prevista:</strong> {formatarData(plantacao.getDataColheitaPrevista())}</li>
        {plantacao.observacoes && <li><strong>Obs.:</strong> {plantacao.observacoes}</li>}
      </ul>

      <div
        className="progresso"
        role="progressbar"
        aria-valuenow={progresso}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progresso do ciclo: ${progresso}%`}
      >
        <div className="progresso__barra" style={{ width: `${progresso}%` }} />
      </div>
      <p className="progresso__texto texto-suave">
        {progresso}% do ciclo · {textoPrazo(plantacao, status)}
      </p>

      <div className="plantacao__acoes">
        {podeColher && (
          <button className="botao botao--pequeno" onClick={() => onColher(plantacao)}>
            🌾 Colher
          </button>
        )}
        <button className="botao botao--pequeno botao--secundario" onClick={() => onEditar(plantacao)}>
          ✏️ Editar
        </button>
        <button className="botao botao--pequeno botao--perigo" onClick={() => onExcluir(plantacao)}>
          🗑️ Excluir
        </button>
      </div>
    </article>
  );
}