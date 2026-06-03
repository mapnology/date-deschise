import { useState, useCallback } from 'react'
import type { LocalitateEntry } from '../types/siruta'

const STORAGE_KEY = 'siruta_favorites'

function load(): LocalitateEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function save(entries: LocalitateEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export function useSirutaFavorites() {
  const [favorites, setFavorites] = useState<LocalitateEntry[]>(load)

  const isFavorite = useCallback(
    (cod: number) => favorites.some(e => e.cod_siruta === cod),
    [favorites],
  )

  const toggleFavorite = useCallback((entry: LocalitateEntry) => {
    setFavorites(prev => {
      const next = prev.some(e => e.cod_siruta === entry.cod_siruta)
        ? prev.filter(e => e.cod_siruta !== entry.cod_siruta)
        : [entry, ...prev]
      save(next)
      return next
    })
  }, [])

  return { favorites, isFavorite, toggleFavorite }
}
