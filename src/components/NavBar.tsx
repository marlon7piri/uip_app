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
  const [scroll, setScroll] = useState(0)
  const pathname = usePathname()


  const handlerMenu = () => {
    document.querySelector(".menu")?.classList.toggle("show")
    setOpen(!open)
  }

  useEffect(() => {
    if (open) {
      handlerMenu()

    }
  }, [pathname])

  useEffect(() => {
    document.addEventListener('scroll', () => {

      let scrolly = scrollY
      setScroll(scrolly)
    })
  }, [])

  return (
    <div className='w-screen'>
      <nav className={`${scroll < 10 ? "nav_container" : "nav_container_bajando"}`}>


        <ul className="menu">
          <div className='flex gap-1 justify-center items-center '>
            <Image src={require('../../public/imagenes/logouipApp.png')} alt='logo' width={60} height={40} className='object-cover' />
            <span className=' text-red-500 uppercase font-bold  drop-shadow-[0_0_2px_black]'>Hola 👋 {session?.user?.name}</span>

          </div>

          <div className="menu_links">
            {/*  <Link href={'/torneos'} className='text-[18px] text-slate-50 hover:text-blue-900 hover:underline font-semibold transition duration-500'>Torneos</Link> */}
            <Link href={'/ligas'} className='text-[18px]  hover:text-blue-900 hover:underline font-semibold transition duration-500'>Grupos</Link>
            <Link href={'/equipos'} className='text-[18px]  hover:text-blue-900 hover:underline font-semibold transition duration-500'>Equipos</Link>
            <Link href={'/mercado'} className='text-[18px]  hover:text-blue-900 hover:underline font-semibold transition duration-500'>Jugadores</Link>
            <Link href={'/noticias'} className='text-[18px]  hover:text-blue-900 hover:underline font-semibold transition duration-500'>Noticias</Link>
          </div>

          <IconButton onClick={logoutAuth} className='w-10 h-10  hover:bg-sky-500 rounded-full p-2 transition-colors duration-500'><Tooltip title='Cerrar sesión'><Logout style={{ color: 'white' }} /></Tooltip></IconButton>


        </ul>
        <div className="menu_botton">
          {!open ? <MenuRoundedIcon onClick={() => handlerMenu()} className='text-[78px]  mt-2' /> :
            <CloseRoundedIcon onClick={() => handlerMenu()} className=' text-[78px]   mt-2' />}

        </div>
      </nav>
    </div>


  )
}

export default NavBar