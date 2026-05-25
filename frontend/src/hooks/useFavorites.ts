import { useState, useCallback } from 'react'
import type { CAENEntry } from '../types/caen'

const STORAGE_KEY = 'caen_favorites'

function load(): CAENEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function save(entries: CAENEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<CAENEntry[]>(load)

  const isFavorite = useCallback(
    (cod: string) => favorites.some(e => e.cod_caen === cod),
    [favorites],
  )

  const toggleFavorite = useCallback((entry: CAENEntry) => {
    setFavorites(prev => {
      const next = prev.some(e => e.cod_caen === entry.cod_caen)
        ? prev.filter(e => e.cod_caen !== entry.cod_caen)
        : [entry, ...prev]
      save(next)
      return next
    })
  }, [])

  return { favorites, isFavorite, toggleFavorite }
}