// Regras de negócio puras: recebem a lista de moedas e devolvem números
import type { Direcao, Moeda } from "./tipos";

function somar(moedas: Moeda[], campo: (m: Moeda) => number) {
  return moedas.reduce((soma, m) => soma + campo(m), 0);
}

export function variacao24h(m: Moeda) {
  return m.price_change_percentage_24h_in_currency;
}

export function variacao7d(m: Moeda) {
  return m.price_change_percentage_7d_in_currency;
}

export function calcularResumo(moedas: Moeda[]) {
  const valorTotal = somar(moedas, (m) => m.market_cap);
  const variacaoValor = somar(moedas, (m) => m.market_cap_change_24h ?? 0);
  const bitcoin = moedas.find((m) => m.id === "bitcoin");

  return {
    total: moedas.length,
    valorTotal,
    volumeTotal: somar(moedas, (m) => m.total_volume),
    variacaoValorPct: (variacaoValor / (valorTotal - variacaoValor)) * 100,
    dominanciaBtc: ((bitcoin?.market_cap ?? 0) / valorTotal) * 100,
    emAlta: moedas.filter((m) => (variacao24h(m) ?? 0) > 0).length,
  };
}

export type Resumo = ReturnType<typeof calcularResumo>;

export function separarDestaques(moedas: Moeda[], quantidade = 3) {
  const ordenadas = [...moedas].sort((a, b) => (variacao24h(b) ?? 0) - (variacao24h(a) ?? 0));
  return {
    altas: ordenadas.slice(0, quantidade),
    baixas: ordenadas.slice(-quantidade).reverse(),
  };
}

export function calcularParticipacao(moedas: Moeda[], quantidade = 5) {
  const valorTotal = somar(moedas, (m) => m.market_cap);
  const fatias = moedas.slice(0, quantidade).map((m) => ({
    nome: m.name,
    pct: (m.market_cap / valorTotal) * 100,
  }));
  const demais = 100 - fatias.reduce((soma, f) => soma + f.pct, 0);
  return { fatias, demais };
}

// Compara com os preços da atualização anterior para saber o que subiu ou caiu
export function detectarMudancas(anteriores: Record<string, number>, moedas: Moeda[]) {
  const direcao: Record<string, Direcao> = {};
  for (const m of moedas) {
    const anterior = anteriores[m.id];
    if (anterior === undefined || anterior === m.current_price) continue;
    direcao[m.id] = m.current_price > anterior ? "alta" : "baixa";
  }
  return direcao;
}
