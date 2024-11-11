import { fetcherDb } from "@/config/adapters/apiDbAdapter";
import * as UseCases from "../../config/core/use-cases";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Torneos } from "@/infraestrcuture/entities/torneos";
import { Partidos } from "@/infraestrcuture/entities/partidos";

export const usePartidos = () => {
  const { data: session } = useSession();
  const [partidos, setPartidos] = useState<Partidos[]>([]);

  useEffect(() => {
    getPartidos();
  }, []);

  const getPartidos = async () => {
    const res = await UseCases.getPartidosUseCases(fetcherDb, session?.token);
    setPartidos(res);
  };

  return { partidos };
};
