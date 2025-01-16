import React from 'react'
import BreadCrum from './BreadCrum'
import CardTorneos from './CardTorneos'
import ContenedorCustom from './ContenedorCustom'
import { Torneos } from '@/infraestrcuture/entities/torneos';
import { useTorneos } from './hooks/useTorneos';
import Spinner from './Spinner';




interface Props {
  torneos: Torneos[]
}

const ContainerTorneos = ({ torneos }: Props) => {






  return (
    <ContenedorCustom>

      <BreadCrum titulo='Ligas' url='/ligas/nuevo' labelBtn='Crear Liga' />

      <div className='w-full h-full flex  flex-wrap justify-center items-center gap-6'>
        {torneos?.map((e) => {
          return <CardTorneos torneo={e} key={e?._id} />
        })}
      </div>




    </ContenedorCustom>
  )
}

export default ContainerTorneos