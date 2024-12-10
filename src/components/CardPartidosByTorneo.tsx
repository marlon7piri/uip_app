import { Equipos } from '@/infraestrcuture/entities/equipos'
import { Partidos } from '@/infraestrcuture/entities/partidos'
import Link from 'next/link'
import React from 'react'



interface Props {
  partido: Partidos
}

const CardPartidosByTorneo = ({ partido }: Props) => {

  return (
   <Link href={`/home/torneos/partidos/edit?idTorneo=${partido.torneo_id._id}&idLocal=${partido.local._id}&idVisitante=${partido.visitante._id}`}>
    <div className='flex justify-center items-center gap-4 flex-col bg-slate-900 p-2 rounded-lg'>

<div className='flex gap-4 justify-center items-center'>
  <div className='flex flex-col justify-center items-center '>
    <h3 className='text-slate-50'>{partido?.local?.nombre}</h3>

    <img src={partido?.local?.logo} className='w-[100px] h-[100px] rounded-full bg-cover' alt={partido?.local?.nombre} />


  </div>
  <h3 className='text-slate-50'>VS</h3>

  <div className='flex flex-col justify-center items-center '>
    <h3 className='text-slate-50'>{partido?.visitante?.nombre}</h3>
    <img src={partido?.visitante?.logo} className='w-[100px] h-[100px] rounded-full bg-cover' alt={partido?.visitante?.nombre} />


  </div>
</div>

<div>
<div className='flex justify-center items-center'>
<h3 className='text-slate-50 text-4xl'>{partido?.resultado?.golesLocal}</h3>
<span className='text-slate-50 text-2xl'>-</span>
<h3 className='text-slate-50 text-4xl'>{partido?.resultado?.golesVisitante}</h3>

</div>

  <h3 className='text-slate-50'>Torneo: {partido?.torneo_id?.nombre?.toUpperCase()}</h3>
  <h3 className='text-slate-50'>Estadio: {partido?.estadio}</h3>
  <h3 className='text-slate-50'>Fecha: {partido?.fecha?.substring(0, 10)}</h3>
  

</div>
</div>
   </Link>
  )
}

export default CardPartidosByTorneo