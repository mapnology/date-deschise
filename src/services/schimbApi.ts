import type { ValutaInfo, CursZi } from '../types/schimb'

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string

export async function getValute(): Promise<ValutaInfo[]> {
  const res = await fetch(`${BASE_URL}/schimb/valute`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function getValuteByData(data: string): Promise<ValutaInfo[]> {
  const res = await fetch(`${BASE_URL}/schimb/valute/${data}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function getCursZi(valuta: string, data: string): Promise<CursZi> {
  const res = await fetch(`${BASE_URL}/schimb/curs/${valuta}/${data}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}
