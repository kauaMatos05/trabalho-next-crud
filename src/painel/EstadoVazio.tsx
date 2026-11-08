import type { Status } from "@/src/mercado/tipos";

export function mensagemDeStatus(status: Status) {
  return status === "erro"
    ? "Não foi possível conectar à fonte de dados. Nova tentativa em instantes."
    : "Carregando dados de mercado...";
}

// Aviso centralizado para quando não há dados para mostrar
export default function EstadoVazio({ mensagem }: { mensagem: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-10 text-center text-sm text-slate-500">
      {mensagem}
    </div>
  );
}
