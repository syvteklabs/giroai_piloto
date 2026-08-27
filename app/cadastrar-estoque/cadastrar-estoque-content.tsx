'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormInput, FormSelect, FormTextarea } from '@/components/form-input'
import { cadastroEstoqueSchema } from '@/lib/validations'
import { supabase } from '@/lib/supabase'
import { useState, useEffect } from 'react'
import { CheckCircle, Loader, AlertCircle, ArrowRight, MapPin, ShoppingBag } from 'lucide-react'

const categorias = [
  { value: 'roupas', label: 'Roupas' },
  { value: 'calcados', label: 'Calçados' },
  { value: 'acessorios', label: 'Acessórios' },
  { value: 'moda-infantil', label: 'Moda Infantil' },
  { value: 'moda-intima', label: 'Moda Íntima' },
  { value: 'bolsas', label: 'Bolsas' },
  { value: 'outros', label: 'Outros' },
]

interface SuccessData {
  empresa_id: string
  produto_id: string
}

export default function CadastrarEstoqueContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const utm = searchParams.toString()

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
  const [successData, setSuccessData] = useState<SuccessData | null>(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [supabaseReady, setSupabaseReady] = useState(!!supabase)

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

    if (!supabase) {
      setErrorMsg('Erro: Supabase ainda não foi configurado')
      return
    }

    setErrors({})
    setLoading(true)
    setErrorMsg('')

    try {
      const validated = cadastroEstoqueSchema.parse(formData)

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
        setErrorMsg(data.erro || 'Erro ao processar cadastro')
        setLoading(false)
        return
      }

      if (data && data.sucesso) {
        setSuccessData({
          empresa_id: data.empresa_id,
          produto_id: data.produto_id,
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
        setErrorMsg('Erro: Este email já foi cadastrado')
      } else if (error.message?.includes('não foi configurado')) {
        setErrorMsg('Erro: Supabase não foi configurado. Tente mais tarde.')
      } else {
        setErrorMsg(error.message || 'Erro ao processar cadastro')
      }
    } finally {
      setLoading(false)
    }
  }

  const buildLink = (path: string) => {
    return utm ? `${path}?${utm}` : path
  }

  if (!supabaseReady) {
    return (
      <section className="flex-1 bg-giro-claro py-8 md:py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg p-8 border border-giro-borda">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-3">
              <AlertCircle className="text-yellow-600 flex-shrink-0" size={24} />
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
    )
  }

  if (successData) {
    return (
      <section className="flex-1 bg-giro-claro py-8 md:py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg p-8 md:p-12 border border-giro-borda text-center">
            <div className="w-20 h-20 bg-giro-vermelho/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <CheckCircle className="text-giro-vermelho" size={48} />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-giro-grafite mb-4">
              Seu estoque entrou no Giro AÍ
            </h1>

            <p className="text-lg text-giro-texto-sec mb-8 max-w-lg mx-auto">
              Seu produto foi cadastrado e está sendo analisado. Em breve, será revelado na vitrine e no mapa da região.
            </p>

            <div className="bg-giro-claro rounded-lg p-6 mb-8">
              <p className="text-sm text-giro-texto-sec mb-2">
                Status de seu cadastro:
              </p>
              <p className="font-semibold text-giro-grafite">
                Aguardando análise
              </p>
            </div>

            <div className="space-y-3">
              <Link
                href={buildLink('/oportunidades')}
                className="block w-full py-3 bg-giro-vermelho text-white font-semibold rounded-lg hover:bg-opacity-90 transition flex items-center justify-center gap-2"
              >
                <ShoppingBag size={20} />
                Ver na vitrine
              </Link>

              <Link
                href={buildLink('/mapa')}
                className="block w-full py-3 border-2 border-giro-turquesa text-giro-turquesa font-semibold rounded-lg hover:bg-giro-turquesa hover:text-white transition flex items-center justify-center gap-2"
              >
                <MapPin size={20} />
                Ver no mapa
              </Link>

              <button
                onClick={() => {
                  setSuccessData(null)
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
                }}
                className="w-full py-3 bg-giro-claro border-2 border-giro-grafite text-giro-grafite font-semibold rounded-lg hover:bg-giro-grafite/5 transition flex items-center justify-center gap-2"
              >
                <ArrowRight size={20} />
                Cadastrar outro produto
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <main className="flex-1 bg-giro-claro py-8 md:py-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-giro-grafite mb-2">
            Faça seu estoque girar
          </h1>
          <p className="text-lg text-giro-texto-sec">
            Cadastre um produto ou lote de moda e transforme estoque parado em uma oportunidade.
          </p>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm border border-giro-borda">
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-red-900">{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Dados do Produto */}
            <div>
              <h2 className="text-lg font-semibold text-giro-grafite mb-6">
                Informações do Produto
              </h2>
              <div className="space-y-4">
                <FormInput
                  label="Nome/Título do Produto"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  placeholder="Ex: Calças Jeans Premium"
                  error={errors.titulo}
                  required
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <FormSelect
                    label="Categoria"
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    options={categorias}
                    error={errors.categoria}
                    required
                  />
                  <FormInput
                    label="Quantidade"
                    name="quantidade"
                    type="number"
                    min="1"
                    value={formData.quantidade}
                    onChange={handleChange}
                    placeholder="Quantidade de itens"
                    error={errors.quantidade}
                    required
                  />
                </div>

                <FormTextarea
                  label="Descrição (opcional)"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  placeholder="Descreva as características, condições e detalhes do produto..."
                  rows={3}
                  error={errors.descricao}
                />
              </div>
            </div>

            {/* Condição Comercial */}
            <div>
              <h2 className="text-lg font-semibold text-giro-grafite mb-6">
                Condição Comercial
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <FormInput
                  label="Preço Mínimo (R$)"
                  name="preco_minimo"
                  type="number"
                  min="0"
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
                  min="0"
                  step="0.01"
                  value={formData.preco_maximo}
                  onChange={handleChange}
                  placeholder="0,00"
                  error={errors.preco_maximo}
                />
              </div>
            </div>

            {/* Localização */}
            <div>
              <h2 className="text-lg font-semibold text-giro-grafite mb-6">
                Localização
              </h2>
              <FormInput
                label="Município"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                placeholder="Sua cidade"
                error={errors.cidade}
                required
              />
            </div>

            {/* Dados da Empresa */}
            <div>
              <h2 className="text-lg font-semibold text-giro-grafite mb-6">
                Dados da Empresa
              </h2>
              <div className="space-y-4">
                <FormInput
                  label="Nome da Empresa"
                  name="nomeEmpresa"
                  value={formData.nomeEmpresa}
                  onChange={handleChange}
                  placeholder="Sua Loja"
                  error={errors.nomeEmpresa}
                  required
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <FormInput
                    label="WhatsApp/Telefone"
                    name="telefone"
                    type="tel"
                    value={formData.telefone}
                    onChange={handleChange}
                    placeholder="(XX) 99999-9999"
                    error={errors.telefone}
                    required
                  />
                  <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="contato@empresa.com"
                    error={errors.email}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Informações de Proteção */}
            <div className="bg-giro-claro rounded-lg p-6 border border-giro-borda">
              <p className="text-sm text-giro-texto-sec">
                <span className="font-semibold text-giro-grafite">Proteção de dados:</span> Seu email e telefone não serão públicos. O contato é intermediado pelo Giro AÍ para sua segurança.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-giro-vermelho text-white font-semibold rounded-lg hover:bg-opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader size={20} className="animate-spin" /> Enviando cadastro...
                </>
              ) : (
                <>
                  <ArrowRight size={20} />
                  Cadastrar Produto
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
