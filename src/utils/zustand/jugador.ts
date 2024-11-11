import { Jugadores } from "@/infraestrcuture/entities/jugadores";
import { create } from "zustand";
import { jugadores } from "../jugadores";

interface ActionsJugador {
  jugadorSelected: Jugadores | null;
  jugadores: Jugadores[];
  loadJugadores: (players: Jugadores[]) => void;
  selectPlayer: (id: string) => void;
}

export const JugadorStore = create<ActionsJugador>()((set, get) => ({
  jugadorSelected: null,
  jugadores: [],
  selectPlayer: (id) => {
    set((state) => ({
      jugadorSelected: state.jugadores.find((e) => e._id == id),
    }));
  },
  loadJugadores: (players) => {
    set((state) => ({
      jugadores: [...players],
    }));
  },
}));
