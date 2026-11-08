// Caixa branca padrão do painel, com título opcional no topo
export default function Cartao({
  titulo,
  legenda,
  children,
  className = "",
}: {
  titulo?: string;
  legenda?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white border border-slate-200 rounded-lg overflow-hidden ${className}`}>
      {titulo && (
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-semibold">{titulo}</h2>
          {legenda && <span className="text-xs text-slate-500">{legenda}</span>}
        </div>
      )}
      {children}
    </div>
  );
}
