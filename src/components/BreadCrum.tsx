'use client'
import React from 'react'
import { Title } from './Title'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

interface Props {
  titulo: string,
  url: string
}
const BreadCrum = ({ titulo, url }: Props) => {
  const { data: session } = useSession()
  return (
    <div className='flex justify-between items-center p-4'>
      <Title content={titulo} size='text-6xl' />
      {session?.rol === 'admin' && <Link href={url} className='bg-slate-50 p-2 rounded-md hover:bg-slate-900 hover:text-slate-50 transition duration-500'>Nuevo</Link>}
    </div>
  )
}

export default BreadCrum