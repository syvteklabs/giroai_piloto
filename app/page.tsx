'use client'

import { Header } from '@/components/header'
import Link from 'next/link'
import { ArrowRight, TrendingUp, MapPin, Users, Lock, BarChart3, Handshake } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden min-h-[700px] flex flex-col justify-center">
        {/* Premium gradient background - Dark + Brand colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-giro-grafite via-giro-grafite to-[#0a0d0f] z-0"></div>

        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-giro-vermelho/15 via-transparent to-giro-turquesa/15 z-0"></div>

        {/* Geometric decorative elements with stronger presence */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-giro-vermelho/20 to-giro-vermelho/0 rounded-full blur-3xl -mr-96 -mt-96 z-0"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-giro-turquesa/20 to-giro-turquesa/0 rounded-full blur-3xl -ml-48 -mb-48 z-0"></div>
        <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] bg-gradient-to-b from-giro-vermelho/10 to-transparent rounded-full blur-3xl z-0"></div>

        {/* Grid pattern overlay for sophistication */}
        <div className="absolute inset-0 opacity-5 z-0" style={{backgroundImage: 'linear-gradient(90deg, #fff 1px, transparent 1px), linear-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 md:py-24">
          {/* Badge with premium styling */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 backdrop-blur-lg rounded-full border border-white/20 shadow-lg">
              <span className="w-2.5 h-2.5 bg-giro-vermelho rounded-full animate-pulse"></span>
              <span className="text-white font-semibold text-sm">
                ● ATIVAÇÃO AO VIVO · MERCO NOROESTE 2026
              </span>
            </div>
          </div>

          {/* Main heading with strong contrast */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-8 text-center leading-tight max-w-5xl mx-auto">
            Estoque parado pode virar <span className="block bg-gradient-to-r from-giro-vermelho via-giro-vermelho to-giro-turquesa bg-clip-text text-transparent">negócio</span>.
          </h1>

          {/* Subheading with better contrast */}
          <p className="text-lg md:text-xl text-white/80 mb-12 max-w-3xl mx-auto text-center leading-relaxed font-light">
            O Giro AÍ conecta estoques de moda a novas oportunidades e revela onde esse desafio também aparece em outros setores da economia.
          </p>

          {/* Premium CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-24 w-full sm:w-auto px-4 sm:px-0">
            <Link
              href="/participar"
              className="group px-8 py-4 bg-gradient-to-r from-giro-vermelho to-giro-vermelho/90 text-white rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-giro-vermelho/50 flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-105 whitespace-nowrap border border-giro-vermelho/50"
            >
              <span>Tenho estoque parado</span>
              <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/oportunidades"
              className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-lg font-bold text-lg hover:bg-white/20 hover:shadow-xl flex items-center justify-center gap-3 transition-all duration-300 whitespace-nowrap border border-white/30 hover:border-white/50"
            >
              Ver oportunidades
            </Link>
          </div>

          {/* Feature cards with premium styling */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="group p-8 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-giro-vermelho/50 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-giro-vermelho/20 cursor-pointer">
              <div className="w-14 h-14 bg-gradient-to-br from-giro-vermelho to-giro-vermelho/60 rounded-lg flex items-center justify-center mb-5 shadow-lg">
                <TrendingUp className="text-white" size={28} />
              </div>
              <h3 className="font-bold text-white text-lg mb-2 group-hover:text-giro-vermelho transition">Monetize</h3>
              <p className="text-white/70 group-hover:text-white/90 transition">Transforme estoque em oportunidade</p>
            </div>

            <div className="group p-8 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-giro-turquesa/50 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-giro-turquesa/20 cursor-pointer">
              <div className="w-14 h-14 bg-gradient-to-br from-giro-turquesa to-giro-turquesa/60 rounded-lg flex items-center justify-center mb-5 shadow-lg">
                <MapPin className="text-white" size={28} />
              </div>
              <h3 className="font-bold text-white text-lg mb-2 group-hover:text-giro-turquesa transition">Localize</h3>
              <p className="text-white/70 group-hover:text-white/90 transition">Mapa territorial em tempo real</p>
            </div>

            <div className="group p-8 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-giro-vermelho/50 hover:bg-white/15 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-giro-vermelho/20 cursor-pointer">
              <div className="w-14 h-14 bg-gradient-to-br from-giro-vermelho to-giro-vermelho/60 rounded-lg flex items-center justify-center mb-5 shadow-lg">
                <Users className="text-white" size={28} />
              </div>
              <h3 className="font-bold text-white text-lg mb-2 group-hover:text-giro-vermelho transition">Conecte</h3>
              <p className="text-white/70 group-hover:text-white/90 transition">Rede de oportunidades</p>
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
