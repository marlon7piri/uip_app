import { Jugadores } from "@/infraestrcuture/entities/jugadores";
import React, { useEffect, useState } from "react";
import * as UseCases from "@/config/core/use-cases";
import { fetcherDb } from "@/config/adapters/apiDbAdapter";
import { useSession } from "next-auth/react";
import { JugadorStore } from "@/utils/zustand/jugador";
import { Equipos } from "@/infraestrcuture/entities/equipos";
import { getSession } from "@/actions/get-session";
import { uploadFile } from "@/utils/imagenes";

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
  estudiante: "si",
  posicion: "delantero",
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
  const [jugadoresByEquipos, setJugadoresByEquipos] = useState<Jugadores[]>([]);
  const [equipoDelJugador, setEquipoDelJugador] = useState<Equipos>(null);
  const [image, setImage] = useState(null);

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
    const res = await UseCases.getJugadoresUseCases(fetcherDb, session?.token);

    setJugadores(res);
    loadJugadores(res);
    setLoading(false);
    } catch (error) {
      
    }
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
  const createJugador = async () => {
    const session = await getSession();
    const img= await uploadFile(image)

    if(img){

      const newPlayer = {
        ...jugador,
        estadisticasGlobales: {
          posicion: jugador.posicion,
          valor_mercado: jugador.valor_mercado,
          velocidad: jugador.velocidad,
          ataque: jugador.ataque,
          defensa: jugador.defensa,
          regate: jugador.regate
  
        },
        foto: img,
      };
  
      const res = await UseCases.createJugadorUseCases(
        fetcherDb,
        newPlayer,
        session?.token
      );
    }
    
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
    jugadoresByEquipos,
    equipoDelJugador,
    getJugadoresByEquipos,
    loading,
    setImage,
    image
  };
};
