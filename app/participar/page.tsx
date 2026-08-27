'use client'

import { Header } from '@/components/header'
import Link from 'next/link'
import { Shirt, TrendingUp, ArrowRight } from 'lucide-react'

export default function Participar() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="flex-1 bg-giro-claro">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-giro-grafite mb-4">
              Como você quer participar?
            </h1>
            <p className="text-giro-texto-sec">
              Escolha o caminho que melhor se adequa ao seu negócio
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Moda */}
            <Link href="/cadastrar-estoque" className="group">
              <div className="h-full p-8 bg-white rounded-lg border-2 border-giro-borda hover:border-giro-vermelho hover:shadow-lg transition cursor-pointer">
                <div className="w-16 h-16 bg-giro-vermelho/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-giro-vermelho/20 transition">
                  <Shirt className="text-giro-vermelho" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-giro-grafite mb-2">
                  Loja de Moda
                </h2>
                <p className="text-giro-texto-sec mb-4">
                  Cadastre seus produtos e chegue aos compradores.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-giro-texto-sec">
                  <li>✓ Publique produtos de moda</li>
                  <li>✓ Receba contatos qualificados</li>
                  <li>✓ Apareça no mapa regional</li>
                </ul>
                <div className="flex items-center gap-2 text-giro-vermelho font-semibold">
                  Cadastrar Estoque <ArrowRight size={20} />
                </div>
              </div>
            </Link>

            {/* Outros Setores */}
            <Link href="/outros-setores" className="group">
              <div className="h-full p-8 bg-white rounded-lg border-2 border-giro-borda hover:border-giro-turquesa hover:shadow-lg transition cursor-pointer">
                <div className="w-16 h-16 bg-giro-turquesa/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-giro-turquesa/20 transition">
                  <TrendingUp className="text-giro-turquesa" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-giro-grafite mb-2">
                  Outro Setor
                </h2>
                <p className="text-giro-texto-sec mb-4">
                  Registre seu interesse na expansão.
                </p>
                <ul className="space-y-2 mb-6 text-sm text-giro-texto-sec">
                  <li>✓ Compartilhe seu problema</li>
                  <li>✓ Indique interesse em expansão</li>
                  <li>✓ Ajude a moldar o futuro</li>
                </ul>
                <div className="flex items-center gap-2 text-giro-turquesa font-semibold">
                  Registrar Interesse <ArrowRight size={20} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
