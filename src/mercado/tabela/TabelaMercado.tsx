import Ativo from "../componentes/Ativo";
import Preco from "../componentes/Preco";
import Sparkline from "../componentes/Sparkline";
import Variacao from "../componentes/Variacao";
import { variacao24h, variacao7d } from "../calculos";
import { formatarCompacto } from "../formatar";
import type { Moeda } from "../tipos";
import type { Campo, Ordem } from "./ordenacao";

const td = "px-4 py-3 text-right tabular-nums whitespace-nowrap";

type Props = { moedas: Moeda[]; ordem: Ordem; onOrdenar: (campo: Campo) => void };

// Tabela completa com cabeçalhos clicáveis para ordenar
export default function TabelaMercado({ moedas, ordem, onOrdenar }: Props) {
  const coluna = (campo: Campo, titulo: string, alinhamento = "text-right") => (
    <th className={`font-semibold px-4 py-3 whitespace-nowrap ${alinhamento}`}>
      <BotaoOrdem campo={campo} titulo={titulo} ordem={ordem} onClick={onOrdenar} />
    </th>
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 border-b border-slate-200">
          <tr>
            {coluna("rank", "#", "text-left w-12")}
            <th className="text-left font-semibold px-4 py-3">Ativo</th>
            {coluna("preco", "Preço")}
            {coluna("var24", "24h")}
            {coluna("var7", "7 dias")}
            {coluna("valor", "Valor de mercado")}
            {coluna("volume", "Volume 24h")}
            <th className="text-right font-semibold px-4 py-3 whitespace-nowrap hidden lg:table-cell">Últimos 7 dias</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {moedas.map((m) => (
            <Linha key={m.id} moeda={m} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Linha({ moeda }: { moeda: Moeda }) {
  const v7 = variacao7d(moeda);
  return (
    <tr className="hover:bg-slate-50">
      <td className="px-4 py-3 text-slate-500 tabular-nums">{moeda.market_cap_rank}</td>
      <td className="px-4 py-3 whitespace-nowrap"><Ativo moeda={moeda} /></td>
      <td className={`${td} font-medium`}><Preco moeda={moeda} /></td>
      <td className={td}><Variacao valor={variacao24h(moeda)} /></td>
      <td className={td}><Variacao valor={v7} /></td>
      <td className={td}>{formatarCompacto(moeda.market_cap)}</td>
      <td className={td}>{formatarCompacto(moeda.total_volume)}</td>
      <td className="px-4 py-3 hidden lg:table-cell">
        <div className="flex justify-end">
          <Sparkline precos={moeda.sparkline_in_7d?.price ?? []} positivo={(v7 ?? 0) >= 0} />
        </div>
      </td>
    </tr>
  );
}

type BotaoProps = { campo: Campo; titulo: string; ordem: Ordem; onClick: (campo: Campo) => void };

function BotaoOrdem({ campo, titulo, ordem, onClick }: BotaoProps) {
  const ativo = ordem.campo === campo;
  return (
    <button
      onClick={() => onClick(campo)}
      className={`uppercase tracking-wide hover:text-slate-900 ${ativo ? "text-blue-700" : ""}`}
    >
      {titulo}
      {ativo && <span className="ml-1">{ordem.crescente ? "▲" : "▼"}</span>}
    </button>
  );
}
