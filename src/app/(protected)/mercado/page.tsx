'use client'
import { getSession } from '@/actions/get-session'
import BreadCrum from '@/components/BreadCrum'
import { ContainerMercado } from '@/components/ContainerMercado'
import { useSessionAuth } from '@/components/hooks/useSessionAuth'
import React, { useEffect, useState } from 'react'

const Mercado =  () => {
 
  
  

  return (
    <div>
      <BreadCrum titulo='Mercado' labelBtn='Nuevo Jugador' url='/jugadores/nuevo' />
      <ContainerMercado />

    </div>
  )
}

export default Mercado