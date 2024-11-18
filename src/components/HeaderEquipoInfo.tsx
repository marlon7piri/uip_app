import { Equipos } from '@/infraestrcuture/entities/equipos'
import React from 'react'
import { Title } from './Title'
import Image from 'next/image'


interface Props {
  equipo: Equipos
}
const HeaderEquipoInfo = ({ equipo }: Props) => {
  return (
    <div className='w-full bg-slate-50 p-4 mb-10'>
      <div className='flex justify-start items-center gap-4'>
        <Image src={equipo?.logo} width={50} height={50} alt={equipo?.nombre}
          className='rounded-full'
        />
        <Title content={equipo?.nombre} size='text-3xl' color='text-slate-900' />
      </div>
    </div>
  )
}

export default HeaderEquipoInfo