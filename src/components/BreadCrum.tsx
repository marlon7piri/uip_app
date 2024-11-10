import React from 'react'
import { Title } from './Title'
import Link from 'next/link'

interface Props {
  titulo: string,
  url: string
}
const BreadCrum = ({ titulo, url }: Props) => {
  return (
    <div className='flex justify-between items-center p-4'>
      <Title content={titulo} size='text-6xl' />
      <Link href={url}>Nuevo</Link>
    </div>
  )
}

export default BreadCrum