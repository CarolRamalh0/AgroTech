import Propriedade from "./Propriedade";

export default class Produtor {
  #nome;
  #email;
  #propriedades;

  constructor({ nome, email }) {
    this.#nome = nome;
    this.#email = email;
    this.#propriedades = [];
  }

  get nome() { return this.#nome; }
  get email() { return this.#email; }
  get propriedades() { return [...this.#propriedades]; }

  adicionarPropriedade(propriedade) {
    this.#propriedades.push(propriedade);
  }

  getAreaTotal() {
    return this.#propriedades.reduce((soma, p) => soma + p.areaTotalHa, 0);
  }

  toJSON() {
    return {
      nome: this.#nome,
      email: this.#email,
      propriedades: this.#propriedades.map((p) => p.toJSON()),
    };
  }

  static fromJSON({ propriedades = [], ...dados }) {
    const produtor = new Produtor(dados);
    propriedades.forEach((p) => produtor.adicionarPropriedade(Propriedade.fromJSON(p)));
    return produtor;
  }
}