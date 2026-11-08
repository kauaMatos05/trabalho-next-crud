"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const links = [
  { href: "/dashboard", texto: "Visão geral", icone: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z", preenchido: true },
  { href: "/mercado", texto: "Mercado", icone: "M3 17l6-6 4 4 8-8M14 7h7v7", preenchido: false },
  { href: "/usuarios", texto: "Usuários", icone: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75", preenchido: false },
];

export default function Sidebar() {
  const pagina = usePathname();

  return (
    <aside className="md:w-64 shrink-0 bg-slate-900 text-slate-300 flex md:flex-col items-center md:items-stretch gap-4 px-4 py-3 md:p-6 md:sticky md:top-0 md:h-screen">
      <div className="md:mb-10">
        <Logo claro />
      </div>

      <nav className="flex md:flex-col gap-1 flex-1">
        <span className="hidden md:block text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2 px-3">
          Análise
        </span>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition ${
              pagina === l.href ? "bg-blue-700 text-white font-medium" : "hover:bg-slate-800 hover:text-white"
            }`}
          >
            <Icone caminho={l.icone} preenchido={l.preenchido} />
            <span className="hidden sm:inline">{l.texto}</span>
          </Link>
        ))}
      </nav>

      <Usuario />
    </aside>
  );
}

function Icone({ caminho, preenchido }: { caminho: string; preenchido: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-4 h-4 shrink-0"
      fill={preenchido ? "currentColor" : "none"}
      stroke={preenchido ? "none" : "currentColor"}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={caminho} />
    </svg>
  );
}

function Usuario() {
  return (
    <div className="md:border-t md:border-slate-800 md:pt-4 flex md:flex-col gap-3">
      <div className="hidden md:flex items-center gap-3 px-1">
        <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-sm font-semibold text-white">
          AN
        </div>
        <div className="leading-tight">
          <p className="text-sm text-white">Analista</p>
          <p className="text-xs text-slate-500">Mesa de operações</p>
        </div>
      </div>
      <Link href="/" className="px-3 py-2 rounded-md text-sm hover:bg-slate-800 hover:text-white transition">
        Sair
      </Link>
    </div>
  );
}
