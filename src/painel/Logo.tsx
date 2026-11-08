export default function Logo({ claro = false }: { claro?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="w-8 h-8 shrink-0">
        <rect width="32" height="32" rx="6" fill="#1d4ed8" />
        <polyline
          points="7,22 13,16 18,19 25,10"
          fill="none"
          stroke="#fff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="25" cy="10" r="2.2" fill="#fff" />
      </svg>
      <span className={`text-lg font-bold tracking-tight ${claro ? "text-white" : "text-slate-900"}`}>
        Crypto<span className="text-blue-500">View</span>
      </span>
    </div>
  );
}
