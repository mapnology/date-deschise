import { Fragment, useState, useEffect } from 'react'
import { getSectiuni, getDiviziuni, getGrupe, getClase } from '../services/caenApi'
import { CAENResultCard } from './CAENResultCard'
import type { CAENEntry, Section, Division, Group } from '../types/caen'

interface PathItem {
  cod: string
  denumire: string
  level: 'section' | 'division' | 'group'
}

type ItemsState =
  | { kind: 'sections'; data: Section[] }
  | { kind: 'divisions'; data: Division[] }
  | { kind: 'groups'; data: Group[] }
  | { kind: 'classes'; data: CAENEntry[] }

interface Props {
  isFavorite: (cod: string) => boolean
  onToggleFavorite: (entry: CAENEntry) => void
}

const BADGE: Record<'sections' | 'divisions' | 'groups', string> = {
  sections: 'bg-blue-50 text-blue-700',
  divisions: 'bg-indigo-50 text-indigo-700',
  groups: 'bg-violet-50 text-violet-700',
}

const ROW_HOVER: Record<'sections' | 'divisions' | 'groups', string> = {
  sections: 'hover:border-blue-100 hover:bg-blue-50',
  divisions: 'hover:border-indigo-100 hover:bg-indigo-50',
  groups: 'hover:border-violet-100 hover:bg-violet-50',
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

function DrillRow({
  cod,
  denumire,
  kind,
  onClick,
}: {
  cod: string
  denumire: string
  kind: 'sections' | 'divisions' | 'groups'
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl border border-gray-100 px-4 py-3 text-left transition ${ROW_HOVER[kind]}`}
    >
      <span className={`shrink-0 rounded-lg px-2.5 py-1 font-mono text-sm font-bold ${BADGE[kind]}`}>
        {cod}
      </span>
      <span className="flex-1 text-sm font-medium leading-snug text-gray-800">{denumire}</span>
      <ChevronRight />
    </button>
  )
}

export function CAENHierarchyExplorer({ isFavorite, onToggleFavorite }: Props) {
  const [path, setPath] = useState<PathItem[]>([])
  const [items, setItems] = useState<ItemsState | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [retryToken, setRetryToken] = useState(0)

  useEffect(() => {
    let cancelled = false

    async function fetchItems() {
      setLoading(true)
      setError(null)
      try {
        let next: ItemsState
        if (path.length === 0) {
          next = { kind: 'sections', data: await getSectiuni() }
        } else {
          const last = path[path.length - 1]
          if (last.level === 'section') {
            next = { kind: 'divisions', data: await getDiviziuni(last.cod) }
          } else if (last.level === 'division') {
            next = { kind: 'groups', data: await getGrupe(last.cod) }
          } else {
            next = { kind: 'classes', data: await getClase(last.cod) }
          }
        }
        if (!cancelled) setItems(next)
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Eroare necunoscută')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchItems()
    return () => { cancelled = true }
  }, [path, retryToken])

  function drillInto(item: { cod: string; denumire: string }, level: PathItem['level']) {
    setPath(prev => [...prev, { cod: item.cod, denumire: item.denumire, level }])
  }

  function navigateToIndex(index: number) {
    setPath(prev => prev.slice(0, index))
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      {/* Breadcrumb header */}
      <div className="border-b border-gray-100 bg-gray-50/70 px-5 py-3.5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Explorează ierarhia
        </p>
        <nav className="flex flex-wrap items-center gap-1 text-sm" aria-label="breadcrumb">
          <button
            onClick={() => navigateToIndex(0)}
            className={`rounded-md px-2 py-1 font-medium transition hover:bg-white hover:text-blue-600 hover:shadow-sm ${
              path.length === 0 ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            Toate secțiunile
          </button>
          {path.map((item, i) => (
            <Fragment key={i}>
              <ChevronSep />
              <button
                onClick={() => navigateToIndex(i + 1)}
                title={`${item.cod} – ${item.denumire}`}
                className={`max-w-[160px] truncate rounded-md px-2 py-1 font-medium transition hover:bg-white hover:text-blue-600 hover:shadow-sm ${
                  i === path.length - 1 ? 'text-gray-900' : 'text-gray-500'
                }`}
              >
                {item.cod}
              </button>
            </Fragment>
          ))}
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

        {!loading && !error && items && (
          <>
            {items.kind === 'sections' && (
              items.data.length === 0 ? <EmptyState /> : (
                <ul className="space-y-1.5">
                  {items.data.map(s => (
                    <li key={s.cod}>
                      <DrillRow cod={s.cod} denumire={s.denumire} kind="sections" onClick={() => drillInto(s, 'section')} />
                    </li>
                  ))}
                </ul>
              )
            )}

            {items.kind === 'divisions' && (
              items.data.length === 0 ? <EmptyState /> : (
                <ul className="space-y-1.5">
                  {items.data.map(d => (
                    <li key={d.cod}>
                      <DrillRow cod={d.cod} denumire={d.denumire} kind="divisions" onClick={() => drillInto(d, 'division')} />
                    </li>
                  ))}
                </ul>
              )
            )}

            {items.kind === 'groups' && (
              items.data.length === 0 ? <EmptyState /> : (
                <ul className="space-y-1.5">
                  {items.data.map(g => (
                    <li key={g.cod}>
                      <DrillRow cod={g.cod} denumire={g.denumire} kind="groups" onClick={() => drillInto(g, 'group')} />
                    </li>
                  ))}
                </ul>
              )
            )}

            {items.kind === 'classes' && (
              items.data.length === 0
                ? <EmptyState message="Nu există coduri CAEN la această grupă." />
                : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {items.data.map(entry => (
                      <CAENResultCard
                        key={entry.cod_caen}
                        entry={entry}
                        isFavorite={isFavorite(entry.cod_caen)}
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
