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
  const { loading } = useTorneos()






  return (
    <ContenedorCustom>

      <BreadCrum titulo='Torneos' url='/torneos/nuevo' labelBtn='Crear Torneo' />

      {loading ? <Spinner/> : <div className='flex justify-center items-center gap-6'>
        {torneos?.map((e) => {
          return <CardTorneos torneo={e} key={e?._id} />
        })}
      </div>}




    </ContenedorCustom>
  )
}

export default ContainerTorneos