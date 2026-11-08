import type { Moeda } from "../tipos";

// Logo + nome + sigla do criptoativo
export default function Ativo({ moeda }: { moeda: Moeda }) {
  return (
    <div className="flex items-center gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={moeda.image} alt={moeda.name} className="w-7 h-7 rounded-full" />
      <div className="leading-tight">
        <p className="font-semibold text-slate-900">{moeda.name}</p>
        <p className="text-xs text-slate-500 uppercase">{moeda.symbol}</p>
      </div>
    </div>
  );
}
