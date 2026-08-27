'use client'

import { Header } from '@/components/header'
import Link from 'next/link'
import { ArrowRight, CheckCircle, MapPin, Lock } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-b from-giro-claro via-white to-white">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16 text-center">
          {/* Selo */}
          <div className="inline-block mb-6 px-4 py-2 bg-giro-turquesa/10 rounded-full">
            <span className="text-giro-turquesa font-semibold text-xs md:text-sm">
              ● ATIVAÇÃO AO VIVO · MERCO NOROESTE 2026
            </span>
          </div>

          {/* Título principal */}
          <h1 className="text-3xl md:text-5xl font-bold text-giro-grafite mb-4">
            Estoque parado pode virar negócio.
          </h1>

          {/* Descrição */}
          <p className="text-lg md:text-xl text-giro-texto-sec mb-8 max-w-3xl mx-auto">
            O Giro AÍ conecta estoques de moda a novas oportunidades e revela onde esse desafio também aparece em outros setores da economia.
          </p>

          {/* CTAs principais */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <Link
              href="/participar"
              className="px-8 py-3 bg-giro-vermelho text-white rounded-lg font-semibold hover:bg-opacity-90 flex items-center justify-center gap-2 transition"
            >
              Tenho estoque parado <ArrowRight size={20} />
            </Link>
            <Link
              href="/oportunidades"
              className="px-8 py-3 border-2 border-giro-vermelho text-giro-vermelho rounded-lg font-semibold hover:bg-giro-vermelho hover:text-white transition"
            >
              Ver oportunidades
            </Link>
          </div>

          {/* Microcopy */}
          <p className="text-sm text-giro-texto-sec">
            Participação rápida · Contato protegido · Dados agregados no mapa
          </p>
        </div>
      </section>

      {/* Bloco de Escolha */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-giro-grafite text-center mb-12">
            Como você quer participar?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Card Moda */}
            <Link
              href="/cadastrar-estoque"
              className="p-8 bg-gradient-to-br from-white to-giro-claro rounded-xl border-2 border-giro-borda hover:border-giro-vermelho hover:shadow-lg transition"
            >
              <div className="w-12 h-12 bg-giro-vermelho/10 rounded-lg flex items-center justify-center mb-4">
                <CheckCircle className="text-giro-vermelho" size={24} />
              </div>
              <h3 className="text-xl font-bold text-giro-grafite mb-2">
                Tenho estoque de moda
              </h3>
              <p className="text-giro-texto-sec mb-6">
                Cadastre roupas, calçados ou acessórios e publique uma oportunidade.
              </p>
              <span className="inline-flex items-center gap-2 text-giro-vermelho font-semibold">
                Cadastrar estoque <ArrowRight size={18} />
              </span>
            </Link>

            {/* Card Outros Setores */}
            <Link
              href="/outros-setores"
              className="p-8 bg-gradient-to-br from-white to-giro-claro rounded-xl border-2 border-giro-borda hover:border-giro-turquesa hover:shadow-lg transition"
            >
              <div className="w-12 h-12 bg-giro-turquesa/10 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="text-giro-turquesa" size={24} />
              </div>
              <h3 className="text-xl font-bold text-giro-grafite mb-2">
                Meu setor também tem esse problema
              </h3>
              <p className="text-giro-texto-sec mb-6">
                Registre seu setor e ajude a mostrar onde o estoque parado afeta a economia regional.
              </p>
              <span className="inline-flex items-center gap-2 text-giro-turquesa font-semibold">
                Registrar meu setor <ArrowRight size={18} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="bg-gradient-to-b from-giro-claro to-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-giro-grafite text-center mb-12">
            Do estoque parado à oportunidade
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Passo 1 */}
            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-giro-vermelho text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-bold text-giro-grafite mb-2">
                    Cadastre
                  </h3>
                  <p className="text-giro-texto-sec">
                    Conte o que está parado.
                  </p>
                </div>
              </div>
            </div>

            {/* Passo 2 */}
            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-giro-vermelho text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-bold text-giro-grafite mb-2">
                    Apareça
                  </h3>
                  <p className="text-giro-texto-sec">
                    Seu produto ou setor entra no painel territorial.
                  </p>
                </div>
              </div>
            </div>

            {/* Passo 3 */}
            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-giro-vermelho text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-bold text-giro-grafite mb-2">
                    Conecte-se
                  </h3>
                  <p className="text-giro-texto-sec">
                    O Giro AÍ aproxima empresas interessadas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-giro-grafite mb-4">
            O estoque parado também tem território.
          </h2>
          <p className="text-lg text-giro-texto-sec mb-8 max-w-2xl mx-auto">
            Cada participação ajuda a revelar onde estão os produtos, setores e oportunidades da região.
          </p>
          <div className="bg-gradient-to-b from-giro-claro to-giro-claro/50 rounded-lg h-64 md:h-96 flex items-center justify-center border-2 border-giro-borda mb-8">
            <div className="text-center">
              <MapPin className="text-giro-turquesa mb-2 mx-auto" size={48} />
              <p className="text-giro-texto-sec">Mapa em construção</p>
            </div>
          </div>
          <Link
            href="/mapa"
            className="inline-flex items-center gap-2 px-8 py-3 bg-giro-turquesa text-white rounded-lg font-semibold hover:bg-opacity-90 transition"
          >
            Ver mapa ao vivo <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Confiança */}
      <section className="bg-giro-claro py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-giro-turquesa/10 rounded-full flex items-center justify-center mb-6 mx-auto">
            <Lock className="text-giro-turquesa" size={32} />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-giro-grafite mb-4">
            Seus contatos não ficam públicos.
          </h2>
          <p className="text-lg text-giro-texto-sec">
            A vitrine e o mapa mostram apenas informações comerciais e dados agregados. O contato é intermediado pelo Giro AÍ.
          </p>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gradient-to-r from-giro-vermelho to-giro-vermelho/90 py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            O que está parado na sua empresa?
          </h2>
          <Link
            href="/participar"
            className="inline-flex items-center gap-2 px-10 py-4 bg-white text-giro-vermelho rounded-lg font-bold text-lg hover:bg-opacity-90 transition"
          >
            Participar agora <ArrowRight size={24} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-giro-borda bg-giro-branco">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-giro-texto-sec text-sm">
          <p>Giro AÍ © 2026 - Piloto Merco Noroeste</p>
        </div>
      </footer>
    </div>
  )
}
