'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import { Title } from './Title'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import './botonlink.css'
import { getSession } from '@/actions/get-session'

interface Props {
  titulo: string,
  url?: string,
  labelBtn: string,
  isLink?: boolean,
  onClick?: () => void,
}
const BreadCrum = ({ titulo, url, labelBtn = 'Nuevo', isLink = true, onClick }: Props) => {
  const [session, setSession] = useState()
  const isPremium = session && session?.plan !== "free"

  useEffect(() => {

    const loadSession = async () => {
      const data = await getSession()
      setSession(data)
    }
    loadSession()
  }, [])

  const renderItem = () => {

    return (
      isLink ? <Link href={url} className='btn_link'>{labelBtn}</Link> : <button onClick={onClick} className='btn_link'>{labelBtn}</button>
    )

  }

 


  return (
    <div className='container_breadcrum p-4'>
      <Title content={titulo} size='text-6xl' />
      {isPremium && renderItem()}
    </div>
  )
}

export default BreadCrum