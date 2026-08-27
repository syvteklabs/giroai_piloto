'use client'

import { Header } from '@/components/header'
import Link from 'next/link'
import { ArrowRight, TrendingUp, MapPin, Users } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="flex-1 bg-gradient-to-b from-giro-claro via-white to-white">
        <div className="max-w-6xl mx-auto px-4 py-20 text-center">
          <div className="inline-block mb-4 px-4 py-2 bg-giro-turquesa/10 rounded-full">
            <span className="text-giro-turquesa font-semibold text-sm">
              Merco Noroeste 2026
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-giro-grafite mb-4">
            Giro AÍ
          </h1>

          <p className="text-xl md:text-2xl text-giro-texto-sec mb-2">
            Inteligência que faz o estoque girar.
          </p>

          <p className="text-lg text-giro-texto-sec mb-8">
            Estoque parado pode virar negócio.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/participar"
              className="px-8 py-3 bg-giro-vermelho text-white rounded-lg font-semibold hover:bg-opacity-90 flex items-center justify-center gap-2 transition"
            >
              Participar Agora <ArrowRight size={20} />
            </Link>
            <Link
              href="/oportunidades"
              className="px-8 py-3 border-2 border-giro-vermelho text-giro-vermelho rounded-lg font-semibold hover:bg-giro-vermelho hover:text-white transition"
            >
              Ver Oportunidades
            </Link>
          </div>

          {/* Benefícios */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="p-6 bg-white rounded-lg border border-giro-borda hover:shadow-lg transition">
              <div className="w-12 h-12 bg-giro-vermelho/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="text-giro-vermelho" size={24} />
              </div>
              <h3 className="font-semibold text-giro-grafite mb-2">Para Lojistas</h3>
              <p className="text-giro-texto-sec text-sm">
                Transforme estoque parado em vendas rápidas e sem complicação.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg border border-giro-borda hover:shadow-lg transition">
              <div className="w-12 h-12 bg-giro-turquesa/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <MapPin className="text-giro-turquesa" size={24} />
              </div>
              <h3 className="font-semibold text-giro-grafite mb-2">Mapa em Tempo Real</h3>
              <p className="text-giro-texto-sec text-sm">
                Veja oportunidades agregadas por região do Noroeste.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg border border-giro-borda hover:shadow-lg transition">
              <div className="w-12 h-12 bg-giro-vermelho/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Users className="text-giro-vermelho" size={24} />
              </div>
              <h3 className="font-semibold text-giro-grafite mb-2">Rede de Negócios</h3>
              <p className="text-giro-texto-sec text-sm">
                Conecte com outros lojistas e setores interessados.
              </p>
            </div>
          </div>
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
