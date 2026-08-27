'use client'

import { Header } from '@/components/header'
import { FormInput, FormSelect, FormTextarea } from '@/components/form-input'
import { cadastroEstoqueSchema } from '@/lib/validations'
import { supabase, isSupabaseConfigured, getSupabaseError } from '@/lib/supabase'
import { useState, useEffect } from 'react'
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
  const [supabaseReady, setSupabaseReady] = useState(false)

  useEffect(() => {
    setSupabaseReady(isSupabaseConfigured())
  }, [])

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

    if (!supabaseReady) {
      setStatusMsg('Erro: Supabase ainda não foi configurado')
      return
    }

    setErrors({})
    setLoading(true)

    try {
      const validated = cadastroEstoqueSchema.parse(formData)

      if (!supabase) {
        throw new Error(getSupabaseError())
      }

      // Chamar RPC segura
      const { data, error } = await (supabase as any).rpc('cadastrar_empresa_com_produto', {
        p_nome_empresa: validated.nomeEmpresa,
        p_email: validated.email,
        p_telefone: validated.telefone,
        p_cidade: validated.cidade,
        p_titulo: validated.titulo,
        p_descricao: validated.descricao,
        p_categoria: validated.categoria,
        p_quantidade: validated.quantidade,
        p_preco_minimo: validated.preco_minimo,
        p_preco_maximo: validated.preco_maximo,
      })

      if (error) {
        throw new Error(error.message)
      }

      if (data && !data.sucesso) {
        setStatusMsg(`Erro: ${data.erro}`)
        setLoading(false)
        return
      }

      if (data && data.sucesso) {
        setSuccess(true)
        setStatusMsg(data.mensagem || '✓ Cadastro recebido! Analisaremos em breve.')
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
      }
    } catch (error: any) {
      if (error.errors && Array.isArray(error.errors)) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err: any) => {
          newErrors[err.path?.[0] || 'geral'] = err.message
        })
        setErrors(newErrors)
      } else if (error.message?.includes('Email já cadastrado')) {
        setStatusMsg('Erro: Este email já foi cadastrado')
      } else if (error.message?.includes('não foi configurado')) {
        setStatusMsg('Erro: Supabase não foi configurado. Tente mais tarde.')
      } else {
        setStatusMsg(`Erro: ${error.message || 'Falha ao processar cadastro'}`)
      }
    } finally {
      setLoading(false)
    }
  }

  if (!supabaseReady) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <section className="flex-1 bg-giro-claro py-8">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white rounded-lg p-8 border border-giro-borda">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-3">
                <AlertCircle className="text-yellow-600" size={24} />
                <div>
                  <p className="font-semibold text-yellow-900">
                    Supabase ainda não configurado
                  </p>
                  <p className="text-sm text-yellow-700">
                    Esta funcionalidade estará disponível em breve. Volte mais tarde.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="flex-1 bg-giro-claro py-8">
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
