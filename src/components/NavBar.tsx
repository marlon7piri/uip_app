'use client'
import { logoutAuth } from '@/actions/auth-login'
import Logout from '@mui/icons-material/Logout';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSessionAuth } from './hooks/useSessionAuth'
import { IconButton, Tooltip } from '@mui/material';
import Image from 'next/image';
import styles from './navbar.module.css'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const { session } = useSessionAuth()
  const [open, setOpen] = useState(false)
  const pathname = usePathname()


  const handlerMenu = () => {
    setOpen(!open)
  }

  useEffect(() => {
    if (open) {
      handlerMenu()

    }
  }, [pathname])

  return (

    <div className='relative w-full'>
      <ul className={!open ? styles.listaContainer : styles.showMenu}>
        <div className={styles.containerLogo}>
          <Image src={require('../../public/imagenes/logouipApp.png')} alt='logo' width={60} height={40} className='object-cover' />
          <span className='text-sky-50 uppercase'>Hola 👋 {session?.user?.name}</span>

        </div>

        <div className={styles.ulContainer}>
          <Link href={'/torneos'} className='text-[18px] text-sky-50 hover:text-blue-900 hover:underline font-semibold transition duration-500'>Torneos</Link>
          <Link href={'/ligas'} className='text-[18px] text-sky-50 hover:text-blue-900 hover:underline font-semibold transition duration-500'>Ligas</Link>
          <Link href={'/equipos'} className='text-[18px] text-sky-50 hover:text-blue-900 hover:underline font-semibold transition duration-500'>Equipos</Link>
          <Link href={'/mercado'} className='text-[18px] text-sky-50 hover:text-blue-900 hover:underline font-semibold transition duration-500'>Mercado</Link>
          <Link href={'/noticias'} className='text-[18px] text-sky-50 hover:text-blue-900 hover:underline font-semibold transition duration-500'>Noticias</Link>
        </div>

        <IconButton onClick={logoutAuth} className='w-10 h-10 text-sky-50 hover:bg-slate-900 rounded-full p-2 transition-colors duration-500'><Tooltip title='Cerrar sesión'><Logout style={{ color: '#f0f9ff' }} /></Tooltip></IconButton>


      </ul>
      <div className={styles.hamburguerBoottom}>
        {!open ? <MenuRoundedIcon onClick={() => handlerMenu()} className='w-16 h-16 text-slate-900 ' /> :
          <CloseRoundedIcon onClick={() => handlerMenu()} className='w-16 h-16 text-slate-900  ' />}

      </div>
    </div>

  )
}

export default NavBar