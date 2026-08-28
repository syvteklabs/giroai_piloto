import { cadastroEstoqueSchema } from '../lib/validations'
import { expect, test } from '@jest/globals'

describe('Validação do Formulário de Cadastro de Estoque', () => {
  // Dados válidos para referência
  const dadosValidos = {
    nomeEmpresa: 'Loja Castro de Moda',
    email: 'castro@email.com',
    telefone: '(89) 99999-9999',
    cidade: 'Teresina',
    titulo: 'Camisetas Premium',
    descricao: 'Camisetas de alta qualidade que precisam de espaço',
    categoria: 'roupas' as const,
    quantidade: 150,
    preco_minimo: 29.9,
    preco_maximo: 59.9,
  }

  test('aceita dados válidos', () => {
    const resultado = cadastroEstoqueSchema.safeParse(dadosValidos)
    expect(resultado.success).toBe(true)
  })

  test('rejeita nome empresa com menos de 3 caracteres', () => {
    const dados = { ...dadosValidos, nomeEmpresa: 'AB' }
    const resultado = cadastroEstoqueSchema.safeParse(dados)
    expect(resultado.success).toBe(false)
  })

  test('rejeita email inválido', () => {
    const casos = [
      { ...dadosValidos, email: 'email-invalido' },
      { ...dadosValidos, email: 'test@' },
      { ...dadosValidos, email: '@example.com' },
    ]

    casos.forEach((dados) => {
      const resultado = cadastroEstoqueSchema.safeParse(dados)
      expect(resultado.success).toBe(false)
    })
  })

  test('aceita email válido', () => {
    const emails = [
      'test@example.com',
      'castro@email.com',
      'user+tag@domain.co.uk',
    ]

    emails.forEach((email) => {
      const dados = { ...dadosValidos, email }
      const resultado = cadastroEstoqueSchema.safeParse(dados)
      expect(resultado.success).toBe(true)
    })
  })

  test('rejeita telefone com menos de 10 dígitos', () => {
    const casos = [
      { ...dadosValidos, telefone: '12345678' },
      { ...dadosValidos, telefone: '123456789' },
    ]

    casos.forEach((dados) => {
      const resultado = cadastroEstoqueSchema.safeParse(dados)
      expect(resultado.success).toBe(false)
    })
  })

  test('aceita telefone com 10+ caracteres', () => {
    const telefones = [
      '(89) 99999-9999',
      '8999999999',
      '89 99999-9999',
    ]

    telefones.forEach((telefone) => {
      const dados = { ...dadosValidos, telefone }
      const resultado = cadastroEstoqueSchema.safeParse(dados)
      expect(resultado.success).toBe(true)
    })
  })

  test('rejeita cidade com menos de 2 caracteres', () => {
    const dados = { ...dadosValidos, cidade: 'A' }
    const resultado = cadastroEstoqueSchema.safeParse(dados)
    expect(resultado.success).toBe(false)
  })

  test('rejeita título com menos de 5 caracteres', () => {
    const dados = { ...dadosValidos, titulo: 'Test' }
    const resultado = cadastroEstoqueSchema.safeParse(dados)
    expect(resultado.success).toBe(false)
  })

  test('rejeita descrição com menos de 10 caracteres', () => {
    const dados = { ...dadosValidos, descricao: 'Teste' }
    const resultado = cadastroEstoqueSchema.safeParse(dados)
    expect(resultado.success).toBe(false)
  })

  test('rejeita categoria inválida', () => {
    const dados = { ...dadosValidos, categoria: 'categoria-inexistente' as any }
    const resultado = cadastroEstoqueSchema.safeParse(dados)
    expect(resultado.success).toBe(false)
  })

  test('aceita todas as categorias válidas', () => {
    const categorias = [
      'roupas',
      'calcados',
      'acessorios',
      'moda-infantil',
      'moda-intima',
      'bolsas',
      'outros',
    ] as const

    categorias.forEach((categoria) => {
      const dados = { ...dadosValidos, categoria }
      const resultado = cadastroEstoqueSchema.safeParse(dados)
      expect(resultado.success).toBe(true)
    })
  })

  test('rejeita quantidade zero ou negativa', () => {
    const casos = [
      { ...dadosValidos, quantidade: 0 },
      { ...dadosValidos, quantidade: -5 },
    ]

    casos.forEach((dados) => {
      const resultado = cadastroEstoqueSchema.safeParse(dados)
      expect(resultado.success).toBe(false)
    })
  })

  test('aceita quantidade positiva', () => {
    const quantidades = [1, 100, 1000, 999999]

    quantidades.forEach((quantidade) => {
      const dados = { ...dadosValidos, quantidade }
      const resultado = cadastroEstoqueSchema.safeParse(dados)
      expect(resultado.success).toBe(true)
    })
  })

  test('rejeita preço mínimo negativo', () => {
    const dados = { ...dadosValidos, preco_minimo: -10 }
    const resultado = cadastroEstoqueSchema.safeParse(dados)
    expect(resultado.success).toBe(false)
  })

  test('aceita preço mínimo zero', () => {
    const dados = { ...dadosValidos, preco_minimo: 0 }
    const resultado = cadastroEstoqueSchema.safeParse(dados)
    expect(resultado.success).toBe(true)
  })

  test('aceita preços decimais', () => {
    const dados = {
      ...dadosValidos,
      preco_minimo: 29.9,
      preco_maximo: 99.99,
    }
    const resultado = cadastroEstoqueSchema.safeParse(dados)
    expect(resultado.success).toBe(true)
  })

  test('retorna mensagens de erro descritivas', () => {
    const dados = {
      nomeEmpresa: 'AB',
      email: 'invalido',
      telefone: '123',
      cidade: 'A',
      titulo: 'Test',
      descricao: 'Desc',
      categoria: 'roupas',
      quantidade: 0,
      preco_minimo: -10,
      preco_maximo: 50,
    }

    const resultado = cadastroEstoqueSchema.safeParse(dados)

    if (!resultado.success) {
      expect(resultado.error.errors.length).toBeGreaterThan(0)
      // Verificar se há mensagens de erro
      resultado.error.errors.forEach((err) => {
        expect(err.message).toBeTruthy()
      })
    }
  })

  test('mapeia erros aos campos corretos', () => {
    const dados = {
      nomeEmpresa: 'AB',
      email: 'invalido',
      telefone: '123',
      cidade: 'A',
      titulo: 'Test',
      descricao: 'Desc',
      categoria: 'roupas',
      quantidade: 0,
      preco_minimo: -10,
      preco_maximo: 50,
    }

    const resultado = cadastroEstoqueSchema.safeParse(dados)

    if (!resultado.success) {
      const errorFields = resultado.error.errors.map((e) => e.path[0])
      expect(errorFields).toContain('nomeEmpresa')
      expect(errorFields).toContain('email')
      expect(errorFields).toContain('telefone')
    }
  })
})
