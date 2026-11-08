"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import CabecalhoPagina from "@/src/painel/CabecalhoPagina";
import Cartao from "@/src/painel/Cartao";
import EstadoVazio from "@/src/painel/EstadoVazio";
import TabelaUsuarios from "@/src/usuarios/TabelaUsuarios";
import { excluirUsuario, listarUsuarios } from "@/src/usuarios/api";
import type { Usuario } from "@/src/usuarios/tipos";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Roda uma vez, quando a página abre
  useEffect(() => {
    listarUsuarios()
      .then(setUsuarios)
      .catch(() => setErro("Não foi possível carregar os usuários. A API está ligada?"))
      .finally(() => setCarregando(false));
  }, []);

  async function excluir(usuario: Usuario) {
    if (!confirm(`Excluir o usuário ${usuario.nome}?`)) return;
    try {
      await excluirUsuario(usuario.id);
      setUsuarios((lista) => lista.filter((u) => u.id !== usuario.id));
    } catch {
      alert("Não foi possível excluir o usuário.");
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <CabecalhoPagina
        titulo="Usuários"
        subtitulo={`${usuarios.length} usuário(s) cadastrado(s)`}
        acao={
          <Link
            href="/usuarios/novo"
            className="bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-md hover:bg-blue-800 transition text-center"
          >
            Novo usuário
          </Link>
        }
      />

      {carregando && <EstadoVazio mensagem="Carregando usuários..." />}
      {erro && <EstadoVazio mensagem={erro} />}
      {!carregando && !erro && usuarios.length === 0 && <EstadoVazio mensagem="Nenhum usuário cadastrado." />}

      {usuarios.length > 0 && (
        <Cartao>
          <TabelaUsuarios usuarios={usuarios} onExcluir={excluir} />
        </Cartao>
      )}
    </div>
  );
}
