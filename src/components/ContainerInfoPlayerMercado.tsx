import { JugadorStore } from '@/utils/zustand/jugador'
import { Card, Chip, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const ContainerInfoPlayerMercado = () => {
  const jugadorSelected = JugadorStore(state => state.jugadorSelected)


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

      <Typography>Posicion:Delantero Centro</Typography>
      <Typography>Goles:23 <SportsSoccerIcon /></Typography>
      <Typography>Asistencias:34</Typography>

      <Typography>
        Tarjetas Amarillas:2 <Chip className='bg-yellow-500 w-4 h-4 rounded-none' /> </Typography>
      <Typography>Tarjetas Rojas:3 <Chip className='bg-red-700 w-4 h-4 rounded-none' /></Typography>

      <Typography>Ataque:<Chip className='bg-yellow-500 w-2 h-2 rounded-full' />  90</Typography>
      <Typography>Defensa:<Chip className='bg-gray-500 w-2 h-2 rounded-full' /> 70 </Typography>
      <Typography>Regate:<Chip className='bg-pink-500 w-2 h-2 rounded-full' /> 85</Typography>

      <Typography>Valor de mercado: <AttachMoneyIcon className='bg-yellow-500 w-4 h-4 rounded-full' /> 200.000</Typography>
    </Card>
  )
}

export default ContainerInfoPlayerMercado