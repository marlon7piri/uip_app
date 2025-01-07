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
    <div className='w-[90%] h-[450px] rounded-2xl shadow-2xl shadow-slate-700 p-4 bg-[rgba(20,18,18,0.5)] text-slate-50 animated-gradient-border overflow-hidden'>

      <div className='flex justify-between'>
        <div className='flex flex-col items-center  w-[60%] h-full '>
          <Typography>

            {jugadorSelected?.nombre + " " + jugadorSelected?.apellido}
          </Typography>

          <Image src={jugadorSelected ? jugadorSelected?.foto : ''} width={500} height={600} alt='imagen de un futbolista'
            className='object-cover mask-gradient'
          />
          
        </div>


       
        <div className='w-[40%] p-2 '>
        <div className='flex flex-col items-center'>
         


         <Image src={jugadorSelected ? jugadorSelected?.club?.logo : ''} width={130} height={130} alt='imagen de un futbolista'
           className='object-cover'
         />


       </div>
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

      
    </div>
  )
}

export default ContainerInfoPlayerMercado