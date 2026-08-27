'use client'

import { Header } from '@/components/header'
import { FormInput, FormSelect, FormTextarea } from '@/components/form-input'
import { registroOutroSetorSchema } from '@/lib/validations'
import { getSupabaseOrThrow } from '@/lib/supabase'
import { useState } from 'react'
import { CheckCircle, Loader, AlertCircle } from 'lucide-react'

const quantidades = [
  { value: 'ate-100', label: 'Até 100 itens' },
  { value: '100-500', label: '100 a 500 itens' },
  { value: '500-1000', label: '500 a 1.000 itens' },
  { value: 'acima-1000', label: 'Acima de 1.000 itens' },
]

const faixasValor = [
  { value: 'ate-1k', label: 'Até R$ 1.000' },
  { value: '1k-10k', label: 'R$ 1.000 a R$ 10.000' },
  { value: '10k-50k', label: 'R$ 10.000 a R$ 50.000' },
  { value: 'acima-50k', label: 'Acima de R$ 50.000' },
]

export default function OutrosSetores() {
  const [formData, setFormData] = useState({
    setor: '',
    tipo_estoque: '',
    quantidade_aproximada: '',
    faixa_valor: '',
    cidade: '',
    dificuldade_principal: '',
    interesse_expansao: false,
    email: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [statusMsg, setStatusMsg] = useState('')

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
    setErrors({})
    setLoading(true)

    try {
      const supabase = getSupabaseOrThrow()
      const validated = registroOutroSetorSchema.parse(formData)

      const { error } = await supabase
        .from('registros_outros_setores')
        .insert([
          {
            setor: validated.setor,
            tipo_estoque: validated.tipo_estoque,
            quantidade_aproximada: validated.quantidade_aproximada,
            faixa_valor: validated.faixa_valor,
            cidade: validated.cidade,
            dificuldade_principal: validated.dificuldade_principal,
            interesse_expansao: validated.interesse_expansao,
            email_protegido: validated.email,
          },
        ])

      if (error) throw new Error(error.message)

      setSuccess(true)
      setStatusMsg('✓ Registro recebido! Entraremos em contato.')
      setTimeout(() => setSuccess(false), 5000)
      setFormData({
        setor: '',
        tipo_estoque: '',
        quantidade_aproximada: '',
        faixa_valor: '',
        cidade: '',
        dificuldade_principal: '',
        interesse_expansao: false,
        email: '',
      })
    } catch (error: any) {
      if (error.errors) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err: any) => {
          newErrors[err.path[0]] = err.message
        })
        setErrors(newErrors)
      } else {
        setStatusMsg(`Erro: ${error.message}`)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="flex-1 bg-giro-claro py-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-giro-grafite mb-2">
              Registre seu Interesse
            </h1>
            <p className="text-giro-texto-sec">
              Ajude a moldar a expansão do Giro AÍ para outros setores
            </p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-sm border border-giro-borda">
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <CheckCircle className="text-green-600" size={24} />
                <div>
                  <p className="font-semibold text-green-900">{statusMsg}</p>
                  <p className="text-sm text-green-700">
                    Seu email está protegido e será usado apenas para contato
                  </p>
                </div>
              </div>
            )}

            {statusMsg && !success && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                <AlertCircle className="text-red-600" size={24} />
                <p className="text-red-900">{statusMsg}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dados do Setor */}
              <div>
                <h2 className="text-lg font-semibold text-giro-grafite mb-4">
                  Seu Setor
                </h2>
                <div className="space-y-4">
                  <FormInput
                    label="Setor (ex: Alimentos, Artesanato, Eletrônicos)"
                    name="setor"
                    value={formData.setor}
                    onChange={handleChange}
                    placeholder="Seu setor"
                    error={errors.setor}
                  />
                  <FormTextarea
                    label="Tipo de Estoque Parado"
                    name="tipo_estoque"
                    value={formData.tipo_estoque}
                    onChange={handleChange}
                    placeholder="Descreva o tipo de estoque..."
                    rows={2}
                    error={errors.tipo_estoque}
                  />
                </div>
              </div>

              {/* Dados do Estoque */}
              <div>
                <h2 className="text-lg font-semibold text-giro-grafite mb-4">
                  Seu Estoque
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <FormSelect
                    label="Quantidade Aproximada"
                    name="quantidade_aproximada"
                    value={formData.quantidade_aproximada}
                    onChange={handleChange}
                    options={quantidades}
                    error={errors.quantidade_aproximada}
                  />
                  <FormSelect
                    label="Faixa de Valor"
                    name="faixa_valor"
                    value={formData.faixa_valor}
                    onChange={handleChange}
                    options={faixasValor}
                    error={errors.faixa_valor}
                  />
                </div>
              </div>

              {/* Localização e Dificuldade */}
              <div>
                <h2 className="text-lg font-semibold text-giro-grafite mb-4">
                  Localização e Desafio
                </h2>
                <div className="space-y-4">
                  <FormInput
                    label="Cidade"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                    placeholder="Sua cidade"
                    error={errors.cidade}
                  />
                  <FormTextarea
                    label="Principal Dificuldade"
                    name="dificuldade_principal"
                    value={formData.dificuldade_principal}
                    onChange={handleChange}
                    placeholder="Qual é o principal desafio?"
                    rows={2}
                    error={errors.dificuldade_principal}
                  />
                </div>
              </div>

              {/* Contato */}
              <div>
                <h2 className="text-lg font-semibold text-giro-grafite mb-4">
                  Dados de Contato
                </h2>
                <FormInput
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="contato@seunegoio.com"
                  error={errors.email}
                />
              </div>

              {/* Interesse em Expansão */}
              <div className="bg-giro-claro p-4 rounded-lg">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="interesse_expansao"
                    checked={formData.interesse_expansao}
                    onChange={handleChange}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <span className="font-medium text-giro-grafite">
                    Tenho interesse em participar quando o Giro AÍ expandir para meu setor
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-giro-turquesa text-white font-semibold rounded-lg hover:bg-opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader size={20} className="animate-spin" /> Registrando...
                  </>
                ) : (
                  'Registrar Interesse'
                )}
              </button>
            </form>

            <p className="mt-6 text-xs text-giro-texto-sec text-center">
              Seus dados estão protegidos. Nunca compartilharemos seu contato publicamente.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
