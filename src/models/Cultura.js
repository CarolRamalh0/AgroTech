import { adicionarDias } from "../utils/datas";

export default class Cultura {
  #id;
  #nome;
  #cicloDias;
  #tipoSolo;
  #icone;

  constructor({ id, nome, cicloDias, tipoSolo, icone = "🌱" }) {
    if (new.target === Cultura) {
      throw new Error("Cultura é abstrata: use Graos, Hortalica ou Fruta.");
    }
    this.#id = id;
    this.#nome = nome;
    this.#cicloDias = cicloDias;
    this.#tipoSolo = tipoSolo;
    this.#icone = icone;
  }

  get id() { return this.#id; }
  get nome() { return this.#nome; }
  get cicloDias() { return this.#cicloDias; }
  get tipoSolo() { return this.#tipoSolo; }
  get icone() { return this.#icone; }

  calcularDataColheita(dataPlantio) {
    return adicionarDias(dataPlantio, this.#cicloDias);
  }

  // Métodos abstratos: cada subclasse implementa do seu jeito (polimorfismo)
  getCategoria() {
    throw new Error("Método abstrato: implemente na subclasse.");
  }

  getDetalhe() {
    throw new Error("Método abstrato: implemente na subclasse.");
  }
}