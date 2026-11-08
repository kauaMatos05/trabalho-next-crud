import Cartao from "@/src/painel/Cartao";
import Ativo from "../componentes/Ativo";
import Preco from "../componentes/Preco";
import Sparkline from "../componentes/Sparkline";
import Variacao from "../componentes/Variacao";
import { variacao24h, variacao7d } from "../calculos";
import type { Moeda } from "../tipos";

const th = "font-semibold px-5 py-3";

// Tabela resumida com os 5 maiores ativos
export default function PrincipaisAtivos({ moedas }: { moedas: Moeda[] }) {
  return (
    <Cartao titulo="Principais ativos" legenda="Por valor de mercado">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className={`text-left ${th}`}>Ativo</th>
              <th className={`text-right ${th}`}>Preço</th>
              <th className={`text-right ${th}`}>24h</th>
              <th className={`text-right ${th}`}>7 dias</th>
              <th className={`text-right ${th} hidden md:table-cell`}>Últimos 7 dias</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {moedas.map((m) => (
              <Linha key={m.id} moeda={m} />
            ))}
          </tbody>
        </table>
      </div>
    </Cartao>
  );
}

function Linha({ moeda }: { moeda: Moeda }) {
  const v7 = variacao7d(moeda);
  return (
    <tr className="hover:bg-slate-50">
      <td className="px-5 py-3"><Ativo moeda={moeda} /></td>
      <td className="px-5 py-3 text-right font-medium tabular-nums"><Preco moeda={moeda} /></td>
      <td className="px-5 py-3 text-right"><Variacao valor={variacao24h(moeda)} /></td>
      <td className="px-5 py-3 text-right"><Variacao valor={v7} /></td>
      <td className="px-5 py-3 hidden md:table-cell">
        <div className="flex justify-end">
          <Sparkline precos={moeda.sparkline_in_7d?.price ?? []} positivo={(v7 ?? 0) >= 0} />
        </div>
      </td>
    </tr>
  );
}
