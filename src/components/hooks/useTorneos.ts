import { fetcherDb } from "@/config/adapters/apiDbAdapter";
import * as UseCases from "../../config/core/use-cases";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Torneos } from "@/infraestrcuture/entities/torneos";
import { Equipos } from "@/infraestrcuture/entities/equipos";
import { equiposFutbol } from "@/utils/teams";

export const useTorneos = () => {
  const { data: session } = useSession();
  const [torneos, setTorneos] = useState<Torneos[]>([]);
  const [equiposRegistrados, setEquiposRegistrados] = useState<Equipos[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const loadTorenos = async () => {
      await getTorneos();
    };
    loadTorenos();
  }, []);

  const getTorneos = async () => {
    setLoading(true);
    const res = await UseCases.getTorneosUseCases(fetcherDb, session?.token);
    setTorneos(res);
    setLoading(false);
  };
  const registrarEquiposTorneos = async (idTorneo:string) => {

    const ids = equiposRegistrados.map(e=>e._id)

    const newRegistro={
      idTorneo:idTorneo,
      equipos:ids
  }

  console.log(newRegistro)
    
    const res = await UseCases.createRegistroTorneoUseCases(fetcherDb,newRegistro, session?.token);
    setLoading(false);
  };

  return { torneos, loading,equiposRegistrados,setEquiposRegistrados,registrarEquiposTorneos };
};
