'use client'
import React from 'react'
import BreadCrum from './BreadCrum'
import { useOfertas } from './hooks/useOfertas'
import CardNoticias from './CardNoticias'
import ContenedorCustom from './ContenedorCustom'
import { Title } from './Title'

const ContainerNoticias = () => {
  const { ofertas } = useOfertas()

  return (
    <ContenedorCustom >
      <Title content='Noticias' size='text-6xl'/>

      <div className='p-4'>
        {
          ofertas.map((e) => {
            return <CardNoticias ofertas={e} key={e._id} />
          })
        }
      </div>


    </ContenedorCustom>
  )
}

export default ContainerNoticias