import { fetcherDb } from "@/config/adapters/apiDbAdapter";
import * as UseCases from "../../config/core/use-cases";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Equipos } from "@/infraestrcuture/entities/equipos";
import { Jugadores } from "@/infraestrcuture/entities/jugadores";

const initialStateEquipo: Equipos = {
  nombre: "",
  logo: "", 
};
export const useEquipos = () => {
  const { data: session } = useSession();
  const [equipos, setEquipos] = useState<Equipos[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [equipo, setEquipo] = useState<Equipos>(initialStateEquipo);

  useEffect(() => {
    getEquipos();
  }, []);

  const getEquipos = async () => {
    setLoading(true);
    const res = await UseCases.getEquiposUseCases(fetcherDb, session?.token);
    setEquipos(res);
    setLoading(false);
  };

  const createEquipo = async () => {
    console.log(equipo)
   /*  const res = await UseCases.createEquipoUseCases(
      fetcherDb,
      equipo,
      session?.token
    ); */
  };
  return {
    equipos,
    createEquipo,
    equipo,
    setEquipo,
    loading,
  };
};
