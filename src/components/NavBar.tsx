'use client'
import { logoutAuth } from '@/actions/auth-login'
import Logout from '@mui/icons-material/Logout';
import Person from '@mui/icons-material/Person';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSessionAuth } from './hooks/useSessionAuth'
import { IconButton, Tooltip } from '@mui/material';
import Image from 'next/image';
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
    <div className='w-screen overflow-hidden'>
      <nav className={`${scroll < 10 ? "nav_container" : "nav_container_bajando"}`}>


        <ul className="menu">
          <div className='flex gap-1 justify-center items-center '>
            <Image src={require('../../public/imagenes/logouipApp.png')} alt='logo' width={60} height={40} className='object-cover' />
            <span className=' text-red-500 uppercase font-bold  drop-shadow-[0_0_2px_black]'>Hola 👋 {session?.user?.name}</span>

          </div>

          <div className="menu_links">
            {/*  <Link href={'/torneos'} className='text-[18px] text-slate-50 hover:text-blue-900 hover:underline font-semibold transition duration-500'>Torneos</Link> */}
            <Link href={'/noticias'} className='text-[18px]  hover:text-sky-500  font-semibold transition duration-500'>Noticias</Link>
            <Link href={'/ligas'} className='text-[18px]  hover:text-sky-500  font-semibold transition duration-500'>Grupos</Link>
            <Link href={'/equipos'} className='text-[18px]  hover:text-sky-500  font-semibold transition duration-500'>Equipos</Link>
            <Link href={'/mercado'} className='text-[18px]  hover:text-sky-500  font-semibold transition duration-500'>Jugadores</Link>
          </div>

         <div className='flex gap-4 justify-center items-center '>
         <Link href={'/perfil'} className=' bg-slate-900 shadow-sm hover:bg-slate-900 hover:shadow-white hover:shadow-md   shadow-white p-2 rounded-full transition duration-500'><Person style={{ color: 'white' }} className='text-md  lg:text-slate-50 font-semibold ' /></Link> 
         <IconButton onClick={logoutAuth} className='bg-slate-900 shadow-sm hover:bg-slate-900 hover:shadow-md  hover:shadow-white  shadow-white  p-2 rounded-full transition duration-500'><Logout style={{ color: 'white' }} className='text-md  lg:text-slate-50 font-semibold ' /></IconButton>
         </div>


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