import type { CAENEntry, SearchResponse } from '../types/caen'

const BASE_URL = 'https://caen-api.ro'

export async function searchCAEN(
  query: string,
  limit = 50,
  offset = 0,
): Promise<SearchResponse> {
  const params = new URLSearchParams({ q: query, limit: String(limit), offset: String(offset) })
  const res = await fetch(`${BASE_URL}/caen?${params}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function getCAENByCode(code: string): Promise<CAENEntry> {
  const res = await fetch(`${BASE_URL}/caen/${code}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}