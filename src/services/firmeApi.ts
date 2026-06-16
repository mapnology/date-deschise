import type { CompanySearchResponse, CompanyOut } from '../types/firme'

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string

export async function searchCompanii(q: string, limit = 1): Promise<CompanySearchResponse> {
  const res = await fetch(`${BASE_URL}/companii/search?q=${encodeURIComponent(q)}&limit=${limit}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function getCompanie(cui: number | string): Promise<CompanyOut> {
  const res = await fetch(`${BASE_URL}/companii/${cui}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}
