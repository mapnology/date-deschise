import { useState, useEffect, useCallback, useRef } from 'react'
import type { CAENEntry } from '../types/caen'
import { searchCAEN } from '../services/caenApi'

const DEBOUNCE_MS = 300

interface SearchState {
  results: CAENEntry[]
  total: number
  loading: boolean
  error: string | null
}

export function useCAENSearch(query: string) {
  const [state, setState] = useState<SearchState>({
    results: [],
    total: 0,
    loading: false,
    error: null,
  })
  const abortRef = useRef<AbortController | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const run = useCallback((q: string) => {
    abortRef.current?.abort()
    abortRef.current = new AbortController()

    setState(s => ({ ...s, loading: true, error: null }))

    searchCAEN(q)
      .then(data => setState({ results: data.results, total: data.total, loading: false, error: null }))
      .catch(err => {
        if (err.name === 'AbortError') return
        setState(s => ({ ...s, loading: false, error: 'A apărut o eroare. Încearcă din nou.' }))
      })
  }, [])

  useEffect(() => {
    const trimmed = query.trim()

    if (!trimmed) {
      setState({ results: [], total: 0, loading: false, error: null })
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