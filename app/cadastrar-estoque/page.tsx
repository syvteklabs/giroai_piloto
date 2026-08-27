'use client'

import { Header } from '@/components/header'
import { FormInput, FormSelect, FormTextarea } from '@/components/form-input'
import { cadastroEstoqueSchema } from '@/lib/validations'
import { supabase } from '@/lib/supabase'
import { useState } from 'react'
import { CheckCircle, Loader, AlertCircle } from 'lucide-react'

const categorias = [
  { value: 'roupas', label: 'Roupas' },
  { value: 'calcados', label: 'Calçados' },
  { value: 'acessorios', label: 'Acessórios' },
  { value: 'moda-infantil', label: 'Moda Infantil' },
  { value: 'moda-intima', label: 'Moda Íntima' },
  { value: 'bolsas', label: 'Bolsas' },
  { value: 'outros', label: 'Outros' },
]

export default function CadastrarEstoque() {
  const [formData, setFormData] = useState({
    nomeEmpresa: '',
    email: '',
    telefone: '',
    cidade: '',
    titulo: '',
    descricao: '',
    categoria: '',
    quantidade: '',
    preco_minimo: '',
    preco_maximo: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [statusMsg, setStatusMsg] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes('quantidade') || name.includes('preco')
        ? value ? parseFloat(value) : ''
        : value,
    }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setLoading(true)

    try {
      // Validar com Zod
      const validated = cadastroEstoqueSchema.parse(formData)

      // 1. Inserir empresa
      const { data: empresaData, error: empresaError } = await supabase
        .from('empresas')
        .insert([
          {
            nome: validated.nomeEmpresa,
            email: validated.email,
            telefone: validated.telefone,
            cidade: validated.cidade,
            setor: 'moda',
          },
        ])
        .select()

      if (empresaError) throw new Error(empresaError.message)
      const empresaId = empresaData?.[0]?.id

      if (!empresaId) throw new Error('Erro ao criar empresa')

      // 2. Inserir produto
      const { error: produtoError } = await supabase
        .from('produtos_moda')
        .insert([
          {
            empresa_id: empresaId,
            titulo: validated.titulo,
            descricao: validated.descricao,
            categoria: validated.categoria,
            quantidade: validated.quantidade,
            preco_minimo: validated.preco_minimo,
            preco_maximo: validated.preco_maximo,
            aprovado: false,
          },
        ])

      if (produtoError) throw new Error(produtoError.message)

      setSuccess(true)
      setStatusMsg('✓ Cadastro recebido! Analisaremos em breve.')
      setTimeout(() => setSuccess(false), 5000)
      setFormData({
        nomeEmpresa: '',
        email: '',
        telefone: '',
        cidade: '',
        titulo: '',
        descricao: '',
        categoria: '',
        quantidade: '',
        preco_minimo: '',
        preco_maximo: '',
      })
    } catch (error: any) {
      if (error.errors) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err: any) => {
          newErrors[err.path[0]] = err.message
        })
        setErrors(newErrors)
      } else {
        setStatusMsg(`Erro: ${error.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="flex-1 bg-giro-claro py-8 min-h-screen">
        <div className="max-w-2xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-giro-grafite mb-2">
              Cadastre seu Estoque de Moda
            </h1>
            <p className="text-giro-texto-sec">
              Transforme produtos parados em oportunidades de negócio
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm border border-giro-borda">
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <CheckCircle className="text-green-600" size={24} />
                <div>
                  <p className="font-semibold text-green-900">{statusMsg}</p>
                  <p className="text-sm text-green-700">
                    Você receberá um contato em breve
                  </p>
                </div>
              </div>
            )}

            {statusMsg && !success && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                <AlertCircle className="text-red-600" size={24} />
                <p className="text-red-900">{statusMsg}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dados da Empresa */}
              <div>
                <h2 className="text-lg font-semibold text-giro-grafite mb-4">
                  Dados da Empresa
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormInput
                    label="Nome da Empresa"
                    name="nomeEmpresa"
                    value={formData.nomeEmpresa}
                    onChange={handleChange}
                    placeholder="Sua Loja"
                    error={errors.nomeEmpresa}
                  />
                  <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="contato@loja.com"
                    error={errors.email}
                  />
                  <FormInput
                    label="Telefone"
                    name="telefone"
                    type="tel"
                    value={formData.telefone}
                    onChange={handleChange}
                    placeholder="(XX) 99999-9999"
                    error={errors.telefone}
                  />
                  <FormInput
                    label="Cidade"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                    placeholder="Sua cidade"
                    error={errors.cidade}
                  />
                </div>
              </div>

              {/* Dados do Produto */}
              <div>
                <h2 className="text-lg font-semibold text-giro-grafite mb-4">
                  Dados do Produto
                </h2>
                <div className="space-y-4">
                  <FormInput
                    label="Título do Produto"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleChange}
                    placeholder="Ex: Calças Jeans Premium"
                    error={errors.titulo}
                  />
                  <FormTextarea
                    label="Descrição"
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    placeholder="Descreva o produto..."
                    rows={3}
                    error={errors.descricao}
                  />
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormSelect
                      label="Categoria"
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleChange}
                      options={categorias}
                      error={errors.categoria}
                    />
                    <FormInput
                      label="Quantidade"
                      name="quantidade"
                      type="number"
                      value={formData.quantidade}
                      onChange={handleChange}
                      placeholder="Quantidade de itens"
                      error={errors.quantidade}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormInput
                      label="Preço Mínimo (R$)"
                      name="preco_minimo"
                      type="number"
                      step="0.01"
                      value={formData.preco_minimo}
                      onChange={handleChange}
                      placeholder="0,00"
                      error={errors.preco_minimo}
                    />
                    <FormInput
                      label="Preço Máximo (R$)"
                      name="preco_maximo"
                      type="number"
                      step="0.01"
                      value={formData.preco_maximo}
                      onChange={handleChange}
                      placeholder="0,00"
                      error={errors.preco_maximo}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-giro-vermelho text-white font-semibold rounded-lg hover:bg-opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader size={20} className="animate-spin" /> Enviando...
                  </>
                ) : (
                  'Cadastrar Produto'
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
