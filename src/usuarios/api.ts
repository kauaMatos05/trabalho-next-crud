import { lerToken } from "@/src/auth/sessao";
import type { NovoUsuario, Usuario } from "./tipos";

const URL_API = "http://localhost:3001/usuarios";

// Todo pedido mostra o "crachá": Authorization: Bearer <token>
function cabecalhos(): HeadersInit {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${lerToken()}`,
  };
}

// Se a API responder com erro, interrompe e avisa
function garantirOk(resposta: Response) {
  if (resposta.status === 401) throw new Error("Sessão expirada. Faça login novamente.");
  if (!resposta.ok) throw new Error(`A API respondeu com erro ${resposta.status}`);
}

async function verificar(resposta: Response) {
  garantirOk(resposta);
  return resposta.json();
}

export async function listarUsuarios(): Promise<Usuario[]> {
  const resposta = await fetch(URL_API, { cache: "no-store", headers: cabecalhos() });
  return verificar(resposta);
}

export async function buscarUsuario(id: number): Promise<Usuario> {
  const resposta = await fetch(`${URL_API}/${id}`, { cache: "no-store", headers: cabecalhos() });
  return verificar(resposta);
}

export async function criarUsuario(dados: NovoUsuario): Promise<Usuario> {
  const resposta = await fetch(URL_API, {
    method: "POST",
    headers: cabecalhos(),
    body: JSON.stringify(dados),
  });
  return verificar(resposta);
}

export async function atualizarUsuario(id: number, dados: NovoUsuario): Promise<Usuario> {
  const resposta = await fetch(`${URL_API}/${id}`, {
    method: "PUT",
    headers: cabecalhos(),
    body: JSON.stringify(dados),
  });
  return verificar(resposta);
}

export async function excluirUsuario(id: number): Promise<void> {
  const resposta = await fetch(`${URL_API}/${id}`, { method: "DELETE", headers: cabecalhos() });
  garantirOk(resposta);
}
