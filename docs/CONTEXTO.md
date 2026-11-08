# Contexto do projeto

## 2026-10-26 — CRUD de usuários (concluído)
- Decisão: JSON Server 0.17.4 na porta 3001 (`npm run api`), dados em `src/db.json`. Formulário único reaproveitado no cadastro (POST) e na edição (PUT). A tela usa campos "achatados" (`CamposFormulario`) e a API usa endereço aninhado e data `aaaa-mm-dd`; `paraUsuario` e `paraFormulario` traduzem entre os dois.
- Arquivos tocados:
  - `src/usuarios/` — tipos, api (borda), formulario, mascaras, validacoes, Campo, FormularioUsuario, TabelaUsuarios
  - `src/app/(pages)/usuarios/page.tsx` (listagem + exclusão), `novo/page.tsx`, `[id]/editar/page.tsx`
  - `src/painel/Sidebar.tsx` (link "Usuários"), `package.json` (script `api`)
- Padrão seguido: páginas em `src/app`, peças em `src/usuarios`. O aluno escreveu as Partes 1 a 3 e parte da 4 e da 5; Claude completou o resto a pedido.
- Pendências: `FormularioUsuario` passa de 50 linhas (Regra 4); dividir em seções quando houver tempo. O item "Usuários" do menu não fica destacado em `/usuarios/novo` e `/usuarios/[id]/editar` (compara o endereço exato).
- Armadilhas:
  - `page.tsx` fora de `src/app` não vira rota (aconteceu 2 vezes).
  - O nome do arquivo precisa ter as mesmas maiúsculas do import (`campo.tsx` × `./Campo`).
  - CPF agora passa pela conta dos dígitos verificadores: para testar use `123.456.789-09` ou `987.654.321-00`.
  - Sem `npm run api` ligado, as telas de usuário mostram erro de conexão.

## 2026-10-19 — Refatoração do CryptoView por domínio (skill codigo-ancorado)
- Decisão: o projeto passou a ser um painel corporativo de criptoativos (CryptoView). Dados reais da CoinGecko, top 20 em BRL, atualizados a cada 30 s no navegador. Código reorganizado por domínio para respeitar o limite de 50 linhas por função.
- Arquivos tocados:
  - `src/mercado/` — tipos, api (borda), formatar, calculos, MercadoProvider
  - `src/mercado/componentes/` — Ativo, Preco, Variacao, Sparkline, StatusAoVivo
  - `src/mercado/dashboard/` — Indicadores, PrincipaisAtivos, Destaques, Participacao
  - `src/mercado/tabela/` — ordenacao, TabelaMercado
  - `src/painel/` — Logo, Sidebar, Cartao, CabecalhoPagina, EstadoVazio
  - `src/app/page.tsx` (login), `src/app/(pages)/layout.tsx`, `dashboard/page.tsx`, `mercado/page.tsx`
  - Removidos: `src/components/`, `src/lib/`, `src/data/`, `public/equipe.jpg`
- Padrão seguido: só `src/mercado/api.ts` chama a API externa. Cálculos puros em `calculos.ts`. Páginas apenas montam blocos. `MercadoProvider` fica no layout de `(pages)`, então os dados não são buscados de novo ao trocar de página.
- Pendências: login é simulado (sem autenticação real). Nenhum teste automatizado.
- Armadilhas:
  - CoinGecko gratuita limita requisições: não baixar `INTERVALO_SEGUNDOS` de 30.
  - Não apagar `node_modules` com o `next dev` rodando: os binários `.node` ficam travados no Windows e a pasta fica pela metade (aconteceu e corrompeu o `es-abstract`). Parar o servidor antes e usar `npm ci`.
  - Alias `@/` aponta para a raiz do projeto, não para `src/` (use `@/src/...`).
