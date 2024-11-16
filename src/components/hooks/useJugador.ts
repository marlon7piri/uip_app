import { Jugadores } from "@/infraestrcuture/entities/jugadores";
import React, { useEffect, useState } from "react";
import * as UseCases from "@/config/core/use-cases";
import { fetcherDb } from "@/config/adapters/apiDbAdapter";
import { useSession } from "next-auth/react";
import { JugadorStore } from "@/utils/zustand/jugador";

const initialStateJugador: Jugadores = {
  nombre: "",
  apellido: "",
  edad: 0,
  estatura: 0,
  foto: "",
  club: {
    nombre: "",
    logo: "",
  },
  ataque: 0,
  defensa: 0,
  email: "",
  estudiante: "",
  posicion: "",
  regate: 0,
  rol: "jugador",
  status: "activo",
  valor_mercado: 0,
  velocidad: 0,
};
export const useJugador = () => {
  const [jugador, setJugador] = useState<Jugadores>(initialStateJugador);
  const [loading, setLoading] = useState<boolean>(false);
  const [jugadores, setJugadores] = useState<Jugadores[]>([]);
  const { data: session } = useSession();
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
    setLoading(true);
    const res = await UseCases.getJugadoresUseCases(fetcherDb, session?.token);
    setJugadores(res);
    loadJugadores(res);
    setLoading(false);
  };
  const createJugador = async () => {
    const newPlayer = {
      ...jugador,
      foto: currentImage,
    };

    const res = await UseCases.createJugadorUseCases(
      fetcherDb,
      newPlayer,
      session?.token
    );
  };
  const handlerPlayer = (id: string) => {
    selectPlayer(id);
  };
  return {
    jugador,
    jugadores,
    setJugador,
    createJugador,
    handlerPlayer,
    loading,
  };
};
