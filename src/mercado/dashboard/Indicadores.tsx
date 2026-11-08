import type { Resumo } from "../calculos";
import { corVariacao, formatarCompacto, formatarParticipacao, formatarVariacao } from "../formatar";

// Os 4 cartões de números no topo do dashboard
export default function Indicadores({ resumo }: { resumo: Resumo }) {
  const positivo = resumo.emAlta >= resumo.total / 2;

  const cartoes = [
    {
      titulo: "Valor de mercado (Top 20)",
      valor: formatarCompacto(resumo.valorTotal),
      detalhe: formatarVariacao(resumo.variacaoValorPct),
      cor: corVariacao(resumo.variacaoValorPct),
    },
    { titulo: "Volume negociado 24h", valor: formatarCompacto(resumo.volumeTotal), detalhe: "Soma dos 20 ativos", cor: "text-slate-500" },
    { titulo: "Dominância do Bitcoin", valor: formatarParticipacao(resumo.dominanciaBtc), detalhe: "Participação no Top 20", cor: "text-slate-500" },
    {
      titulo: "Ativos em alta (24h)",
      valor: `${resumo.emAlta} de ${resumo.total}`,
      detalhe: positivo ? "Mercado predominantemente positivo" : "Mercado predominantemente negativo",
      cor: positivo ? "text-emerald-600" : "text-red-600",
    },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cartoes.map((c) => (
        <div key={c.titulo} className="bg-white border border-slate-200 rounded-lg p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{c.titulo}</p>
          <p className="text-2xl font-bold mt-2 tabular-nums">{c.valor}</p>
          <p className={`text-sm mt-1 ${c.cor}`}>{c.detalhe}</p>
        </div>
      ))}
    </section>
  );
}
