export interface CAENEntry {
  cod_caen: string
  denumire: string
  sectiune_cod: string
  sectiune: string
  diviziune_cod: string
  diviziune: string
  grupa_cod: string
  grupa: string
}

export interface SearchResponse {
  total: number
  results: CAENEntry[]
}