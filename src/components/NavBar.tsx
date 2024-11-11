'use client'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  const { data: session } = useSession()
  return (
    <ul className='flex gap-4 justify-between text-2xl p-2'>
      <div>
        <span>BEBELAPP</span>
      </div>
      <div>
        <span>Benvenido {session?.user?.name}</span>
      </div>
      <div className='flex gap-2'>
        <Link href={'/home/torneos'} className='hover:text-slate-50 transition duration-500'>Torneos</Link>
        <Link href={'/home/equipos'} className='hover:text-slate-50 transition duration-500'>Equipos</Link>
        <Link href={'/home/mercado'} className='hover:text-slate-50 transition duration-500'>Mercado</Link>
        <Link href={'/home/noticias'} className='hover:text-slate-50 transition duration-500'>Noticias</Link>
      </div>

      <button onClick={() => signOut({ callbackUrl: '/auth/login', redirect: true })}>Logout</button>
    </ul>
  )
}

export default NavBar