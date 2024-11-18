import { Jugadores } from "@/infraestrcuture/entities/jugadores";
import { create } from "zustand";
import { jugadores } from "../jugadores";

interface ActionTorneos {
  saveImageTorneo: (image: string) => void;
  currentImageTorneo: string;
}

export const TorneoStore = create<ActionTorneos>()((set, get) => ({
  currentImageTorneo: "",

  saveImageTorneo: (image) => {
    set((state) => ({
      currentImageTorneo: image,
    }));
  },
}));
