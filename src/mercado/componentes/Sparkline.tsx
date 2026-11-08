// Mini gráfico de linha dos últimos 7 dias
export default function Sparkline({ precos, positivo }: { precos: number[]; positivo: boolean }) {
  if (precos.length < 2) return null;

  const min = Math.min(...precos);
  const max = Math.max(...precos);
  const faixa = max - min || 1;

  // Converte cada preço em um ponto (x, y) dentro de uma caixa 100 x 30
  const pontos = precos
    .map((p, i) => {
      const x = (i / (precos.length - 1)) * 100;
      const y = 30 - ((p - min) / faixa) * 30;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-28 h-8">
      <polyline
        points={pontos}
        fill="none"
        stroke={positivo ? "#059669" : "#dc2626"}
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
