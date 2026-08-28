'use client'

import type { Metadata } from 'next'
import { Header } from '@/components/header'

export const metadata: Metadata = {
  title: 'Política de Privacidade | Giro AÍ',
  description: 'Leia a política de privacidade do Giro AÍ. Entenda como seus dados são protegidos e como a plataforma usa as informações coletadas.',
  keywords: ['privacidade', 'política privacidade', 'proteção dados', 'LGPD'],
  openGraph: {
    title: 'Política de Privacidade | Giro AÍ',
    description: 'Proteja seus dados. Leia nossa política de privacidade',
    url: 'https://giroai.vercel.app/privacidade',
    type: 'website',
  },
}

export default function Privacidade() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="flex-1 bg-giro-claro py-12 min-h-screen">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-giro-grafite mb-8">
            Política de Privacidade
          </h1>

          <div className="bg-white rounded-lg p-8 space-y-6 shadow-sm border border-giro-borda">
            <div>
              <h2 className="text-xl font-semibold text-giro-grafite mb-3">
                1. Coleta de Dados
              </h2>
              <p className="text-giro-texto-sec">
                O Giro AÍ coleta informações essenciais para validação durante o piloto Merco Noroeste 2026:
              </p>
              <ul className="mt-2 space-y-1 text-giro-texto-sec text-sm ml-4">
                <li>• Dados de contato (email, telefone)</li>
                <li>• Informações sobre estoque parado</li>
                <li>• Localização (cidade)</li>
                <li>• Categorias e setores de interesse</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-giro-grafite mb-3">
                2. Proteção de Dados
              </h2>
              <p className="text-giro-texto-sec">
                <strong>Nunca compartilhamos dados pessoais publicamente.</strong> Seus contatos
                permanecem protegidos:
              </p>
              <ul className="mt-2 space-y-1 text-giro-texto-sec text-sm ml-4">
                <li>✓ Email e telefone nunca aparecem no mapa ou vitrine</li>
                <li>✓ Contatos são usados exclusivamente para oportunidades comerciais</li>
                <li>✓ Apenas agregações por município são públicas</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-giro-grafite mb-3">
                3. Consentimento de Contato
              </h2>
              <p className="text-giro-texto-sec">
                Ao registrar interesse em oportunidades, você consente que:
              </p>
              <ul className="mt-2 space-y-1 text-giro-texto-sec text-sm ml-4">
                <li>• Lojistas possam entrar em contato com você via email</li>
                <li>• Dados serão usados apenas durante este piloto (Merco 2026)</li>
                <li>• Você pode solicitar remoção a qualquer momento</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-giro-grafite mb-3">
                4. Mapa Agregado
              </h2>
              <p className="text-giro-texto-sec">
                O mapa só exibe dados agregados por município:
              </p>
              <ul className="mt-2 space-y-1 text-giro-texto-sec text-sm ml-4">
                <li>• Quantidade de empresas participantes</li>
                <li>• Número de produtos ou lotes cadastrados</li>
                <li>• Categorias de moda presentes</li>
                <li>• Setores interessados na expansão</li>
              </ul>
              <p className="mt-3 text-giro-texto-sec text-sm">
                Nunca exibem endereço, coordenada exata, nome pessoal ou telefone.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-giro-grafite mb-3">
                5. Dados não Publicados
              </h2>
              <p className="text-giro-texto-sec">
                Alguns dados são coletados apenas para análise interna:
              </p>
              <ul className="mt-2 space-y-1 text-giro-texto-sec text-sm ml-4">
                <li>• Registros de interesse em outros setores</li>
                <li>• Formulários de pesquisa de expansão</li>
                <li>• Contatos em produtos antes da aprovação</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-giro-grafite mb-3">
                6. Contato e Direitos
              </h2>
              <p className="text-giro-texto-sec">
                Para solicitar remoção de dados, exercer seus direitos ou denunciar violação
                de privacidade, entre em contato durante o piloto.
              </p>
            </div>

            <div className="bg-giro-claro p-4 rounded-lg border-l-4 border-giro-vermelho">
              <p className="text-sm text-giro-texto font-medium">
                📌 Este é um piloto privado Merco Noroeste 2026. Ao participar, você aceita
                a coleta de dados para validação e melhoria da solução.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
