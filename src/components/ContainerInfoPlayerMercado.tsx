import { JugadorStore } from '@/utils/zustand/jugador'
import { Card, Chip, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import EditNote from '@mui/icons-material/EditNote';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import './cardInfoplayer.css'
import Spinner from './Spinner';
import { Jugadores } from '@/infraestrcuture/entities/jugadores';
import Link from 'next/link';
import { useJugador } from './hooks/useJugador';
import { useSessionAuth } from './hooks/useSessionAuth';


interface Props {
  jugador: Jugadores;
}
const ContainerInfoPlayerMercado = ({ jugador }: Props) => {
  const { eliminarJugador } = useJugador()
  const {session} = useSessionAuth()


  if (!jugador) {
    return <div className='w-full h-full flex justify-center items-center'>
      <Spinner />
    </div>
  }


  return (
    <div className='w-full min-h-screen flex justify-center items-center py-20 px-4'>

      <div className='container_card  rounded-2xl shadow-2xl relative shadow-slate-700 bg-[rgba(20,18,18,0.5)] text-slate-50 animated-gradient-border overflow-hidden mt-20 '>
        <div className='flex flex-col items-center justify-center  w-[100%] h-full '>
          <h2 className='text-3xl text-center'>

            {jugador?.nombre + " " + jugador?.apellido}
          </h2>

          {session?.rol == "admin" &&

            <div>
              <button onClick={() => eliminarJugador(jugador?._id)} className='absolute top-2 right-10 hover:text-red-500 cursor-pointer'><DeleteOutline /></button>
              <Link href={`/jugadores/nuevo?idPlayer=${jugador._id}`} className='absolute top-2 right-2 hover:text-sky-500 cursor-pointer'><EditNote /></Link>
            </div>
          }
          <Image src={jugador ? jugador?.foto : ''} width={400} height={400} alt='imagen de un futbolista'
            className='object-cover mask-gradient'
          />

        </div>



        <div className='w-[100%] p-2 '>


          <div className=' flex justify-center items-center'>
            <Image src={jugador ? jugador?.club?.logo : ''} width={130} height={130} alt='imagen de un futbolista'
              className='object-cover mb-8 '
            />
          </div>




          <Typography>Posicion: {jugador?.estadisticasGlobales?.posicion?.toUpperCase()}</Typography>
          <Typography>Estatura: {jugador?.estatura} cm</Typography>
          <Typography>Goles:{jugador?.estadisticasGlobales?.goles}</Typography>
          <Typography>Asistencias:{jugador?.estadisticasGlobales?.asistencias}</Typography>

          <div>
            <Typography className='flex gap-2  items-center'>
              Tarjetas Amarillas: {jugador.estadisticasGlobales.tarjetas_amarillas}</Typography>

          </div>
          <div >
            <Typography className='flex gap-2  items-center relative'>Tarjetas Rojas: {jugador.estadisticasGlobales.tarjetas_rojas}</Typography>


          </div>

          <div>
            <Typography className='flex items-center gap-2'>Ataque:{jugador?.estadisticasGlobales?.ataque}</Typography>

          </div>

          <Typography className='flex items-center gap-2'>Defensa: {jugador?.estadisticasGlobales?.defensa} </Typography>
          <Typography className='flex items-center gap-2'>Regate: {jugador?.estadisticasGlobales?.regate}</Typography>

          <div>
            <Typography>Valor de mercado: ${jugador?.estadisticasGlobales?.valor_mercado}</Typography>

          </div>
        </div>

      </div>


    </div>
  )
}

export default ContainerInfoPlayerMercado