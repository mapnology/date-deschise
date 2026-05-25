import { useState } from 'react'
import type { CAENEntry } from '../types/caen'

interface Props {
  entry: CAENEntry
}

export function ResultCard({ entry }: Props) {
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(`${entry.cod_caen} - ${entry.denumire}`).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-gray-200 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <span className="shrink-0 rounded-lg bg-blue-50 px-2.5 py-1 font-mono text-sm font-semibold text-blue-700">
          {entry.cod_caen}
        </span>
        <button
          onClick={copy}
          title="Copiază codul CAEN"
          className="shrink-0 flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
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
