import { fetcherDb } from "@/config/adapters/apiDbAdapter";
import * as UseCases from "../../config/core/use-cases";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Torneos } from "@/infraestrcuture/entities/torneos";
import { Partidos } from "@/infraestrcuture/entities/partidos";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { getSession } from "@/actions/get-session";
import toast from "react-hot-toast";

interface TypePartido {
  visitante: string;
  local: string;
  asistencias: number;
  estadio: string;
  exist_ganador: false;
  fecha: null;
  goles: number;
  tipo: string;

  is_draw: false;
  torneo_id: string;
}
export interface TypeResultado {
  id_local: string | null;
  id_visitante: string | null;
  goles_local: number;
  goles_visitante: number;
  asistencias_local: number;
  asistencias_visitantes: number;
  tarjetas_amarillas: string[];
  tarjetas_rojas: string[];
  is_draw: string;
  torneoId: string | null;
  partidoId: string | null;
  goleadores: string[];
  asistentes: string[];
}

const initialPartido: TypePartido = {
  visitante: "",
  local: "",
  asistencias: 0,
  estadio: "",
  exist_ganador: false,
  fecha: null,
  goles: 0,
  tipo: "clasificacion",

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
  tarjetas_amarillas: [],
  tarjetas_rojas: [],
  is_draw: "true",
  torneoId: "",
  partidoId: "",
  goleadores: [],
  asistentes: [],
};
export const usePartidos = () => {
  const router = useRouter();
  const params = useParams();
  const [partidos, setPartidos] = useState<Partidos[]>([]);
  const [partido, setPartido] = useState<TypePartido>(initialPartido);
  const [equiposByPartido, setEquiposByPartido] = useState([]);
  const [resultadoPartido, setResultadoPartido] =
    useState<TypeResultado>(initialResultado);
  const [loading, setLoading] = useState(false);

  const search = useSearchParams();

  const local = search.get("idLocal");
  const visitante = search.get("idVisitante");
  const idTorneo = search.get("idTorneo");
  const idPartido = search.get("idPartido");

  useEffect(() => {
    getPartidos();
  }, []);
  const getPartidos = async () => {
    const session = await getSession();

    const res = await UseCases.getPartidosUseCases(fetcherDb, session?.token);
    setPartidos(res);
  };

  const getEquiposPorPartido = async (
    id_local: string,
    id_visitante: string
  ) => {
    const session = await getSession();

    const res = await UseCases.getEquiposPorPartidoUseCases(
      fetcherDb,
      id_local,
      id_visitante,
      session?.token
    );
    setEquiposByPartido(res);
  };

  const createPartido = async () => {
    setLoading(true);
    const session = await getSession();

    const newMatch: TypePartido = {
      ...partido,
      torneo_id: idTorneo,
    };
    const res = await UseCases.createPartidoUseCases(
      fetcherDb,
      newMatch,
      session?.token
    );
    toast.success("Partido creado");
    setLoading(false);
  };
  const evaluarPartido = async () => {
    const session = await getSession();
    setLoading(true);

    const idsGoleadores = resultadoPartido.goleadores.map((e) => e.ids);
    const idsAsistentes = resultadoPartido.asistentes.map((e) => e.ids);
    const idsAmarillas = resultadoPartido.tarjetas_amarillas.map((e) => e.ids);
    const idsRojas = resultadoPartido.tarjetas_rojas.map((e) => e.ids);

    const result: TypeResultado = {
      ...resultadoPartido,
      goleadores: idsGoleadores,
      asistentes: idsAsistentes,
      tarjetas_amarillas: idsAmarillas,
      tarjetas_rojas: idsRojas,
      id_local: local,
      id_visitante: visitante,
      torneoId: idTorneo,
      partidoId: idPartido,
      is_draw: resultadoPartido.is_draw.toString(),
    };

    const res = await UseCases.evaluarPartidoUseCases(
      fetcherDb,
      result,
      session?.token
    );

    toast.success("Partido evaluado");
    router.replace(`/ligas/partidos/${idTorneo}`);
    router.refresh();
    setLoading(false);
  };
  return {
    partidos,
    partido,
    setPartido,
    createPartido,
    resultadoPartido,
    setResultadoPartido,
    equiposByPartido,
    getEquiposPorPartido,
    evaluarPartido,
    loading,
  };
};
