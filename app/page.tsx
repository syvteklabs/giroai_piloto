'use client'

import { Header } from '@/components/header'
import Link from 'next/link'
import { ArrowRight, TrendingUp, MapPin, Users, Lock, BarChart3, Handshake } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-giro-claro via-white to-giro-branco/5 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-giro-vermelho/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-giro-turquesa/5 rounded-full blur-3xl -ml-48 -mb-48"></div>

        <div className="relative max-w-6xl mx-auto px-4 py-32">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-giro-turquesa/10 rounded-full border border-giro-turquesa/20">
              <span className="w-2 h-2 bg-giro-turquesa rounded-full animate-pulse"></span>
              <span className="text-giro-turquesa font-semibold text-sm">
                ● PILOTO EM VALIDAÇÃO
              </span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-giro-grafite mb-6 text-center leading-tight">
            Estoque parado pode virar <span className="text-giro-vermelho">negócio</span>.
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-giro-texto-sec mb-12 max-w-2xl mx-auto text-center leading-relaxed">
            O Giro AÍ conecta estoques de moda a novas oportunidades e revela onde esse desafio também aparece em outros setores da economia.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-row gap-4 justify-center items-center mb-20 flex-wrap">
            <Link
              href="/participar"
              className="px-8 py-4 bg-giro-vermelho text-white rounded-lg font-semibold flex items-center justify-center gap-2 no-underline transition-all duration-300 shadow-lg hover:shadow-2xl hover:bg-giro-vermelho/85 hover:-translate-y-1 active:scale-95 relative overflow-hidden group"
            >
              <span className="relative z-10">Tenho estoque parado</span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </Link>
            <Link
              href="/oportunidades"
              className="px-8 py-4 border-2 border-giro-vermelho text-giro-vermelho rounded-lg font-semibold no-underline transition-all duration-300 hover:bg-giro-vermelho hover:text-white hover:shadow-lg hover:-translate-y-1 active:scale-95 relative overflow-hidden group"
            >
              <span className="relative z-10">Ver oportunidades</span>
              <div className="absolute inset-0 bg-giro-vermelho/0 group-hover:bg-giro-vermelho transition-colors duration-300 -z-1"></div>
            </Link>
          </div>

          {/* Hero visual - 3 feature cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white/50 backdrop-blur border border-giro-borda/50">
              <div className="w-12 h-12 bg-giro-vermelho/10 rounded-lg flex items-center justify-center mb-3">
                <TrendingUp className="text-giro-vermelho" size={24} />
              </div>
              <h3 className="font-semibold text-giro-grafite mb-1">Monetize</h3>
              <p className="text-sm text-giro-texto-sec">Transforme estoque em oportunidade</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white/50 backdrop-blur border border-giro-borda/50">
              <div className="w-12 h-12 bg-giro-turquesa/10 rounded-lg flex items-center justify-center mb-3">
                <MapPin className="text-giro-turquesa" size={24} />
              </div>
              <h3 className="font-semibold text-giro-grafite mb-1">Localize</h3>
              <p className="text-sm text-giro-texto-sec">Mapa territorial em tempo real</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-white/50 backdrop-blur border border-giro-borda/50">
              <div className="w-12 h-12 bg-giro-vermelho/10 rounded-lg flex items-center justify-center mb-3">
                <Users className="text-giro-vermelho" size={24} />
              </div>
              <h3 className="font-semibold text-giro-grafite mb-1">Conecte</h3>
              <p className="text-sm text-giro-texto-sec">Rede de oportunidades</p>
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
