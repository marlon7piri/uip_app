import { Equipos } from '@/infraestrcuture/entities/equipos'
import { Partidos } from '@/infraestrcuture/entities/partidos'
import Link from 'next/link'
import React from 'react'
import styles from '@/app/(protected)/ligas/partidos/[idTorneo]/styles.module.css'
import Image from 'next/image'

interface Props {
  partido: Partidos
}

const CardPartidosByTorneo = ({ partido }: Props) => {
  const isFinalizado = partido.estado === "finalizado";

  const renderCardContent = () => (
    <div className={`${styles.cardPartidos} ${partido?.estado == 'pendiente' ? 'bg-sky-700' : 'bg-[#140e0e85]'}`}>
      <div className="flex gap-4 justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <h3 className={styles.textTitle}>{partido?.local?.nombre}</h3>
          <Image
            src={partido?.local?.logo}
            width={100}
            height={100}
            className="object-cover"
            alt={partido?.local?.nombre}
          />
        </div>
        <h3 className={styles.textTitle}>VS</h3>
        <div className="flex flex-col justify-center items-center">
          <h3 className={styles.textTitle}>{partido?.visitante?.nombre}</h3>
          <Image
            src={partido?.visitante?.logo}
            width={100}
            height={100}
            className="object-cover"
            alt={partido?.visitante?.nombre}
          />
        </div>
      </div>

      <div>
        <div className="flex justify-center items-center">
          <h3 className={styles.textTitle}>{partido?.resultado?.golesLocal}</h3>
          <span className={styles.textTitle}>-</span>
          <h3 className={styles.textTitle}>{partido?.resultado?.golesVisitante}</h3>
        </div>
        <h3 className={styles.textTitle}>
          Torneo: {partido?.torneo_id?.nombre?.toUpperCase()}
        </h3>
        <h3 className={styles.textTitle}>Estadio: {partido?.estadio}</h3>
        <h3 className={styles.textTitle}>
          Fecha: {partido?.fecha?.substring(0, 10)}
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
    <Link
      href={`/torneos/partidos/edit?idTorneo=${partido.torneo_id._id}&idPartido=${partido._id}&idLocal=${partido.local._id}&nombreLocal=${partido?.local?.nombre}&idVisitante=${partido.visitante._id}&nombreVisitante=${partido?.visitante?.nombre}`}
    >
      {renderCardContent()}
    </Link>
  );
};

export default CardPartidosByTorneo;
