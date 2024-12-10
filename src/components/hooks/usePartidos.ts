import { fetcherDb } from "@/config/adapters/apiDbAdapter";
import * as UseCases from "../../config/core/use-cases";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Torneos } from "@/infraestrcuture/entities/torneos";
import { Partidos } from "@/infraestrcuture/entities/partidos";
import { useParams, useRouter } from "next/navigation";

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
interface TypeResultado {
  id_local: string,
  id_visitante: string,
  goles_local: number,
  goles_visitante: number,
  asistencias_local: number,
  asistencias_visitantes: number,
  tarjetas_amarillas: number,
  tarjetas_rojas: number,
  is_draw: true,
  torneoId: string,
  partidoId:string,
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
  const [resultadoPartido, setResultadoPartido] = useState<TypeResultado>(initialResultado);

  useEffect(() => {
    getPartidos();


  }, []);
  const getPartidos = async () => {
    const res = await UseCases.getPartidosUseCases(fetcherDb, session?.token);
    setPartidos(res);
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
  return { partidos, partido, setPartido, createPartido, resultadoPartido, setResultadoPartido };
};
