'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { GiroLogo } from './logo'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-giro-branco border-b border-giro-borda">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <GiroLogo size={40} />
          <span className="font-bold text-lg text-giro-grafite hidden sm:inline">Giro AÍ</span>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-giro-grafite"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row gap-4 absolute md:static top-16 left-0 right-0 bg-giro-branco md:bg-transparent p-4 md:p-0 border-b md:border-0 border-giro-borda`}>
          <Link href="/#como-funciona" className="text-giro-texto hover:text-giro-vermelho">
            Como funciona
          </Link>
          <Link href="/oportunidades" className="text-giro-texto hover:text-giro-vermelho">
            Oportunidades
          </Link>
          <Link href="/mapa" className="text-giro-texto hover:text-giro-vermelho">
            Mapa ao vivo
          </Link>
          <Link href="/participar" className="text-giro-texto hover:text-giro-vermelho">
            Participar
          </Link>
        </div>
      </nav>
    </header>
  )
}
