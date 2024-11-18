import { fetcherDb } from "@/config/adapters/apiDbAdapter";
import * as UseCases from "../../config/core/use-cases";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Torneos } from "@/infraestrcuture/entities/torneos";
import { Equipos } from "@/infraestrcuture/entities/equipos";
import { equiposFutbol } from "@/utils/teams";
import { TorneoStore } from "@/utils/zustand/torneos";

export const useTorneos = () => {
  const { data: session } = useSession();
  const [torneos, setTorneos] = useState<Torneos[]>([]);
  const [equiposRegistrados, setEquiposRegistrados] = useState<Equipos[]>([]);
  const [torneo, setTorneo] = useState({
    nombre: "",
    foto: "",
  });
  const currentImageTorneo = TorneoStore((state) => state.currentImageTorneo);

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

  const crearTorneo = async () => {
    const newTorneo = {
      ...torneo,
      foto: currentImageTorneo,
    };
    const res = await UseCases.createTorneoUseCases(
      fetcherDb,
      newTorneo,
      session?.token
    );
    setTorneos(res);
    setLoading(false);
  };
  const registrarEquiposTorneos = async (idTorneo: string) => {
    const ids = equiposRegistrados.map((e) => e._id);

    const newRegistro = {
      idTorneo: idTorneo,
      equipos: ids,
    };

    const res = await UseCases.createRegistroTorneoUseCases(
      fetcherDb,
      newRegistro,
      session?.token
    );
    setLoading(false);
  };

  return {
    torneos,
    torneo,
    setTorneo,
    loading,
    equiposRegistrados,
    setEquiposRegistrados,
    registrarEquiposTorneos,
    crearTorneo,
  };
};
