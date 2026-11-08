// Título + subtítulo da página, com um botão/campo opcional à direita
export default function CabecalhoPagina({
  titulo,
  subtitulo,
  acao,
}: {
  titulo: string;
  subtitulo: string;
  acao?: React.ReactNode;
}) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold">{titulo}</h1>
        <p className="text-sm text-slate-500 mt-1">{subtitulo}</p>
      </div>
      {acao}
    </header>
  );
}
