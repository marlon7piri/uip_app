'use client'
import BreadCrum from '@/components/BreadCrum'
import { ContainerMercado } from '@/components/ContainerMercado'
import { Title } from '@/components/Title'
import { useSession } from 'next-auth/react'
import React from 'react'

const Mercado =  () => {
  const {data:session} = useSession()
  

  return (
    <div>
      <BreadCrum titulo='Mercado' labelBtn='Nuevo Jugador' url='/jugadores/nuevo' />
      <ContainerMercado />

    </div>
  )
}

export default Mercado