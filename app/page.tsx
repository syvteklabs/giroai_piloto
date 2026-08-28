'use client'

import { Header } from '@/components/header'
import Link from 'next/link'
import { ArrowRight, TrendingUp, MapPin, Users, Lock, BarChart3, Handshake } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="relative bg-white overflow-hidden border-b border-giro-borda">
        <div className="max-w-6xl mx-auto px-4 py-20 sm:py-24 md:py-28 lg:py-32">

          {/* Eyebrow */}
          <div className="mb-6 md:mb-8">
            <span className="inline-block text-xs md:text-xs font-semibold text-giro-vermelho tracking-wider">
              ● ATIVAÇÃO AO VIVO · MERCO NOROESTE 2026
            </span>
          </div>

          {/* Main content grid - responsive */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left column */}
            <div className="flex flex-col justify-start">
              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-5xl font-bold text-giro-grafite mb-6 leading-snug">
                Estoque parado pode virar <span className="text-giro-vermelho">negócio</span>.
              </h1>

              {/* Description */}
              <p className="text-base sm:text-base md:text-base text-giro-texto-sec mb-10 leading-relaxed max-w-xl">
                O Giro AÍ conecta estoques de moda a novas oportunidades e ajuda a revelar onde esse desafio também aparece em outros setores.
              </p>

              {/* CTA Buttons - side by side on desktop, stacked on mobile */}
              <div className="flex flex-col sm:flex-row gap-3 mb-10 w-full sm:w-auto">
                <Link
                  href="/participar"
                  className="flex-1 sm:flex-none px-7 py-3 bg-giro-vermelho text-white text-center font-semibold rounded-lg hover:bg-giro-vermelho/90 transition shadow-md hover:shadow-lg"
                >
                  Tenho estoque parado
                </Link>
                <Link
                  href="/oportunidades"
                  className="flex-1 sm:flex-none px-7 py-3 border border-giro-grafite text-giro-grafite text-center font-semibold rounded-lg hover:bg-giro-grafite hover:text-white transition"
                >
                  Ver oportunidades
                </Link>
              </div>

              {/* Social proof */}
              <p className="text-xs sm:text-sm text-giro-texto-sec font-medium">
                Moda primeiro · Outros setores também podem participar
              </p>
            </div>

            {/* Right column - Visual diagram */}
            <div className="flex flex-col items-center lg:items-start justify-center">
              <div className="w-full max-w-sm">
                {/* Step 1: Stock */}
                <div className="mb-10">
                  <div className="bg-giro-claro border border-giro-borda rounded-xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-giro-vermelho/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-giro-vermelho">📦</span>
                      </div>
                      <h3 className="text-sm font-semibold text-giro-grafite">Estoque disponível</h3>
                    </div>
                    <p className="text-xs text-giro-texto-sec">Peças, quantidade e categoria</p>
                  </div>
                </div>

                {/* Connection */}
                <div className="flex justify-center mb-10">
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-6 bg-giro-vermelho mb-2"></div>
                    <div className="w-5 h-5 rounded-full bg-giro-vermelho flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                    <div className="w-0.5 h-6 bg-giro-vermelho mt-2"></div>
                  </div>
                </div>

                {/* Step 2: Opportunity */}
                <div>
                  <div className="bg-white border border-giro-turquesa rounded-xl p-5">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-giro-turquesa/10 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-giro-turquesa">🤝</span>
                        </div>
                        <h3 className="text-sm font-semibold text-giro-grafite">Nova oportunidade</h3>
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 bg-giro-turquesa/10 text-giro-turquesa rounded-md">B2B</span>
                    </div>
                    <p className="text-xs text-giro-texto-sec">Conexão com interessados</p>
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
