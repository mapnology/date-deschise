import { useState, useEffect } from 'react'
import { getValute, getValuteByData, getCursZi } from '../services/schimbApi'
import type { ValutaInfo, CursZi } from '../types/schimb'

function localToday(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function formatDate(dateStr: string | undefined | null): string {
  if (!dateStr) return ''
  const [y, m, d] = dateStr.split('-')
  return `${d}.${m}.${y}`
}

function formatRate(rate: number): string {
  return rate.toLocaleString('ro-RO', { minimumFractionDigits: 4, maximumFractionDigits: 4 })
}

function SkeletonGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="h-28 animate-pulse rounded-xl bg-gray-100" />
      ))}
    </div>
  )
}

function ValutaCard({ info, onSelect }: { info: ValutaInfo; onSelect: (v: string) => void }) {
  return (
    <button
      onClick={() => onSelect(info.valuta)}
      className="flex flex-col rounded-xl border border-gray-100 bg-white p-5 shadow-sm text-left transition hover:border-amber-200 hover:shadow-md"
    >
      <div className="flex items-start justify-between mb-3">
        <span className="rounded-lg bg-amber-50 px-2.5 py-1 font-mono text-sm font-bold text-amber-700">
          {info.valuta}
        </span>
        <span className="text-xs text-gray-400">{formatDate(info.ultima_data)}</span>
      </div>
      <p className="text-xl font-bold text-gray-900">
        {formatRate(info.curs_unitar)}
        <span className="ml-1 text-sm font-normal text-gray-400">RON</span>
      </p>
    </button>
  )
}

function CursZiResult({ cursZi, onBack }: { cursZi: CursZi; onBack: () => void }) {
  return (
    <div className="rounded-2xl border border-amber-100 bg-amber-50 p-8">
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-1.5 text-sm text-amber-600 hover:text-amber-800 transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
        Toate valutele
      </button>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className="rounded-xl bg-amber-100 px-4 py-2 font-mono text-2xl font-bold text-amber-800">
          {cursZi.valuta}
        </span>
        <span className="text-sm text-gray-500">{formatDate(cursZi.data)}</span>
      </div>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-5xl font-bold tracking-tight text-gray-900">
          {formatRate(cursZi.curs_unitar)}
        </span>
        <span className="text-xl text-gray-400">RON</span>
      </div>
      {cursZi.multiplicator > 1 && (
        <p className="mt-2 text-sm text-gray-500">
          {cursZi.multiplicator} {cursZi.valuta} = {formatRate(cursZi.curs)} RON
        </p>
      )}
    </div>
  )
}

export function SchimbPage() {
  const [allValute, setAllValute] = useState<ValutaInfo[]>([])
  const [displayValute, setDisplayValute] = useState<ValutaInfo[]>([])
  const [selectedValuta, setSelectedValuta] = useState('')
  const [selectedDate, setSelectedDate] = useState(localToday())
  const [cursZi, setCursZi] = useState<CursZi | null>(null)
  const [isFiltered, setIsFiltered] = useState(false)
  const [displayDate, setDisplayDate] = useState<string | null>(null)
  const [loadingAll, setLoadingAll] = useState(true)
  const [loadingResult, setLoadingResult] = useState(false)
  const [errorAll, setErrorAll] = useState<string | null>(null)
  const [errorResult, setErrorResult] = useState<string | null>(null)

  useEffect(() => {
    getValute()
      .then(data => {
        setAllValute(data)
        setDisplayValute(data)
        setLoadingAll(false)
      })
      .catch(() => {
        setErrorAll('Nu s-au putut încărca cursurile valutare.')
        setLoadingAll(false)
      })
  }, [])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setLoadingResult(true)
    setErrorResult(null)
    setCursZi(null)
    setIsFiltered(true)
    setDisplayDate(selectedDate)

    if (selectedValuta) {
      getCursZi(selectedValuta, selectedDate)
        .then(data => { setCursZi(data); setLoadingResult(false) })
        .catch(() => { setErrorResult('Nu s-a găsit cursul pentru valuta și data selectate.'); setLoadingResult(false) })
    } else {
      getValuteByData(selectedDate)
        .then(data => { setDisplayValute(data); setLoadingResult(false) })
        .catch(() => { setErrorResult('Nu s-au putut încărca cursurile pentru data selectată.'); setLoadingResult(false) })
    }
  }

  function handleReset() {
    setSelectedValuta('')
    setSelectedDate(localToday())
    setCursZi(null)
    setErrorResult(null)
    setDisplayValute(allValute)
    setIsFiltered(false)
    setDisplayDate(null)
  }

  function handleSelectCard(valuta: string) {
    setSelectedValuta(valuta)
    setLoadingResult(true)
    setErrorResult(null)
    setCursZi(null)
    setIsFiltered(true)
    getCursZi(valuta, selectedDate)
      .then(data => { setCursZi(data); setLoadingResult(false) })
      .catch(() => { setErrorResult('Nu s-a găsit cursul pentru valuta și data selectate.'); setLoadingResult(false) })
  }

  const showGrid = !cursZi && !loadingResult && !errorResult

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-10 text-center">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Curs Valutar BNR
        </h1>
        <p className="text-gray-500">
          Cursuri oficiale de schimb față de RON publicate de Banca Națională a României
        </p>
      </div>

      {/* Filter form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:flex-row sm:items-end">
          <div className="flex-1">
            <label htmlFor="valuta" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">
              Valută
            </label>
            <select
              id="valuta"
              value={selectedValuta}
              onChange={e => setSelectedValuta(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
            >
              <option value="">Toate valutele</option>
              {allValute.map(v => (
                <option key={v.valuta} value={v.valuta}>{v.valuta}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="data-curs" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-400">
              Dată
            </label>
            <input
              id="data-curs"
              type="date"
              value={selectedDate}
              max={localToday()}
              onChange={e => setSelectedDate(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
            />
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="submit"
              disabled={loadingResult}
              className="rounded-xl bg-amber-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Caută
            </button>
            {isFiltered && (
              <button
                type="button"
                onClick={handleReset}
                className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
              >
                Resetează
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Initial skeleton */}
      {loadingAll && <SkeletonGrid />}

      {/* Error loading all */}
      {!loadingAll && errorAll && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-6 py-10 text-center">
          <p className="text-sm font-medium text-red-600">{errorAll}</p>
        </div>
      )}

      {/* Loading result */}
      {loadingResult && (
        <div className="h-44 animate-pulse rounded-2xl bg-gray-100" />
      )}

      {/* Error result */}
      {!loadingResult && errorResult && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-6 py-10 text-center">
          <p className="text-sm font-medium text-red-600">{errorResult}</p>
          <button onClick={handleReset} className="mt-4 text-sm text-red-500 underline hover:text-red-700">
            Înapoi la toate valutele
          </button>
        </div>
      )}

      {/* Single currency result */}
      {!loadingResult && cursZi && (
        <CursZiResult cursZi={cursZi} onBack={handleReset} />
      )}

      {/* All currencies grid */}
      {!loadingAll && !errorAll && showGrid && (
        <>
          <p className="mb-4 text-sm text-gray-400">
            {displayValute.length} valute
            {isFiltered && displayDate && (
              <span> — {formatDate(displayDate)}</span>
            )}
            {!isFiltered && ' disponibile'}
            {!cursZi && ' — click pe o valută pentru detalii'}
          </p>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {displayValute.map(v => (
              <ValutaCard key={v.valuta} info={v} onSelect={handleSelectCard} />
            ))}
          </div>
        </>
      )}
    </main>
  )
}
