'use client'

import { Header } from '@/components/header'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import { Heart, MessageCircle, MapPin, Loader } from 'lucide-react'
import type { ProdutoModa } from '@/types'

export default function Oportunidades() {
  const [produtos, setProdutos] = useState<
    (ProdutoModa & { empresas: { nome: string; cidade: string } })[]
  >([])
  const [loading, setLoading] = useState(true)
  const [filtroCategoria, setFiltroCategoria] = useState<string>('')
  const [interesseEmail, setInteresseEmail] = useState('')
  const [interesseProdutoId, setInteresseProdutoId] = useState<string | null>(null)

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        let query = supabase
          .from('produtos_moda')
          .select('*, empresas(nome, cidade)')
          .eq('aprovado', true)

        if (filtroCategoria) {
          query = query.eq('categoria', filtroCategoria)
        }

        const { data, error } = await query

        if (error) throw error
        setProdutos(data || [])
      } catch (error) {
        console.error('Erro ao carregar produtos:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProdutos()
  }, [filtroCategoria])

  const handleInteresse = async (produtoId: string) => {
    if (!interesseEmail) {
      alert('Digite seu email para registrar interesse')
      return
    }

    try {
      const { error } = await supabase.from('interesses').insert([
        {
          email: interesseEmail,
          produto_id: produtoId,
        },
      ])

      if (error && !error.message.includes('duplicate')) {
        throw error
      }

      setInteresseProdutoId(null)
      setInteresseEmail('')
      alert('✓ Interesse registrado! Você receberá contato em breve.')
    } catch (error: any) {
      console.error('Erro:', error)
      alert('Erro ao registrar interesse')
    }
  }

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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="flex-1 bg-giro-claro py-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-giro-grafite mb-2">
              Oportunidades de Compra
            </h1>
            <p className="text-giro-texto-sec">
              Encontre produtos de moda com preços especiais
            </p>
          </div>

          {/* Filtro */}
          <div className="mb-8">
            <select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
              className="w-full sm:w-48 px-4 py-2 border border-giro-borda rounded-lg text-giro-texto focus:outline-none focus:ring-2 focus:ring-giro-vermelho"
            >
              {categorias.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Grid de Produtos */}
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader className="animate-spin text-giro-vermelho" size={32} />
            </div>
          ) : produtos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-giro-texto-sec">
                Nenhum produto encontrado nesta categoria.
              </p>
              <p className="text-sm text-giro-texto-sec mt-2">
                Volte em breve para ver novas oportunidades!
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {produtos.map((produto) => (
                <div
                  key={produto.id}
                  className="bg-white rounded-lg overflow-hidden border border-giro-borda hover:shadow-lg transition"
                >
                  {/* Placeholder Image */}
                  <div className="w-full h-48 bg-gradient-to-br from-giro-vermelho/10 to-giro-turquesa/10 flex items-center justify-center">
                    <Heart className="text-giro-vermelho/30" size={48} />
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-giro-grafite mb-1 line-clamp-2">
                      {produto.titulo}
                    </h3>

                    <p className="text-xs text-giro-texto-sec mb-3 line-clamp-2">
                      {produto.descricao}
                    </p>

                    {/* Categoria e Loja */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="inline-block px-2 py-1 bg-giro-vermelho/10 text-giro-vermelho text-xs font-semibold rounded">
                          {produto.categoria}
                        </span>
                        <span className="text-xs text-giro-texto-sec">
                          {produto.quantidade} itens
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-giro-texto-sec">
                        <MapPin size={14} />
                        {produto.empresas?.cidade || 'Desconhecida'}
                      </div>
                      <div className="text-sm font-semibold text-giro-grafite">
                        R$ {produto.preco_minimo?.toFixed(2)} - R${' '}
                        {produto.preco_maximo?.toFixed(2)}
                      </div>
                    </div>

                    {/* Loja */}
                    <div className="mb-4 pb-4 border-t border-giro-borda">
                      <p className="text-xs font-medium text-giro-grafite">
                        {produto.empresas?.nome || 'Loja'}
                      </p>
                    </div>

                    {/* Interesse */}
                    {interesseProdutoId === produto.id ? (
                      <div className="space-y-2">
                        <input
                          type="email"
                          placeholder="Seu email"
                          value={interesseEmail}
                          onChange={(e) => setInteresseEmail(e.target.value)}
                          className="w-full px-3 py-2 text-xs border border-giro-borda rounded focus:outline-none focus:ring-2 focus:ring-giro-vermelho"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleInteresse(produto.id)}
                            className="flex-1 py-2 bg-giro-vermelho text-white text-xs font-semibold rounded hover:bg-opacity-90 transition"
                          >
                            Confirmar
                          </button>
                          <button
                            onClick={() => setInteresseProdutoId(null)}
                            className="flex-1 py-2 border border-giro-borda text-giro-texto text-xs font-semibold rounded hover:bg-giro-claro transition"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setInteresseProdutoId(produto.id)}
                        className="w-full py-2 flex items-center justify-center gap-2 bg-giro-vermelho text-white text-sm font-semibold rounded hover:bg-opacity-90 transition"
                      >
                        <MessageCircle size={16} /> Tenho Interesse
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
