'use client'
import { logoutAuth } from '@/actions/auth-login'
import Logout from '@mui/icons-material/Logout';
import Link from 'next/link'
import React, { useState } from 'react'
import { useSessionAuth } from './hooks/useSessionAuth'
import { IconButton, Tooltip } from '@mui/material';
import Image from 'next/image';
import styles from './navbar.module.css'
import MenuIcon from '@mui/icons-material/Menu';

const NavBar = () => {
  const { session } = useSessionAuth()
  const [open, setOpen] = useState(false)


  const handlerMenu = () => {
    setOpen(!open)
    console.log('open')
  }

  return (

    <div className='relative w-full'>
      <ul className={!open ? styles.listaContainer : styles.showMenu}>
        <div className={styles.containerLogo}>
          <Image src={require('../../public/imagenes/logouipApp.png')} alt='logo' width={60} height={40} className='object-cover' />
          <span className='text-sky-50 uppercase'>Hola 👋 {session?.user?.name}</span>

        </div>

        <div className={styles.ulContainer}>
          <Link href={'/torneos'} className='text-[18px] text-sky-50 hover:text-blue-900 hover:underline font-semibold transition duration-500'>Torneos</Link>
          <Link href={'/equipos'} className='text-[18px] text-sky-50 hover:text-blue-900 hover:underline font-semibold transition duration-500'>Equipos</Link>
          <Link href={'/mercado'} className='text-[18px] text-sky-50 hover:text-blue-900 hover:underline font-semibold transition duration-500'>Mercado</Link>
          <Link href={'/noticias'} className='text-[18px] text-sky-50 hover:text-blue-900 hover:underline font-semibold transition duration-500'>Noticias</Link>
        </div>

        <IconButton onClick={logoutAuth} className='w-10 h-10 text-sky-50 hover:bg-slate-900 rounded-full p-2 transition-colors duration-500'><Tooltip title='Cerrar sesión'><Logout style={{ color: '#f0f9ff' }} /></Tooltip></IconButton>


      </ul>
      <div className={styles.hamburguerBoottom}>
        <MenuIcon onClick={()=>handlerMenu()} className='w-18 h-18 text-sky-50 hover:bg-slate-900 rounded-full p-2 transition-colors duration-500' />

      </div>
    </div>

  )
}

export default NavBar