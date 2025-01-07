'use client'
import React from 'react'
import { Title } from './Title'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import './botonlink.css'

interface Props {
  titulo: string,
  url: string,
  labelBtn: string
}
const BreadCrum = ({ titulo, url,labelBtn ='Nuevo'}: Props) => {
  const { data: session } = useSession()
  return (
    <div className='flex justify-between items-center p-4'>
      <Title content={titulo} size='text-6xl' />
      {session?.rol === 'admin' && <Link href={url} className='btn_link'>{labelBtn}</Link>}
    </div>
  )
}

export default BreadCrum