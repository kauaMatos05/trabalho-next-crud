"use client";
import { useState } from "react";
import Cartao from "@/src/painel/Cartao";
import CabecalhoPagina from "@/src/painel/CabecalhoPagina";
import EstadoVazio, { mensagemDeStatus } from "@/src/painel/EstadoVazio";
import { useMercado } from "@/src/mercado/MercadoProvider";
import TabelaMercado from "@/src/mercado/tabela/TabelaMercado";
import { alternarOrdem, filtrarEOrdenar, ORDEM_PADRAO, type Ordem } from "@/src/mercado/tabela/ordenacao";

export default function Mercado() {
  const { moedas, status } = useMercado();
  const [busca, setBusca] = useState("");
  const [ordem, setOrdem] = useState<Ordem>(ORDEM_PADRAO);

  if (moedas.length === 0) return <EstadoVazio mensagem={mensagemDeStatus(status)} />;

  const lista = filtrarEOrdenar(moedas, busca, ordem);

  return (
    <div className="flex flex-col gap-6">
      <CabecalhoPagina
        titulo="Mercado"
        subtitulo="Cotações dos 20 maiores criptoativos · clique no título de uma coluna para ordenar"
        acao={
          <input
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome ou sigla"
            className="w-full sm:w-72 bg-white border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        }
      />

      <Cartao>
        <TabelaMercado moedas={lista} ordem={ordem} onOrdenar={(campo) => setOrdem((atual) => alternarOrdem(atual, campo))} />
        {lista.length === 0 && (
          <p className="text-center text-slate-500 py-10 text-sm">Nenhum ativo encontrado para essa busca.</p>
        )}
      </Cartao>
    </div>
  );
}
