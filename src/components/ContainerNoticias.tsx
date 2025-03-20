'use client'
import React from 'react'
import { useNoticias } from './hooks/useNoticias'
import CardNoticias from './CardNoticias'
import ContenedorCustom from './ContenedorCustom'
import { Title } from './Title'
import BreadCrum from './BreadCrum'
import Spinner from './Spinner'

const ContainerNoticias = () => {
  const { noticias, loading } = useNoticias()


  if (loading) {
    return <Spinner />
  }

  if(!noticias){
    return <h1 className='text-4xl text-slate-50'>No hay Noticias</h1>
  }
  
  return (
    <div className='pt-24 px-4'>
      <BreadCrum titulo='Noticias' url='/noticias/new' labelBtn='Crear Noticia' />

      <div className='p-4 flex flex-col gap-10 mt-8'>
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