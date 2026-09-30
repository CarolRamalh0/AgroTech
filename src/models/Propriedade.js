import Plantacao from "./Plantacao";

const arredondar = (numero) => Math.round(numero * 100) / 100;

export default class Propriedade {
  #id;
  #nome;
  #localizacao;
  #areaTotalHa;
  #plantacoes;

  constructor({ id, nome, localizacao, areaTotalHa, plantacoes = [] }) {
    this.#id = id;
    this.#nome = nome;
    this.#localizacao = localizacao;
    this.#areaTotalHa = areaTotalHa;
    this.#plantacoes = plantacoes;
  }

  get id() { return this.#id; }
  get nome() { return this.#nome; }
  get localizacao() { return this.#localizacao; }
  get areaTotalHa() { return this.#areaTotalHa; }
  get plantacoes() { return [...this.#plantacoes]; }

  getAreaPlantada() {
    const total = this.#plantacoes
      .filter((p) => p.estaAtiva())
      .reduce((soma, p) => soma + p.areaHectares, 0);
    return arredondar(total);
  }

  getAreaDisponivel() {
    return arredondar(this.#areaTotalHa - this.getAreaPlantada());
  }

  buscarPlantacao(id) {
    const plantacao = this.#plantacoes.find((p) => p.id === id);
    if (!plantacao) throw new Error("Plantação não encontrada.");
    return plantacao;
  }

  adicionarPlantacao(plantacao) {
    this.#validarArea(plantacao.areaHectares, this.getAreaDisponivel());
    this.#plantacoes.push(plantacao);
  }

  atualizarPlantacao(id, novosDados) {
    const antiga = this.buscarPlantacao(id);
    const atualizada = Plantacao.fromJSON({ ...antiga.toJSON(), ...novosDados, id });
    const areaLiberada = antiga.estaAtiva() ? antiga.areaHectares : 0;

    if (atualizada.estaAtiva()) {
      this.#validarArea(atualizada.areaHectares, this.getAreaDisponivel() + areaLiberada);
    }
    this.#plantacoes = this.#plantacoes.map((p) => (p.id === id ? atualizada : p));
  }

  removerPlantacao(id) {
    this.buscarPlantacao(id);
    this.#plantacoes = this.#plantacoes.filter((p) => p.id !== id);
  }

  colherPlantacao(id, data) {
    this.buscarPlantacao(id).colher(data);
  }

  #validarArea(area, disponivel) {
    const limite = arredondar(disponivel);
    if (area > limite) {
      throw new Error(
        `Área insuficiente: restam apenas ${limite.toLocaleString("pt-BR")} ha disponíveis.`
      );
    }
  }

  toJSON() {
    return {
      id: this.#id,
      nome: this.#nome,
      localizacao: this.#localizacao,
      areaTotalHa: this.#areaTotalHa,
      plantacoes: this.#plantacoes.map((p) => p.toJSON()),
    };
  }

  static fromJSON({ plantacoes = [], ...dados }) {
    return new Propriedade({
      ...dados,
      plantacoes: plantacoes.map((p) => Plantacao.fromJSON(p)),
    });
  }
}