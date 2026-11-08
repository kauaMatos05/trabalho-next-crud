import Sidebar from "@/src/painel/Sidebar";
import StatusAoVivo from "@/src/mercado/componentes/StatusAoVivo";
import { MercadoProvider } from "@/src/mercado/MercadoProvider";

export default function PainelLayout({ children }: { children: React.ReactNode }) {
  return (
    <MercadoProvider>
      <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col md:flex-row">
        <Sidebar />

        <div className="flex-1 min-w-0 flex flex-col">
          <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 md:px-10">
            <span className="text-sm text-slate-500">Plataforma de inteligência de mercado</span>
            <StatusAoVivo />
          </header>

          <main className="flex-1 p-6 md:p-10 w-full max-w-7xl">{children}</main>

          <footer className="px-6 md:px-10 py-4 text-xs text-slate-400 border-t border-slate-200">
            Fonte de dados: CoinGecko · Valores em reais (BRL) · Atualização automática a cada 30 segundos
          </footer>
        </div>
      </div>
    </MercadoProvider>
  );
}
