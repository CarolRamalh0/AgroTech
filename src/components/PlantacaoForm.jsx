import { useState } from "react";
import { CULTURAS, buscarCultura } from "../data/culturas";
import { formatarData, hojeISO } from "../utils/datas";

function estadoInicial(inicial) {
  if (!inicial) {
    return { culturaId: "", areaHectares: "", dataPlantio: hojeISO(), observacoes: "" };
  }
  return {
    culturaId: inicial.cultura.id,
    areaHectares: String(inicial.areaHectares),
    dataPlantio: inicial.dataPlantio,
    observacoes: inicial.observacoes,
  };
}

export default function PlantacaoForm({ inicial, areaDisponivel, onSalvar, onCancelar }) {
  const [form, setForm] = useState(() => estadoInicial(inicial));
  const [erro, setErro] = useState("");

  const editando = Boolean(inicial);
  const cultura = buscarCultura(form.culturaId);
  const previsao =
    cultura && form.dataPlantio ? cultura.calcularDataColheita(form.dataPlantio) : null;

  function alterar(e) {
    const { name, value } = e.target;
    setForm((atual) => ({ ...atual, [name]: value }));
    setErro("");
  }

  function enviar(e) {
    e.preventDefault();
    try {
      onSalvar({ ...form, areaHectares: Number(form.areaHectares) });
    } catch (err) {
      setErro(err.message);
    }
  }

  return (
    <form className="card formulario" onSubmit={enviar} noValidate>
      <h2>{editando ? "Editar plantação" : "Nova plantação"}</h2>

      <div className="formulario__grade">
        <label className="formulario__campo">
          Cultura
          <select name="culturaId" value={form.culturaId} onChange={alterar} className="entrada">
            <option value="">Selecione...</option>
            {CULTURAS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.icone} {c.nome} ({c.getCategoria()})
              </option>
            ))}
          </select>
        </label>

        <label className="formulario__campo">
          Área (hectares)
          <input
            type="number"
            name="areaHectares"
            min="0.1"
            step="0.1"
            placeholder="Ex.: 5"
            value={form.areaHectares}
            onChange={alterar}
            className="entrada"
          />
          <small className="texto-suave">
            Disponível: {areaDisponivel.toLocaleString("pt-BR")} ha
          </small>
        </label>

        <label className="formulario__campo">
          Data de plantio
          <input
            type="date"
            name="dataPlantio"
            value={form.dataPlantio}
            onChange={alterar}
            className="entrada"
          />
        </label>

        <label className="formulario__campo formulario__campo--largo">
          Observações (opcional)
          <input
            type="text"
            name="observacoes"
            maxLength={120}
            placeholder="Ex.: Talhão sul, irrigação por gotejamento"
            value={form.observacoes}
            onChange={alterar}
            className="entrada"
          />
        </label>
      </div>

      {previsao && (
        <p className="dica">
          🗓️ Colheita prevista para <strong>{formatarData(previsao)}</strong> (ciclo de{" "}
          {cultura.cicloDias} dias)
        </p>
      )}

      {erro && (
        <p className="alerta alerta--erro" role="alert">
          ⚠️ {erro}
        </p>
      )}

      <div className="formulario__acoes">
        <button type="button" className="botao botao--secundario" onClick={onCancelar}>
          Cancelar
        </button>
        <button type="submit" className="botao">
          {editando ? "Salvar alterações" : "Cadastrar plantação"}
        </button>
      </div>
    </form>
  );
}