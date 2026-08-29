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

        // Focar no Rio de Janeiro: [-22.5, -43.5] com zoom 8
        mapRef.current = L.map(containerRef.current!, {
          zoomControl: true,
          attributionControl: false,
        }).setView([-22.5, -43.5], 8)

        // Definir bounds do estado do Rio de Janeiro (recorte visual)
        const rjBounds = L.latLngBounds(
          [-20.75, -41.0], // NE - Itaperuna region
          [-23.5, -48.5]   // SW - Angra dos Reis region
        )
        mapRef.current.setMaxBounds(rjBounds)
        mapRef.current.on('drag', () => {
          mapRef.current.panInsideBounds(rjBounds, { animate: false })
        })

        // TileLayer com estilo minimalista
        L.tileLayer(
          'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          {
            attribution: 'OpenStreetMap',
            maxZoom: 18,
            minZoom: 7,
            opacity: 0.95,
          }
        ).addTo(mapRef.current)

        // Marcador especial para Itaperuna (ícone refinado)
        const itaperunaMarker = L.marker([-20.27, -41.66], {
          icon: L.icon({
            iconUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 48"%3E%3Cdefs%3E%3Cfilter id="shadow"%3E%3CfeDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.3"/%3E%3C/filter%3E%3C/defs%3E%3Cpath d="M20 0C11.7 0 5 6.7 5 15c0 12 15 33 15 33s15-21 15-33c0-8.3-6.7-15-15-15z" fill="%23F51B2B" filter="url(%23shadow)"/%3E%3Ccircle cx="20" cy="15" r="5" fill="white"/%3E%3C/svg%3E',
            iconSize: [40, 48],
            iconAnchor: [20, 48],
            popupAnchor: [0, -48],
          }),
        }).addTo(mapRef.current)

        itaperunaMarker.bindPopup(
          '<div style="font-family: system-ui; padding: 10px; min-width: 180px;"><h3 style="margin: 0 0 6px 0; font-weight: 700; color: #F51B2B; font-size: 14px;">Itaperuna</h3><p style="margin: 0; color: #5B6470; font-size: 12px;">Rio de Janeiro</p></div>',
          { className: 'giro-popup' }
        )


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
            <div className="flex-1 rounded-lg border border-giro-borda overflow-hidden flex flex-col shadow-md h-96 md:h-auto">
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
            <div className="md:w-80 bg-giro-claro rounded-lg p-4 border border-giro-borda overflow-y-auto md:max-h-screen flex-shrink-0">
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
