import { Jugadores } from "@/infraestrcuture/entities/jugadores";
import { create } from "zustand";

interface ActionsJugador {
  jugadorSelected: Jugadores | null;
  jugadores: Jugadores[];
  loadJugadores: (players: Jugadores[]) => void;
  saveImage: (image: string) => void;
  currentImage: string;
  selectPlayer: (id: string) => void;
}

export const JugadorStore = create<ActionsJugador>()((set, get) => ({
  jugadorSelected: null,
  jugadores: [],
  currentImage: "",
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
  saveImage: (image) => {
    set((state) => ({
      currentImage: image,
    }));
  },
}));
