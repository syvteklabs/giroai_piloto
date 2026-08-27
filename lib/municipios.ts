export interface Municipio {
  nome: string
  lat: number
  lng: number
}

export const municipiosNoroeste: Record<string, Municipio> = {
  'santa-rosa': { nome: 'Santa Rosa', lat: -27.862, lng: -55.482 },
  'santo-andre': { nome: 'Santo André', lat: -27.663, lng: -55.639 },
  'roque-gonzales': { nome: 'Roque Gonzáles', lat: -27.763, lng: -55.759 },
  'ijui': { nome: 'Ijuí', lat: -28.382, lng: -56.0 },
  'panambi': { nome: 'Panambi', lat: -28.1, lng: -56.0 },
  'crissiumal': { nome: 'Crissiumal', lat: -27.996, lng: -56.154 },
  'porto-xavier': { nome: 'Porto Xavier', lat: -27.862, lng: -55.482 },
  'giruá': { nome: 'Giruá', lat: -28.052, lng: -55.765 },
  'nova-candelaria': { nome: 'Nova Candelária', lat: -28.101, lng: -56.019 },
  'horizontina': { nome: 'Horizontina', lat: -27.806, lng: -54.584 },
  'alecrim': { nome: 'Alecrim', lat: -27.857, lng: -54.664 },
}

export function getNomeMunicipio(slug: string): Municipio | undefined {
  return municipiosNoroeste[slug] || buscarPorNome(slug)
}

export function buscarPorNome(nome: string): Municipio | undefined {
  const slug = nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '-')

  return municipiosNoroeste[slug]
}
