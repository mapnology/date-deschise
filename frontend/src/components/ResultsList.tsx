import type { CAENEntry } from '../types/caen'
import { ResultCard } from './ResultCard'

interface Props {
  results: CAENEntry[]
  total: number
  loading: boolean
  error: string | null
  query: string
}

function SkeletonCard() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 animate-pulse">
      <div className="flex items-start justify-between gap-4">
        <div className="h-7 w-16 rounded-lg bg-gray-100 dark:bg-gray-800" />
        <div className="h-7 w-20 rounded-lg bg-gray-100 dark:bg-gray-800" />
      </div>
      <div className="h-5 w-3/4 rounded bg-gray-100 dark:bg-gray-800" />
      <div className="flex gap-4">
        <div className="h-4 w-32 rounded bg-gray-100 dark:bg-gray-800" />
        <div className="h-4 w-40 rounded bg-gray-100 dark:bg-gray-800" />
      </div>
    </div>
  )
}

export function ResultsList({ results, total, loading, error, query }: Props) {
  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-100 bg-red-50 px-6 py-10 text-center dark:border-red-900/30 dark:bg-red-900/10">
        <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
      </div>
    )
  }

  if (query && results.length === 0) {
    return (
      <div className="rounded-xl border border-gray-100 bg-gray-50 px-6 py-14 text-center dark:border-gray-800 dark:bg-gray-900/50">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Niciun rezultat pentru <span className="font-medium text-gray-700 dark:text-gray-300">„{query}"</span>.
        </p>
      </div>
    )
  }

  if (results.length === 0) return null

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-gray-400 dark:text-gray-500">
        {total} {total === 1 ? 'rezultat' : 'rezultate'}
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {results.map(entry => (
          <ResultCard key={entry.cod_caen} entry={entry} />
        ))}
      </div>
    </div>
  )
}
