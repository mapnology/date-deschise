import { ThemeToggle } from './ThemeToggle'

interface Props {
  dark: boolean
  onToggle: () => void
}

export function Header({ dark, onToggle }: Props) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          CAEN
        </span>
        <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
          Rev. 3
        </span>
      </div>
      <ThemeToggle dark={dark} onToggle={onToggle} />
    </header>
  )
}