import { useState, useRef } from 'react'
import { FirmaResultCard } from '../components/FirmaResultCard'
import { searchCompanii } from '../services/firmeApi'
import type { CompanySearchItem } from '../types/firme'

export function FirmePage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<CompanySearchItem[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (q.length < 3) return

    abortRef.current?.abort()
    abortRef.current = new AbortController()

    setLoading(true)
    setError(null)

    try {
      const data = await searchCompanii(q)
      setResults(data)
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError('A apărut o eroare la căutare. Încearcă din nou.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-10 text-center">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Căutare Firme
        </h1>
        <p className="text-gray-500">
          Caută companii din România după denumire
        </p>
      </div>

      <form onSubmit={handleSearch} className="mb-8 flex justify-center">
        <div className="flex w-full max-w-xl gap-2">
          <div className="relative flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Ex: Dedeman, Kaufland, Dacia..."
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm shadow-sm transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              autoFocus
              minLength={3}
            />
          </div>
          <button
            type="submit"
            disabled={loading || query.trim().length < 3}
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <>
                <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Caută
              </>
            ) : (
              'Caută'
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="mb-6 rounded-xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {results !== null && !loading && (
        <div className="mb-4 text-sm text-gray-500">
          {results.length === 0
            ? 'Nicio firmă găsită pentru această căutare.'
            : `${results.length} ${results.length === 1 ? 'firmă găsită' : 'firme găsite'}`}
        </div>
      )}

      {results && results.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {results.map(company => (
            <FirmaResultCard key={company.cui} company={company} />
          ))}
        </div>
      )}

      {results === null && !loading && (
        <div className="flex flex-col items-center gap-3 py-16 text-center text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
            <rect width="16" height="20" x="4" y="2" rx="2" />
            <path d="M9 22v-4h6v4" />
            <path d="M8 6h.01" /><path d="M16 6h.01" />
            <path d="M8 10h.01" /><path d="M16 10h.01" />
            <path d="M8 14h.01" /><path d="M16 14h.01" />
          </svg>
          <p className="text-sm">Introdu cel puțin 3 caractere și apasă Caută</p>
        </div>
      )}
    </main>
  )
}
