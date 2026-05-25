export function Header() {
  return (
    <header className="flex items-center px-6 py-4 border-b border-gray-100">
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold tracking-tight text-gray-900">
          CAEN
        </span>
        <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
          Rev. 3
        </span>
      </div>
    </header>
  )
}