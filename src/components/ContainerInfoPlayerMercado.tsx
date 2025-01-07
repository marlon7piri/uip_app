import { JugadorStore } from '@/utils/zustand/jugador'
import { Card, Chip, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import './cardInfoplayer.css'

const ContainerInfoPlayerMercado = () => {
  const jugadorSelected = JugadorStore(state => state.jugadorSelected)



  if (!jugadorSelected) {
    return <Typography className='text-slate-50 text-2xl'>Seleccione un jugador</Typography>
  }

  return (
    <div className='w-[30%] h-[500px] rounded-2xl shadow-2xl shadow-slate-700 p-2 bg-[rgba(20,18,18,0.5)] text-slate-50 animated-gradient-border'>

      <div className='flex justify-between p-6 items-center '>
        <div className='flex flex-col items-center'>
          <Typography>

            {jugadorSelected?.nombre + " " + jugadorSelected?.apellido}
          </Typography>

          <Image src={jugadorSelected ? jugadorSelected?.foto : ''} width={100} height={100} alt='imagen de un futbolista'
            className=''
          />
        </div>


        <div className='flex flex-col items-center'>
          <Typography>Club</Typography>


          <Image src={jugadorSelected ? jugadorSelected?.club?.logo : ''} width={100} height={100} alt='imagen de un futbolista'
            className='rounded-full'
          />


        </div>

      </div>

      <div className='p-6'>
        <Typography>Posicion: {jugadorSelected?.estadisticasGlobales?.posicion?.toUpperCase()}</Typography>
        <Typography>Estatura: {jugadorSelected?.estatura} cm</Typography>
        <Typography>Goles:{jugadorSelected?.estadisticasGlobales?.goles} <SportsSoccerIcon /></Typography>
        <Typography>Asistencias:{jugadorSelected?.estadisticasGlobales?.asistencias}</Typography>

        <div>
          <Typography className='flex gap-2  items-center'>
            Tarjetas Amarillas:2 </Typography>
          
        </div>
        <div >
          <Typography className='flex gap-2  items-center relative'>Tarjetas Rojas:3 </Typography>
          

        </div>

        <div>
          <Typography className='flex items-center gap-2'>Ataque:{jugadorSelected?.estadisticasGlobales?.ataque}</Typography>

        </div>

        <Typography className='flex items-center gap-2'>Defensa: {jugadorSelected?.estadisticasGlobales?.defensa} </Typography>
        <Typography className='flex items-center gap-2'>Regate: {jugadorSelected?.estadisticasGlobales?.regate}</Typography>

        <div>
          <Typography>Valor de mercado: <AttachMoneyIcon className='bg-yellow-500 w-4 h-4 rounded-full' /> {jugadorSelected?.estadisticasGlobales?.valor_mercado}</Typography>

        </div>
      </div>
    </div>
  )
}

export default ContainerInfoPlayerMercado