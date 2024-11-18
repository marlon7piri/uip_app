import { fetcherDb } from "@/config/adapters/apiDbAdapter";
import * as UseCases from "../../config/core/use-cases";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Torneos } from "@/infraestrcuture/entities/torneos";
import { Partidos } from "@/infraestrcuture/entities/partidos";
import { useRouter } from "next/navigation";

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
export const usePartidos = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [partidos, setPartidos] = useState<Partidos[]>([]);
  const [partido, setPartido] = useState<TypePartido>(initialPartido);

  useEffect(() => {
    getPartidos();
  }, []);

  const getPartidos = async () => {
    const res = await UseCases.getPartidosUseCases(fetcherDb, session?.token);
    setPartidos(res);
  };
  
  const createPartido = async () => {
    const res = await UseCases.createPartidoUseCases(
      fetcherDb,
      partido,
      session?.token
    );
    router.refresh();
  };
  return { partidos, partido, setPartido, createPartido };
};
