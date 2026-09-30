import Cultura from "./Cultura";

export default class Fruta extends Cultura {
  #pesoMedioG;

  constructor({ pesoMedioG, ...dados }) {
    super(dados);
    this.#pesoMedioG = pesoMedioG;
  }

  get pesoMedioG() { return this.#pesoMedioG; }

  getCategoria() {
    return "Frutas";
  }

  getDetalhe() {
    const valor =
      this.#pesoMedioG >= 1000
        ? `${(this.#pesoMedioG / 1000).toLocaleString("pt-BR")} kg`
        : `${this.#pesoMedioG} g`;
    return { rotulo: "Peso médio do fruto", valor };
  }
}