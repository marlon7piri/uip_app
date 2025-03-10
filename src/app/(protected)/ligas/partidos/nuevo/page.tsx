'use client'
import { getSession } from '@/actions/get-session'
import FormPartido from '@/components/forms/FormPartido'
import { Title } from '@/components/Title'
import { fetcherDb } from '@/config/adapters/apiDbAdapter'
import * as UseCases from '@/config/core/use-cases'
import { Torneos } from '@/infraestrcuture/entities/torneos'
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import styles from './style.module.css'
const NuevoEquipo = () => {

  const search = useSearchParams()
  const params = search.get('idTorneo')


  const [equiposParticipantes, setEquiposParticipantes] = useState<Torneos[]>([])




  useEffect(() => {



    const getEquiposRegistrados = async () => {
      const session = await getSession()

      const res = await UseCases.getEquiposRegistrados(fetcherDb, session?.token, params);

      setEquiposParticipantes(res.torneo_especifico);


    };
    getEquiposRegistrados()
  }, [])

  return (
    <div className={styles.container}>
      <Title content='Nuevo Partido' size='text-4xl' />

      <div className='flex justify-center items-center p-4'>
        <FormPartido equiposParticipantes={equiposParticipantes} />

      </div>

    </div>
  )
}

export default NuevoEquipo