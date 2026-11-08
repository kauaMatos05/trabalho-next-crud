// Camada de borda: único arquivo que conversa com a API externa
import type { Moeda } from "./tipos";

// 30 s respeita o limite do plano gratuito da CoinGecko
export const INTERVALO_SEGUNDOS = 30;

const URL_MERCADO =
  "https://api.coingecko.com/api/v3/coins/markets" +
  "?vs_currency=brl&order=market_cap_desc&per_page=20&page=1" +
  "&sparkline=true&price_change_percentage=24h,7d";

export async function buscarMercado(): Promise<Moeda[]> {
  const resposta = await fetch(URL_MERCADO);
  if (!resposta.ok) throw new Error(`CoinGecko respondeu HTTP ${resposta.status}`);
  return resposta.json();
}
