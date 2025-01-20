import { fetcherDb } from "@/config/adapters/apiDbAdapter";
import * as UseCases from "../../config/core/use-cases";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Equipos } from "@/infraestrcuture/entities/equipos";
import { Jugadores } from "@/infraestrcuture/entities/jugadores";
import { EquipoStore } from "@/utils/zustand/equipos";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getSession } from "@/actions/get-session";
import { uploadFile } from "@/utils/imagenes";

const initialStateEquipo: Equipos = {
  nombre: "",
  logo: "",
};
export const useEquipos = () => {
  const [equipos, setEquipos] = useState<Equipos[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const [equipo, setEquipo] = useState<Equipos>(initialStateEquipo);
  const [image, setImage] = useState(null);

  useEffect(() => {
    getEquipos();
  }, []);

  const getEquipos = async () => {
    const session = await getSession();
    try {
      setLoading(true);
      const res = await UseCases.getEquiposUseCases(fetcherDb, session?.token);

      console.log(res);
      setEquipos(res);
      setLoading(false);
    } catch (error) {
      throw new Error("Error obteniendo los equipos");
    }
  };

  const createEquipo = async () => {
    const session = await getSession();
    const img = await uploadFile(image);

    const newEquipo = {
      ...equipo,
      logo: img,
    };
    const res = await UseCases.createEquipoUseCases(
      fetcherDb,
      newEquipo,
      session?.token
    );

    toast.success("Equipo creado");
    router.push("/equipos");
  };
  return {
    equipos,
    createEquipo,
    equipo,
    setEquipo,
    loading,
    image,
    setImage,
  };
};
