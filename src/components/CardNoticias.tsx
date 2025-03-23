import { Noticias } from '@/infraestrcuture/entities/noticias'
import React from 'react'
import styles from './cardnoticia.module.css'
import { convertirFecha } from '@/utils/convertirFecha'
import Image from 'next/image'

interface Props {
  noticias: Noticias
}

const CardNoticias = ({ noticias }: Props) => {

  return (
    <div className={styles.cardNoticia}>
      {noticias?.foto && <img
        src={noticias?.foto}
       
      
        alt={noticias?.titulo}
        className='w-[730px] h-[430px] object-cover rounded-md' />}

      <div className='w-full flex flex-col gap-4'>
        <div className={styles.containerTitle}>
          <h1 className='font-black text-4xl'>{noticias?.titulo}</h1>
          <h3 className='font-bold text-slate-700'>Publicado: {convertirFecha(noticias?.createdAt)}</h3>
        </div>
        <p className='font-extralight text-slate-700'>{noticias?.subtitulo}</p>
      </div>



    </div>
  )
}

export default CardNoticias