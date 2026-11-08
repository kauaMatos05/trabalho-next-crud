"use client";
import { useMercado } from "../MercadoProvider";
import { formatarPreco } from "../formatar";
import type { Moeda } from "../tipos";

// Preço atual que pisca verde/vermelho quando muda na atualização ao vivo
export default function Preco({ moeda }: { moeda: Moeda }) {
  const { atualizadoEm, direcao } = useMercado();
  const flash = direcao[moeda.id] ? `flash-${direcao[moeda.id]}` : "";

  // A key muda a cada atualização, o que reinicia a animação
  return (
    <span key={atualizadoEm?.getTime()} className={`px-1.5 py-0.5 rounded ${flash}`}>
      {formatarPreco(moeda.current_price)}
    </span>
  );
}
