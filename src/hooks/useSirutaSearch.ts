import { useState, useEffect, useCallback, useRef } from 'react'
import type { LocalitateEntry } from '../types/siruta'
import { searchLocalitati } from '../services/sirutaApi'

const DEBOUNCE_MS = 300

interface SearchState {
  results: LocalitateEntry[]
  total: number
  loading: boolean
  error: string | null
}

export function useSirutaSearch(query: string) {
  const [state, setState] = useState<SearchState>({
    results: [],
    total: 0,
    loading: false,
    error: null,
  })
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const run = useCallback((q: string) => {
    setState(s => ({ ...s, loading: true, error: null }))
    searchLocalitati(q)
      .then(data => setState({ results: data.results, total: data.total, loading: false, error: null }))
      .catch(() => setState(s => ({ ...s, loading: false, error: 'A apărut o eroare. Încearcă din nou.' })))
  }, [])

  useEffect(() => {
    const trimmed = query.trim()

    function resetState() {
      setState({ results: [], total: 0, loading: false, error: null })
    }

    if (trimmed.length < 2) {
      resetState()
      return
    }
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => run(trimmed), DEBOUNCE_MS)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [query, run])

  return state
}
