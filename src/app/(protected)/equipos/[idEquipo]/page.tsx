'use client'
import ContenedorCustom from '@/components/ContenedorCustom'
import HeaderEquipoInfo from '@/components/HeaderEquipoInfo'
import { useJugador } from '@/components/hooks/useJugador'
import JugadoresEquiposTable from '@/components/tables/JugadoresEquiposTable'
import { Title } from '@/components/Title'
import { Typography } from '@mui/material'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

const EquipoInfo = () => {

  const { getJugadoresByEquipos, jugadoresByEquipos, equipoDelJugador } = useJugador()
  const params = useParams()


  useEffect(() => {
    getJugadoresByEquipos(params?.idEquipo)
  }, [params?.idEquipo])

  return (
    <ContenedorCustom>

      <HeaderEquipoInfo equipo={equipoDelJugador} />
      <Title content='Jugadores' size='text-3xl'/>
      <JugadoresEquiposTable rows={jugadoresByEquipos} />
    </ContenedorCustom>
  )
}

export default EquipoInfo