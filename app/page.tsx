'use client'

import { Header } from '@/components/header'
import Link from 'next/link'
import { Lock, ArrowRight, TrendingUp, Search, Shield, MapPin } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Produto {
  id: string
  titulo: string
  descricao?: string
  categoria: string
  quantidade: number
  preco_minimo?: number
  preco_maximo?: number
  imagem_url?: string
  empresas?: { nome: string; cidade: string }
}

export default function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadProdutos()
  }, [])

  async function loadProdutos() {
    try {
      setLoading(true)
      const { data, error: supabaseError } = await supabase
        .from('produtos_moda')
        .select('id, titulo, descricao, categoria, quantidade, preco_minimo, preco_maximo, imagem_url, empresas(nome, cidade)')
        .eq('aprovado', true)
        .limit(3)

      if (supabaseError) {
        console.error('Erro ao carregar produtos:', supabaseError)
        setError('Não foi possível carregar os produtos')
      } else {
        setProdutos(data || [])
      }
    } catch (err) {
      console.error('Erro:', err)
      setError('Erro ao conectar com o banco de dados')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-giro-branco">
      <Header />

      {/* Hero */}
      <section className="bg-giro-grafite text-giro-branco min-h-[calc(100vh-72px)]">
        <div className="max-w-[1180px] mx-auto px-4 py-12 md:py-20 h-full flex items-center">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center w-full">
            {/* Coluna esquerda */}
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-giro-turquesa text-xs md:text-sm font-bold tracking-widest uppercase">
                  EXPERIÊNCIA PILOTO · MERCO NOROESTE 2026
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Estoque parado pode virar negócio.
              </h1>

              <p className="text-lg text-gray-300 max-w-md">
                O Giro AÍ conecta estoques de moda a lojistas interessados em novas oportunidades de compra.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/cadastrar-estoque"
                  className="px-8 py-3 bg-giro-vermelho text-white rounded-lg font-semibold hover:bg-opacity-90 transition text-center"
                >
                  Cadastrar meu estoque
                </Link>
                <Link
                  href="/oportunidades"
                  className="px-8 py-3 border-2 border-giro-branco text-giro-branco rounded-lg font-semibold hover:bg-giro-branco hover:text-giro-grafite transition text-center"
                >
                  Ver oportunidades
                </Link>
              </div>

              {/* Barra de confiança */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-giro-turquesa rounded-full"></span>
                  Cadastro rápido
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-giro-turquesa rounded-full"></span>
                  Contato protegido
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-giro-turquesa rounded-full"></span>
                  Você decide com quem negociar
                </div>
              </div>
            </div>

            {/* Coluna direita - Elemento gráfico */}
            <div className="hidden md:flex items-center justify-center relative h-96">
              <svg
                viewBox="0 0 300 300"
                className="w-full h-full max-w-sm"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Círculos de órbita */}
                <circle
                  cx="150"
                  cy="150"
                  r="80"
                  fill="none"
                  stroke="url(#grad1)"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  opacity="0.5"
                />
                <circle
                  cx="150"
                  cy="150"
                  r="120"
                  fill="none"
                  stroke="url(#grad2)"
                  strokeWidth="2"
                  strokeDasharray="8,8"
                  opacity="0.3"
                />

                {/* Gradientes */}
                <defs>
                  <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF1F35" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#08BDBA" stopOpacity="0.3" />
                  </linearGradient>
                  <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#08BDBA" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#FF1F35" stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                {/* Logo central */}
                <circle cx="150" cy="150" r="35" fill="#FF1F35" opacity="0.1" />
                <text
                  x="150"
                  y="165"
                  textAnchor="middle"
                  fontSize="60"
                  fontWeight="bold"
                  fill="currentColor"
                  className="text-giro-vermelho"
                >
                  G
                </text>

                {/* Setas de movimento */}
                <g stroke="#08BDBA" strokeWidth="2" fill="none">
                  {/* Seta superior */}
                  <line x1="150" y1="20" x2="150" y2="50" />
                  <polygon points="150,20 145,30 155,30" fill="#08BDBA" />

                  {/* Seta direita */}
                  <line x1="280" y1="150" x2="250" y2="150" />
                  <polygon points="280,150 270,145 270,155" fill="#08BDBA" />

                  {/* Seta inferior esquerda */}
                  <line x1="100" y1="230" x2="80" y2="250" />
                  <polygon points="100,230 92,225 98,235" fill="#08BDBA" />
                </g>

                {/* Pontos decorativos */}
                <circle cx="150" cy="30" r="4" fill="#08BDBA" />
                <circle cx="270" cy="150" r="4" fill="#FF1F35" />
                <circle cx="70" cy="260" r="4" fill="#08BDBA" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section id="como-funciona" className="bg-giro-branco py-16 md:py-24">
        <div className="max-w-[1180px] mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-giro-grafite mb-4 text-center">
            Menos estoque parado. Mais oportunidades circulando.
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {/* Recuperar capital */}
            <div className="p-8 bg-giro-branco rounded-2xl border border-giro-borda hover:shadow-lg transition">
              <div className="w-14 h-14 bg-giro-vermelho/10 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="text-giro-vermelho" size={28} />
              </div>
              <h3 className="text-xl font-bold text-giro-grafite mb-3">Recupere capital</h3>
              <p className="text-giro-texto-sec">
                Transforme produtos parados em caixa de forma rápida e inteligente.
              </p>
            </div>

            {/* Descobrir oportunidades */}
            <div className="p-8 bg-giro-branco rounded-2xl border border-giro-borda hover:shadow-lg transition">
              <div className="w-14 h-14 bg-giro-turquesa/10 rounded-xl flex items-center justify-center mb-6">
                <Search className="text-giro-turquesa" size={28} />
              </div>
              <h3 className="text-xl font-bold text-giro-grafite mb-3">Descubra oportunidades</h3>
              <p className="text-giro-texto-sec">
                Encontre estoques de moda que podem fazer sentido para o seu negócio.
              </p>
            </div>

            {/* Negocie com segurança */}
            <div className="p-8 bg-giro-branco rounded-2xl border border-giro-borda hover:shadow-lg transition">
              <div className="w-14 h-14 bg-giro-vermelho/10 rounded-xl flex items-center justify-center mb-6">
                <Shield className="text-giro-vermelho" size={28} />
              </div>
              <h3 className="text-xl font-bold text-giro-grafite mb-3">Negocie com segurança</h3>
              <p className="text-giro-texto-sec">
                Seu contato fica protegido. Você decide com quem conversar e em quais condições.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fluxo em 3 etapas */}
      <section className="bg-giro-claro py-16 md:py-24">
        <div className="max-w-[1180px] mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-giro-grafite mb-16 text-center">
            Do estoque parado à oportunidade
          </h2>

          <div className="grid md:grid-cols-3 gap-8 md:gap-4">
            {/* Etapa 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-giro-turquesa rounded-full flex items-center justify-center mb-6 flex-shrink-0">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-bold text-giro-grafite mb-3">Cadastre</h3>
              <p className="text-giro-texto-sec">
                Informe os produtos parados da sua empresa em poucos minutos.
              </p>

              {/* Seta para desktop */}
              <div className="hidden md:block absolute mt-20 w-12 h-0.5 bg-gradient-to-r from-giro-turquesa to-transparent transform translate-x-full"></div>
            </div>

            {/* Etapa 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-giro-vermelho rounded-full flex items-center justify-center mb-6 flex-shrink-0">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-bold text-giro-grafite mb-3">Descubra</h3>
              <p className="text-giro-texto-sec">
                Lojistas visualizam os itens e demonstram interesse nas oportunidades.
              </p>

              {/* Seta para desktop */}
              <div className="hidden md:block absolute mt-20 w-12 h-0.5 bg-gradient-to-r from-giro-vermelho to-transparent transform translate-x-full"></div>
            </div>

            {/* Etapa 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-giro-turquesa rounded-full flex items-center justify-center mb-6 flex-shrink-0">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-bold text-giro-grafite mb-3">Conecte-se</h3>
              <p className="text-giro-texto-sec">
                Você escolhe com quem conversar e conduz a negociação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vitrine de oportunidades */}
      <section className="bg-giro-branco py-16 md:py-24">
        <div className="max-w-[1180px] mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-giro-grafite mb-12 text-center">
            O que já está girando
          </h2>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 mb-8 text-center">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <p className="text-giro-texto-sec">Carregando produtos...</p>
            </div>
          ) : produtos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-giro-texto-sec text-lg">Ainda não há produtos cadastrados.</p>
              <p className="text-giro-texto-sec mb-6">Seja o primeiro a cadastrar seu estoque!</p>
              <Link
                href="/cadastrar-estoque"
                className="inline-block px-8 py-3 bg-giro-vermelho text-white rounded-lg font-semibold hover:bg-opacity-90 transition"
              >
                Cadastrar estoque
              </Link>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {produtos.map((produto) => (
                  <div
                    key={produto.id}
                    className="bg-giro-branco rounded-xl border border-giro-borda overflow-hidden hover:shadow-lg transition flex flex-col"
                  >
                    {/* Imagem placeholder */}
                    <div className="w-full h-48 bg-gradient-to-br from-giro-claro to-gray-100 flex items-center justify-center text-giro-texto-sec">
                      {produto.imagem_url ? (
                        <img
                          src={produto.imagem_url}
                          alt={produto.titulo}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-sm">Sem imagem</span>
                      )}
                    </div>

                    {/* Conteúdo */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="mb-3">
                        <span className="text-xs font-semibold text-giro-turquesa uppercase tracking-wide">
                          {produto.categoria}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-giro-grafite mb-2 line-clamp-2">
                        {produto.titulo}
                      </h3>

                      <p className="text-sm text-giro-texto-sec mb-4 flex-grow">
                        Quantidade: <span className="font-semibold">{produto.quantidade}</span>
                      </p>

                      {(produto.preco_minimo || produto.preco_maximo) && (
                        <p className="text-sm text-giro-texto-sec mb-4">
                          R$ {produto.preco_minimo?.toFixed(2)} - R${' '}
                          {produto.preco_maximo?.toFixed(2)}
                        </p>
                      )}

                      {produto.empresas && (
                        <p className="text-sm text-giro-texto-sec mb-4 flex items-center gap-1">
                          <MapPin size={14} /> {produto.empresas.cidade}
                        </p>
                      )}

                      <button className="w-full py-2.5 border-2 border-giro-vermelho text-giro-vermelho rounded-lg font-semibold hover:bg-giro-vermelho hover:text-white transition text-sm">
                        Tenho interesse
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Link
                  href="/oportunidades"
                  className="inline-block px-8 py-3 border-2 border-giro-vermelho text-giro-vermelho rounded-lg font-semibold hover:bg-giro-vermelho hover:text-white transition"
                >
                  Ver mais oportunidades
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Contato Protegido */}
      <section className="bg-giro-turquesa-claro py-16 md:py-24">
        <div className="max-w-[1180px] mx-auto px-4">
          <div className="flex items-start gap-6">
            <Lock className="text-giro-turquesa flex-shrink-0 mt-1" size={32} />
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-giro-grafite mb-3">
                Seu contato permanece protegido
              </h2>
              <p className="text-giro-texto-sec text-lg">
                Seu telefone e e-mail não são exibidos. Os lojistas demonstram interesse e você decide com quem
                compartilhar seus dados e iniciar a conversa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Registrar outros setores */}
      <section className="bg-giro-branco py-16 md:py-24">
        <div className="max-w-[1180px] mx-auto px-4">
          <div className="bg-gradient-to-r from-giro-grafite to-giro-grafite rounded-2xl p-8 md:p-16 text-center text-giro-branco">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O estoque parado também afeta outros setores?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Registre seu setor e ajude a revelar onde esse desafio aparece na economia regional.
            </p>
            <Link
              href="/outros-setores"
              className="inline-block px-8 py-3 bg-giro-vermelho text-white rounded-lg font-semibold hover:bg-opacity-90 transition"
            >
              Registrar meu setor
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-giro-grafite text-giro-branco py-16 md:py-24">
        <div className="max-w-[1180px] mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O que está parado na sua empresa?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Cadastre seu estoque e conecte-se a lojistas que estão procurando oportunidades como a sua.
            </p>
            <Link
              href="/cadastrar-estoque"
              className="inline-block px-8 py-3 bg-giro-vermelho text-white rounded-lg font-semibold hover:bg-opacity-90 transition"
            >
              Quero fazer meu estoque girar
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-giro-borda bg-giro-branco">
        <div className="max-w-[1180px] mx-auto px-4 py-8 text-center text-giro-texto-sec text-sm">
          <p>Giro AÍ © 2026 - Piloto Merco Noroeste</p>
        </div>
      </footer>
    </div>
  )
}
