import type { NovoUsuario, Usuario } from "./tipos";

const URL_API = "http://localhost:3001/usuarios";

// Se a API responder com erro, interrompe e avisa
async function verificar(resposta: Response) {
  if (!resposta.ok) throw new Error(`A API respondeu com erro ${resposta.status}`);
  return resposta.json();
}

export async function listarUsuarios(): Promise<Usuario[]> {
  const resposta = await fetch(URL_API, { cache: "no-store" });
  return verificar(resposta);
}

export async function buscarUsuario(id: number): Promise<Usuario> {
  const resposta = await fetch(`${URL_API}/${id}`, { cache: "no-store" });
  return verificar(resposta);
}

export async function criarUsuario(dados: NovoUsuario): Promise<Usuario> {
  const resposta = await fetch(URL_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return verificar(resposta);
}

export async function atualizarUsuario(id: number, dados: NovoUsuario): Promise<Usuario> {
  const resposta = await fetch(`${URL_API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return verificar(resposta);
}

export async function excluirUsuario(id: number): Promise<void> {
  const resposta = await fetch(`${URL_API}/${id}`, { method: "DELETE" });
  if (!resposta.ok) throw new Error(`A API respondeu com erro ${resposta.status}`);
}
