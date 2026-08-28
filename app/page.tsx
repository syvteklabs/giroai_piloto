'use client'

import { Header } from '@/components/header'
import Link from 'next/link'
import { ArrowRight, TrendingUp, MapPin, Users, Lock, BarChart3, Handshake } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="relative bg-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-24 lg:py-28">
          {/* Two-column layout: flex on desktop, stack on mobile */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-20">

            {/* Left column: Content */}
            <div className="flex-1 mb-16 lg:mb-0">
              {/* Eyebrow */}
              <div className="mb-8">
                <span className="inline-block text-xs font-semibold text-giro-vermelho tracking-widest uppercase">
                  ● Ativação ao vivo · Merco Noroeste 2026
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-5xl xl:text-6xl font-bold text-giro-grafite mb-8 leading-tight">
                Estoque parado pode virar <span className="text-giro-vermelho">negócio</span>.
              </h1>

              {/* Description */}
              <p className="text-lg md:text-lg text-giro-texto-sec mb-12 leading-relaxed max-w-2xl">
                O Giro AÍ conecta estoques de moda a novas oportunidades e ajuda a revelar onde esse desafio também aparece em outros setores.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  href="/participar"
                  className="inline-flex px-8 py-4 bg-giro-vermelho text-white rounded-lg font-semibold hover:bg-giro-vermelho/90 items-center justify-center gap-2 transition transform hover:-translate-y-1 shadow-md hover:shadow-lg whitespace-nowrap"
                >
                  Tenho estoque parado <ArrowRight size={20} />
                </Link>
                <Link
                  href="/oportunidades"
                  className="inline-flex px-8 py-4 border-2 border-giro-grafite text-giro-grafite rounded-lg font-semibold hover:bg-giro-grafite hover:text-white transition transform hover:-translate-y-1 items-center justify-center whitespace-nowrap"
                >
                  Ver oportunidades
                </Link>
              </div>

              {/* Social Proof */}
              <p className="text-sm text-giro-texto-sec font-medium">
                Moda primeiro · Outros setores também podem participar
              </p>
            </div>

            {/* Right column: Visual Composition */}
            <div className="flex-1 lg:flex-shrink-0">
              <div className="w-full">
                {/* Visual composition container */}
                <div className="relative flex flex-col items-center justify-center">

                  {/* Top section: Estoque disponível */}
                  <div className="w-full max-w-sm mb-12">
                    <div className="bg-white border border-giro-borda rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-giro-grafite">Estoque disponível</h3>
                        <div className="w-2 h-2 bg-giro-vermelho rounded-full"></div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-giro-vermelho/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-giro-vermelho">P</span>
                          </div>
                          <span className="text-sm text-giro-texto-sec">Peças de moda</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-giro-turquesa/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-giro-turquesa">Q</span>
                          </div>
                          <span className="text-sm text-giro-texto-sec">Quantidade</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Arrow/Connection indicator */}
                  <div className="mb-12 flex flex-col items-center">
                    <div className="w-px h-8 bg-gradient-to-b from-giro-vermelho to-giro-turquesa mb-3"></div>
                    <div className="w-8 h-8 bg-giro-vermelho rounded-full flex items-center justify-center shadow-md">
                      <ArrowRight size={16} className="text-white" />
                    </div>
                    <div className="w-px h-8 bg-gradient-to-b from-giro-turquesa to-giro-vermelho mt-3"></div>
                  </div>

                  {/* Bottom section: Nova oportunidade */}
                  <div className="w-full max-w-sm">
                    <div className="bg-white border border-giro-turquesa rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-giro-grafite">Nova oportunidade</h3>
                        <div className="px-3 py-1.5 bg-giro-turquesa/10 rounded-lg text-xs font-semibold text-giro-turquesa">
                          B2B
                        </div>
                      </div>
                      <div className="text-sm text-giro-texto-sec">
                        Conexão de negócios criada pela plataforma
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Participação */}
      <section className="bg-white border-b border-giro-borda">
        <div className="max-w-6xl mx-auto px-4 py-24">
          <h2 className="text-3xl font-bold text-giro-grafite mb-12">Como você quer participar?</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/participar" className="group">
              <div className="p-8 bg-gradient-to-br from-giro-claro to-white rounded-lg border-2 border-giro-borda hover:border-giro-vermelho hover:shadow-lg transition cursor-pointer h-full">
                <h3 className="text-2xl font-semibold text-giro-grafite mb-3">Tenho estoque de moda</h3>
                <p className="text-giro-texto-sec mb-6">
                  Cadastre roupas, calçados ou acessórios e publique uma oportunidade.
                </p>
                <button className="px-6 py-2 bg-giro-vermelho text-white rounded-lg font-semibold hover:bg-giro-vermelho/90 transition">
                  Cadastrar estoque
                </button>
              </div>
            </Link>

            <Link href="/participar" className="group">
              <div className="p-8 bg-gradient-to-br from-giro-claro to-white rounded-lg border-2 border-giro-borda hover:border-giro-turquesa hover:shadow-lg transition cursor-pointer h-full">
                <h3 className="text-2xl font-bold text-giro-grafite mb-3">Meu setor também tem esse problema</h3>
                <p className="text-giro-texto-sec mb-6">
                  Registre seu setor e ajude a mostrar onde o estoque parado afeta a economia regional.
                </p>
                <button className="px-6 py-2 bg-giro-vermelho text-white rounded-lg font-semibold hover:bg-giro-vermelho/90 transition">
                  Registrar meu setor
                </button>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Processo */}
      <section className="bg-giro-claro">
        <div className="max-w-6xl mx-auto px-4 py-24">
          <h2 className="text-3xl font-bold text-giro-grafite text-center mb-16">
            Do estoque parado à oportunidade
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-giro-vermelho to-giro-vermelho/80 text-white flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold text-giro-grafite mb-3">Cadastre</h3>
              <p className="text-giro-texto-sec">Conte o que está parado.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-giro-turquesa to-giro-turquesa/80 text-white flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold text-giro-grafite mb-3">Apareça</h3>
              <p className="text-giro-texto-sec">Seu produto ou setor entra no painel territorial.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-giro-vermelho to-giro-vermelho/80 text-white flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold text-giro-grafite mb-3">Conecte-se</h3>
              <p className="text-giro-texto-sec">O Giro AÍ aproxima empresas interessadas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section className="bg-white border-b border-giro-borda">
        <div className="max-w-6xl mx-auto px-4 py-24">
          <h2 className="text-3xl font-bold text-giro-grafite mb-3">O estoque parado também tem território.</h2>
          <p className="text-giro-texto-sec mb-12 max-w-2xl">
            Cada participação ajuda a revelar onde estão os produtos, setores e oportunidades da região.
          </p>

          <div className="bg-gradient-to-br from-giro-claro to-giro-borda rounded-lg border-2 border-dashed border-giro-borda p-16 text-center mb-8">
            <div className="text-5xl mb-4">🗺️</div>
            <p className="text-xl font-semibold text-giro-grafite mb-2">Mapa em construção</p>
            <p className="text-giro-texto-sec">Dados em tempo real dos cadastros</p>
          </div>

          <div className="text-center">
            <Link
              href="/mapa"
              className="inline-block px-8 py-3 bg-giro-vermelho text-white rounded-lg font-semibold hover:bg-giro-vermelho/90 transition"
            >
              Ver mapa ao vivo
            </Link>
          </div>
        </div>
      </section>

      {/* Privacidade */}
      <section className="bg-giro-claro">
        <div className="max-w-6xl mx-auto px-4 py-24">
          <h2 className="text-3xl font-bold text-giro-grafite mb-3">Seus contatos não ficam públicos.</h2>
          <p className="text-giro-texto-sec mb-12 max-w-2xl">
            A vitrine e o mapa mostram apenas informações comerciais e dados agregados. O contato é intermediado pelo Giro AÍ.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-giro-vermelho rounded-full flex items-center justify-center">
                  <Lock className="text-white" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-giro-grafite mb-2">Dados Protegidos</h3>
                <p className="text-giro-texto-sec text-sm">Seus contatos são privados e seguros.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-giro-turquesa rounded-full flex items-center justify-center">
                  <BarChart3 className="text-white" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-giro-grafite mb-2">Agregado</h3>
                <p className="text-giro-texto-sec text-sm">Apenas dados agregados no painel territorial.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-giro-vermelho rounded-full flex items-center justify-center">
                  <Handshake className="text-white" size={24} />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-giro-grafite mb-2">Intermediado</h3>
                <p className="text-giro-texto-sec text-sm">Conexões feitas através da plataforma.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-giro-grafite text-white">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-6">O que está parado na sua empresa?</h2>
          <Link
            href="/participar"
            className="inline-block px-8 py-3 bg-giro-vermelho text-white rounded-lg font-semibold hover:bg-giro-vermelho/90 transition mb-8"
          >
            Participar agora
          </Link>
          <p className="text-gray-400 text-sm">Giro AÍ © 2026 - Piloto Merco Noroeste</p>
        </div>
      </footer>
    </div>
  )
}
