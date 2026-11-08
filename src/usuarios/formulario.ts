import type { NovoUsuario, Usuario } from "./tipos";
import { mascaraCEP, mascaraCPF, mascaraData, mascaraTelefone, mascaraUF } from "./mascaras";

// Na tela, todos os campos ficam "achatados" (no mesmo nível) e como texto
export type CamposFormulario = {
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  dataNascimento: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  senha: string;
  confirmarSenha: string;
};

// "nome" | "email" | "cpf" | ... (o nome de qualquer campo acima)
export type NomeCampo = keyof CamposFormulario;

export const FORMULARIO_VAZIO: CamposFormulario = {
  nome: "",
  email: "",
  cpf: "",
  telefone: "",
  dataNascimento: "",
  cep: "",
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  uf: "",
  senha: "",
  confirmarSenha: "",
};

// "15/04/1998" -> "1998-04-15"
function dataParaBanco(data: string) {
  return data.split("/").reverse().join("-");
}

// Converte o formato da tela para o formato que a API espera
export function paraUsuario(f: CamposFormulario): NovoUsuario {
  return {
    nome: f.nome,
    email: f.email,
    cpf: f.cpf,
    telefone: f.telefone,
    dataNascimento: dataParaBanco(f.dataNascimento),
    senha: f.senha,
    endereco: {
      cep: f.cep,
      logradouro: f.logradouro,
      numero: f.numero,
      complemento: f.complemento,
      bairro: f.bairro,
      cidade: f.cidade,
      uf: f.uf,
    },
  };
}

// "1998-04-15" -> "15/04/1998"
function dataParaTela(data: string) {
  return data.split("-").reverse().join("/");
}

// Converte o formato da API para o formato da tela (para abrir a edição preenchida)
export function paraFormulario(u: Usuario): CamposFormulario {
  return {
    nome: u.nome,
    email: u.email,
    cpf: mascaraCPF(u.cpf),
    telefone: mascaraTelefone(u.telefone),
    dataNascimento: mascaraData(dataParaTela(u.dataNascimento)),
    cep: mascaraCEP(u.endereco.cep),
    logradouro: u.endereco.logradouro,
    numero: u.endereco.numero,
    complemento: u.endereco.complemento,
    bairro: u.endereco.bairro,
    cidade: u.endereco.cidade,
    uf: mascaraUF(u.endereco.uf),
    senha: u.senha,
    confirmarSenha: u.senha,
  };
}
