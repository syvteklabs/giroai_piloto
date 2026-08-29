'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-giro-borda shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition no-underline">
          <Image
            src="https://images.giroaihub.com/logo-giroai.png"
            alt="Giro AÍ"
            width={220}
            height={65}
            className="object-contain"
          />
          <div className="hidden sm:flex flex-col">
            <span className="font-bold text-lg text-giro-grafite leading-tight">Giro AÍ</span>
            <span className="text-xs text-giro-texto-sec font-medium">Estoque que gira</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/participar" className="text-giro-texto font-medium hover:text-giro-vermelho transition duration-200 no-underline">
            Participar
          </Link>
          <Link href="/oportunidades" className="text-giro-texto font-medium hover:text-giro-vermelho transition duration-200 no-underline">
            Oportunidades
          </Link>
          <Link href="/mapa" className="text-giro-texto font-medium hover:text-giro-vermelho transition duration-200 no-underline">
            Mapa
          </Link>
          <Link href="/privacidade" className="text-giro-texto font-medium hover:text-giro-vermelho transition duration-200 no-underline">
            Privacidade
          </Link>
          <Link
            href="/participar"
            className="px-6 py-2 bg-giro-vermelho text-white rounded-lg font-semibold hover:bg-giro-vermelho/90 transition no-underline"
          >
            Começar
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-giro-grafite hover:text-giro-vermelho transition"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-giro-borda shadow-lg md:hidden">
            <div className="flex flex-col p-4 gap-4 max-w-6xl mx-auto w-full">
              <Link
                href="/participar"
                className="text-giro-texto font-medium hover:text-giro-vermelho transition py-2 no-underline"
                onClick={() => setIsOpen(false)}
              >
                Participar
              </Link>
              <Link
                href="/oportunidades"
                className="text-giro-texto font-medium hover:text-giro-vermelho transition py-2 no-underline"
                onClick={() => setIsOpen(false)}
              >
                Oportunidades
              </Link>
              <Link
                href="/mapa"
                className="text-giro-texto font-medium hover:text-giro-vermelho transition py-2 no-underline"
                onClick={() => setIsOpen(false)}
              >
                Mapa
              </Link>
              <Link
                href="/privacidade"
                className="text-giro-texto font-medium hover:text-giro-vermelho transition py-2 no-underline"
                onClick={() => setIsOpen(false)}
              >
                Privacidade
              </Link>
              <Link
                href="/participar"
                className="px-6 py-2 bg-giro-vermelho text-white rounded-lg font-semibold hover:bg-giro-vermelho/90 transition text-center no-underline"
                onClick={() => setIsOpen(false)}
              >
                Começar
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
