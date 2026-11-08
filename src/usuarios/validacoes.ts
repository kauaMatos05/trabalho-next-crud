import { somenteDigitos } from "./mascaras";
import type { CamposFormulario, NomeCampo } from "./formulario";

// Uma mensagem de erro para cada campo com problema
export type Erros = Partial<Record<NomeCampo, string>>;

// Confere os 2 dígitos verificadores do CPF (os 2 últimos números)
export function validarCPF(cpf: string) {
  const d = somenteDigitos(cpf);
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;

  function calcularDigito(tamanho: number) {
    let soma = 0;
    for (let i = 0; i < tamanho; i++) soma += Number(d[i]) * (tamanho + 1 - i);
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  }

  return calcularDigito(9) === Number(d[9]) && calcularDigito(10) === Number(d[10]);
}

// "31/02/2000" não existe; data no futuro também não vale
export function validarData(data: string) {
  if (data.length !== 10) return false;
  const [dia, mes, ano] = data.split("/").map(Number);
  const d = new Date(ano, mes - 1, dia);
  const existe = d.getFullYear() === ano && d.getMonth() === mes - 1 && d.getDate() === dia;
  return existe && ano >= 1900 && d <= new Date();
}

export function validarFormulario(f: CamposFormulario): Erros {
  const erros: Erros = {};

  if (f.nome.trim().split(/\s+/).length < 2) erros.nome = "Informe nome e sobrenome.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) erros.email = "E-mail inválido.";
  if (!validarCPF(f.cpf)) erros.cpf = "CPF inválido.";
  if (somenteDigitos(f.telefone).length < 10) erros.telefone = "Telefone incompleto.";
  if (!validarData(f.dataNascimento)) erros.dataNascimento = "Data inválida.";
  if (somenteDigitos(f.cep).length !== 8) erros.cep = "CEP incompleto.";
  if (f.uf.length !== 2) erros.uf = "Use a sigla com 2 letras.";
  if (f.senha.length < 8 || !/\d/.test(f.senha) || !/[a-zA-Z]/.test(f.senha)) {
    erros.senha = "Mínimo de 8 caracteres, com letras e números.";
  }
  if (f.confirmarSenha !== f.senha) erros.confirmarSenha = "As senhas não conferem.";

  return erros;
}
