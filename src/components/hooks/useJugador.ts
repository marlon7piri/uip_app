import {
  Jugadores,
  JugadorWithVerification,
} from "@/infraestrcuture/entities/jugadores";
import React, { FormEvent, FormEventHandler, useEffect, useState } from "react";
import * as UseCases from "@/config/core/use-cases";
import { fetcherDb } from "@/config/adapters/apiDbAdapter";
import { useSession } from "next-auth/react";
import { JugadorStore } from "@/utils/zustand/jugador";
import { Equipos } from "@/infraestrcuture/entities/equipos";
import { getSession } from "@/actions/get-session";
import { uploadFile } from "@/utils/imagenes";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { Jugador } from "@/infraestrcuture/entities/ofertas";
import { AxiosError, isAxiosError } from "axios";

interface NewJugador {
  nombre: string;
  apellido: string;
  edad: number;
  estatura: number;
  foto: string;
  ataque: number;
  defensa: number;
  posicion: string;
  valor_mercado: number;
  velocidad: number;
  regate: number;
  asistencias: number;
  goles: number;

  club: string;

  email: string;
  estudiante: string;
  rol: string;
  status: string;
}

const initialStateJugador: NewJugador = {
  nombre: "",
  apellido: "",
  edad: 0,
  estatura: 0,
  foto: "",

  ataque: 0,
  defensa: 0,
  posicion: "delantero",
  valor_mercado: 0,
  velocidad: 0,
  regate: 0,
  asistencias: 0,
  goles: 0,

  club: "",

  email: "",
  estudiante: "si",
  rol: "jugador",
  status: "activo",
};

export const useJugador = () => {
  const [jugador, setJugador] = useState<NewJugador>(initialStateJugador);
  const [loading, setLoading] = useState<boolean>(false);
  const [jugadores, setJugadores] = useState<Jugadores[]>([]);
  const [jugadoresByEquipos, setJugadoresByEquipos] = useState<Jugadores[]>([]);
  const [equipoDelJugador, setEquipoDelJugador] = useState<Equipos>(null);
  const [image, setImage] = useState(null);
  const router = useRouter();
  const idPlayer = useSearchParams().get("idPlayer");

  const loadJugadores = JugadorStore((state) => state.loadJugadores);
  const selectPlayer = JugadorStore((state) => state.selectPlayer);
  const currentImage = JugadorStore((state) => state.currentImage);

  useEffect(() => {
    const loadJugadores = async () => {
      await getJugadores();
    };

    loadJugadores();
  }, []);

  const getJugadores = async () => {
    try {
      const session = await getSession();

      setLoading(true);
      const res = await UseCases.getJugadoresUseCases(
        fetcherDb,
        session?.token
      );

      setJugadores(res);
      loadJugadores(res);
      setLoading(false);
    } catch (error) {}
  };

  const getJugadoresByEquipos = async (idEquipo: string) => {
    const session = await getSession();

    setLoading(true);
    const res = await UseCases.getJugadoresByEquipoUseCases(
      fetcherDb,
      idEquipo,
      session?.token
    );

    setJugadoresByEquipos(res.jugadores);
    setEquipoDelJugador(res.infoClub);
    setLoading(false);
  };
  const createJugador = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!idPlayer) {
      await crearPlayer();
    } else {
      await editarPlayer();
    }
  };
  const crearPlayer = async () => {
    try {
      if (!jugador.club) {
        toast.error("Seleccione un club");
        return;
      }
      setLoading(true);
      const session = await getSession();
      const img = await uploadFile(image);

      if (img) {
        const newPlayer = {
          ...jugador,
          estadisticasGlobales: {
            posicion: jugador.posicion,
            valor_mercado: jugador.valor_mercado,
            velocidad: jugador.velocidad,
            ataque: jugador.ataque,
            defensa: jugador.defensa,
            regate: jugador.regate,
          },
          foto: img,
          userId: session?.user?.id,
        };

        const res = await UseCases.createJugadorUseCases(
          fetcherDb,
          newPlayer,
          session?.token
        );

        toast.success("Jugador creado");
        router.push("/mercado");
        router.refresh();
      }
    } catch (error) {
      throw new Error("Error creando jugador");
    } finally {
      setLoading(false);
    }
  };
  const editarPlayer = async () => {
    if (idPlayer) {
      try {
        if (!jugador.club) {
          toast.error("Seleccione un club");
          return;
        }
        setLoading(true);
        const session = await getSession();
        const img = await uploadFile(image, session?.token);

        if (img) {
          const newPlayer = {
            ...jugador,
            estadisticasGlobales: {
              posicion: jugador.posicion,
              valor_mercado: jugador.valor_mercado,
              velocidad: jugador.velocidad,
              ataque: jugador.ataque,
              defensa: jugador.defensa,
              regate: jugador.regate,
            },
            foto: img,
          };

          const res = await UseCases.editJugadorUseCases(
            fetcherDb,
            idPlayer,
            newPlayer,
            session?.token
          );

          toast.success("Jugador editado");
          router.push("/mercado");
          router.refresh();
        }
      } catch (error) {
        toast.error(error?.message);
        throw new Error("Error editando jugador");
      } finally {
        setLoading(false);
      }
    }
  };

  const getJugadorById = async (id: string) => {
    if (id) {
      const session = await getSession();

      const jugador = await UseCases.getJugadorByIdUseCases(
        fetcherDb,
        id,
        session?.token
      );
      return jugador;
    }
  };
  const getJugadorByUserId = async () => {
    const session = await getSession();

    if (session) {
      const jugador = await UseCases.getJugadorByUserIdUseCases(
        fetcherDb,
        session?.user?.id,
        session?.user?.email,
        session?.token
      );
      return jugador;
    }
  };
  const handlerPlayer = (id: string) => {
    selectPlayer(id);
  };

  const eliminarJugador = (id: string) => {
    const eliminar = async () => {
      const session = await getSession();
      const res = await UseCases.eliminarJugadorUseCases(
        fetcherDb,
        id,
        session?.token
      );
      router.back();
    };

    if (confirm("Seguro que desea eliminar al jugador?")) {
      toast.promise(eliminar(), {
        success: "Jugador eliminado",
        error: "Error eliminando, intente de nuevo",
        loading: "Eliminando...",
      });
    }
  };
  const editarPlayerByUserId = async (player: JugadorWithVerification) => {
    const session = await getSession();

    const jugadorEstandar = {
      ...player,

      email: session?.user?.email,
      foto: player.foto,
    };

    try {
      if (player.used_same_picture == true) {
        const res = await UseCases.editJugadorByUserIdUseCases(
          fetcherDb,
          session?.user?.id,
          jugadorEstandar,
          session?.token
        );
        console.log("Jugador editado sin subir la imagen a cloudinary");
        toast.success("Jugador editado");
      } else {
        if (image !== null) {
          console.log(image);
          const img = await uploadFile(image);

          console.log("paso por aqui");
          if (img) {
            const newPlayer = {
              ...jugadorEstandar,
              foto: img,
            };

            const res = await UseCases.editJugadorByUserIdUseCases(
              fetcherDb,
              session?.user?.id,
              newPlayer,
              session?.token
            );

            console.log(
              "Jugador editado y subiendo la imagen a cloudinary...."
            );
            toast.success("Jugador editado");
          }
        }
      }
    } catch (error: Error) {
      toast.error(error?.message);
      throw new Error("Error editando jugador");
    } finally {
      setLoading(false);
    }
  };

  return {
    jugador,
    jugadores,
    setJugador,
    createJugador,
    handlerPlayer,
    jugadoresByEquipos,
    equipoDelJugador,
    getJugadoresByEquipos,
    getJugadorById,
    eliminarJugador,
    loading,
    setImage,
    image,
    getJugadorByUserId,
    editarPlayerByUserId,
  };
};
