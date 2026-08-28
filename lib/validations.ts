import { z } from 'zod'

export const cadastroEstoqueSchema = z.object({
  nomeEmpresa: z.string().min(3, 'Nome da empresa deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  telefone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  cidade: z.string().min(2, 'Cidade deve ter pelo menos 2 caracteres'),
  titulo: z.string().min(5, 'Título do produto deve ter pelo menos 5 caracteres'),
  descricao: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres'),
  categoria: z.enum([
    'roupas',
    'calcados',
    'acessorios',
    'moda-infantil',
    'moda-intima',
    'bolsas',
    'outros',
  ], { message: 'Selecione uma categoria válida' }),
  quantidade: z.coerce.number().int().min(1, 'Quantidade deve ser maior que 0'),
  preco_minimo: z.coerce.number().min(0, 'Preço mínimo deve ser 0 ou maior'),
  preco_maximo: z.coerce.number().min(0, 'Preço máximo deve ser 0 ou maior'),
})

export type CadastroEstoque = z.infer<typeof cadastroEstoqueSchema>

export const registroOutroSetorSchema = z.object({
  setor: z.string().min(3, 'Setor deve ter pelo menos 3 caracteres'),
  tipo_estoque: z.string().min(5, 'Descreva melhor o tipo de estoque (mínimo 5 caracteres)'),
  quantidade_aproximada: z.enum(['ate-100', '100-500', '500-1000', 'acima-1000'], { message: 'Selecione uma quantidade aproximada' }),
  faixa_valor: z.enum(['ate-1k', '1k-10k', '10k-50k', 'acima-50k'], { message: 'Selecione uma faixa de valor' }),
  cidade: z.string().min(2, 'Cidade deve ter pelo menos 2 caracteres'),
  dificuldade_principal: z.string().min(5, 'Descreva a dificuldade com mais detalhes (mínimo 5 caracteres)'),
  interesse_expansao: z.boolean(),
  email: z.string().email('Email inválido'),
})

export type RegistroOutroSetor = z.infer<typeof registroOutroSetorSchema>
