@AGENTS.md

## Projeto: CryptoView
Painel corporativo de criptoativos. Next.js 16 (App Router) + React 19 + TypeScript + Tailwind 4.

- Rodar: `npm run dev` → http://localhost:3000
- Checar: `npx tsc --noEmit` e `npx eslint src`
- Alias `@/` = raiz do projeto (importe como `@/src/...`)
- Organização por domínio: `src/mercado/` (dados, regras, componentes do mercado), `src/painel/` (estrutura visual)
- Única chamada externa: `src/mercado/api.ts` (CoinGecko). Não baixar o intervalo de 30 s.
- Histórico de decisões: `docs/CONTEXTO.md`
