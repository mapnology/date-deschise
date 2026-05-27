import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'

// --- Icons ---

function IconCAEN() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  )
}

function IconMapPin() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function IconBriefcase() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-violet-600">
      <rect width="20" height="14" x="2" y="7" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

function IconTrendingUp() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  )
}

function IconMail() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-rose-600">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function IconCalendar() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-sky-600">
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}

// --- Types ---

type ServiceStatus = 'live' | 'coming-soon'

interface ApiService {
  id: string
  title: string
  description: string
  status: ServiceStatus
  href?: string
  iconBg: string
  icon: React.ReactNode
}

// --- Data ---

const API_SERVICES: ApiService[] = [
  {
    id: 'caen',
    title: 'Coduri CAEN Rev. 3',
    description: 'Clasificarea activităților din economia națională — 600+ coduri indexate și căutabile.',
    status: 'live',
    href: '/caen',
    iconBg: 'bg-blue-50',
    icon: <IconCAEN />,
  },
  {
    id: 'siruta',
    title: 'Coduri SIRUTA',
    description: 'Baza de date a localităților din România.',
    status: 'coming-soon',
    iconBg: 'bg-emerald-50',
    icon: <IconMapPin />,
  },
  {
    id: 'cor',
    title: 'Coduri COR',
    description: 'Clasificarea Ocupațiilor din România.',
    status: 'coming-soon',
    iconBg: 'bg-violet-50',
    icon: <IconBriefcase />,
  },
  {
    id: 'bnr',
    title: 'Curs Valutar BNR',
    description: 'Update zilnic via BNR.',
    status: 'coming-soon',
    iconBg: 'bg-amber-50',
    icon: <IconTrendingUp />,
  },
  {
    id: 'postal',
    title: 'Coduri Poștale',
    description: 'Căutare rapidă după adresă.',
    status: 'coming-soon',
    iconBg: 'bg-rose-50',
    icon: <IconMail />,
  },
  {
    id: 'holidays',
    title: 'Sărbători Legale',
    description: 'Calendarul zilelor libere oficiale.',
    status: 'coming-soon',
    iconBg: 'bg-sky-50',
    icon: <IconCalendar />,
  },
]

// --- Toast ---

function Toast({ message }: { message: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-gray-900 px-5 py-3 text-sm text-white shadow-xl"
    >
      {message}
    </div>
  )
}

// --- Service Card ---

function ServiceCard({ service, onComingSoon }: { service: ApiService; onComingSoon: () => void }) {
  const isLive = service.status === 'live'

  return (
    <div
      className={`flex flex-col rounded-2xl border p-6 shadow-sm transition-shadow ${
        isLive
          ? 'border-gray-100 bg-white hover:shadow-md'
          : 'border-gray-100 bg-gray-50 opacity-70'
      }`}
    >
      <div className="mb-4 flex items-start justify-between">
        <div className={`rounded-xl p-3 ${service.iconBg}`}>{service.icon}</div>
        {isLive ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Live
          </span>
        ) : (
          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-400">
            În construcție
          </span>
        )}
      </div>

      <h3 className="mb-1.5 font-bold text-gray-900">{service.title}</h3>
      <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-500">{service.description}</p>

      {isLive ? (
        <Link
          to={service.href!}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Deschide
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      ) : (
        <button
          type="button"
          onClick={onComingSoon}
          className="inline-flex cursor-not-allowed items-center justify-center rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-400"
          aria-disabled="true"
        >
          Disponibil curând
        </button>
      )}
    </div>
  )
}

// --- Page ---

export function HomePage() {
  const [showToast, setShowToast] = useState(false)

  const handleComingSoon = useCallback(() => {
    setShowToast(true)
    setTimeout(() => setShowToast(false), 3000)
  }, [])

  return (
    <main>
      {/* Hero */}
      <section className="border-b border-gray-100 bg-white px-4 py-20 text-center">
        <div className="mx-auto max-w-2xl">
          <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            Mapnology Open Data
          </span>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Mapnology Open Data Portal
          </h1>
          <p className="text-lg text-gray-500">
            API-uri gratuite cu date publice din România
          </p>
        </div>
      </section>

      {/* API Services grid */}
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <h2 className="mb-8 text-sm font-semibold uppercase tracking-wider text-gray-400">
          Seturi de date disponibile
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {API_SERVICES.map(service => (
            <ServiceCard key={service.id} service={service} onComingSoon={handleComingSoon} />
          ))}
        </div>
      </section>

      {showToast && <Toast message="Acest API va fi disponibil curând" />}
    </main>
  )
}
