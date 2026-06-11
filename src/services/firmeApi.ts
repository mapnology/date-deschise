import type { CompanySearchItem, CompanyOut } from '../types/firme'

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string

export async function searchCompanii(q: string): Promise<CompanySearchItem[]> {
  const res = await fetch(`${BASE_URL}/companii/search?q=${encodeURIComponent(q)}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export async function getCompanie(cui: number | string): Promise<CompanyOut> {
  const res = await fetch(`${BASE_URL}/companii/companies/${cui}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}
