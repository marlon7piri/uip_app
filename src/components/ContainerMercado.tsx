'use client'
import React from 'react'
import BreadCrum from './BreadCrum'
import MercadoTable from './tables/MercadoTable'
import { useJugador } from './hooks/useJugador'
import ContainerInfoPlayerMercado from './ContainerInfoPlayerMercado'

export const ContainerMercado = () => {
  const { jugadores } = useJugador()
  return (
    <div className='h-screen'>


      <div className='flex gap-4 p-4 mt-20'>
        <MercadoTable rows={jugadores} />
        <ContainerInfoPlayerMercado />
      </div>
    </div>
  )
}
