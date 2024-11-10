import React from 'react'
import { Title } from './Title'
import { proximosPartidos } from '@/utils/teams'
import CardProximosPartidos from './CardProximosPartidos'
import BreadCrum from './BreadCrum'

const ContainerTorneos = () => {
  return (
    <div>
      <BreadCrum titulo='Torneos' url='/home/torneos/nuevo' />


      {proximosPartidos.map((e) => {
        return <CardProximosPartidos equipos={e} key={e.nombre} />
      })}
    </div>
  )
}

export default ContainerTorneos