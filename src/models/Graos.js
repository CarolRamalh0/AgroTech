import Cultura from "./Cultura";

export default class Graos extends Cultura {
  #produtividadeKgHa;

  constructor({ produtividadeKgHa, ...dados }) {
    super(dados);
    this.#produtividadeKgHa = produtividadeKgHa;
  }

  get produtividadeKgHa() { return this.#produtividadeKgHa; }

  getCategoria() {
    return "Grãos";
  }

  getDetalhe() {
    return {
      rotulo: "Produtividade média",
      valor: `${this.#produtividadeKgHa.toLocaleString("pt-BR")} kg/ha`,
    };
  }
}