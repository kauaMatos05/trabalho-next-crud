export function formatarPreco(valor: number) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: valor < 1 ? 6 : 2,
  });
}

export function formatarCompacto(valor: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(valor);
}

// Participação, dominância etc. Ex.: 45.27 -> "45,3%"
export function formatarParticipacao(valor: number) {
  return `${valor.toFixed(1).replace(".", ",")}%`;
}

// Variação de preço, com sinal. Ex.: 1.5 -> "+1,50%"
export function formatarVariacao(valor: number | null) {
  if (valor === null) return "—";
  const sinal = valor > 0 ? "+" : "";
  return `${sinal}${valor.toFixed(2).replace(".", ",")}%`;
}

export function corVariacao(valor: number | null) {
  if (valor === null) return "text-slate-400";
  return valor >= 0 ? "text-emerald-600" : "text-red-600";
}
