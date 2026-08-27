'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-giro-branco border-b border-giro-borda h-[72px] flex items-center">
      <nav className="w-full max-w-[1180px] mx-auto px-4 flex items-center justify-between h-full">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="w-10 h-10 bg-giro-vermelho rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">G</span>
          </div>
          <span className="font-bold text-lg text-giro-grafite hidden sm:inline whitespace-nowrap">Giro AÍ</span>
        </Link>

        {/* Menu toggle mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-giro-grafite ml-auto"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation */}
        <div className={`${isOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row gap-8 absolute md:static top-[72px] left-0 right-0 bg-giro-branco md:bg-transparent p-4 md:p-0 border-b md:border-0 border-giro-borda z-40 md:z-auto md:ml-auto`}>
          <Link
            href="/#como-funciona"
            className="text-giro-texto-sec hover:text-giro-vermelho transition font-medium"
            onClick={() => setIsOpen(false)}
          >
            Como funciona
          </Link>
          <Link
            href="/oportunidades"
            className="text-giro-texto-sec hover:text-giro-vermelho transition font-medium"
            onClick={() => setIsOpen(false)}
          >
            Oportunidades
          </Link>
          <Link
            href="/cadastrar-estoque"
            className="text-giro-texto-sec hover:text-giro-vermelho transition font-medium"
            onClick={() => setIsOpen(false)}
          >
            Cadastrar estoque
          </Link>
        </div>

        {/* CTA Button */}
        <Link
          href="/oportunidades"
          className="hidden md:block ml-8 px-6 py-2.5 bg-giro-vermelho text-white rounded-lg font-semibold hover:bg-opacity-90 transition text-sm flex-shrink-0 whitespace-nowrap"
        >
          Explorar oportunidades
        </Link>
      </nav>
    </header>
  )
}
