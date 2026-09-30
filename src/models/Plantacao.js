import { buscarCultura } from "../data/culturas";
import { diferencaEmDias, hojeISO } from "../utils/datas";

export const STATUS = {
  PLANEJADA: "Planejada",
  CRESCIMENTO: "Em crescimento",
  PRONTA: "Pronta para colher",
  COLHIDA: "Colhida",
};

function gerarId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export default class Plantacao {
  #id;
  #cultura;
  #areaHectares;
  #dataPlantio;
  #dataColheitaReal;
  #observacoes;

  constructor({
    id = gerarId(),
    cultura,
    areaHectares,
    dataPlantio,
    dataColheitaReal = null,
    observacoes = "",
  }) {
    if (!cultura) throw new Error("Selecione uma cultura.");
    if (!(Number(areaHectares) > 0)) throw new Error("A área deve ser maior que zero.");
    if (!dataPlantio) throw new Error("Informe a data de plantio.");

    this.#id = id;
    this.#cultura = cultura;
    this.#areaHectares = Number(areaHectares);
    this.#dataPlantio = dataPlantio;
    this.#dataColheitaReal = dataColheitaReal;
    this.#observacoes = (observacoes ?? "").trim();
  }

  get id() { return this.#id; }
  get cultura() { return this.#cultura; }
  get areaHectares() { return this.#areaHectares; }
  get dataPlantio() { return this.#dataPlantio; }
  get dataColheitaReal() { return this.#dataColheitaReal; }
  get observacoes() { return this.#observacoes; }

  getDataColheitaPrevista() {
    return this.#cultura.calcularDataColheita(this.#dataPlantio);
  }

  getStatus(hoje = hojeISO()) {
    if (this.#dataColheitaReal) return STATUS.COLHIDA;
    if (hoje < this.#dataPlantio) return STATUS.PLANEJADA;
    if (hoje >= this.getDataColheitaPrevista()) return STATUS.PRONTA;
    return STATUS.CRESCIMENTO;
  }

  getProgresso(hoje = hojeISO()) {
    if (this.#dataColheitaReal) return 100;
    const diasDecorridos = diferencaEmDias(this.#dataPlantio, hoje);
    const percentual = (diasDecorridos / this.#cultura.cicloDias) * 100;
    return Math.min(100, Math.max(0, Math.round(percentual)));
  }

  getDiasParaColheita(hoje = hojeISO()) {
    return diferencaEmDias(hoje, this.getDataColheitaPrevista());
  }

  estaAtiva() {
    return !this.#dataColheitaReal;
  }

  colher(data = hojeISO()) {
    if (!this.estaAtiva()) throw new Error("Esta plantação já foi colhida.");
    if (this.getStatus(data) === STATUS.PLANEJADA) {
      throw new Error("Não é possível colher uma plantação que ainda não foi plantada.");
    }
    this.#dataColheitaReal = data;
  }

  toJSON() {
    return {
      id: this.#id,
      culturaId: this.#cultura.id,
      areaHectares: this.#areaHectares,
      dataPlantio: this.#dataPlantio,
      dataColheitaReal: this.#dataColheitaReal,
      observacoes: this.#observacoes,
    };
  }

  static fromJSON({ culturaId, ...dados }) {
    return new Plantacao({ ...dados, cultura: buscarCultura(culturaId) });
  }
}