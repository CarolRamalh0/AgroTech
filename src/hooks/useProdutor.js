import { useEffect, useMemo, useState } from "react";
import Produtor from "../models/Produtor";
import Plantacao from "../models/Plantacao";
import { criarDadosIniciais } from "../data/produtorInicial";

const CHAVE = "agrotech:produtor";

function carregarDados() {
  try {
    const salvo = localStorage.getItem(CHAVE);
    if (salvo) {
      const dados = JSON.parse(salvo);
      Produtor.fromJSON(dados); // valida se os dados salvos ainda são compatíveis
      return dados;
    }
  } catch {
    // dados ausentes ou corrompidos: usa os dados de exemplo
  }
  return criarDadosIniciais();
}

export function useProdutor() {
  const [dados, setDados] = useState(carregarDados);

  useEffect(() => {
    localStorage.setItem(CHAVE, JSON.stringify(dados));
  }, [dados]);

  const produtor = useMemo(() => Produtor.fromJSON(dados), [dados]);
  const propriedade = produtor.propriedades[0];

  // Trabalha numa cópia; se a regra de negócio lançar erro, nada é salvo
  function executar(acao) {
    const copia = Produtor.fromJSON(dados);
    acao(copia.propriedades[0]);
    setDados(copia.toJSON());
  }

  return {
    produtor,
    propriedade,
    adicionar: (form) => executar((p) => p.adicionarPlantacao(Plantacao.fromJSON(form))),
    atualizar: (id, form) => executar((p) => p.atualizarPlantacao(id, form)),
    remover: (id) => executar((p) => p.removerPlantacao(id)),
    colher: (id) => executar((p) => p.colherPlantacao(id)),
    restaurar: () => setDados(criarDadosIniciais()),
  };
}