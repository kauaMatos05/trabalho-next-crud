"use client";
import { useRouter } from "next/navigation";
import Logo from "@/src/painel/Logo";

const destaques = [
  "Cotações dos 20 principais criptoativos atualizadas ao vivo",
  "Indicadores consolidados de valor de mercado e volume",
  "Análise de variação em 24 horas e 7 dias",
];

export default function Login() {
  const router = useRouter();

  function entrar(e: React.FormEvent) {
    e.preventDefault();
    router.push("/dashboard");
  }

  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-white text-slate-900">
      {/* Painel institucional */}
      <section className="hidden lg:flex flex-col justify-between bg-slate-900 text-white p-12">
        <Logo claro />

        <div className="max-w-md">
          <h1 className="text-4xl font-bold leading-tight">
            Inteligência de mercado para decisões em criptoativos.
          </h1>
          <ul className="mt-8 flex flex-col gap-4">
            {destaques.map((d) => (
              <li key={d} className="flex items-start gap-3 text-slate-300">
                <span className="mt-1.5 w-1.5 h-1.5 shrink-0 rounded-full bg-blue-500" />
                {d}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-slate-500">© 2026 CryptoView. Todos os direitos reservados.</p>
      </section>

      {/* Formulário */}
      <section className="flex items-center justify-center p-6">
        <form onSubmit={entrar} className="w-full max-w-sm flex flex-col gap-5">
          <div className="lg:hidden mb-4">
            <Logo />
          </div>

          <div>
            <h2 className="text-2xl font-bold">Acessar plataforma</h2>
            <p className="text-sm text-slate-500 mt-1">Utilize suas credenciais corporativas.</p>
          </div>

          <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
            E-mail corporativo
            <input
              type="email"
              placeholder="nome@empresa.com.br"
              required
              className="border border-slate-300 rounded-md px-3 py-2.5 text-slate-900 font-normal placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
            Senha
            <input
              type="password"
              placeholder="••••••••"
              required
              className="border border-slate-300 rounded-md px-3 py-2.5 text-slate-900 font-normal placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />
          </label>

          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" className="accent-blue-700" />
            Manter conectado
          </label>

          <button className="bg-blue-700 text-white font-semibold rounded-md py-2.5 hover:bg-blue-800 transition">
            Entrar
          </button>

          <p className="text-xs text-slate-400 text-center border-t border-slate-200 pt-5">
            Acesso restrito a usuários autorizados.
          </p>
        </form>
      </section>
    </main>
  );
}
