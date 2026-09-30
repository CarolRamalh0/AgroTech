import { adicionarDias, hojeISO } from "../utils/datas";

export function criarDadosIniciais() {
  const hoje = hojeISO();

  return {
    nome: "João da Silva",
    email: "joao.silva@agrotech.com",
    propriedades: [
      {
        id: "sitio-boa-esperanca",
        nome: "Sítio Boa Esperança",
        localizacao: "Viamão - RS",
        areaTotalHa: 50,
        plantacoes: [
          { id: "exemplo-1", culturaId: "soja", areaHectares: 20, dataPlantio: adicionarDias(hoje, -70), dataColheitaReal: null, observacoes: "Talhão norte" },
          { id: "exemplo-2", culturaId: "alface", areaHectares: 2, dataPlantio: adicionarDias(hoje, -50), dataColheitaReal: null, observacoes: "Estufa 1" },
          { id: "exemplo-3", culturaId: "milho", areaHectares: 15, dataPlantio: adicionarDias(hoje, 7), dataColheitaReal: null, observacoes: "" },
          { id: "exemplo-4", culturaId: "morango", areaHectares: 1.5, dataPlantio: adicionarDias(hoje, -100), dataColheitaReal: adicionarDias(hoje, -15), observacoes: "Ótima safra" },
        ],
      },
    ],
  };
}