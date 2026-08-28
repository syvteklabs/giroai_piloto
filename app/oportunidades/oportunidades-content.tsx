'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormInput, FormTextarea } from '@/components/form-input'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { Heart, MapPin, Loader, AlertCircle, CheckCircle, X, ArrowRight } from 'lucide-react'
import type { ProdutoModa } from '@/types'

const categorias = [
  { value: '', label: 'Todas as categorias' },
  { value: 'roupas', label: 'Roupas' },
  { value: 'calcados', label: 'Calçados' },
  { value: 'acessorios', label: 'Acessórios' },
  { value: 'moda-infantil', label: 'Moda Infantil' },
  { value: 'moda-intima', label: 'Moda Íntima' },
  { value: 'bolsas', label: 'Bolsas' },
  { value: 'outros', label: 'Outros' },
]

interface ProdutoComEmpresa extends ProdutoModa {
  empresas: { nome: string; cidade: string }
}

interface InteresseForm {
  empresa: string
  responsavel: string
  telefone: string
  cidade: string
  mensagem: string
  consentimento: boolean
}

export default function OportunidadesContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const utm = searchParams.toString()

  const [produtos, setProdutos] = useState<ProdutoComEmpresa[]>([])
  const [filteredProdutos, setFilteredProdutos] = useState<ProdutoComEmpresa[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filtroCategoria, setFiltroCategoria] = useState('')
  const [filtroCidade, setFiltroCidade] = useState('')
  const [cidades, setCidades] = useState<string[]>([])

  const [selectedProduto, setSelectedProduto] = useState<ProdutoComEmpresa | null>(null)
  const [interesseForm, setInteresseForm] = useState<InteresseForm>({
    empresa: '',
    responsavel: '',
    telefone: '',
    cidade: '',
    mensagem: '',
    consentimento: false,
  })
  const [interesseErrors, setInteresseErrors] = useState<Record<string, string>>({})
  const [submittingInteresse, setSubmittingInteresse] = useState(false)
  const [successInteresse, setSuccessInteresse] = useState(false)

  // Fetch produtos
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        if (!supabase) {
          setError('Supabase não configurado')
          setLoading(false)
          return
        }

        const { data, error: err } = await supabase
          .from('produtos_moda')
          .select('*, empresas(nome, cidade)')
          .eq('aprovado', true)

        if (err) throw err

        const produtosData = (data || []) as ProdutoComEmpresa[]
        setProdutos(produtosData)

        // Extract unique cities
        const uniqueCities = Array.from(
          new Set(produtosData.map((p) => p.empresas?.cidade).filter(Boolean))
        ).sort() as string[]
        setCidades(uniqueCities)
      } catch (err: any) {
        console.error('Erro ao carregar produtos:', err)
        setError('Erro ao carregar produtos')
      } finally {
        setLoading(false)
      }
    }

    fetchProdutos()
  }, [])

  // Apply filters
  useEffect(() => {
    let filtered = produtos

    if (filtroCategoria) {
      filtered = filtered.filter((p) => p.categoria === filtroCategoria)
    }

    if (filtroCidade) {
      filtered = filtered.filter((p) => p.empresas?.cidade === filtroCidade)
    }

    setFilteredProdutos(filtered)
  }, [produtos, filtroCategoria, filtroCidade])

  const handleInteresseChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setInteresseForm((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : value,
    }))
    if (interesseErrors[name]) {
      setInteresseErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const submitInteresse = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate
    const newErrors: Record<string, string> = {}
    if (!interesseForm.empresa) newErrors.empresa = 'Empresa obrigatória'
    if (!interesseForm.responsavel) newErrors.responsavel = 'Responsável obrigatório'
    if (!interesseForm.telefone) newErrors.telefone = 'WhatsApp obrigatório'
    if (!interesseForm.cidade) newErrors.cidade = 'Cidade obrigatória'
    if (!interesseForm.consentimento) newErrors.consentimento = 'Consentimento obrigatório'

    if (Object.keys(newErrors).length > 0) {
      setInteresseErrors(newErrors)
      return
    }

    if (!supabase || !selectedProduto) return

    setSubmittingInteresse(true)

    try {
      const { error: err } = await supabase.from('interesses').insert([
        {
          email: 'protegido@giroai.com', // Use placeholder to protect contact
          produto_id: selectedProduto.id,
        },
      ])

      if (err && !err.message.includes('duplicate')) {
        throw err
      }

      setSuccessInteresse(true)
      setTimeout(() => {
        setSelectedProduto(null)
        setSuccessInteresse(false)
        setInteresseForm({
          empresa: '',
          responsavel: '',
          telefone: '',
          cidade: '',
          mensagem: '',
          consentimento: false,
        })
        setInteresseErrors({})
      }, 3000)
    } catch (err: any) {
      console.error('Erro:', err)
      setInteresseErrors({ geral: 'Erro ao registrar interesse' })
    } finally {
      setSubmittingInteresse(false)
    }
  }

  const buildLink = (path: string) => {
    return utm ? `${path}?${utm}` : path
  }

  return (
    <main className="flex-1 bg-giro-claro py-8 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-giro-grafite mb-2">
            O que já está girando
          </h1>
          <p className="text-lg text-giro-texto-sec">
            Produtos e lotes de moda disponíveis para novas oportunidades comerciais.
          </p>
        </div>

        {/* Filtros */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <select
            value={filtroCategoria}
            onChange={(e) => setFiltroCategoria(e.target.value)}
            className="px-4 py-2 border border-giro-borda rounded-lg text-giro-texto focus:outline-none focus:ring-2 focus:ring-giro-vermelho"
          >
            {categorias.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>

          {cidades.length > 0 && (
            <select
              value={filtroCidade}
              onChange={(e) => setFiltroCidade(e.target.value)}
              className="px-4 py-2 border border-giro-borda rounded-lg text-giro-texto focus:outline-none focus:ring-2 focus:ring-giro-turquesa"
            >
              <option value="">Todas as cidades</option>
              {cidades.map((cidade) => (
                <option key={cidade} value={cidade}>
                  {cidade}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-16">
            <Loader className="animate-spin text-giro-vermelho" size={40} />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-white rounded-lg p-8 border border-giro-borda">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={24} />
              <div>
                <p className="font-semibold text-red-900">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProdutos.length === 0 && (
          <div className="bg-white rounded-lg p-12 border border-giro-borda text-center">
            <div className="w-16 h-16 bg-giro-vermelho/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <Heart className="text-giro-vermelho/50" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-giro-grafite mb-2">
              As primeiras oportunidades estão chegando.
            </h2>
            <p className="text-giro-texto-sec mb-8">
              Cadastre seu estoque e seja uma das primeiras empresas do Giro AÍ.
            </p>
            <Link
              href={buildLink('/cadastrar-estoque')}
              className="inline-flex items-center gap-2 px-8 py-3 bg-giro-vermelho text-white rounded-lg font-semibold hover:bg-opacity-90 transition"
            >
              Cadastrar estoque <ArrowRight size={20} />
            </Link>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && filteredProdutos.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProdutos.map((produto) => (
              <div
                key={produto.id}
                className="bg-white rounded-lg overflow-hidden border border-giro-borda hover:shadow-lg transition flex flex-col"
              >
                {/* Image Placeholder */}
                <div className="w-full h-48 bg-gradient-to-br from-giro-vermelho/10 to-giro-turquesa/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="text-giro-vermelho/30" size={48} />
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  {/* Title */}
                  <h3 className="font-bold text-giro-grafite mb-2 line-clamp-2 text-base">
                    {produto.titulo}
                  </h3>

                  {/* Description */}
                  {produto.descricao && (
                    <p className="text-xs text-giro-texto-sec mb-3 line-clamp-2">
                      {produto.descricao}
                    </p>
                  )}

                  {/* Info */}
                  <div className="space-y-2 mb-4 text-sm">
                    {/* Category */}
                    <div className="flex items-center gap-2">
                      <span className="inline-block px-2 py-1 bg-giro-vermelho/10 text-giro-vermelho text-xs font-semibold rounded">
                        {produto.categoria}
                      </span>
                      <span className="text-xs text-giro-texto-sec">
                        {produto.quantidade} itens
                      </span>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-1 text-xs text-giro-texto-sec">
                      <MapPin size={14} />
                      {produto.empresas?.cidade || 'Localidade desconhecida'}
                    </div>

                    {/* Price */}
                    <div className="font-semibold text-giro-grafite">
                      R$ {produto.preco_minimo?.toFixed(2)} - R${' '}
                      {produto.preco_maximo?.toFixed(2)}
                    </div>

                    {/* Date */}
                    {produto.created_at && (
                      <div className="text-xs text-giro-texto-sec">
                        {new Date(produto.created_at).toLocaleDateString('pt-BR')}
                      </div>
                    )}
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => {
                      setSelectedProduto(produto)
                      setInteresseForm({
                        empresa: '',
                        responsavel: '',
                        telefone: '',
                        cidade: '',
                        mensagem: '',
                        consentimento: false,
                      })
                      setInteresseErrors({})
                    }}
                    className="mt-auto w-full py-2 bg-giro-vermelho text-white font-semibold rounded hover:bg-opacity-90 transition"
                  >
                    Tenho interesse
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Interest Modal */}
      {selectedProduto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            {successInteresse ? (
              // Success State
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <CheckCircle className="text-green-600" size={40} />
                </div>
                <h2 className="text-2xl font-bold text-giro-grafite mb-2">
                  Interesse registrado
                </h2>
                <p className="text-giro-texto-sec">
                  O Giro AÍ analisará a conexão e entrará em contato com as empresas envolvidas.
                </p>
              </div>
            ) : (
              // Form State
              <>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-giro-grafite">
                      Registrar Interesse
                    </h2>
                    <p className="text-sm text-giro-texto-sec mt-1">
                      {selectedProduto.titulo}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedProduto(null)}
                    className="text-giro-texto-sec hover:text-giro-grafite"
                  >
                    <X size={24} />
                  </button>
                </div>

                {interesseErrors.geral && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded flex items-start gap-2">
                    <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={18} />
                    <p className="text-sm text-red-900">{interesseErrors.geral}</p>
                  </div>
                )}

                <form onSubmit={submitInteresse} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-giro-grafite mb-1">
                      Empresa *
                    </label>
                    <input
                      type="text"
                      name="empresa"
                      value={interesseForm.empresa}
                      onChange={handleInteresseChange}
                      placeholder="Sua empresa"
                      className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-giro-vermelho ${
                        interesseErrors.empresa ? 'border-red-500' : 'border-giro-borda'
                      }`}
                    />
                    {interesseErrors.empresa && (
                      <p className="text-xs text-red-500 mt-1">{interesseErrors.empresa}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-giro-grafite mb-1">
                      Responsável *
                    </label>
                    <input
                      type="text"
                      name="responsavel"
                      value={interesseForm.responsavel}
                      onChange={handleInteresseChange}
                      placeholder="Nome do responsável"
                      className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-giro-vermelho ${
                        interesseErrors.responsavel ? 'border-red-500' : 'border-giro-borda'
                      }`}
                    />
                    {interesseErrors.responsavel && (
                      <p className="text-xs text-red-500 mt-1">{interesseErrors.responsavel}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-giro-grafite mb-1">
                      WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="telefone"
                      value={interesseForm.telefone}
                      onChange={handleInteresseChange}
                      placeholder="(XX) 99999-9999"
                      className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-giro-vermelho ${
                        interesseErrors.telefone ? 'border-red-500' : 'border-giro-borda'
                      }`}
                    />
                    {interesseErrors.telefone && (
                      <p className="text-xs text-red-500 mt-1">{interesseErrors.telefone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-giro-grafite mb-1">
                      Cidade *
                    </label>
                    <input
                      type="text"
                      name="cidade"
                      value={interesseForm.cidade}
                      onChange={handleInteresseChange}
                      placeholder="Sua cidade"
                      className={`w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-giro-vermelho ${
                        interesseErrors.cidade ? 'border-red-500' : 'border-giro-borda'
                      }`}
                    />
                    {interesseErrors.cidade && (
                      <p className="text-xs text-red-500 mt-1">{interesseErrors.cidade}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-giro-grafite mb-1">
                      Mensagem (opcional)
                    </label>
                    <textarea
                      name="mensagem"
                      value={interesseForm.mensagem}
                      onChange={handleInteresseChange}
                      placeholder="Deixe uma mensagem..."
                      rows={3}
                      className="w-full px-3 py-2 border border-giro-borda rounded text-sm focus:outline-none focus:ring-2 focus:ring-giro-vermelho resize-none"
                    />
                  </div>

                  <label className="flex items-start gap-2 cursor-pointer p-3 border-2 border-giro-vermelho rounded">
                    <input
                      type="checkbox"
                      name="consentimento"
                      checked={interesseForm.consentimento}
                      onChange={handleInteresseChange}
                      className="mt-1 w-4 h-4 cursor-pointer accent-giro-vermelho"
                    />
                    <span className="text-sm text-giro-grafite">
                      Autorizo o Giro AÍ a compartilhar meu contato e informações com a empresa para processar este interesse.
                    </span>
                  </label>
                  {interesseErrors.consentimento && (
                    <p className="text-xs text-red-500">{interesseErrors.consentimento}</p>
                  )}

                  <div className="flex gap-2 pt-4">
                    <button
                      type="button"
                      onClick={() => setSelectedProduto(null)}
                      disabled={submittingInteresse}
                      className="flex-1 py-2 border border-giro-borda text-giro-texto rounded hover:bg-giro-claro transition disabled:opacity-50"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={submittingInteresse}
                      className="flex-1 py-2 bg-giro-vermelho text-white rounded hover:bg-opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {submittingInteresse ? (
                        <>
                          <Loader size={16} className="animate-spin" /> Enviando...
                        </>
                      ) : (
                        'Registrar'
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
