import Cartao from "@/src/painel/Cartao";
import { formatarParticipacao } from "../formatar";

const CORES = ["bg-blue-900", "bg-blue-700", "bg-blue-500", "bg-sky-400", "bg-cyan-300"];
const COR_DEMAIS = "bg-slate-200";

type Fatia = { nome: string; pct: number };

// Barra empilhada com quanto cada ativo representa do valor total
export default function Participacao({ fatias, demais }: { fatias: Fatia[]; demais: number }) {
  return (
    <Cartao titulo="Participação no valor de mercado" legenda="Base: Top 20">
      <div className="p-5">
        <div className="flex h-4 rounded overflow-hidden">
          {fatias.map((f, i) => (
            <div key={f.nome} className={CORES[i]} style={{ width: `${f.pct}%` }} />
          ))}
          <div className={COR_DEMAIS} style={{ width: `${demais}%` }} />
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm">
          {fatias.map((f, i) => (
            <Legenda key={f.nome} cor={CORES[i]} nome={f.nome} pct={f.pct} />
          ))}
          <Legenda cor={COR_DEMAIS} nome="Demais" pct={demais} />
        </div>
      </div>
    </Cartao>
  );
}

function Legenda({ cor, nome, pct }: { cor: string; nome: string; pct: number }) {
  return (
    <span className="flex items-center gap-2 text-slate-600">
      <span className={`w-2.5 h-2.5 rounded-sm ${cor}`} />
      {nome} <span className="font-semibold text-slate-900 tabular-nums">{formatarParticipacao(pct)}</span>
    </span>
  );
}
