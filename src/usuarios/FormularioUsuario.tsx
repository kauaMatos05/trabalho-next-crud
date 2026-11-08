"use client";
import { useState } from "react";
import Link from "next/link";
import Cartao from "@/src/painel/Cartao";
import Campo from "./Campo";
import { FORMULARIO_VAZIO, type CamposFormulario, type NomeCampo } from "./formulario";
import { mascaraCEP, mascaraCPF, mascaraData, mascaraTelefone, mascaraUF } from "./mascaras";
import { validarFormulario, type Erros } from "./validacoes";

type ConfigCampo = {
  nome: NomeCampo;
  rotulo: string;
  tipo?: string;
  placeholder?: string;
  opcional?: boolean;
  largura?: string;
  mascara?: (valor: string) => string;
};

// A "planta" do formulário: quais seções existem e quais campos cada uma tem
const SECOES: { titulo: string; campos: ConfigCampo[] }[] = [
  {
    titulo: "Dados pessoais",
    campos: [
      { nome: "nome", rotulo: "Nome completo", largura: "sm:col-span-2" },
      { nome: "email", rotulo: "E-mail", tipo: "email", placeholder: "nome@email.com" },
      { nome: "cpf", rotulo: "CPF", placeholder: "000.000.000-00", mascara: mascaraCPF },
      { nome: "telefone", rotulo: "Telefone", placeholder: "(00) 00000-0000", mascara: mascaraTelefone },
      { nome: "dataNascimento", rotulo: "Data de nascimento", placeholder: "dd/mm/aaaa", mascara: mascaraData },
    ],
  },
  {
    titulo: "Endereço",
    campos: [
      { nome: "cep", rotulo: "CEP", placeholder: "00000-000", mascara: mascaraCEP },
      { nome: "logradouro", rotulo: "Logradouro", placeholder: "Rua, avenida..." },
      { nome: "numero", rotulo: "Número" },
      { nome: "complemento", rotulo: "Complemento", opcional: true },
      { nome: "bairro", rotulo: "Bairro" },
      { nome: "cidade", rotulo: "Cidade" },
      { nome: "uf", rotulo: "UF", placeholder: "SP", mascara: mascaraUF },
    ],
  },
  {
    titulo: "Acesso",
    campos: [
      { nome: "senha", rotulo: "Senha", tipo: "password" },
      { nome: "confirmarSenha", rotulo: "Confirmar senha", tipo: "password" },
    ],
  },
];

type Props = {
  inicial?: CamposFormulario;
  textoBotao: string;
  onSalvar: (dados: CamposFormulario) => Promise<void>;
};

export default function FormularioUsuario({ inicial = FORMULARIO_VAZIO, textoBotao, onSalvar }: Props) {
  const [dados, setDados] = useState(inicial);
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [erros, setErros] = useState<Erros>({});

  function alterar(campo: NomeCampo, valor: string) {
    setDados((atual) => ({ ...atual, [campo]: valor }));
  }

  async function enviar(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const encontrados = validarFormulario(dados);
    setErros(encontrados);
    if (Object.keys(encontrados).length > 0) {
      setErro("Corrija os campos destacados em vermelho.");
      return;
    }
    setErro("");
    setSalvando(true);
    try {
      await onSalvar(dados);
    } catch {
      setErro("Não foi possível salvar. A API está ligada?");
      setSalvando(false);
    }
  }

  return (
    <form onSubmit={enviar} className="flex flex-col gap-6">
      {SECOES.map((secao) => (
        <Cartao key={secao.titulo} titulo={secao.titulo}>
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {secao.campos.map((c) => (
              <Campo
                key={c.nome}
                rotulo={c.rotulo}
                tipo={c.tipo}
                placeholder={c.placeholder}
                opcional={c.opcional}
                className={c.largura}
                valor={dados[c.nome]}
                erro={erros[c.nome]}
                onChange={(valor) => alterar(c.nome, c.mascara ? c.mascara(valor) : valor)}
              />
            ))}
          </div>
        </Cartao>
      ))}

      {erro && <p className="text-sm text-red-600">{erro}</p>}

      <div className="flex justify-end gap-3">
        <Link href="/usuarios" className="px-4 py-2.5 rounded-md text-sm border border-slate-300 text-slate-700 hover:bg-slate-50">
          Cancelar
        </Link>
        <button disabled={salvando} className="bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-md hover:bg-blue-800 disabled:opacity-60">
          {salvando ? "Salvando..." : textoBotao}
        </button>
      </div>
    </form>
  );
}
