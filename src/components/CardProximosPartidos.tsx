import { Equipos } from '@/infraestrcuture/entities/equipos'
import { Partidos } from '@/infraestrcuture/entities/partidos'
import React from 'react'



interface Props {
  partido: Partidos
}
const CardProximosPartidos = ({ partido }: Props) => {
  return (
    <div className='flex justify-center items-center gap-4 flex-col'>

      <div className='flex gap-4'>
        <div>
          <h3 className='text-slate-50'>{partido?.local?.nombre}</h3>

          <img src={partido?.local?.logo} className='w-[100px] h-[100px] rounded-full bg-cover' alt={partido.nombre} />

        </div>
        <h3 className='text-slate-50'>VS</h3>

        <div>
          <h3 className='text-slate-50'>{partido.visitante.nombre}</h3>
          <img src={partido?.visitante?.logo} className='w-[100px] h-[100px] rounded-full bg-cover' alt={partido.nombre} />

        </div>
      </div>

      <div>
        <h3 className='text-slate-50'>Torneo: {partido?.torneo_id?.nombre?.toUpperCase()}</h3>
        <h3 className='text-slate-50'>Estadio: {partido?.estadio}</h3>
        <h3 className='text-slate-50'>Fecha: {partido?.fecha?.substring(0, 10)}</h3>
        <h3 className='text-slate-50'>Estado: {partido?.exist_ganador || partido?.is_draw ? 'Finalizado' :
          'Por jugar'}</h3>

      </div>
    </div>
  )
}

export default CardProximosPartidos