export interface LocalitateEntry {
  cod_siruta: number
  denumire: string
  tip_cod: number
  tip_abrev: string
  tip_denumire: string
  cod_judet: number
  judet_denumire: string
}

export interface LocalitateSearchResponse {
  total: number
  results: LocalitateEntry[]
}

export interface Judet {
  cod_judet: number
  denumire: string
}
