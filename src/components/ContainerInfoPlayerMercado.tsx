import { JugadorStore } from '@/utils/zustand/jugador'
import { Card, Chip, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import './cardInfoplayer.css'
import { Jugador } from '@/infraestrcuture/entities/ofertas';
import Spinner from './Spinner';


interface Props {
  jugador: Jugador;
}
const ContainerInfoPlayerMercado = ({ jugador }: Props) => {



  if (!jugador) {
    return <div className='w-full h-full flex justify-center items-center'>
      <Spinner />
    </div>
  }


  return (
    <div className='w-[90%]  rounded-2xl shadow-2xl shadow-slate-700 p-4 bg-[rgba(20,18,18,0.5)] text-slate-50 animated-gradient-border overflow-hidden'>

      <div className='container_card'>
        <div className='flex flex-col items-center  w-[100%] h-full '>
          <h2 className='text-3xl text-center'>

            {jugador?.nombre + " " + jugador?.apellido}
          </h2>

          <Image src={jugador ? jugador?.foto : ''} width={400} height={400} alt='imagen de un futbolista'
            className='object-cover mask-gradient'
          />

        </div>



        <div className='w-[100%] p-2 '>


          <div className=' flex justify-start items-center'>
            <Image src={jugador ? jugador?.club?.logo : ''} width={130} height={130} alt='imagen de un futbolista'
              className='object-cover mb-8 '
            />
          </div>




          <Typography>Posicion: {jugador?.estadisticasGlobales?.posicion?.toUpperCase()}</Typography>
          <Typography>Estatura: {jugador?.estatura} cm</Typography>
          <Typography>Goles:{jugador?.estadisticasGlobales?.goles} <SportsSoccerIcon /></Typography>
          <Typography>Asistencias:{jugador?.estadisticasGlobales?.asistencias}</Typography>

          <div>
            <Typography className='flex gap-2  items-center'>
              Tarjetas Amarillas:2 </Typography>

          </div>
          <div >
            <Typography className='flex gap-2  items-center relative'>Tarjetas Rojas:3 </Typography>


          </div>

          <div>
            <Typography className='flex items-center gap-2'>Ataque:{jugador?.estadisticasGlobales?.ataque}</Typography>

          </div>

          <Typography className='flex items-center gap-2'>Defensa: {jugador?.estadisticasGlobales?.defensa} </Typography>
          <Typography className='flex items-center gap-2'>Regate: {jugador?.estadisticasGlobales?.regate}</Typography>

          <div>
            <Typography>Valor de mercado: <AttachMoneyIcon className='bg-yellow-500 w-4 h-4 rounded-full' /> {jugador?.estadisticasGlobales?.valor_mercado}</Typography>

          </div>
        </div>

      </div>


    </div>
  )
}

export default ContainerInfoPlayerMercado