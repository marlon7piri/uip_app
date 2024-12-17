import { auth } from '@/auth'
import ContainerEquipos from '@/components/ContainerEquipos'
import * as UseCases from "../../../config/core/use-cases";

import React from 'react'
import { fetcherDb } from '@/config/adapters/apiDbAdapter';


const getEquipos = async (session) => {
  try {
  const res = await UseCases.getEquiposUseCases(fetcherDb, session?.token);
  return res
  } catch (error) {
    throw new Error('Error obteniendo los equipos')
  }
  
};

const Equipos = async() => {
  const session = await auth()
  const equipos = await getEquipos(session)


  return (
    <div className='min-h-screen'>
      <ContainerEquipos equipos={equipos} />
     

    </div>
  )
}

export default Equipos