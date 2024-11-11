import { Jugadores } from "@/infraestrcuture/entities/jugadores";
import React, { useEffect, useState } from "react";
import * as UseCases from "@/config/core/use-cases";
import { fetcherDb } from "@/config/adapters/apiDbAdapter";
import { useSession } from "next-auth/react";
import { JugadorStore } from "@/utils/zustand/jugador";

const initialStateJugador: Jugadores = {
  _id: "",
  nombre: "",
  apellido: "",
  edad: 0,
  estatura: 0,
  foto: "",
  club: {
    nombre: "",
    logo: "",
  },
};
export const useJugador = () => {
  const [jugador, setJugador] = useState<Jugadores>(initialStateJugador);
  const [jugadores, setJugadores] = useState<Jugadores[]>([]);
  const { data: session } = useSession();
  const loadJugadores = JugadorStore((state) => state.loadJugadores);
  const selectPlayer = JugadorStore((state) => state.selectPlayer);

  useEffect(() => {
    getJugadores();
  }, []);

  const getJugadores = async () => {
    const res = await UseCases.getJugadoresUseCases(fetcherDb, session?.token);
    loadJugadores(res);
    setJugadores(res);
  };
  const createJugador = async () => {
    const res = await UseCases.createJugadorUseCases(
      fetcherDb,
      jugador,
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
  };
};
