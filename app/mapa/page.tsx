'use client'

import { Header } from '@/components/header'
import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { buscarPorNome } from '@/lib/municipios'
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
  const mapRef = useRef<any | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [marcadores, setMarcadores] = useState<Map<string, MarkerData>>(new Map())
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null)

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const { data: empresas } = await supabase
          .from('empresas')
          .select('cidade')

        const { data: produtos } = await supabase
          .from('produtos_moda')
          .select('categoria, empresa_id, empresas!inner(cidade)')
          .eq('aprovado', true)

        const { data: outrosSetores } = await supabase
          .from('registros_outros_setores')
          .select('cidade, setor')

        const agregado = new Map<string, MarkerData>()

        empresas?.forEach((emp: any) => {
          const cidade = emp.cidade || 'Desconhecida'
          if (!agregado.has(cidade)) {
            agregado.set(cidade, {
              cidade,
              totalEmpresas: 0,
              totalProdutos: 0,
              totalOutrosSetores: 0,
              categoriasPresentes: [],
              setoresPresentes: [],
            })
          }
          const data = agregado.get(cidade)!
          data.totalEmpresas += 1
        })

        produtos?.forEach((prod: any) => {
          const cidadeArray = Array.isArray(prod.empresas) ? prod.empresas[0]?.cidade : prod.empresas?.cidade
          const cidade = cidadeArray || 'Desconhecida'
          if (!agregado.has(cidade)) {
            agregado.set(cidade, {
              cidade,
              totalEmpresas: 0,
              totalProdutos: 0,
              totalOutrosSetores: 0,
              categoriasPresentes: [],
              setoresPresentes: [],
            })
          }
          const data = agregado.get(cidade)!
          data.totalProdutos += 1
          if (prod.categoria && !data.categoriasPresentes.includes(prod.categoria)) {
            data.categoriasPresentes.push(prod.categoria)
          }
        })

        outrosSetores?.forEach((reg: any) => {
          const cidade = reg.cidade || 'Desconhecida'
          if (!agregado.has(cidade)) {
            agregado.set(cidade, {
              cidade,
              totalEmpresas: 0,
              totalProdutos: 0,
              totalOutrosSetores: 0,
              categoriasPresentes: [],
              setoresPresentes: [],
            })
          }
          const data = agregado.get(cidade)!
          data.totalOutrosSetores += 1
          if (reg.setor && !data.setoresPresentes.includes(reg.setor)) {
            data.setoresPresentes.push(reg.setor)
          }
        })

        setMarcadores(agregado)
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

    const initMap = async () => {
      try {
        const L = (await import('leaflet')).default

        if (mapRef.current) {
          mapRef.current.remove()
        }

        mapRef.current = L.map(containerRef.current!).setView([-27.5, -55.5], 8)

        L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19,
          }
        ).addTo(mapRef.current)

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
            <div style="font-family: system-ui; padding: 8px; font-size: 12px;">
              <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #101418;">
                ${municipio.nome}
              </h3>
              <p style="margin: 4px 0; color: #5B6470;">
                <strong>Moda:</strong> ${data.totalEmpresas} empresa${data.totalEmpresas !== 1 ? 's' : ''}, ${data.totalProdutos} produto${data.totalProdutos !== 1 ? 's' : ''}
              </p>
              ${data.totalOutrosSetores > 0
                ? `<p style="margin: 4px 0; color: #5B6470;">
                    <strong>Outros setores:</strong> ${data.totalOutrosSetores} registro${data.totalOutrosSetores !== 1 ? 's' : ''}
                  </p>`
                : ''
              }
            </div>
          `

          marker.bindPopup(popup)
          marker.on('click', () => setSelectedMarker(data))
        })
      } catch (error) {
        console.error('Erro ao inicializar mapa:', error)
      }
    }

    initMap()

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [marcadores, loading])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="flex-1 bg-white flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header do Mapa */}
          <div className="bg-giro-claro px-4 py-4 border-b border-giro-borda flex-shrink-0">
            <h1 className="text-2xl font-bold text-giro-grafite mb-1">
              Mapa Regional Giro AÍ
            </h1>
            <p className="text-sm text-giro-texto-sec">
              Veja a distribuição de oportunidades por município (dados agregados)
            </p>
          </div>

          <div className="flex-1 flex flex-col md:flex-row gap-4 p-4 min-h-0 overflow-hidden">
            {/* Mapa */}
            <div className="flex-1 rounded-lg border border-giro-borda overflow-hidden flex flex-col">
              {loading ? (
                <div className="w-full flex-1 flex items-center justify-center bg-giro-claro">
                  <Loader className="animate-spin text-giro-vermelho" size={32} />
                </div>
              ) : (
                <div
                  ref={containerRef}
                  className="w-full flex-1"
                />
              )}
            </div>

            {/* Panel de Info */}
            <div className="md:w-80 bg-giro-claro rounded-lg p-4 border border-giro-borda overflow-y-auto h-96 md:h-auto flex-shrink-0">
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
