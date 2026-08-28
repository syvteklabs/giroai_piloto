import { z } from 'zod'

export const cadastroEstoqueSchema = z.object({
  nomeEmpresa: z.string().min(3, 'Nome da empresa obrigatório'),
  email: z.string().email('Email inválido'),
  telefone: z.string()
    .min(10, 'Telefone deve ter pelo menos 10 dígitos')
    .regex(/^[\d\s()+-]+$/, 'Telefone deve conter apenas dígitos, espaços, parênteses ou hífens'),
  cidade: z.string().min(2, 'Cidade obrigatória'),
  titulo: z.string().min(5, 'Título do produto obrigatório'),
  descricao: z.string().min(10, 'Descrição obrigatória'),
  categoria: z.enum([
    'roupas',
    'calcados',
    'acessorios',
    'moda-infantil',
    'moda-intima',
    'bolsas',
    'outros',
  ]),
  quantidade: z.number().int().min(1, 'Quantidade deve ser maior que 0'),
  preco_minimo: z.number().min(0, 'Preço mínimo obrigatório'),
  preco_maximo: z.number().min(0, 'Preço máximo obrigatório'),
}).refine(
  (data) => data.preco_minimo <= data.preco_maximo,
  {
    message: 'Preço mínimo não pode ser maior que máximo',
    path: ['preco_maximo']
  }
)

export type CadastroEstoque = z.infer<typeof cadastroEstoqueSchema>

export const registroOutroSetorSchema = z.object({
  setor: z.string().min(3, 'Setor obrigatório'),
  tipo_estoque: z.string().min(5, 'Tipo de estoque obrigatório'),
  quantidade_aproximada: z.enum(['ate-100', '100-500', '500-1000', 'acima-1000']),
  faixa_valor: z.enum(['ate-1k', '1k-5k', '5k-20k', '20k-50k', 'acima-50k', 'nao-sei']),
  estado: z.string().min(2, 'Estado obrigatório'),
  cidade: z.string().min(2, 'Cidade obrigatória'),
  dificuldade_principal: z.string().min(3, 'Dificuldade obrigatória'),
  empresa: z.string().min(2, 'Empresa obrigatória'),
  responsavel: z.string().min(3, 'Responsável obrigatório'),
  telefone: z.string().min(10, 'Telefone obrigatório'),
  interesse_expansao: z.boolean(),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  consentimento: z.boolean(),
})

export type RegistroOutroSetor = z.infer<typeof registroOutroSetorSchema>
