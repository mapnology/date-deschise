import { useState, useRef, useEffect, useCallback } from 'react'
import type { LocalitateEntry } from '../types/siruta'

export interface SirutaSuggestionItem extends LocalitateEntry {
  isFavorite: boolean
}

interface Props {
  value: string
  onChange: (v: string) => void
  suggestions?: SirutaSuggestionItem[]
  onSelectSuggestion?: (entry: LocalitateEntry) => void
}

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={filled ? 'text-amber-400' : 'text-gray-300'}
  >
    <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
  </svg>
)

export function SirutaSearchBar({ value, onChange, suggestions = [], onSelectSuggestion }: Props) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const showDropdown = open && value.trim().length >= 2 && suggestions.length > 0

  const select = useCallback(
    (entry: LocalitateEntry) => {
      onSelectSuggestion?.(entry)
      setOpen(false)
      setActiveIndex(-1)
    },
    [onSelectSuggestion],
  )

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setActiveIndex(-1)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    function reset() { setActiveIndex(-1) }
    reset()
  }, [suggestions])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!showDropdown) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(i => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault()
      select(suggestions[activeIndex])
    } else if (e.key === 'Escape') {
      setOpen(false)
      setActiveIndex(-1)
      inputRef.current?.blur()
    }
  }

  const favSuggestions = suggestions.filter(s => s.isFavorite)
  const otherSuggestions = suggestions.filter(s => !s.isFavorite)

  function renderItem(item: SirutaSuggestionItem, globalIndex: number) {
    const isActive = globalIndex === activeIndex
    return (
      <li key={item.cod_siruta}>
        <button
          onMouseDown={e => e.preventDefault()}
          onClick={() => select(item)}
          className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition ${
            isActive ? 'bg-emerald-50' : 'hover:bg-gray-50'
          }`}
        >
          <span className="shrink-0 rounded-md bg-emerald-50 px-2 py-0.5 font-mono text-xs font-semibold text-emerald-700">
            {item.cod_siruta}
          </span>
          <span className="flex-1 truncate text-sm text-gray-800">{item.denumire}</span>
          <span className="shrink-0 text-xs text-gray-400">{item.judet_denumire}</span>
          <StarIcon filled={item.isFavorite} />
        </button>
      </li>
    )
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl">
      <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
        <svg
          className="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={e => { onChange(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Caută localitate după nume (min. 2 caractere)…"
        className={`w-full border bg-white py-3.5 pl-11 pr-10 text-base text-gray-900 placeholder-gray-400 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 ${
          showDropdown ? 'rounded-t-xl rounded-b-none border-b-0 border-emerald-500 ring-2 ring-emerald-500/20' : 'rounded-xl border-gray-200'
        }`}
        autoComplete="off"
        spellCheck={false}
        aria-autocomplete="list"
        aria-expanded={showDropdown}
      />
      {value && (
        <button
          onMouseDown={e => e.preventDefault()}
          onClick={() => { onChange(''); setOpen(false); inputRef.current?.focus() }}
          aria-label="Șterge căutarea"
          className="absolute inset-y-0 right-3 flex items-center p-1 text-gray-400 hover:text-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}

      {showDropdown && (
        <div className="absolute left-0 right-0 top-full z-50 rounded-b-xl border border-t-0 border-emerald-500 bg-white shadow-lg ring-2 ring-emerald-500/20">
          <ul className="max-h-80 overflow-y-auto py-1" role="listbox">
            {favSuggestions.length > 0 && (
              <>
                <li className="px-3 pb-1 pt-2">
                  <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-500">
                    <StarIcon filled />
                    Favorite
                  </span>
                </li>
                {favSuggestions.map((item, i) => renderItem(item, i))}
              </>
            )}
            {otherSuggestions.length > 0 && (
              <>
                {favSuggestions.length > 0 && (
                  <li className="mx-3 my-1 border-t border-gray-100" aria-hidden />
                )}
                <li className="px-3 pb-1 pt-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Rezultate
                  </span>
                </li>
                {otherSuggestions.map((item, i) =>
                  renderItem(item, favSuggestions.length + i)
                )}
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
