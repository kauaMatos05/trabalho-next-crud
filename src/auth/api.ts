const URL_LOGIN = "http://localhost:3001/login";

// Envia e-mail e senha; se estiverem certos, a API devolve o token de acesso
export async function fazerLogin(email: string, senha: string): Promise<string> {
  let resposta: Response;
  try {
    resposta = await fetch(URL_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: senha }),
    });
  } catch {
    // O fetch só "estoura" quando nem chega na API (ela está desligada)
    throw new Error("Não foi possível conectar. A API está ligada?");
  }

  if (resposta.status === 400) throw new Error("E-mail ou senha incorretos.");
  if (!resposta.ok) throw new Error("Não foi possível entrar. Tente novamente.");

  const dados: { accessToken: string } = await resposta.json();
  return dados.accessToken;
}
