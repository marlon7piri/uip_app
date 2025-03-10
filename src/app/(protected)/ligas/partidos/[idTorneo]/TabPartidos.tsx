import { getSession } from '@/actions/get-session';
import ContainerProximosPartidosByTorneo from '@/components/ContainerProximosPartidosByTorneo';
import { Title } from '@/components/Title';
import { Partidos } from '@/infraestrcuture/entities/partidos';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import * as UseCases from '@/config/core/use-cases';
import { fetcherDb } from '@/config/adapters/apiDbAdapter';
import Spinner from '@/components/Spinner';

const TabPartidos = ({ partidosByTorneos, loading }: { partidosByTorneos: any, loading: boolean }) => {


  if (partidosByTorneos.length == 0) {
    return <h1 className='text-slate-50 text-3xl text-center'>No hay partidos</h1>
  }

  return (
    <div>
      <Title content="Partidos" size="text-4xl" color="text-slate-50" />
      <ContainerProximosPartidosByTorneo partidos={partidosByTorneos} />
    </div>
  );
};

export default TabPartidos;
