import { useEffect, useMemo, useState } from "react";
import PlantacaoCard from "../components/PlantacaoCard";
import PlantacaoForm from "../components/PlantacaoForm";
import ResumoPropriedade from "../components/ResumoPropriedade";
import { useProdutor } from "../hooks/useProdutor";
import { STATUS } from "../models/Plantacao";

const FILTROS = ["Todas", ...Object.values(STATUS)];

export default function Plantacoes() {
  const { produtor, propriedade, adicionar, atualizar, remover, colher, restaurar } =
    useProdutor();

  const [formAberto, setFormAberto] = useState(false);
  const [editando, setEditando] = useState(null);
  const [filtro, setFiltro] = useState("Todas");
  const [mensagem, setMensagem] = useState(null);

  // A mensagem de sucesso some sozinha depois de alguns segundos
  useEffect(() => {
    if (!mensagem) return;
    const timer = setTimeout(() => setMensagem(null), 3500);
    return () => clearTimeout(timer);
  }, [mensagem]);

  const plantacoesFiltradas = useMemo(
    () =>
      propriedade.plantacoes
        .filter((p) => filtro === "Todas" || p.getStatus() === filtro)
        .sort((a, b) => a.getDataColheitaPrevista().localeCompare(b.getDataColheitaPrevista())),
    [propriedade, filtro]
  );

  const areaParaFormulario =
    Math.round(
      (propriedade.getAreaDisponivel() +
        (editando && editando.estaAtiva() ? editando.areaHectares : 0)) * 100
    ) / 100;

  function abrirNova() {
    setEditando(null);
    setFormAberto(true);
  }

  function abrirEdicao(plantacao) {
    setEditando(plantacao);
    setFormAberto(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function fecharFormulario() {
    setFormAberto(false);
    setEditando(null);
  }

  function salvar(dados) {
    if (editando) {
      atualizar(editando.id, dados);
      setMensagem({ tipo: "sucesso", texto: "Plantação atualizada com sucesso." });
    } else {
      adicionar(dados);
      setMensagem({ tipo: "sucesso", texto: "Plantação cadastrada com sucesso." });
    }
    fecharFormulario();
  }

  function excluir(plantacao) {
    const confirmou = window.confirm(
      `Excluir a plantação de ${plantacao.cultura.nome}? Esta ação não pode ser desfeita.`
    );
    if (!confirmou) return;
    remover(plantacao.id);
    if (editando?.id === plantacao.id) fecharFormulario();
    setMensagem({ tipo: "sucesso", texto: "Plantação excluída." });
  }

  function registrarColheita(plantacao) {
    if (
      plantacao.getStatus() === STATUS.CRESCIMENTO &&
      !window.confirm(
        `${plantacao.cultura.nome} ainda não completou o ciclo. Registrar a colheita mesmo assim?`
      )
    ) {
      return;
    }
    try {
      colher(plantacao.id);
      setMensagem({ tipo: "sucesso", texto: `Colheita de ${plantacao.cultura.nome} registrada! 🌾` });
    } catch (err) {
      setMensagem({ tipo: "erro", texto: err.message });
    }
  }

  function restaurarExemplos() {
    if (!window.confirm("Substituir todas as plantações pelos dados de exemplo?")) return;
    restaurar();
    fecharFormulario();
    setFiltro("Todas");
    setMensagem({ tipo: "sucesso", texto: "Dados de exemplo restaurados." });
  }

  return (
    <section className="container secao">
      <div className="cabecalho-pagina">
        <div>
          <span className="selo selo--estatico">Nova na Fase 6</span>
          <h1>Gestão de Plantações</h1>
          <p className="texto-suave">
            Cadastre seus plantios, acompanhe o ciclo de cada cultura e saiba a hora certa de colher.
          </p>
        </div>
        {!formAberto && (
          <button className="botao" onClick={abrirNova}>
            + Nova plantação
          </button>
        )}
      </div>

      <ResumoPropriedade produtor={produtor} propriedade={propriedade} />

      {mensagem && (
        <p className={`alerta alerta--${mensagem.tipo}`} role="status">
          {mensagem.texto}
        </p>
      )}

      {formAberto && (
        <PlantacaoForm
          key={editando?.id ?? "nova"}
          inicial={editando}
          areaDisponivel={areaParaFormulario}
          onSalvar={salvar}
          onCancelar={fecharFormulario}
        />
      )}

      <div className="filtros chips">
        {FILTROS.map((f) => (
          <button
            key={f}
            className={`chip ${filtro === f ? "chip--ativo" : ""}`}
            onClick={() => setFiltro(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {plantacoesFiltradas.length > 0 ? (
        <div className="grade">
          {plantacoesFiltradas.map((plantacao) => (
            <PlantacaoCard
              key={plantacao.id}
              plantacao={plantacao}
              onEditar={abrirEdicao}
              onExcluir={excluir}
              onColher={registrarColheita}
            />
          ))}
        </div>
      ) : (
        <p className="vazio">
          {filtro === "Todas"
            ? "Nenhuma plantação cadastrada. Clique em “+ Nova plantação” para começar."
            : `Nenhuma plantação com status “${filtro}”.`}
        </p>
      )}

      <div className="rodape-pagina">
        <button className="botao-link" onClick={restaurarExemplos}>
          Restaurar dados de exemplo
        </button>
      </div>
    </section>
  );
}