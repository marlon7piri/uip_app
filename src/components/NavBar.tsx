'use client'
import { logoutAuth } from '@/actions/auth-login'
import Logout from '@mui/icons-material/Logout';
import Link from 'next/link'
import React from 'react'
import { useSessionAuth } from './hooks/useSessionAuth'
import { IconButton, Tooltip } from '@mui/material';
import Image from 'next/image';

const NavBar = () => {
  const { session }= useSessionAuth()



  return (
    <ul className='flex gap-4 justify-between items-center text-2xl p-2 bg-slate-900'>
      <div className='flex gap-2 justify-center items-center'>
        <Image src={require('../../public/imagenes/logouipApp.png')} alt='logo' width={60} height={40} className='object-cover'/>
      <span className='text-sky-50'>Bienvenid@ {session?.user?.name}</span>

      </div>
      <div>
      </div>
      <div className='flex gap-2 justify-center items-center'>
        <Link href={'/torneos'} className='text-[18px] text-sky-50 hover:text-sky-500 transition duration-500'>Torneos</Link>
        <Link href={'/equipos'} className='text-[18px] text-sky-50 hover:text-sky-500 transition duration-500'>Equipos</Link>
        <Link href={'/mercado'} className='text-[18px] text-sky-50 hover:text-sky-500 transition duration-500'>Mercado</Link>
        <Link href={'/noticias'} className='text-[18px] text-sky-50 hover:text-sky-500 transition duration-500'>Noticias</Link>
      </div>

      <IconButton onClick={logoutAuth} className='w-10 h-10 text-sky-50 hover:bg-slate-500 rounded-full p-2'><Tooltip title='Cerrar sesión'><Logout  style={{color:'#f0f9ff'}}/></Tooltip></IconButton>
    </ul>
  )
}

export default NavBar