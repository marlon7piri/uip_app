'use client'
import { logoutAuth } from '@/actions/auth-login'
import Logout from '@mui/icons-material/Logout'
import Person from '@mui/icons-material/Person'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSessionAuth } from './hooks/useSessionAuth'
import Image from 'next/image'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import { usePathname } from 'next/navigation'

const NavBar2 = () => {
  const { session } = useSessionAuth()
  const [open, setOpen] = useState(false)
  const [scroll, setScroll] = useState(0)
  const pathname = usePathname()

  const toggleMenu = () => {
    setOpen(prev => !prev)
  }

  useEffect(() => {
    if (open) toggleMenu()
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="w-full fixed top-0 z-50 shadow-md">
      <nav
        className={`transition-all duration-300 px-4 md:px-8 lg:px-16 py-3 flex items-center justify-between bg-white/90 backdrop-blur-md ${scroll > 10 ? 'shadow-lg' : ''
          }`}
      >
        {/* Logo + saludo */}
        <div className="flex items-center gap-2">
          <Image
            src={require('../../public/imagenes/logouipApp.png')}
            alt="logo"
            width={50}
            height={40}
            className="object-cover"
          />
          {session?.user?.name && (
            <span className="text-red-500 uppercase font-bold text-sm drop-shadow-sm">
              Hola 👋 {session.user.name}
            </span>
          )}
        </div>

        {/* Desktop Links */}
        <ul className="hidden lg:flex gap-6 items-center text-slate-800 font-medium">
          <Link href="/canchas" className="hover:text-sky-500 transition">Canchas</Link>
          <Link href="/noticias" className="hover:text-sky-500 transition">Noticias</Link>
          <Link href="/ligas" className="hover:text-sky-500 transition">Grupos</Link>
          <Link href="/equipos" className="hover:text-sky-500 transition">Equipos</Link>
          <Link href="/mercado" className="hover:text-sky-500 transition">Jugadores</Link>
        </ul>

        {/* User buttons (desktop) */}
        <div className="hidden lg:flex gap-3 items-center">
          <Link
            href="/perfil"
            className="bg-slate-900 p-2 rounded-full hover:shadow-md hover:shadow-white"
          >
            <Person className="text-white" />
          </Link>
          <button
            onClick={logoutAuth}
            className="bg-slate-900 p-2 rounded-full hover:shadow-md hover:shadow-white"
          >
            <Logout className="text-white" />
          </button>
        </div>

        {/* Mobile menu toggle button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-slate-900"
          aria-label="Toggle menu"
        >
          {!open ? (
            <MenuRoundedIcon fontSize="large" />
          ) : (
            <CloseRoundedIcon fontSize="large" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white text-slate-800 shadow-md p-6 space-y-4">
          <ul className="flex flex-col gap-4 text-lg font-semibold">
            <Link href="/canchas" onClick={toggleMenu}>Canchas</Link>
            <Link href="/noticias" onClick={toggleMenu}>Noticias</Link>
            <Link href="/ligas" onClick={toggleMenu}>Grupos</Link>
            <Link href="/equipos" onClick={toggleMenu}>Equipos</Link>
            <Link href="/mercado" onClick={toggleMenu}>Jugadores</Link>
          </ul>

          <div className="flex gap-4 mt-4">
            <Link
              href="/perfil"
              onClick={toggleMenu}
              className="bg-slate-900 p-2 rounded-full hover:shadow-md hover:shadow-white"
            >
              <Person className="text-white" />
            </Link>
            <button
              onClick={() => {
                toggleMenu()
                logoutAuth()
              }}
              className="bg-slate-900 p-2 rounded-full hover:shadow-md hover:shadow-white"
            >
              <Logout className="text-white" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default NavBar2
