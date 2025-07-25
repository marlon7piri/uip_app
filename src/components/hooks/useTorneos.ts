"use client";
import { fetcherDb } from "@/config/adapters/apiDbAdapter";
import * as UseCases from "../../config/core/use-cases";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Torneos } from "@/infraestrcuture/entities/torneos";
import { Equipos } from "@/infraestrcuture/entities/equipos";
import { TorneoStore } from "@/utils/zustand/torneos";
import { useSessionAuth } from "./useSessionAuth";
import { getSession } from "@/actions/get-session";
import { uploadFile } from "@/utils/imagenes";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const useTorneos = () => {
  const [torneos, setTorneos] = useState<Torneos[]>([]);
  const [equiposRegistrados, setEquiposRegistrados] = useState<Equipos[]>([]);
  const [torneo, setTorneo] = useState({
    nombre: "",
    foto: "",
  });
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(null)
  const router = useRouter()
  useEffect(() => {
    const loadTorneos = async () => {
      await getTorneos();
    };
    loadTorneos();
  }, []);

  const getTorneos = async () => {
    const session = await getSession();
    
    const res = await UseCases.getTorneosUseCases(fetcherDb, session?.token);
    setTorneos(res);
  };
  const getEquiposByTorneo = async (idTorneo: string) => {
    const session = await getSession();

    setLoading(true);
    const res = await UseCases.getEquiposRegistrados(
      fetcherDb,
      session?.token,
      idTorneo
    );
  };

  const crearTorneo = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
    const session = await getSession();
    const img = await uploadFile(image,session?.token);

    const newTorneo = {
      ...torneo,
      foto: img,
      autorId:session?.user?.id
    };
    const res = await UseCases.createTorneoUseCases(
      fetcherDb,
      newTorneo,
      session?.token
    );


    setTorneos(res);
    setError(null)
    toast.success("Torneo creado")
    router.back()
    } catch (error:any) {
      console.error(error);
    setError(error.message)
      
    }finally{
      setLoading(false)
    }
  };
  const registrarEquiposTorneos = async (idTorneo: string) => {
    setLoading(true)
    const session = await getSession();

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
    getEquiposByTorneo,
    image,
    setImage,
    error
  };
};
