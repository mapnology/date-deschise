import { useState } from 'react'
import { Header } from './components/Header'
import { SearchBar } from './components/SearchBar'
import { ResultsList } from './components/ResultsList'
import { useCAENSearch } from './hooks/useCAENSearch'

export default function App() {
  const [query, setQuery] = useState('')
  const { results, total, loading, error } = useCAENSearch(query)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Coduri CAEN Rev. 3
          </h1>
          <p className="text-gray-500">
            Caută orice cod sau activitate din clasificarea CAEN Rev. 3
          </p>
        </div>

        <div className="mb-8 flex justify-center">
          <SearchBar value={query} onChange={setQuery} />
        </div>

        <ResultsList
          results={results}
          total={total}
          loading={loading}
          error={error}
          query={query}
        />
      </main>

      <footer className="mt-auto border-t border-gray-100 py-6 text-center text-xs text-gray-400">
        <p>
          Date furnizate de{' '}
          <a
            href="https://caen-api.ro"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-gray-600"
          >
            caen-api.ro
          </a>
        </p>
        <p className="mt-1">
          Contact:{' '}
          <a
            href="mailto:mapnology@gmail.com"
            className="underline underline-offset-2 hover:text-gray-600"
          >
            mapnology@gmail.com
          </a>
        </p>
      </footer>
    </div>
  )
}
