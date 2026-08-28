// Noroeste Fluminense RJ municipalities with coordinates
export interface Municipio {
  nome: string
  estado: string
  lat: number
  lng: number
}

export const municipios: Municipio[] = [
  { nome: 'Aperibé', estado: 'RJ', lat: -21.5833, lng: -42.1333 },
  { nome: 'Bom Jesus do Itabapoana', estado: 'RJ', lat: -21.1333, lng: -41.8833 },
  { nome: 'Cambuci', estado: 'RJ', lat: -21.5500, lng: -42.0333 },
  { nome: 'Italva', estado: 'RJ', lat: -21.7833, lng: -42.2333 },
  { nome: 'Itaocara', estado: 'RJ', lat: -21.6500, lng: -42.0333 },
  { nome: 'Itaperuna', estado: 'RJ', lat: -21.2167, lng: -41.8667 },
  { nome: 'Laje do Muriaé', estado: 'RJ', lat: -21.2667, lng: -42.3333 },
  { nome: 'Miracema', estado: 'RJ', lat: -21.4667, lng: -42.1667 },
  { nome: 'Natividade', estado: 'RJ', lat: -21.5000, lng: -42.2667 },
  { nome: 'Porciúncula', estado: 'RJ', lat: -21.3667, lng: -42.4000 },
  { nome: 'Santo Antônio de Pádua', estado: 'RJ', lat: -21.5500, lng: -42.2167 },
  { nome: 'São José de Ubá', estado: 'RJ', lat: -21.5833, lng: -42.0500 },
  { nome: 'Varre-Sai', estado: 'RJ', lat: -21.2500, lng: -42.2000 },
]

export function buscarPorNome(nome: string): Municipio | undefined {
  return municipios.find((m) => m.nome.toLowerCase() === nome.toLowerCase())
}

export function obterTodosMunicipios(): Municipio[] {
  return municipios
}
