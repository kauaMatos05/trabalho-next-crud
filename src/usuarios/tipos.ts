export type Endereco = {
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
};

export type Usuario = {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  dataNascimento: string;
  senha: string;
  endereco: Endereco;
};

// Mesmo formato, mas sem o id (quem cria o id é a API)
export type NovoUsuario = Omit<Usuario, "id">;
