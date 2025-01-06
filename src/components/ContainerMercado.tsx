'use client'
import React, { useEffect, useState } from 'react'
import MercadoTable from './tables/MercadoTable'
import { useJugador } from './hooks/useJugador'
import ContainerInfoPlayerMercado from './ContainerInfoPlayerMercado'
import ContenedorCustom from './ContenedorCustom'
import Spinner from './Spinner'





export const ContainerMercado = () => {
  const { jugadores,loading } = useJugador() 
 

  return (
    <ContenedorCustom >


     {loading ? <Spinner/> : <div className='flex gap-4 '>
        <MercadoTable rows={jugadores} />
        <ContainerInfoPlayerMercado />
      </div>}
    </ContenedorCustom>
  )
}



