import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <ul className='flex gap-4 justify-center text-2xl'>
      <Link href={'/home/torneos'}>Torneos</Link>
      <Link href={'/home/equipos'}>Equipos</Link>
      <Link href={'/home/mercado'}>Mercado</Link>
      <Link href={'/home/noticias'}>Noticias</Link>
    </ul>
  )
}

export default NavBar