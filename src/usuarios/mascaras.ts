// Remove tudo que não for número: "123.456-7" -> "1234567"
export function somenteDigitos(valor: string) {
  return valor.replace(/\D/g, "");
}

// 12345678909 -> 123.456.789-09
export function mascaraCPF(valor: string) {
  return somenteDigitos(valor)
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

// 1133334444 -> (11) 3333-4444  |  11987654321 -> (11) 98765-4321
export function mascaraTelefone(valor: string) {
  const d = somenteDigitos(valor).slice(0, 11);
  if (d.length <= 10) {
    return d.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
  }
  return d.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}

// 01310100 -> 01310-100
export function mascaraCEP(valor: string) {
  return somenteDigitos(valor).slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2");
}

// 20012005 -> 20/01/2005
export function mascaraData(valor: string) {
  return somenteDigitos(valor)
    .slice(0, 8)
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2");
}

// "pr" -> "PR" (só letras, no máximo 2)
export function mascaraUF(valor: string) {
  return valor.replace(/[^a-zA-Z]/g, "").slice(0, 2).toUpperCase();
}
