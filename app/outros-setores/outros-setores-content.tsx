'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormInput, FormSelect, FormTextarea } from '@/components/form-input'
import { registroOutroSetorSchema } from '@/lib/validations'
import { supabase } from '@/lib/supabase'
import { useState } from 'react'
import { CheckCircle, Loader, AlertCircle, ArrowRight, MapPin } from 'lucide-react'

const setores = [
  { value: 'alimentos', label: 'Alimentos' },
  { value: 'beleza-cosmeticos', label: 'Beleza e Cosméticos' },
  { value: 'eletronicos', label: 'Eletrônicos' },
  { value: 'casa-decoracao', label: 'Casa e Decoração' },
  { value: 'materiais-construcao', label: 'Materiais de Construção' },
  { value: 'agro', label: 'Agro' },
  { value: 'autopeças', label: 'Autopeças' },
  { value: 'servicos', label: 'Serviços' },
  { value: 'outro', label: 'Outro' },
]

const quantidades = [
  { value: 'ate-100', label: 'Até 100 itens' },
  { value: '100-500', label: '100 a 500 itens' },
  { value: '500-1000', label: '500 a 1.000 itens' },
  { value: 'acima-1000', label: 'Acima de 1.000 itens' },
]

const faixasValor = [
  { value: 'ate-1k', label: 'Até R$ 1 mil' },
  { value: '1k-5k', label: 'R$ 1 mil a R$ 5 mil' },
  { value: '5k-20k', label: 'R$ 5 mil a R$ 20 mil' },
  { value: '20k-50k', label: 'R$ 20 mil a R$ 50 mil' },
  { value: 'acima-50k', label: 'Acima de R$ 50 mil' },
  { value: 'nao-sei', label: 'Não sei informar' },
]

const dificuldades = [
  { value: 'capital-parado', label: 'Capital parado' },
  { value: 'falta-compradores', label: 'Falta de compradores' },
  { value: 'troca-colecao', label: 'Troca de coleção' },
  { value: 'validade', label: 'Validade' },
  { value: 'excesso-compra', label: 'Excesso de compra' },
  { value: 'produto-fora-linha', label: 'Produto fora de linha' },
  { value: 'sazonalidade', label: 'Sazonalidade' },
  { value: 'outra', label: 'Outra' },
]

const estados = [
  { value: 'RJ', label: 'Rio de Janeiro (RJ)' },
]

export default function OutrosSetoresContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const utm = searchParams.toString()

  const [formData, setFormData] = useState({
    setor: '',
    tipo_estoque: '',
    quantidade_aproximada: '',
    faixa_valor: '',
    estado: 'RJ',
    cidade: '',
    dificuldade_principal: '',
    empresa: '',
    responsavel: '',
    telefone: '',
    email: '',
    interesse_expansao: false,
    consentimento: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [successData, setSuccessData] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : value,
    }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!supabase) {
      setErrorMsg('Erro: Supabase ainda não foi configurado')
      return
    }

    if (!formData.consentimento) {
      setErrors({ consentimento: 'É necessário consentir para continuar' })
      return
    }

    setErrors({})
    setLoading(true)
    setErrorMsg('')

    try {
      // Validate with basic checks since registroOutroSetorSchema might not match exactly
      if (!formData.setor) throw new Error('Setor é obrigatório')
      if (!formData.tipo_estoque) throw new Error('Tipo de estoque é obrigatório')
      if (!formData.quantidade_aproximada) throw new Error('Quantidade aproximada é obrigatória')
      if (!formData.faixa_valor) throw new Error('Faixa de valor é obrigatória')
      if (!formData.cidade) throw new Error('Município é obrigatório')
      if (!formData.dificuldade_principal) throw new Error('Dificuldade principal é obrigatória')
      if (!formData.empresa) throw new Error('Empresa é obrigatória')
      if (!formData.responsavel) throw new Error('Responsável é obrigatório')
      if (!formData.telefone) throw new Error('WhatsApp/Telefone é obrigatório')

      const { error } = await supabase
        .from('registros_outros_setores')
        .insert([
          {
            setor: formData.setor,
            tipo_estoque: formData.tipo_estoque,
            quantidade_aproximada: formData.quantidade_aproximada,
            faixa_valor: formData.faixa_valor,
            cidade: formData.cidade,
            dificuldade_principal: formData.dificuldade_principal,
            interesse_expansao: formData.interesse_expansao,
            email_protegido: formData.email || null,
          },
        ])

      if (error) throw new Error(error.message)

      setSuccessData(true)
    } catch (error: any) {
      if (error.errors && Array.isArray(error.errors)) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err: any) => {
          newErrors[err.path?.[0] || 'geral'] = err.message
        })
        setErrors(newErrors)
      } else {
        setErrorMsg(error.message || 'Erro ao processar registro')
      }
    } finally {
      setLoading(false)
    }
  }

  const buildLink = (path: string) => {
    return utm ? `${path}?${utm}` : path
  }

  if (successData) {
    return (
      <section className="flex-1 bg-giro-claro py-8 md:py-16">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-lg p-8 md:p-12 border border-giro-borda text-center">
            <div className="w-20 h-20 bg-giro-turquesa/10 rounded-full flex items-center justify-center mb-6 mx-auto">
              <CheckCircle className="text-giro-turquesa" size={48} />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-giro-grafite mb-4">
              Seu setor entrou no mapa
            </h1>

            <p className="text-lg text-giro-texto-sec mb-8 max-w-lg mx-auto">
              Esse registro ajuda a mostrar onde o estoque parado está afetando empresas da região. O Giro AÍ poderá entrar em contato sobre os próximos ciclos.
            </p>

            <div className="space-y-3">
              <Link
                href={buildLink('/mapa')}
                className="block w-full py-3 bg-giro-turquesa text-white font-semibold rounded-lg hover:bg-opacity-90 transition flex items-center justify-center gap-2"
              >
                <MapPin size={20} />
                Ver mapa
              </Link>

              <Link
                href={buildLink('/')}
                className="block w-full py-3 border-2 border-giro-grafite text-giro-grafite font-semibold rounded-lg hover:bg-giro-grafite/5 transition"
              >
                Voltar ao início
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <main className="flex-1 bg-giro-claro py-8 md:py-16">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-giro-grafite mb-2">
            Seu setor também tem estoque parado?
          </h1>
          <p className="text-lg text-giro-texto-sec">
            Registre sua experiência e ajude o Giro AÍ a identificar os próximos mercados que precisam dessa solução.
          </p>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-sm border border-giro-borda">
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-red-900">{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Setor e Tipo de Estoque */}
            <div>
              <h2 className="text-lg font-semibold text-giro-grafite mb-6">
                Sobre o Estoque
              </h2>
              <div className="space-y-4">
                <FormSelect
                  label="Qual é o seu setor?"
                  name="setor"
                  value={formData.setor}
                  onChange={handleChange}
                  options={setores}
                  error={errors.setor}
                  required
                />

                <FormInput
                  label="Tipo de produto ou estoque"
                  name="tipo_estoque"
                  value={formData.tipo_estoque}
                  onChange={handleChange}
                  placeholder="Ex: Peças de reposição, Matérias-primas"
                  error={errors.tipo_estoque}
                  required
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <FormSelect
                    label="Quantidade aproximada"
                    name="quantidade_aproximada"
                    value={formData.quantidade_aproximada}
                    onChange={handleChange}
                    options={quantidades}
                    error={errors.quantidade_aproximada}
                    required
                  />

                  <FormSelect
                    label="Faixa de valor estimada"
                    name="faixa_valor"
                    value={formData.faixa_valor}
                    onChange={handleChange}
                    options={faixasValor}
                    error={errors.faixa_valor}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Localização */}
            <div>
              <h2 className="text-lg font-semibold text-giro-grafite mb-6">
                Localização
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <FormSelect
                  label="Estado"
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  options={estados}
                  error={errors.estado}
                  required
                />

                <FormInput
                  label="Município"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  placeholder="Sua cidade"
                  error={errors.cidade}
                  required
                />
              </div>
            </div>

            {/* Dificuldade */}
            <div>
              <h2 className="text-lg font-semibold text-giro-grafite mb-6">
                Desafios
              </h2>
              <FormSelect
                label="Principal dificuldade enfrentada"
                name="dificuldade_principal"
                value={formData.dificuldade_principal}
                onChange={handleChange}
                options={dificuldades}
                error={errors.dificuldade_principal}
                required
              />
            </div>

            {/* Dados da Empresa */}
            <div>
              <h2 className="text-lg font-semibold text-giro-grafite mb-6">
                Dados da Empresa
              </h2>
              <div className="space-y-4">
                <FormInput
                  label="Nome da Empresa"
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleChange}
                  placeholder="Sua empresa"
                  error={errors.empresa}
                  required
                />

                <FormInput
                  label="Responsável"
                  name="responsavel"
                  value={formData.responsavel}
                  onChange={handleChange}
                  placeholder="Nome do responsável"
                  error={errors.responsavel}
                  required
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <FormInput
                    label="WhatsApp/Telefone"
                    name="telefone"
                    type="tel"
                    value={formData.telefone}
                    onChange={handleChange}
                    placeholder="(XX) 99999-9999"
                    error={errors.telefone}
                    required
                  />

                  <FormInput
                    label="Email (opcional)"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="contato@empresa.com"
                    error={errors.email}
                  />
                </div>
              </div>
            </div>

            {/* Consentimento e Interesse */}
            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="interesse_expansao"
                  checked={formData.interesse_expansao}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 border border-giro-borda rounded cursor-pointer"
                />
                <span className="text-sm text-giro-texto">
                  Tenho interesse em participar do programa de expansão do Giro AÍ
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer border-2 border-giro-vermelho p-4 rounded-lg">
                <input
                  type="checkbox"
                  name="consentimento"
                  checked={formData.consentimento}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 border border-giro-vermelho rounded cursor-pointer accent-giro-vermelho"
                />
                <span className="text-sm text-giro-grafite">
                  Autorizo o Giro AÍ a utilizar meu registro e contato para análise de expansão em meu setor. Meus dados pessoais serão protegidos e não publicados.
                </span>
              </label>

              {errors.consentimento && (
                <p className="text-xs text-red-500">{errors.consentimento}</p>
              )}
            </div>

            {/* Proteção de Dados */}
            <div className="bg-giro-claro rounded-lg p-6 border border-giro-borda">
              <p className="text-sm text-giro-texto-sec">
                <span className="font-semibold text-giro-grafite">Proteção de dados:</span> Seu email e telefone não serão publicados. O contato é intermediado pelo Giro AÍ para sua segurança.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-giro-turquesa text-white font-semibold rounded-lg hover:bg-opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader size={20} className="animate-spin" /> Enviando...
                </>
              ) : (
                <>
                  <ArrowRight size={20} />
                  Registrar Setor
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
