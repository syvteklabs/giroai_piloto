'use client'

import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { municipios, buscarPorNome } from '@/lib/municipios'
import { Loader, AlertCircle, MapPin, ShoppingBag, Briefcase, TrendingUp } from 'lucide-react'

interface MarkerData {
  cidade: string
  totalEmpresas: number
  totalProdutos: number
  totalOutrosSetores: number
  categoriasPresentes: string[]
  setoresPresentes: string[]
  itemsAproximados: number
}

interface AggregatedData {
  [city: string]: MarkerData
}

export default function MapaContent() {
  const mapRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [marcadores, setMarcadores] = useState<Map<string, MarkerData>>(new Map())
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null)

  // Stats
  const [topCidades, setTopCidades] = useState<MarkerData[]>([])
  const [topCategorias, setTopCategorias] = useState<{ categoria: string; count: number }[]>([])
  const [topSetores, setTopSetores] = useState<{ setor: string; count: number }[]>([])
  const [lastUpdate, setLastUpdate] = useState<string>('')

  // Filters
  const [filtroTipo, setFiltroTipo] = useState<'todos' | 'moda' | 'outros'>('todos')
  const [filtroCidade, setFiltroCidade] = useState('')
  const [cidades, setCidades] = useState<string[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!supabase) {
          setError('Supabase não configurado')
          setLoading(false)
          return
        }

        // Fetch all data
        const [empresasRes, produtosRes, outrosSetoresRes] = await Promise.all([
          supabase.from('empresas').select('cidade'),
          supabase
            .from('produtos_moda')
            .select('categoria, empresa_id, quantidade, empresas!inner(cidade)')
            .eq('aprovado', true),
          supabase.from('registros_outros_setores').select('cidade, setor, quantidade_aproximada'),
        ])

        if (empresasRes.error || produtosRes.error || outrosSetoresRes.error) {
          throw new Error('Erro ao carregar dados')
        }

        const empresas = empresasRes.data || []
        const produtos = produtosRes.data || []
        const outrosSetores = outrosSetoresRes.data || []

        // Aggregate data by city
        const agregado = new Map<string, MarkerData>()

        // Process companies
        empresas.forEach((emp: any) => {
          const cidade = emp.cidade || 'Desconhecida'
          if (!agregado.has(cidade)) {
            agregado.set(cidade, {
              cidade,
              totalEmpresas: 0,
              totalProdutos: 0,
              totalOutrosSetores: 0,
              categoriasPresentes: [],
              setoresPresentes: [],
              itemsAproximados: 0,
            })
          }
          agregado.get(cidade)!.totalEmpresas += 1
        })

        // Process products
        produtos.forEach((prod: any) => {
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
              itemsAproximados: 0,
            })
          }
          const data = agregado.get(cidade)!
          data.totalProdutos += 1
          if (prod.categoria && !data.categoriasPresentes.includes(prod.categoria)) {
            data.categoriasPresentes.push(prod.categoria)
          }
          data.itemsAproximados += prod.quantidade || 0
        })

        // Process other sectors
        outrosSetores.forEach((reg: any) => {
          const cidade = reg.cidade || 'Desconhecida'
          if (!agregado.has(cidade)) {
            agregado.set(cidade, {
              cidade,
              totalEmpresas: 0,
              totalProdutos: 0,
              totalOutrosSetores: 0,
              categoriasPresentes: [],
              setoresPresentes: [],
              itemsAproximados: 0,
            })
          }
          const data = agregado.get(cidade)!
          data.totalOutrosSetores += 1
          if (reg.setor && !data.setoresPresentes.includes(reg.setor)) {
            data.setoresPresentes.push(reg.setor)
          }
          const qty = reg.quantidade_aproximada
            ? parseInt(reg.quantidade_aproximada.split('-')[0]) || 0
            : 0
          data.itemsAproximados += qty
        })

        setMarcadores(agregado)

        // Extract unique cities for filter
        const uniqueCities = Array.from(agregado.keys()).sort()
        setCidades(uniqueCities)

        // Calculate stats
        const topCid = Array.from(agregado.values())
          .sort((a, b) => (b.totalEmpresas + b.totalProdutos + b.totalOutrosSetores) - (a.totalEmpresas + a.totalProdutos + a.totalOutrosSetores))
          .slice(0, 5)
        setTopCidades(topCid)

        const categoriaCount = new Map<string, number>()
        agregado.forEach((data) => {
          data.categoriasPresentes.forEach((cat) => {
            categoriaCount.set(cat, (categoriaCount.get(cat) || 0) + 1)
          })
        })
        const topCat = Array.from(categoriaCount.entries())
          .map(([categoria, count]) => ({ categoria, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5)
        setTopCategorias(topCat)

        const setorCount = new Map<string, number>()
        agregado.forEach((data) => {
          data.setoresPresentes.forEach((setor) => {
            setorCount.set(setor, (setorCount.get(setor) || 0) + 1)
          })
        })
        const topSet = Array.from(setorCount.entries())
          .map(([setor, count]) => ({ setor, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5)
        setTopSetores(topSet)

        setLastUpdate(new Date().toLocaleTimeString('pt-BR'))
      } catch (err: any) {
        console.error('Erro ao carregar dados:', err)
        setError('Erro ao carregar dados do mapa')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Initialize map
  useEffect(() => {
    if (!containerRef.current || loading || !marcadores.size) return

    const initMap = async () => {
      try {
        const L = (await import('leaflet')).default
        await import('leaflet/dist/leaflet.css')

        if (mapRef.current) {
          mapRef.current.remove()
        }

        mapRef.current = L.map(containerRef.current!).setView([-21.45, -42.0], 9)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(mapRef.current)

        marcadores.forEach((data) => {
          // Filter by type
          if (filtroTipo === 'moda' && data.totalProdutos === 0) return
          if (filtroTipo === 'outros' && data.totalOutrosSetores === 0) return
          if (filtroCidade && data.cidade !== filtroCidade) return

          const municipio = buscarPorNome(data.cidade)
          if (!municipio) return

          // Size and color based on participation
          const total = data.totalEmpresas + data.totalProdutos + data.totalOutrosSetores
          const cor = total > 10 ? '#F51B2B' : total > 5 ? '#10BFB5' : '#E5E7EB'
          const tamanho = Math.max(20, Math.min(50, 20 + Math.log(total + 1) * 5))

          const marker = L.circleMarker([municipio.lat, municipio.lng], {
            radius: tamanho / 2,
            fillColor: cor,
            color: '#101418',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8,
          }).addTo(mapRef.current!)

          const popup = `
            <div style="font-family: system-ui; padding: 12px; font-size: 12px; max-width: 220px;">
              <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #101418; font-size: 14px;">
                ${municipio.nome}
              </h3>
              <p style="margin: 4px 0; color: #5B6470;">
                <strong>Moda:</strong> ${data.totalEmpresas} empresa${data.totalEmpresas !== 1 ? 's' : ''}, ${data.totalProdutos} produto${data.totalProdutos !== 1 ? 's' : ''}
              </p>
              ${data.totalOutrosSetores > 0
                ? `<p style="margin: 4px 0; color: #5B6470;">
                    <strong>Outros setores:</strong> ${data.totalOutrosSetores} sinal${data.totalOutrosSetores !== 1 ? 'is' : ''}
                  </p>`
                : ''
              }
              <p style="margin: 4px 0; color: #5B6470;">
                <strong>Itens:</strong> ~${data.itemsAproximados.toLocaleString('pt-BR')}
              </p>
              ${data.categoriasPresentes.length > 0
                ? `<p style="margin: 4px 0; color: #5B6470; font-size: 11px;">
                    <strong>Categorias:</strong> ${data.categoriasPresentes.join(', ')}
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
  }, [marcadores, loading, filtroTipo, filtroCidade])

  return (
    <main className="flex-1 bg-white flex flex-col">
      {/* Header */}
      <div className="bg-giro-claro px-4 md:px-6 py-6 md:py-8 border-b border-giro-borda">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-giro-grafite mb-2">
            Mapa do Estoque Parado
          </h1>
          <p className="text-lg text-giro-texto-sec">
            Um retrato ao vivo dos produtos, setores e oportunidades revelados durante a Merco Noroeste.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white px-4 md:px-6 py-4 border-b border-giro-borda">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-4">
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value as any)}
            className="px-4 py-2 border border-giro-borda rounded-lg text-giro-texto focus:outline-none focus:ring-2 focus:ring-giro-vermelho"
          >
            <option value="todos">Todos</option>
            <option value="moda">Apenas Moda</option>
            <option value="outros">Apenas Outros Setores</option>
          </select>

          {cidades.length > 0 && (
            <select
              value={filtroCidade}
              onChange={(e) => setFiltroCidade(e.target.value)}
              className="px-4 py-2 border border-giro-borda rounded-lg text-giro-texto focus:outline-none focus:ring-2 focus:ring-giro-turquesa"
            >
              <option value="">Todos os municípios</option>
              {cidades.map((cidade) => (
                <option key={cidade} value={cidade}>
                  {cidade}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 p-4 md:p-6 overflow-hidden">
        {/* Map */}
        <div className="flex-1 flex flex-col min-h-0">
          {loading && (
            <div className="flex-1 flex items-center justify-center bg-giro-claro rounded-lg">
              <Loader className="animate-spin text-giro-vermelho" size={40} />
            </div>
          )}

          {error && !loading && (
            <div className="flex-1 flex items-center justify-center bg-giro-claro rounded-lg">
              <div className="text-center">
                <AlertCircle className="text-red-600 mx-auto mb-2" size={40} />
                <p className="text-red-900 font-semibold">{error}</p>
              </div>
            </div>
          )}

          {!loading && !error && marcadores.size === 0 && (
            <div className="flex-1 flex items-center justify-center bg-giro-claro rounded-lg">
              <div className="text-center">
                <MapPin className="text-giro-turquesa/30 mx-auto mb-2" size={48} />
                <p className="text-giro-texto-sec">Nenhum registro para exibir</p>
              </div>
            </div>
          )}

          {!loading && !error && marcadores.size > 0 && (
            <div
              ref={containerRef}
              className="flex-1 rounded-lg border border-giro-borda"
              style={{ minHeight: '500px' }}
            />
          )}
        </div>

        {/* Stats Panel */}
        <div className="w-full lg:w-80 bg-giro-claro rounded-lg p-6 border border-giro-borda overflow-y-auto max-h-96 lg:max-h-none">
          <h2 className="font-bold text-giro-grafite mb-6 text-lg">Painel de Dados</h2>

          {/* Top Cities */}
          {topCidades.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-giro-grafite mb-3 flex items-center gap-2">
                <MapPin size={16} /> Municípios
              </h3>
              <div className="space-y-2">
                {topCidades.map((cidade) => (
                  <div
                    key={cidade.cidade}
                    className="text-xs text-giro-texto-sec bg-white p-2 rounded"
                  >
                    <p className="font-medium text-giro-grafite">{cidade.cidade}</p>
                    <p>
                      {cidade.totalEmpresas + cidade.totalProdutos + cidade.totalOutrosSetores} participação
                      {cidade.totalEmpresas + cidade.totalProdutos + cidade.totalOutrosSetores !== 1 ? 's' : ''}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Categories */}
          {topCategorias.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-giro-grafite mb-3 flex items-center gap-2">
                <ShoppingBag size={16} /> Categorias
              </h3>
              <div className="space-y-2">
                {topCategorias.map((cat) => (
                  <div key={cat.categoria} className="text-xs text-giro-texto-sec bg-white p-2 rounded">
                    <p className="font-medium text-giro-grafite capitalize">{cat.categoria}</p>
                    <p>{cat.count} registro{cat.count !== 1 ? 's' : ''}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top Sectors */}
          {topSetores.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-giro-grafite mb-3 flex items-center gap-2">
                <Briefcase size={16} /> Setores
              </h3>
              <div className="space-y-2">
                {topSetores.map((setor) => (
                  <div key={setor.setor} className="text-xs text-giro-texto-sec bg-white p-2 rounded">
                    <p className="font-medium text-giro-grafite capitalize">{setor.setor}</p>
                    <p>{setor.count} interesse{setor.count !== 1 ? 's' : ''}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Last Update */}
          <div className="text-xs text-giro-texto-sec border-t border-giro-borda pt-4">
            <p className="flex items-center gap-2">
              <TrendingUp size={14} />
              Atualizado: {lastUpdate}
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-white border-t border-giro-borda px-4 md:px-6 py-4">
        <div className="max-w-6xl mx-auto text-xs text-giro-texto-sec text-center">
          <p>
            <strong>Privacidade:</strong> Os pontos representam dados agregados por município.
            Nenhuma empresa ou pessoa é localizada individualmente.
          </p>
        </div>
      </div>
    </main>
  )
}
