import { JugadorStore } from '@/utils/zustand/jugador'
import { Card, Chip, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const ContainerInfoPlayerMercado = () => {
  const jugadorSelected = JugadorStore(state => state.jugadorSelected)



  if(!jugadorSelected){
    return <Typography className='text-slate-50 text-2xl'>Seleccione un jugador</Typography>
  }
  
  return (
   <Card className='w-[30%] p-4'>

      <div className='flex justify-between p-2 items-center'>
        <div className='flex flex-col items-center'>
          <Typography>

            {jugadorSelected?.nombre + " " + jugadorSelected?.apellido}
          </Typography>

          <Image src={jugadorSelected?.foto} width={100} height={100} alt='imagen de un futbolista'
            className=''
          />
        </div>


        <div className='flex flex-col items-center'>
          <Typography>Club</Typography>


          <Image src={jugadorSelected?.club?.logo} width={100} height={100} alt='imagen de un futbolista'
            className='rounded-full'
          />


        </div>

      </div>

      <Typography>Posicion: {jugadorSelected?.estadisticasGlobales?.posicion?.toUpperCase()}</Typography>
      <Typography>Estatura: {jugadorSelected?.estatura} cm</Typography>
      <Typography>Goles:{jugadorSelected?.estadisticasGlobales?.goles} <SportsSoccerIcon /></Typography>
      <Typography>Asistencias:{jugadorSelected?.estadisticasGlobales?.asistencias}</Typography>

      <Typography>
        Tarjetas Amarillas:2 <Typography className='bg-yellow-500 w-4 h-4 rounded-none' /> </Typography>
      <Typography>Tarjetas Rojas:3 <Typography className='bg-red-700 w-4 h-4 rounded-none' /></Typography>

      <Typography className='flex items-center gap-2'>Ataque:<span className='bg-yellow-500 w-2 h-2 rounded-full' />  {jugadorSelected?.estadisticasGlobales?.ataque}</Typography>
      <Typography className='flex items-center gap-2'>Defensa:<Typography className='bg-gray-500 w-2 h-2 rounded-full' />  {jugadorSelected?.estadisticasGlobales?.defensa} </Typography>
      <Typography className='flex items-center gap-2'>Regate:<Typography className='bg-pink-500 w-2 h-2 rounded-full' />  {jugadorSelected?.estadisticasGlobales?.regate}</Typography>

      <Typography>Valor de mercado: <AttachMoneyIcon className='bg-yellow-500 w-4 h-4 rounded-full' /> {jugadorSelected?.estadisticasGlobales?.valor_mercado}</Typography>
    </Card>
  )
}

export default ContainerInfoPlayerMercado