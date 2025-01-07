'use client'
import React, { useEffect, useState } from 'react'
import MercadoTable from './tables/MercadoTable'
import { useJugador } from './hooks/useJugador'
import ContainerInfoPlayerMercado from './ContainerInfoPlayerMercado'
import ContenedorCustom from './ContenedorCustom'





export const ContainerMercado = () => {
  const { jugadores } = useJugador() 
 

  return (
    <ContenedorCustom >


     <div className='flex gap-4 relative'>
        <MercadoTable rows={jugadores} />
        <ContainerInfoPlayerMercado />
      </div>
    </ContenedorCustom>
  )
}



