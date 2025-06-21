import { Equipos } from '@/infraestrcuture/entities/equipos'
import { Partidos } from '@/infraestrcuture/entities/partidos'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from '@/app/(protected)/ligas/partidos/[idTorneo]/styles.module.css'
import Image from 'next/image'
import { convertirFecha } from '@/utils/convertirFecha'
import { getSession } from '@/actions/get-session'

interface Props {
  partido: Partidos
}

interface typeColores {
  final: string,
  cuartos: string,
  octavos: string,
  clasificacion: string
}

const CardPartidosByTorneo = ({ partido }: Props) => {
  const isFinalizado = partido.estado === "finalizado";

  const [session, setSession] = useState()

  useEffect(() => {

    const loadSession = async () => {
      const data = await getSession()
      setSession(data)
    }
    loadSession()
  }, [])


  const isAutor = session && session?.user?.id === partido.autorId


  const typeColores: typeColores = {
    final: 'bg-yellow-500',
    cuartos: 'bg-slate-500',
    octavos: 'bg-teal-800',
    clasificacion: 'bg-sky-500'


  }

  const getType = (): string => {

    if (partido.estado == 'pendiente') {
      /* @ts-ignore */
      return typeColores[partido.tipo] || 'bg-[#140e0e85]'
    } else {
      return 'bg-[#140e0e85]'
    }

  }

  const renderCardContent = () => (
    <div className={`${styles.cardPartidos}  ${getType()}`}>
      <h2 className='uppercase'>{partido.tipo}</h2>
      <div className="flex gap-4 justify-center items-center ">
        <Equipo equipo={partido.local} />
        <h3 className={styles.textTitle}>VS</h3>
        <Equipo equipo={partido.visitante} />

      </div>

      <div className=''>
        <div className="flex justify-center items-center">
          <h3 className={`${styles.textTitle} text-3xl`}>{partido?.resultado?.golesLocal}</h3>
          <span className={`${styles.textTitle} text-3xl`}>-</span>
          <h3 className={`${styles.textTitle} text-3xl`}>{partido?.resultado?.golesVisitante}</h3>
        </div>
        <h3 className={styles.textTitle}>
          Torneo: {partido?.torneo_id?.nombre?.toUpperCase()}
        </h3>
        <h3 className={styles.textTitle}>Estadio: {partido?.estadio}</h3>
        <h3 className={styles.textTitle}>
          Fecha: {convertirFecha(partido?.fecha)}
        </h3>
        <h3 className={styles.textTitle}>
          Estado: {partido?.estado}
        </h3>
      </div>
    </div>
  );

  return isFinalizado ? (
    renderCardContent()
  ) : (

    isAutor ? <Link
      href={`/ligas/partidos/edit?idTorneo=${partido.torneo_id._id}&idPartido=${partido._id}&idLocal=${partido.local._id}&nombreLocal=${partido?.local?.nombre}&idVisitante=${partido.visitante._id}&nombreVisitante=${partido?.visitante?.nombre}`}
    >
      {renderCardContent()}
    </Link> :
      <div

      >
        {renderCardContent()}
      </div>
  );
};


const Equipo = ({ equipo }: { equipo: any }) => {
  return <div className="flex flex-col justify-center items-center">
    <h3 className={styles.textTitle}>{equipo.nombre}</h3>
    <Image
      src={equipo.logo}
      width={100}
      height={100}
      className="object-cover"
      alt={equipo.nombre}
    />
  </div>
}

export default CardPartidosByTorneo;
