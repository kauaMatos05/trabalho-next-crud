import Cartao from "@/src/painel/Cartao";
import Ativo from "../componentes/Ativo";
import Variacao from "../componentes/Variacao";
import { variacao24h } from "../calculos";
import type { Moeda } from "../tipos";

// Lista curta de ativos com a variação em 24h (maiores altas ou baixas)
export default function Destaques({ titulo, moedas }: { titulo: string; moedas: Moeda[] }) {
  return (
    <Cartao titulo={titulo} className="flex-1">
      <ul className="divide-y divide-slate-100">
        {moedas.map((m) => (
          <li key={m.id} className="flex items-center justify-between px-5 py-3">
            <Ativo moeda={m} />
            <Variacao valor={variacao24h(m)} className="text-sm font-semibold" />
          </li>
        ))}
      </ul>
    </Cartao>
  );
}
