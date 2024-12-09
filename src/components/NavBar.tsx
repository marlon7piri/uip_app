'use client'
import { logoutAuth } from '@/actions/auth-login'
import { signOut } from '@/auth'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  const { data: session } = useSession()



  
  return (
    <ul className='flex gap-4 justify-between text-2xl p-2 bg-slate-50'>
      <div>
        <span>PlayAndEnjoy</span>
      </div>
      <div>
        <span>Beinvenid@ {session?.user?.name}</span>
      </div>
      <div className='flex gap-2'>
        <Link href={'/home/torneos'} className='hover:text-sky-900 transition duration-500'>Torneos</Link>
        <Link href={'/home/equipos'} className='hover:text-sky-900 transition duration-500'>Equipos</Link>
        <Link href={'/home/mercado'} className='hover:text-sky-900 transition duration-500'>Mercado</Link>
        <Link href={'/home/noticias'} className='hover:text-sky-900 transition duration-500'>Noticias</Link>
      </div>

      <button onClick={logoutAuth}>Logout</button>
    </ul>
  )
}

export default NavBar