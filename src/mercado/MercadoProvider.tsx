"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { buscarMercado, INTERVALO_SEGUNDOS } from "./api";
import { detectarMudancas } from "./calculos";
import type { EstadoMercado } from "./tipos";

const ESTADO_INICIAL: EstadoMercado = { moedas: [], status: "carregando", atualizadoEm: null, direcao: {} };

const MercadoContext = createContext<EstadoMercado | null>(null);

// Busca os dados ao abrir o painel e repete a cada INTERVALO_SEGUNDOS
export function MercadoProvider({ children }: { children: React.ReactNode }) {
  const [estado, setEstado] = useState<EstadoMercado>(ESTADO_INICIAL);
  const precosAnteriores = useRef<Record<string, number>>({});

  useEffect(() => {
    let ativo = true;

    async function atualizar() {
      try {
        const moedas = await buscarMercado();
        if (!ativo) return;
        const direcao = detectarMudancas(precosAnteriores.current, moedas);
        precosAnteriores.current = Object.fromEntries(moedas.map((m) => [m.id, m.current_price]));
        setEstado({ moedas, direcao, status: "ok", atualizadoEm: new Date() });
      } catch {
        // Mantém os últimos dados na tela e só sinaliza a falha
        if (ativo) setEstado((atual) => ({ ...atual, status: "erro" }));
      }
    }

    atualizar();
    const timer = setInterval(atualizar, INTERVALO_SEGUNDOS * 1000);
    return () => {
      ativo = false;
      clearInterval(timer);
    };
  }, []);

  return <MercadoContext.Provider value={estado}>{children}</MercadoContext.Provider>;
}

export function useMercado() {
  const estado = useContext(MercadoContext);
  if (!estado) throw new Error("useMercado precisa estar dentro de <MercadoProvider>");
  return estado;
}
