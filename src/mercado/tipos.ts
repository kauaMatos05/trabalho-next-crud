// Formato de cada ativo devolvido pela CoinGecko em /coins/markets
export type Moeda = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  high_24h: number | null;
  low_24h: number | null;
  market_cap_change_24h: number | null;
  price_change_percentage_24h_in_currency: number | null;
  price_change_percentage_7d_in_currency: number | null;
  sparkline_in_7d: { price: number[] } | null;
};

export type Status = "carregando" | "ok" | "erro";

export type Direcao = "alta" | "baixa";

export type EstadoMercado = {
  moedas: Moeda[];
  status: Status;
  atualizadoEm: Date | null;
  direcao: Record<string, Direcao>;
};
