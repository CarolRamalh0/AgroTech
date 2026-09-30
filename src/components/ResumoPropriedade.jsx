import { STATUS } from "../models/Plantacao";

const formatarHa = (numero) => `${numero.toLocaleString("pt-BR")} ha`;

export default function ResumoPropriedade({ produtor, propriedade }) {
  const prontas = propriedade.plantacoes.filter(
    (p) => p.getStatus() === STATUS.PRONTA
  ).length;

  const indicadores = [
    { rotulo: "Área total", valor: formatarHa(propriedade.areaTotalHa) },
    { rotulo: "Em uso", valor: formatarHa(propriedade.getAreaPlantada()) },
    { rotulo: "Disponível", valor: formatarHa(propriedade.getAreaDisponivel()) },
    { rotulo: "Prontas para colher", valor: prontas },
  ];

  return (
    <div className="resumo">
      <p className="texto-suave resumo__titulo">
        👨‍🌾 {produtor.nome} · 📍 {propriedade.nome}, {propriedade.localizacao}
      </p>
      <div className="indicadores">
        {indicadores.map((item) => (
          <div key={item.rotulo} className="indicador">
            <span className="indicador__valor">{item.valor}</span>
            <span className="indicador__rotulo">{item.rotulo}</span>
          </div>
        ))}
      </div>
    </div>
  );
}