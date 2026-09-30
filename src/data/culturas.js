import Graos from "../models/Graos";
import Hortalica from "../models/Hortalica";
import Fruta from "../models/Fruta";

export const CULTURAS = [
  new Graos({ id: "soja", nome: "Soja", cicloDias: 120, tipoSolo: "Argiloso", icone: "🌱", produtividadeKgHa: 3500 }),
  new Graos({ id: "milho", nome: "Milho", cicloDias: 150, tipoSolo: "Argiloso", icone: "🌽", produtividadeKgHa: 6000 }),
  new Graos({ id: "arroz", nome: "Arroz", cicloDias: 130, tipoSolo: "Argiloso e úmido", icone: "🌾", produtividadeKgHa: 7000 }),
  new Graos({ id: "feijao", nome: "Feijão", cicloDias: 90, tipoSolo: "Areno-argiloso", icone: "🫘", produtividadeKgHa: 1500 }),
  new Hortalica({ id: "alface", nome: "Alface", cicloDias: 45, tipoSolo: "Rico em matéria orgânica", icone: "🥬", espacamentoCm: 30 }),
  new Hortalica({ id: "tomate", nome: "Tomate", cicloDias: 110, tipoSolo: "Areno-argiloso", icone: "🍅", espacamentoCm: 50 }),
  new Hortalica({ id: "cenoura", nome: "Cenoura", cicloDias: 100, tipoSolo: "Arenoso", icone: "🥕", espacamentoCm: 5 }),
  new Fruta({ id: "morango", nome: "Morango", cicloDias: 80, tipoSolo: "Areno-argiloso", icone: "🍓", pesoMedioG: 20 }),
  new Fruta({ id: "melancia", nome: "Melancia", cicloDias: 90, tipoSolo: "Arenoso", icone: "🍉", pesoMedioG: 8000 }),
];

export function buscarCultura(id) {
  return CULTURAS.find((cultura) => cultura.id === id) ?? null;
}