import { useState } from 'react'
import type { CAENEntry } from '../types/caen'

interface Props {
  entry: CAENEntry
  isFavorite?: boolean
  onToggleFavorite?: (entry: CAENEntry) => void
}

export function CAENResultCard({ entry, isFavorite = false, onToggleFavorite }: Props) {
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(`${entry.cod_caen} - ${entry.denumire}`).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-gray-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <span className="shrink-0 rounded-lg bg-blue-50 px-2.5 py-1 font-mono text-sm font-semibold text-blue-700">
          {entry.cod_caen}
        </span>
        <div className="flex items-center gap-1">
          {onToggleFavorite && (
            <button
              onClick={() => onToggleFavorite(entry)}
              title={isFavorite ? 'Elimină din favorite' : 'Adaugă la favorite'}
              className="flex items-center rounded-lg p-1.5 transition hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill={isFavorite ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={isFavorite ? 'text-amber-400' : 'text-gray-300 hover:text-amber-400'}
              >
                <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
              </svg>
            </button>
          )}
          <button
            onClick={copy}
            title="Copiază codul CAEN"
            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            {copied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Copiat!
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
                Copiază
              </>
            )}
          </button>
        </div>
      </div>

      <h2 className="text-base font-semibold leading-snug text-gray-900">
        {entry.denumire}
      </h2>

      <dl className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500">
        <div className="flex gap-1">
          <dt className="font-medium text-gray-400">Secțiune</dt>
          <dd>{entry.sectiune_cod} – {entry.sectiune}</dd>
        </div>
        <div className="flex gap-1">
          <dt className="font-medium text-gray-400">Diviziune</dt>
          <dd>{entry.diviziune_cod} – {entry.diviziune}</dd>
        </div>
        <div className="flex gap-1">
          <dt className="font-medium text-gray-400">Grupă</dt>
          <dd>{entry.grupa_cod} – {entry.grupa}</dd>
        </div>
      </dl>
    </article>
  )
}