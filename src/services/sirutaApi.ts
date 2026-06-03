import type { LocalitateEntry, LocalitateSearchResponse, Judet } from '../types/siruta'

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string

export async function searchLocalitati(
  query: string,
  limit = 50,
  offset = 0,
): Promise<LocalitateSearchResponse> {
  const params = new URLSearchParams({ q: query, limit: String(limit), offset: String(offset) })
  const res = await fetch(`${BASE_URL}/siruta/cautare?${params}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function getLocalitate(cod: number): Promise<LocalitateEntry> {
  const res = await fetch(`${BASE_URL}/siruta/localitate/${cod}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function getJudete(): Promise<Judet[]> {
  const res = await fetch(`${BASE_URL}/siruta/judete`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function getLocalitatiByJudet(codJudet: number): Promise<LocalitateEntry[]> {
  const res = await fetch(`${BASE_URL}/siruta/judet/${codJudet}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}
