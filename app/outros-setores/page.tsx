import { Suspense } from 'react'
import { Header } from '@/components/header'
import OutrosSetoresContent from './outros-setores-content'

export default function OutrosSetores() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Suspense fallback={<div className="flex-1 bg-giro-claro" />}>
        <OutrosSetoresContent />
      </Suspense>
      <footer className="border-t border-giro-borda bg-giro-branco">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-giro-texto-sec text-sm">
          <p>Giro AÍ © 2026 - Piloto Merco Noroeste</p>
        </div>
      </footer>
    </div>
  )
}
