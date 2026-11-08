// Nome do cookie onde o token fica guardado no navegador.
// O proxy.ts (no servidor) lê este mesmo nome para liberar ou barrar as páginas.
export const COOKIE_TOKEN = "token";

// O token da API vale 1 hora, então o cookie também
const UMA_HORA_EM_SEGUNDOS = 60 * 60;

export function salvarToken(token: string) {
  document.cookie = `${COOKIE_TOKEN}=${token}; path=/; max-age=${UMA_HORA_EM_SEGUNDOS}; SameSite=Lax`;
}

export function lerToken() {
  const par = document.cookie.split("; ").find((c) => c.startsWith(`${COOKIE_TOKEN}=`));
  return par ? par.split("=")[1] : null;
}

export function apagarToken() {
  document.cookie = `${COOKIE_TOKEN}=; path=/; max-age=0`;
}
