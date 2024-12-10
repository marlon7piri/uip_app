import { fetcherDb } from "@/config/adapters/apiDbAdapter";
import * as UseCases from "../../config/core/use-cases";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Torneos } from "@/infraestrcuture/entities/torneos";
import { Partidos } from "@/infraestrcuture/entities/partidos";
import { useParams, useRouter, useSearchParams } from "next/navigation";

interface TypePartido {
  visitante: string;
  local: string;
  asistencias: number;
  estadio: string;
  exist_ganador: false;
  fecha: null;
  goles: number;
  is_draw: false;
  torneo_id: string;
}
export interface TypeResultado {
  id_local: string | null,
  id_visitante: string | null,
  goles_local: number,
  goles_visitante: number,
  asistencias_local: number,
  asistencias_visitantes: number,
  tarjetas_amarillas: number,
  tarjetas_rojas: number,
  is_draw: true,
  torneoId: string | null,
  partidoId:string | null,
  goleadores:string[],
  asistentes:string[]
}

const initialPartido: TypePartido = {
  visitante: "",
  local: "",
  asistencias: 0,
  estadio: "",
  exist_ganador: false,
  fecha: null,
  goles: 0,
  is_draw: false,
  torneo_id: "",
};
const initialResultado: TypeResultado = {
  
    id_local: "",
    id_visitante: "",
    goles_local: 0,
    goles_visitante: 0,
    asistencias_local: 0,
    asistencias_visitantes: 0,
    tarjetas_amarillas: 0,
    tarjetas_rojas: 0,
    is_draw: true,
    torneoId: "",
    partidoId:"",
    goleadores:[],
    asistentes:[]
  
};
export const usePartidos = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const params = useParams()
  const [partidos, setPartidos] = useState<Partidos[]>([]);
  const [partido, setPartido] = useState<TypePartido>(initialPartido);
  const [equiposByPartido, setEquiposByPartido] = useState([])
  const [resultadoPartido, setResultadoPartido] = useState<TypeResultado>(initialResultado);


  const search = useSearchParams()

  const local = search.get('idLocal')
  const visitante = search.get('idVisitante')
  const idTorneo = search.get('idTorneo')
  const idPartido = search.get('idPartido')

  useEffect(() => {
    getPartidos();


  }, []);
  const getPartidos = async () => {
    const res = await UseCases.getPartidosUseCases(fetcherDb, session?.token);
    setPartidos(res);
  };

  const getEquiposPorPartido= async (id_local:string,id_visitante:string) => {
    const res = await UseCases.getEquiposPorPartidoUseCases(fetcherDb,id_local,id_visitante, session?.token);
    setEquiposByPartido(res);
  };

  const createPartido = async () => {

    const newMatch: TypePartido = { ...partido, torneo_id: params.idTorneo }
    const res = await UseCases.createPartidoUseCases(
      fetcherDb,
      newMatch,
      session?.token
    );
    router.refresh();
  };
  const evaluarPartido = async () => {

    const result: TypeResultado = { ...resultadoPartido, id_local: local ,id_visitante:visitante,torneoId:idTorneo ,partidoId:idPartido}

    console.log(result)
     const res = await UseCases.evaluarPartidoUseCases(
      fetcherDb,
      result,
      session?.token
    );
    router.refresh();
  };
  return { partidos, partido, setPartido, createPartido, resultadoPartido, setResultadoPartido ,equiposByPartido,getEquiposPorPartido,evaluarPartido};
};
