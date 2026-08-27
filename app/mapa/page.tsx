'use client'

import { Header } from '@/components/header'
import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { municipiosNoroeste, buscarPorNome } from '@/lib/municipios'
import L from 'leaflet'
import { Loader } from 'lucide-react'

interface MarkerData {
  cidade: string
  totalEmpresas: number
  totalProdutos: number
  totalOutrosSetores: number
  categoriasPresentes: string[]
  setoresPresentes: string[]
}

export default function Mapa() {
  const mapRef = useRef<L.Map | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [marcadores, setMarcadores] = useState<Map<string, MarkerData>>(new Map())
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null)

  useEffect(() => {
    const fetchDados = async () => {
      try {
        // Buscar empresas (moda)
        const { data: empresas, error: empresasError } = await supabase
          .from('empresas')
          .select('cidade')

        if (empresasError) throw empresasError

        // Buscar produtos moda aprovados
        const { data: produtos, error: produtosError } = await supabase
          .from('produtos_moda')
          .select('categoria, empresas(cidade)')
          .eq('aprovado', true)

        if (produtosError) throw produtosError

        // Buscar registros outros setores
        const { data: outrosSetores, error: outrosError } = await supabase
          .from('registros_outros_setores')
          .select('cidade, setor')

        if (outrosError) throw outrosError

        // Agregar por cidade
        const agretado = new Map<string, MarkerData>()

        // Contar empresas por cidade
        empresas?.forEach((emp) => {
          const cidade = emp.cidade || 'Desconhecida'
          if (!agretado.has(cidade)) {
            agretado.set(cidade, {
              cidade,
              totalEmpresas: 0,
              totalProdutos: 0,
              totalOutrosSetores: 0,
              categoriasPresentes: [],
              setoresPresentes: [],
            })
          }
          const data = agretado.get(cidade)!
          data.totalEmpresas += 1
        })

        // Contar produtos por cidade
        produtos?.forEach((prod) => {
          const cidade = prod.empresas?.cidade || 'Desconhecida'
          if (!agretado.has(cidade)) {
            agretado.set(cidade, {
              cidade,
              totalEmpresas: 0,
              totalProdutos: 0,
              totalOutrosSetores: 0,
              categoriasPresentes: [],
              setoresPresentes: [],
            })
          }
          const data = agretado.get(cidade)!
          data.totalProdutos += 1
          if (prod.categoria && !data.categoriasPresentes.includes(prod.categoria)) {
            data.categoriasPresentes.push(prod.categoria)
          }
        })

        // Contar outros setores por cidade
        outrosSetores?.forEach((reg) => {
          const cidade = reg.cidade || 'Desconhecida'
          if (!agretado.has(cidade)) {
            agretado.set(cidade, {
              cidade,
              totalEmpresas: 0,
              totalProdutos: 0,
              totalOutrosSetores: 0,
              categoriasPresentes: [],
              setoresPresentes: [],
            })
          }
          const data = agretado.get(cidade)!
          data.totalOutrosSetores += 1
          if (reg.setor && !data.setoresPresentes.includes(reg.setor)) {
            data.setoresPresentes.push(reg.setor)
          }
        })

        setMarcadores(agretado)
      } catch (error) {
        console.error('Erro ao carregar dados do mapa:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDados()
  }, [])

  useEffect(() => {
    if (!containerRef.current || loading) return

    // Inicializar mapa
    if (mapRef.current) {
      mapRef.current.remove()
    }

    mapRef.current = L.map(containerRef.current).setView([-27.5, -55.5], 8)

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }
    ).addTo(mapRef.current)

    // Adicionar marcadores
    marcadores.forEach((data) => {
      const municipio = buscarPorNome(data.cidade)
      if (!municipio) return

      const total = data.totalEmpresas + data.totalOutrosSetores
      const cor = total > 5 ? '#F51B2B' : total > 2 ? '#10BFB5' : '#E5E7EB'
      const tamanho = Math.max(20, Math.min(40, 20 + total * 2))

      const marker = L.circleMarker([municipio.lat, municipio.lng], {
        radius: tamanho / 2,
        fillColor: cor,
        color: '#101418',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8,
      }).addTo(mapRef.current!)

      const popup = `
        <div style="font-family: system-ui; padding: 8px;">
          <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #101418;">
            ${municipio.nome}
          </h3>
          <p style="margin: 4px 0; font-size: 12px; color: #5B6470;">
            <strong>Moda:</strong> ${data.totalEmpresas} empresa${data.totalEmpresas !== 1 ? 's' : ''}, ${data.totalProdutos} produto${data.totalProdutos !== 1 ? 's' : ''}
          </p>
          ${data.totalOutrosSetores > 0
            ? `<p style="margin: 4px 0; font-size: 12px; color: #5B6470;">
                <strong>Outros setores:</strong> ${data.totalOutrosSetores} registro${data.totalOutrosSetores !== 1 ? 's' : ''}
              </p>`
            : ''
          }
          ${data.categoriasPresentes.length > 0
            ? `<p style="margin: 4px 0; font-size: 11px; color: #5B6470;">
                <strong>Categorias:</strong> ${data.categoriasPresentes.join(', ')}
              </p>`
            : ''
          }
        </div>
      `

      marker.bindPopup(popup)
      marker.on('click', () => setSelectedMarker(data))
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
      }
    }
  }, [marcadores, loading])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="flex-1 bg-white">
        <div className="h-full flex flex-col">
          {/* Header do Mapa */}
          <div className="bg-giro-claro px-4 py-4 border-b border-giro-borda">
            <h1 className="text-2xl font-bold text-giro-grafite mb-1">
              Mapa Regional Giro AÍ
            </h1>
            <p className="text-sm text-giro-texto-sec">
              Veja a distribuição de oportunidades por município
            </p>
          </div>

          <div className="flex-1 flex flex-col md:flex-row gap-4 p-4">
            {/* Mapa */}
            <div className="flex-1 min-h-96 md:min-h-auto">
              {loading ? (
                <div className="w-full h-full flex items-center justify-center bg-giro-claro rounded-lg">
                  <Loader className="animate-spin text-giro-vermelho" size={32} />
                </div>
              ) : (
                <div
                  ref={containerRef}
                  className="w-full h-full rounded-lg border border-giro-borda"
                  style={{ minHeight: '400px' }}
                />
              )}
            </div>

            {/* Panel de Info */}
            <div className="md:w-80 bg-giro-claro rounded-lg p-4 border border-giro-borda overflow-y-auto max-h-96 md:max-h-none">
              <h2 className="font-bold text-giro-grafite mb-4">Legenda</h2>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-giro-vermelho border-2 border-giro-grafite" />
                  <span className="text-sm text-giro-texto-sec">
                    Muito ativo (&gt; 5 registros)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-giro-turquesa border-2 border-giro-grafite" />
                  <span className="text-sm text-giro-texto-sec">
                    Ativo (2-5 registros)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-giro-borda border-2 border-giro-grafite" />
                  <span className="text-sm text-giro-texto-sec">
                    Poucos registros
                  </span>
                </div>
              </div>

              <hr className="border-giro-borda mb-6" />

              {selectedMarker ? (
                <div>
                  <h3 className="font-bold text-giro-grafite mb-4">
                    {selectedMarker.cidade}
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-semibold text-giro-grafite">Moda</p>
                      <p className="text-giro-texto-sec">
                        {selectedMarker.totalEmpresas} empresa
                        {selectedMarker.totalEmpresas !== 1 ? 's' : ''}
                      </p>
                      <p className="text-giro-texto-sec">
                        {selectedMarker.totalProdutos} produto
                        {selectedMarker.totalProdutos !== 1 ? 's' : ''}
                      </p>
                    </div>
                    {selectedMarker.totalOutrosSetores > 0 && (
                      <div>
                        <p className="font-semibold text-giro-grafite">
                          Outros Setores
                        </p>
                        <p className="text-giro-texto-sec">
                          {selectedMarker.totalOutrosSetores} registro
                          {selectedMarker.totalOutrosSetores !== 1 ? 's' : ''}
                        </p>
                      </div>
                    )}
                    {selectedMarker.categoriasPresentes.length > 0 && (
                      <div>
                        <p className="font-semibold text-giro-grafite">Categorias</p>
                        <div className="flex flex-wrap gap-1">
                          {selectedMarker.categoriasPresentes.map((cat) => (
                            <span
                              key={cat}
                              className="px-2 py-1 bg-giro-vermelho/10 text-giro-vermelho text-xs rounded"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-giro-texto-sec text-sm">
                  Clique em um marcador no mapa para ver detalhes
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
