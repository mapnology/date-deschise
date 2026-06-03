import { useState, useEffect } from 'react'
import { getJudete, getLocalitatiByJudet } from '../services/sirutaApi'
import { SirutaResultCard } from './SirutaResultCard'
import type { LocalitateEntry, Judet } from '../types/siruta'

type ViewState =
  | { kind: 'judete'; data: Judet[] }
  | { kind: 'localitati'; judet: Judet; data: LocalitateEntry[] }

interface Props {
  isFavorite: (cod: number) => boolean
  onToggleFavorite: (entry: LocalitateEntry) => void
}

function SkeletonList() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-[52px] animate-pulse rounded-xl bg-gray-100" />
      ))}
    </div>
  )
}

function ChevronRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-gray-300">
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

function ChevronSep() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-gray-300">
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

function EmptyState({ message = 'Nu există elemente la acest nivel.' }: { message?: string }) {
  return (
    <div className="py-14 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-3 text-gray-200">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
      <p className="text-sm text-gray-400">{message}</p>
    </div>
  )
}

export function SirutaHierarchyExplorer({ isFavorite, onToggleFavorite }: Props) {
  const [view, setView] = useState<ViewState | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [retryToken, setRetryToken] = useState(0)
  const [selectedJudet, setSelectedJudet] = useState<Judet | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetch() {
      setLoading(true)
      setError(null)
      try {
        if (!selectedJudet) {
          const data = await getJudete()
          if (!cancelled) setView({ kind: 'judete', data })
        } else {
          const data = await getLocalitatiByJudet(selectedJudet.cod_judet)
          if (!cancelled) setView({ kind: 'localitati', judet: selectedJudet, data })
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Eroare necunoscută')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetch()
    return () => { cancelled = true }
  }, [selectedJudet, retryToken])

  function selectJudet(judet: Judet) {
    setSelectedJudet(judet)
  }

  function goBack() {
    setSelectedJudet(null)
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* Breadcrumb header */}
      <div className="border-b border-gray-100 bg-gray-50/70 px-5 py-3.5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Explorează după județ
        </p>
        <nav className="flex flex-wrap items-center gap-1 text-sm" aria-label="breadcrumb">
          <button
            onClick={goBack}
            className={`rounded-md px-2 py-1 font-medium transition hover:bg-white hover:text-emerald-600 hover:shadow-sm ${
              !selectedJudet ? 'text-emerald-600' : 'text-gray-500'
            }`}
          >
            Toate județele
          </button>
          {selectedJudet && (
            <>
              <ChevronSep />
              <button
                className="max-w-[200px] truncate rounded-md px-2 py-1 font-medium text-gray-900 transition hover:bg-white hover:text-emerald-600 hover:shadow-sm"
                title={selectedJudet.denumire}
              >
                {selectedJudet.denumire}
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Content */}
      <div className="p-5">
        {loading && <SkeletonList />}

        {!loading && error && (
          <div className="rounded-xl border border-red-100 bg-red-50 p-8 text-center">
            <p className="text-sm font-medium text-red-600">Nu s-au putut încărca datele</p>
            <p className="mt-1 text-xs text-red-400">{error}</p>
            <button
              onClick={() => setRetryToken(t => t + 1)}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
              Încearcă din nou
            </button>
          </div>
        )}

        {!loading && !error && view && (
          <>
            {view.kind === 'judete' && (
              view.data.length === 0 ? <EmptyState /> : (
                <ul className="space-y-1.5">
                  {view.data.map(judet => (
                    <li key={judet.cod_judet}>
                      <button
                        onClick={() => selectJudet(judet)}
                        className="flex w-full items-center gap-3 rounded-xl border border-gray-100 px-4 py-3 text-left transition hover:border-emerald-100 hover:bg-emerald-50"
                      >
                        <span className="shrink-0 rounded-lg bg-emerald-50 px-2.5 py-1 font-mono text-sm font-bold text-emerald-700">
                          {judet.cod_judet}
                        </span>
                        <span className="flex-1 text-sm font-medium leading-snug text-gray-800">
                          {judet.denumire}
                        </span>
                        <ChevronRight />
                      </button>
                    </li>
                  ))}
                </ul>
              )
            )}

            {view.kind === 'localitati' && (
              view.data.length === 0
                ? <EmptyState message="Nu există localități pentru acest județ." />
                : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {view.data.map(entry => (
                      <SirutaResultCard
                        key={entry.cod_siruta}
                        entry={entry}
                        isFavorite={isFavorite(entry.cod_siruta)}
                        onToggleFavorite={onToggleFavorite}
                      />
                    ))}
                  </div>
                )
            )}
          </>
        )}
      </div>
    </div>
  )
}
