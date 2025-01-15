'use client'
import { logoutAuth } from '@/actions/auth-login'
import Logout from '@mui/icons-material/Logout';
import Link from 'next/link'
import React from 'react'
import { useSessionAuth } from './hooks/useSessionAuth'
import { IconButton, Tooltip } from '@mui/material';
import Image from 'next/image';
import { LogouButton } from '@/actions/LogouButton';

const NavBar = () => {
  const { session } = useSessionAuth()



  return (
    <ul className='w-full flex gap-4 justify-between items-center text-2xl p-2 bg-gradient-to-r from-slate-900 to-sky-500 shadow-inner shadow-slate-900 sticky top-0 z-50'>
      <div className='flex gap-2 justify-center items-center'>
        <Image src={require('../../public/imagenes/logouipApp.png')} alt='logo' width={60} height={40} className='object-cover' />
        <span className='text-sky-50 uppercase'>Hola 👋 {session?.user?.name}</span>

      </div>
      
      <div className='flex gap-2 justify-center items-center'>
        <Link href={'/torneos'} className='text-[18px] text-sky-50 hover:text-blue-900 hover:underline font-semibold transition duration-500'>Torneos</Link>
        <Link href={'/equipos'} className='text-[18px] text-sky-50 hover:text-blue-900 hover:underline font-semibold transition duration-500'>Equipos</Link>
        <Link href={'/mercado'} className='text-[18px] text-sky-50 hover:text-blue-900 hover:underline font-semibold transition duration-500'>Mercado</Link>
        <Link href={'/noticias'} className='text-[18px] text-sky-50 hover:text-blue-900 hover:underline font-semibold transition duration-500'>Noticias</Link>
      </div>

      <IconButton onClick={logoutAuth} className='w-10 h-10 text-sky-50 hover:bg-slate-900 rounded-full p-2 transition-colors duration-500'><Tooltip title='Cerrar sesión'><Logout style={{ color: '#f0f9ff' }} /></Tooltip></IconButton>
    </ul>
  )
}

export default NavBar