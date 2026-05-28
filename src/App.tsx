import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { CAENPage } from './pages/CAENPage'
import { DocsPage } from './pages/DocsPage'
import { AboutPage } from './pages/AboutPage'

const PAGE_TITLES: Record<string, string> = {
  '/': 'Date Deschise',
  '/caen': 'Coduri CAEN Rev. 3',
  '/documentatie': 'Documentație API',
  '/despre': 'Despre proiect',
}

function PageTitleUpdater() {
  const location = useLocation()
  useEffect(() => {
    const title = PAGE_TITLES[location.pathname] || PAGE_TITLES['/']
    document.title = title
  }, [location.pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <PageTitleUpdater />
      <div className="flex min-h-screen flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/caen" element={<CAENPage />} />
            <Route path="/documentatie" element={<DocsPage />} />
            <Route path="/despre" element={<AboutPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}