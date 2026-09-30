import Cultura from "./Cultura";

export default class Hortalica extends Cultura {
  #espacamentoCm;

  constructor({ espacamentoCm, ...dados }) {
    super(dados);
    this.#espacamentoCm = espacamentoCm;
  }

  get espacamentoCm() { return this.#espacamentoCm; }

  getCategoria() {
    return "Hortaliças";
  }

  getDetalhe() {
    return {
      rotulo: "Espaçamento entre plantas",
      valor: `${this.#espacamentoCm} cm`,
    };
  }
}