'use client'
import React from 'react'
import BreadCrum from './BreadCrum'
import { useOfertas } from './hooks/useOfertas'
import CardNoticias from './CardNoticias'

const ContainerNoticias = () => {
  const { ofertas } = useOfertas()

  return (
    <div className='min-h-screen'>
      <BreadCrum titulo='Noticias' url='/home/noticias/nueva' />

      <div className='p-4'>
        {
          ofertas.map((e) => {
            return <CardNoticias ofertas={e} key={e._id} />
          })
        }
      </div>


    </div>
  )
}

export default ContainerNoticias