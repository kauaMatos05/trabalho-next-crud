"use client";
import { useEffect, useState } from "react";
import { useMercado } from "../MercadoProvider";
import { INTERVALO_SEGUNDOS } from "../api";

function useSegundosRestantes(atualizadoEm: Date | null) {
  const [agora, setAgora] = useState(() => Date.now());

  useEffect(() => {
    const timer = setInterval(() => setAgora(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!atualizadoEm) return null;
  const passados = Math.floor((agora - atualizadoEm.getTime()) / 1000);
  return Math.max(0, INTERVALO_SEGUNDOS - passados);
}

// Indicador "AO VIVO" + horário da última atualização + contagem regressiva
export default function StatusAoVivo() {
  const { status, atualizadoEm } = useMercado();
  const restante = useSegundosRestantes(atualizadoEm);

  if (status === "carregando") {
    return (
      <div className="flex items-center gap-2 text-sm text-slate-500">
        <span className="w-2 h-2 rounded-full bg-slate-400" />
        Conectando ao mercado...
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 text-sm">
      {status === "ok" ? <SeloAoVivo /> : <SeloFalha />}
      {atualizadoEm && (
        <span className="hidden sm:inline text-slate-500">
          Atualizado às {atualizadoEm.toLocaleTimeString("pt-BR")} · próxima em {restante}s
        </span>
      )}
    </div>
  );
}

function SeloAoVivo() {
  return (
    <span className="flex items-center gap-2 font-semibold text-emerald-700">
      <span className="relative flex w-2 h-2">
        <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-500 opacity-75 animate-ping" />
        <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />
      </span>
      AO VIVO
    </span>
  );
}

function SeloFalha() {
  return (
    <span className="flex items-center gap-2 font-semibold text-amber-700">
      <span className="w-2 h-2 rounded-full bg-amber-500" />
      Falha na conexão, tentando novamente
    </span>
  );
}
