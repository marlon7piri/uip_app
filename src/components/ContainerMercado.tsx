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
      <BreadCrum titulo='Mercado' url='/home/mercado/transferencia' />


      <div className='flex gap-4 p-4'>
        <MercadoTable rows={jugadores} />
        <ContainerInfoPlayerMercado />
      </div>
    </div>
  )
}
