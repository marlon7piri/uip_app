import { Equipos } from '@/infraestrcuture/entities/equipos'
import React from 'react'
import { Title } from './Title'
import Image from 'next/image'
import styles from './headerequipoinfo.module.css'
import EditNote from '@mui/icons-material/EditNote';
import Link from 'next/link'
import EditIcon from './EditIcon'
import { useSession } from 'next-auth/react'

interface Props {
  equipo: Equipos
}
const HeaderEquipoInfo = ({ equipo }: Props) => {

  const { data: session, status } = useSession()

  // Mostrar mensaje mientras se carga la sesión
  if (status === "loading") {
    return <p>Cargando sesión...</p>
  }

  // Si no está autenticado
  if (!session || status !== "authenticated") {
    return <p>Acceso denegado. Debes iniciar sesión para ver esta información.</p>
  }
  return (
    <div className={styles.card}>

      <div className={styles.containerInfo}>
        <div className='flex justify-center items-center flex-col '>

          <Title content={equipo?.nombre} size='text-3xl' color='text-slate-50' />



          <Image src={equipo ? equipo?.logo : ''} width={150} height={80} alt={equipo?.nombre ? equipo?.nombre : 'foto del club'}
            className=' object-cover'
          />
        </div>

        <div>
          <ul className={styles.lista}>
            <li>Goles: {equipo?.estadisticasGlobales?.goles_favor}</li>
            <li>Goles en Contra: {equipo?.estadisticasGlobales?.goles_contra}</li>
            <li>Partidos Jugados: {equipo?.estadisticasGlobales?.partidos_jugados}</li>
            <li>Partidos Ganados: {equipo?.estadisticasGlobales?.partidos_ganados}</li>
            <li>Partidos Perdidos: {equipo?.estadisticasGlobales?.partidos_perdidos}</li>
            <li>Partidos Empatados:  {equipo?.estadisticasGlobales?.partidos_empatados}</li>
          </ul>
        </div>
        {session?.user?.id === equipo?.autorId
          ? <EditIcon link={`/equipos/nuevo?idEquipo=${equipo._id}`} />
          : null
        }

      </div>
    </div>
  )
}

export default HeaderEquipoInfo