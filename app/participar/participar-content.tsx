'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Shirt, TrendingUp, ArrowRight, Clock, Lock, ArrowLeft } from 'lucide-react'
import { useEffect } from 'react'

export default function ParticiparContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const utm = searchParams.toString()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('journey_view', { detail: { page: 'escolha_jornada' } }))
    }
  }, [])

  const handleOptionClick = (option: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('journey_choice', { detail: { choice: option } }))
    }
  }

  const buildLink = (path: string) => {
    return utm ? `${path}?${utm}` : path
  }

  return (
    <main className="flex-1 bg-giro-claro">
      {/* Botão de Voltar */}
      <div className="max-w-6xl mx-auto px-4 pt-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-giro-texto hover:text-giro-vermelho transition mb-8"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 md:py-16">
        {/* Título e Descrição */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-giro-grafite mb-4">
            Como o estoque parado aparece no seu negócio?
          </h1>
          <p className="text-lg text-giro-texto-sec">
            Escolha a opção que mais combina com sua realidade.
          </p>
        </div>

        {/* Cards de Opção */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Opção 1: Trabalho com Moda */}
          <Link
            href={buildLink('/cadastrar-estoque')}
            onClick={() => handleOptionClick('moda')}
            className="group"
          >
            <div className="h-full p-8 bg-white rounded-xl border-2 border-giro-borda hover:border-giro-vermelho hover:shadow-xl transition cursor-pointer">
              <div className="w-16 h-16 bg-giro-vermelho/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-giro-vermelho/20 transition">
                <Shirt className="text-giro-vermelho" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-giro-grafite mb-3">
                Trabalho com moda
              </h2>
              <p className="text-giro-texto-sec mb-6">
                Quero cadastrar roupas, calçados, acessórios ou outros produtos de moda.
              </p>
              <div className="flex items-center gap-2 text-giro-vermelho font-semibold group-hover:gap-3 transition">
                Cadastrar produto de moda <ArrowRight size={20} />
              </div>
            </div>
          </Link>

          {/* Opção 2: Trabalho em Outro Setor */}
          <Link
            href={buildLink('/outros-setores')}
            onClick={() => handleOptionClick('outro_setor')}
            className="group"
          >
            <div className="h-full p-8 bg-white rounded-xl border-2 border-giro-borda hover:border-giro-turquesa hover:shadow-xl transition cursor-pointer">
              <div className="w-16 h-16 bg-giro-turquesa/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-giro-turquesa/20 transition">
                <TrendingUp className="text-giro-turquesa" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-giro-grafite mb-3">
                Trabalho em outro setor
              </h2>
              <p className="text-giro-texto-sec mb-6">
                Quero registrar esse problema e participar da expansão do Giro AÍ.
              </p>
              <div className="flex items-center gap-2 text-giro-turquesa font-semibold group-hover:gap-3 transition">
                Registrar meu setor <ArrowRight size={20} />
              </div>
            </div>
          </Link>
        </div>

        {/* Informações Adicionais */}
        <div className="space-y-6">
          {/* Tempo Estimado */}
          <div className="bg-white rounded-lg p-6 border border-giro-borda flex items-start gap-4">
            <Clock className="text-giro-turquesa flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-semibold text-giro-grafite mb-1">Tempo estimado</h3>
              <p className="text-giro-texto-sec">
                Leva cerca de 2 minutos para completar o cadastro.
              </p>
            </div>
          </div>

          {/* Proteção de Dados */}
          <div className="bg-giro-claro rounded-lg p-6 border border-giro-borda flex items-start gap-4">
            <Lock className="text-giro-turquesa flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="font-semibold text-giro-grafite mb-1">Proteção de dados</h3>
              <p className="text-giro-texto-sec">
                Seus dados pessoais e contato são protegidos. Apenas informações comerciais aparecem no mapa. O contato é intermediado pelo Giro AÍ.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
