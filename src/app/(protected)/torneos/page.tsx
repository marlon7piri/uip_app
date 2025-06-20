'use client'
import BreadCrum from '@/components/BreadCrum'
import ContenedorCustom from '@/components/ContenedorCustom'
import { useGrupos } from '@/components/hooks/useGrupos'
import { GrupoData } from '@/infraestrcuture/entities/grupos'
import React from 'react'

const Torneos = () => {
  const { grupos } = useGrupos()


  return (
    <ContenedorCustom>

      <BreadCrum titulo='Torneos' labelBtn='Crear Torneo' url='/torneos/nueva' />

      {
        grupos?.map((item) => <CardGrupos item={item} key={item._id} />)
      }
    </ContenedorCustom>
  )
}

export default Torneos



interface Props {
  item: GrupoData
}
const CardGrupos = ({ item }: Props) => {
  return (
    <div className='w-[250px] h-[250px] bg-slate-50 text-slate-900 rounded-md p-4 text-center'>
      <h1>{item.nombre}</h1>
    </div>
  )
}