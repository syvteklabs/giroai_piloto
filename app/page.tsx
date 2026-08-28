'use client'

import { Header } from '@/components/header'
import Link from 'next/link'
import { ArrowRight, TrendingUp, MapPin, Users, Lock, BarChart3, Handshake } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="relative bg-white border-b border-giro-borda">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">

          {/* Eyebrow */}
          <div className="mb-4">
            <span className="text-xs font-semibold text-giro-vermelho tracking-wider">
              ● ATIVAÇÃO AO VIVO · MERCO NOROESTE 2026
            </span>
          </div>

          {/* Desktop: Two columns | Mobile: Single column */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Left Column: Content */}
            <div>
              {/* Heading */}
              <h1 className="text-4xl md:text-5xl font-bold text-giro-grafite mb-6 leading-tight">
                Estoque parado pode virar <span className="text-giro-vermelho">negócio</span>.
              </h1>

              {/* Description */}
              <p className="text-base text-giro-texto-sec mb-8 leading-relaxed">
                O Giro AÍ conecta estoques de moda a novas oportunidades e ajuda a revelar onde esse desafio também aparece em outros setores.
              </p>

              {/* Buttons - FIXED WIDTH */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link
                  href="/participar"
                  className="px-6 py-3 bg-giro-vermelho text-white font-semibold rounded-lg hover:bg-giro-vermelho/90 transition text-center whitespace-nowrap"
                >
                  Tenho estoque parado
                </Link>
                <Link
                  href="/oportunidades"
                  className="px-6 py-3 border border-giro-grafite text-giro-grafite font-semibold rounded-lg hover:bg-giro-grafite hover:text-white transition text-center whitespace-nowrap"
                >
                  Ver oportunidades
                </Link>
              </div>

              {/* Social Proof */}
              <p className="text-xs text-giro-texto-sec">
                Moda primeiro · Outros setores também podem participar
              </p>
            </div>

            {/* Right Column: Visual Diagram */}
            <div className="hidden lg:flex flex-col items-center justify-center">
              <div className="w-full max-w-xs space-y-8">

                {/* Card 1 */}
                <div className="bg-giro-claro border border-giro-borda rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded bg-giro-vermelho/10 flex items-center justify-center text-xs font-bold text-giro-vermelho">P</div>
                    <h3 className="text-sm font-semibold text-giro-grafite">Estoque disponível</h3>
                  </div>
                  <p className="text-xs text-giro-texto-sec">Peças, quantidade</p>
                </div>

                {/* Connection */}
                <div className="flex justify-center">
                  <div className="w-0.5 h-12 bg-giro-vermelho"></div>
                </div>

                {/* Card 2 */}
                <div className="bg-white border border-giro-turquesa rounded-lg p-4">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-giro-turquesa/10 flex items-center justify-center text-xs font-bold text-giro-turquesa">💼</div>
                      <h3 className="text-sm font-semibold text-giro-grafite">Nova oportunidade</h3>
                    </div>
                    <span className="text-xs font-semibold text-giro-turquesa bg-giro-turquesa/10 px-2 py-1 rounded">B2B</span>
                  </div>
                  <p className="text-xs text-giro-texto-sec">Conexão de negócios</p>
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
