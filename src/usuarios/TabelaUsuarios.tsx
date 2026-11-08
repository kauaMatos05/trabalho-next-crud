import Link from "next/link";
import type { Usuario } from "./tipos";

// "1998-04-15" -> "15/04/1998"
function formatarData(data: string) {
  return data.split("-").reverse().join("/");
}

type Props = { usuarios: Usuario[]; onExcluir: (usuario: Usuario) => void };

export default function TabelaUsuarios({ usuarios, onExcluir }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 border-b border-slate-200">
          <tr>
            <th className="text-left font-semibold px-4 py-3">Nome</th>
            <th className="text-left font-semibold px-4 py-3">CPF</th>
            <th className="text-left font-semibold px-4 py-3">Telefone</th>
            <th className="text-left font-semibold px-4 py-3">Nascimento</th>
            <th className="text-left font-semibold px-4 py-3">Cidade</th>
            <th className="text-right font-semibold px-4 py-3">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {usuarios.map((u) => (
            <tr key={u.id} className="hover:bg-slate-50">
              <td className="px-4 py-3">
                <p className="font-semibold text-slate-900">{u.nome}</p>
                <p className="text-xs text-slate-500">{u.email}</p>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">{u.cpf}</td>
              <td className="px-4 py-3 whitespace-nowrap">{u.telefone}</td>
              <td className="px-4 py-3">{formatarData(u.dataNascimento)}</td>
              <td className="px-4 py-3">{u.endereco.cidade}/{u.endereco.uf}</td>
              <td className="px-4 py-3 text-right whitespace-nowrap">
                <Link href={`/usuarios/${u.id}/editar`} className="text-blue-700 font-medium hover:underline mr-4">
                  Editar
                </Link>
                <button onClick={() => onExcluir(u)} className="text-red-600 font-medium hover:underline">
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
