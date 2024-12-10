import BreadCrum from '@/components/BreadCrum'
import { ContainerMercado } from '@/components/ContainerMercado'
import { Title } from '@/components/Title'
import React from 'react'

const Mercado = () => {
  return (
    <div>

      <BreadCrum titulo='Mercado'  labelBtn='Nuevo Jugador' url='/home/jugadores/nuevo' />
      <ContainerMercado />

    </div>
  )
}

export default Mercado