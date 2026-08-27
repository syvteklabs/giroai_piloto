import { Suspense } from 'react'
import { Header } from '@/components/header'
import ParticiparContent from './participar-content'

export default function Participar() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Suspense fallback={<div className="flex-1 bg-giro-claro" />}>
        <ParticiparContent />
      </Suspense>
      <footer className="border-t border-giro-borda bg-giro-branco">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-giro-texto-sec text-sm">
          <p>Giro AÍ © 2026 - Piloto Merco Noroeste</p>
        </div>
      </footer>
    </div>
  )
}
