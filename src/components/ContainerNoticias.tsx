'use client'
import React from 'react'
import { useNoticias } from './hooks/useNoticias'
import CardNoticias from './CardNoticias'
import ContenedorCustom from './ContenedorCustom'
import { Title } from './Title'
import BreadCrum from './BreadCrum'

const ContainerNoticias = () => {
  const { noticias } = useNoticias()

  return (
    <div className='pt-24 px-4'>
      <BreadCrum titulo='Noticias' url='/noticias/new' labelBtn='Crear Noticia' />

      <div className='p-4 flex flex-col gap-10'>
        {
          noticias.map((e) => {
            return <CardNoticias noticias={e} key={e._id} />
          })
        }
      </div>


    </div>
  )
}

export default ContainerNoticias