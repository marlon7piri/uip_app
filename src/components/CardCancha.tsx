import { CanchaResponse } from '@/infraestrcuture/entities/canchas'
import Link from 'next/link'
import React from 'react'
interface Props {
  item: CanchaResponse
}
const CardCancha = ({ item }: Props) => {
  return (
    <Link href={`/canchas/${item._id}`} className='w-56 h-56 bg-slate-50 p-4 rounded-md'>
      <h2>{item.nombre}</h2>
      <p>Precio/hora: ${item.precioPorHora}</p>
      <p>Telefono: {item.telefono}</p>
    </Link>
  )
}

export default CardCancha