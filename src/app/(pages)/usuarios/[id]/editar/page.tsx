"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CabecalhoPagina from "@/src/painel/CabecalhoPagina";
import EstadoVazio from "@/src/painel/EstadoVazio";
import FormularioUsuario from "@/src/usuarios/FormularioUsuario";
import { atualizarUsuario, buscarUsuario } from "@/src/usuarios/api";
import { paraFormulario, paraUsuario, type CamposFormulario } from "@/src/usuarios/formulario";
import type { Usuario } from "@/src/usuarios/tipos";

export default function EditarUsuario() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [erro, setErro] = useState("");

  // Busca o usuário assim que a página abre
  useEffect(() => {
    buscarUsuario(Number(id))
      .then(setUsuario)
      .catch(() => setErro("Usuário não encontrado ou API desligada."));
  }, [id]);

  async function salvar(dados: CamposFormulario) {
    await atualizarUsuario(Number(id), paraUsuario(dados));
    router.push("/usuarios");
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <CabecalhoPagina titulo="Editar usuário" subtitulo="Altere os dados e clique em salvar" />

      {erro && <EstadoVazio mensagem={erro} />}
      {!erro && !usuario && <EstadoVazio mensagem="Carregando usuário..." />}

      {usuario && (
        <FormularioUsuario inicial={paraFormulario(usuario)} textoBotao="Salvar alterações" onSalvar={salvar} />
      )}
    </div>
  );
}
