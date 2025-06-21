import { fetcherDb } from "@/config/adapters/apiDbAdapter";
import * as UseCases from "../../config/core/use-cases";
import { useEffect, useState } from "react";
import { Equipos } from "@/infraestrcuture/entities/equipos";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getSession } from "@/actions/get-session";
import { uploadFile } from "@/utils/imagenes";

const initialStateEquipo: Pick<Equipos, "nombre" | "logo"> = {
  nombre: "",
  logo: "",
};
export const useEquipos = () => {
  const [equipos, setEquipos] = useState<Equipos[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isloading, setIsloading] = useState(false);
  const router = useRouter();

  const [equipo, setEquipo] = useState(initialStateEquipo);
  const [image, setImage] = useState(null);

  useEffect(() => {
    getEquipos();
  }, []);

  const getEquipos = async () => {
    const session = await getSession();
    try {
      setLoading(true);

      let autorId: string | undefined = session?.user?.id;

      const res = await UseCases.getEquiposUseCases(fetcherDb, session?.token);

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
      autorId: session?.user?.id,
    };
    const res = await UseCases.createEquipoUseCases(
      fetcherDb,
      newEquipo,
      session?.token
    );
    setEquipo({ logo: "", nombre: "" });
    toast.success("Equipo creado");

    router.push("/equipos");
  };
  const editarEquipo = async (idEquipo: string) => {
    try {
      setIsloading(true);
      const session = await getSession();
      const img = await uploadFile(image);

      const newEquipo = {
        ...equipo,
        logo: img,
      };
      const res = await UseCases.editEquipoUseCases(
        fetcherDb,
        newEquipo,
        idEquipo,
        session?.token,
        session?.user?.id
      );

      setEquipo({ logo: "", nombre: "" });
      toast.success("Equipo actualizado");
      router.push("/equipos");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsloading(false);
    }
  };
  return {
    equipos,
    createEquipo,
    editarEquipo,
    equipo,
    setEquipo,
    loading,
    isloading,
    setIsloading,
    image,
    setImage,
  };
};
