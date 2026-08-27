export interface Empresa {
  id: string
  nome: string
  email: string
  telefone: string
  cidade: string
  setor: string
  created_at: string
}

export interface ProdutoModa {
  id: string
  empresa_id: string
  titulo: string
  descricao: string
  categoria: string
  quantidade: number
  preco_minimo: number
  preco_maximo: number
  imagem_url?: string
  created_at: string
  aprovado: boolean
}

export interface RegistroOutroSetor {
  id: string
  setor: string
  tipo_estoque: string
  quantidade_aproximada: string
  faixa_valor: string
  cidade: string
  dificuldade_principal: string
  interesse_expansao: boolean
  email_protegido: string
  created_at: string
}

export interface Interesse {
  id: string
  email: string
  produto_id: string
  created_at: string
}

export type CategoriaModa =
  | 'roupas'
  | 'calcados'
  | 'acessorios'
  | 'moda-infantil'
  | 'moda-intima'
  | 'bolsas'
  | 'outros'
