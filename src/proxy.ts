import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_TOKEN } from "@/src/auth/sessao";
import { tokenValido } from "@/src/auth/token";

// Roda no servidor ANTES de cada página do "matcher" abrir.
// Sem token válido no cookie, a pessoa volta para o login.
export function proxy(request: NextRequest) {
  const token = request.cookies.get(COOKIE_TOKEN)?.value;

  if (token && tokenValido(token)) return NextResponse.next();

  const login = new URL("/", request.url);
  login.searchParams.set("acesso", "negado");

  const resposta = NextResponse.redirect(login);
  resposta.cookies.delete(COOKIE_TOKEN); // remove token vencido ou falso
  return resposta;
}

// Páginas protegidas (o ":path*" inclui as subpáginas, como /usuarios/novo)
export const config = {
  matcher: ["/dashboard/:path*", "/mercado/:path*", "/usuarios/:path*"],
};
