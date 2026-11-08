import { createHmac, timingSafeEqual } from "node:crypto";

// Mesma chave que o json-server-auth usa para assinar os tokens
// (node_modules/json-server-auth/dist/constants.js). Como é uma API
// de simulação, a chave é fixa; num sistema real ela ficaria escondida
// numa variável de ambiente.
const CHAVE_SECRETA = "json-server-auth-123456";

// Um token JWT tem 3 partes separadas por ponto: cabecalho.dados.assinatura
// Ele é válido se (1) a assinatura bate com a chave e (2) ainda não venceu.
export function tokenValido(token: string): boolean {
  const partes = token.split(".");
  if (partes.length !== 3) return false;
  const [cabecalho, dados, assinatura] = partes;

  // (1) Recalcula a assinatura e compara com a que veio no token
  const esperada = createHmac("sha256", CHAVE_SECRETA).update(`${cabecalho}.${dados}`).digest("base64url");
  const a = Buffer.from(assinatura);
  const b = Buffer.from(esperada);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  // (2) Lê a data de vencimento ("exp", em segundos) e compara com agora
  try {
    const conteudo: { exp?: number } = JSON.parse(Buffer.from(dados, "base64url").toString());
    return typeof conteudo.exp === "number" && conteudo.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}
