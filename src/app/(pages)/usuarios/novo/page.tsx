"use client";
import { useRouter } from "next/navigation";
import CabecalhoPagina from "@/src/painel/CabecalhoPagina";
import FormularioUsuario from "@/src/usuarios/FormularioUsuario";
import { criarUsuario } from "@/src/usuarios/api";
import { paraUsuario, type CamposFormulario } from "@/src/usuarios/formulario";

export default function CadastroUsuario() {
  const router = useRouter();

  async function salvar(dados: CamposFormulario) {
    await criarUsuario(paraUsuario(dados));
    router.push("/usuarios");
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <CabecalhoPagina titulo="Novo usuário" subtitulo="Preencha os dados para cadastrar um usuário" />
      <FormularioUsuario textoBotao="Cadastrar" onSalvar={salvar} />
    </div>
  );
}
