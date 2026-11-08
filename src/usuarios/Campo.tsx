type Props = {
  rotulo: string;
  valor: string;
  onChange: (valor: string) => void;
  tipo?: string;
  placeholder?: string;
  opcional?: boolean;
  className?: string;
  erro?: string;
};

// Um título + uma caixa de texto
export default function Campo({ rotulo, valor, onChange, tipo = "text", placeholder, opcional = false, className = "", erro }: Props) {
  return (
    <label className={`flex flex-col gap-1.5 text-sm font-medium text-slate-700 ${className}`}>
      <span>
        {rotulo} {opcional && <span className="font-normal text-slate-400">(opcional)</span>}
      </span>
      <input
        type={tipo}
        value={valor}
        placeholder={placeholder}
        required={!opcional}
        onChange={(e) => onChange(e.target.value)}
        className={`border rounded-md px-3 py-2 text-slate-900 font-normal placeholder-slate-400 focus:outline-none focus:ring-2 ${
          erro ? "border-red-500 focus:ring-red-500" : "border-slate-300 focus:ring-blue-600"
        }`}
      />
      {erro && <span className="text-xs font-normal text-red-600">{erro}</span>}
    </label>
  );
}
