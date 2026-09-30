export function paraData(iso) {
  const [ano, mes, dia] = iso.split("-").map(Number);
  return new Date(ano, mes - 1, dia);
}

export function paraISO(data) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const dia = String(data.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

export function hojeISO() {
  return paraISO(new Date());
}

export function adicionarDias(iso, dias) {
  const data = paraData(iso);
  data.setDate(data.getDate() + dias);
  return paraISO(data);
}

export function diferencaEmDias(isoInicio, isoFim) {
  return Math.round((paraData(isoFim) - paraData(isoInicio)) / 86400000);
}

export function formatarData(iso) {
  return paraData(iso).toLocaleDateString("pt-BR");
}