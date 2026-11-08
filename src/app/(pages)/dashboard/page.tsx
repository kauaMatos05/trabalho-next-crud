"use client";
import Link from "next/link";
import CabecalhoPagina from "@/src/painel/CabecalhoPagina";
import EstadoVazio, { mensagemDeStatus } from "@/src/painel/EstadoVazio";
import { useMercado } from "@/src/mercado/MercadoProvider";
import { calcularParticipacao, calcularResumo, separarDestaques } from "@/src/mercado/calculos";
import Indicadores from "@/src/mercado/dashboard/Indicadores";
import PrincipaisAtivos from "@/src/mercado/dashboard/PrincipaisAtivos";
import Destaques from "@/src/mercado/dashboard/Destaques";
import Participacao from "@/src/mercado/dashboard/Participacao";

export default function Dashboard() {
  const { moedas, status } = useMercado();

  if (moedas.length === 0) return <EstadoVazio mensagem={mensagemDeStatus(status)} />;

  const { altas, baixas } = separarDestaques(moedas);
  const participacao = calcularParticipacao(moedas);

  return (
    <div className="flex flex-col gap-8">
      <CabecalhoPagina
        titulo="Visão geral do mercado"
        subtitulo="20 maiores criptoativos por valor de mercado · valores em reais (BRL)"
        acao={
          <Link
            href="/mercado"
            className="bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-md hover:bg-blue-800 transition text-center"
          >
            Ver mercado completo
          </Link>
        }
      />

      <Indicadores resumo={calcularResumo(moedas)} />

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <PrincipaisAtivos moedas={moedas.slice(0, 5)} />
        </div>
        <div className="flex flex-col gap-4">
          <Destaques titulo="Maiores altas (24h)" moedas={altas} />
          <Destaques titulo="Maiores baixas (24h)" moedas={baixas} />
        </div>
      </section>

      <Participacao fatias={participacao.fatias} demais={participacao.demais} />
    </div>
  );
}
