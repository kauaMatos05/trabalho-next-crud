import { corVariacao, formatarVariacao } from "../formatar";

// Percentual colorido: verde se subiu, vermelho se caiu
export default function Variacao({ valor, className = "" }: { valor: number | null; className?: string }) {
  return <span className={`tabular-nums ${corVariacao(valor)} ${className}`}>{formatarVariacao(valor)}</span>;
}
