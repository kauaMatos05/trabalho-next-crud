import { variacao24h, variacao7d } from "../calculos";
import type { Moeda } from "../tipos";

export type Campo = "rank" | "preco" | "var24" | "var7" | "valor" | "volume";
export type Ordem = { campo: Campo; crescente: boolean };

export const ORDEM_PADRAO: Ordem = { campo: "rank", crescente: true };

const valorDoCampo: Record<Campo, (m: Moeda) => number> = {
  rank: (m) => m.market_cap_rank,
  preco: (m) => m.current_price,
  var24: (m) => variacao24h(m) ?? 0,
  var7: (m) => variacao7d(m) ?? 0,
  valor: (m) => m.market_cap,
  volume: (m) => m.total_volume,
};

// Clicar na mesma coluna inverte; numa nova, começa do maior (exceto o ranking)
export function alternarOrdem(atual: Ordem, campo: Campo): Ordem {
  if (atual.campo === campo) return { campo, crescente: !atual.crescente };
  return { campo, crescente: campo === "rank" };
}

export function filtrarEOrdenar(moedas: Moeda[], busca: string, ordem: Ordem) {
  const termo = busca.trim().toLowerCase();
  const pegar = valorDoCampo[ordem.campo];

  return moedas
    .filter((m) => m.name.toLowerCase().includes(termo) || m.symbol.toLowerCase().includes(termo))
    .sort((a, b) => (ordem.crescente ? pegar(a) - pegar(b) : pegar(b) - pegar(a)));
}
