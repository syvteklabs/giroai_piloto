'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-giro-branco border-b border-giro-borda">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-giro-vermelho rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">G</span>
          </div>
          <span className="font-bold text-lg text-giro-grafite hidden sm:inline">Giro AÍ</span>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-giro-grafite"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row gap-4 absolute md:static top-16 left-0 right-0 bg-giro-branco md:bg-transparent p-4 md:p-0 border-b md:border-0 border-giro-borda z-40 md:z-auto`}>
          <Link href="/participar" className="text-giro-texto hover:text-giro-vermelho" onClick={() => setIsOpen(false)}>
            Participar
          </Link>
          <Link href="/oportunidades" className="text-giro-texto hover:text-giro-vermelho" onClick={() => setIsOpen(false)}>
            Oportunidades
          </Link>
          <Link href="/mapa" className="text-giro-texto hover:text-giro-vermelho" onClick={() => setIsOpen(false)}>
            Mapa
          </Link>
          <Link href="/privacidade" className="text-giro-texto hover:text-giro-vermelho" onClick={() => setIsOpen(false)}>
            Privacidade
          </Link>
        </div>
      </nav>
    </header>
  )
}
