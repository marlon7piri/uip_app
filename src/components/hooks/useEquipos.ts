import { fetcherDb } from "@/config/adapters/apiDbAdapter";
import * as UseCases from "../../config/core/use-cases";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Equipos } from "@/infraestrcuture/entities/equipos";

const initialStateEquipo: Equipos = {
  nombre: "",
  logo: "",
};
export const useEquipos = () => {
  const { data: session } = useSession();
  const [equipos, setEquipos] = useState<Equipos[]>([]);
  const [equipo, setEquipo] = useState<Equipos>(initialStateEquipo);

  useEffect(() => {
    getEquipos();
  }, []);

  console.log(session?.token);

  const getEquipos = async () => {
    const res = await UseCases.getEquiposUseCases(fetcherDb, session?.token);
    setEquipos(res);
  };
  const createEquipo = async () => {
    const res = await UseCases.createEquipoUseCases(
      fetcherDb,
      equipo,
      session?.token
    );
  };
  return { equipos, createEquipo, equipo, setEquipo };
};
