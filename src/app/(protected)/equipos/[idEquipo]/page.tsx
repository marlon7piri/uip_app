'use client'
import ContenedorCustom from '@/components/ContenedorCustom'
import HeaderEquipoInfo from '@/components/HeaderEquipoInfo'
import { useJugador } from '@/components/hooks/useJugador'
import JugadoresEquiposTable from '@/components/tables/JugadoresEquiposTable'
import { Title } from '@/components/Title'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import styles from './equipodetalle.module.css'
import Spinner from '@/components/Spinner'

const EquipoInfo = () => {

  const { getJugadoresByEquipos, jugadoresByEquipos, equipoDelJugador } = useJugador()
  const params = useParams()


  useEffect(() => {
    getJugadoresByEquipos(params?.idEquipo)
  }, [params?.idEquipo])

  if (!equipoDelJugador || !jugadoresByEquipos) {
    return <Spinner />
  }

  return (
    <div className={styles.container}>

      {equipoDelJugador && <HeaderEquipoInfo equipo={equipoDelJugador} />}
      <Title content='Jugadores' size='text-3xl' />
      {jugadoresByEquipos && <JugadoresEquiposTable rows={jugadoresByEquipos} />}


    </div>
  )
}

export default EquipoInfo