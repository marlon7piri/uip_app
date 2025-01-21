export interface Partidos {
  _id?: string;
  local: Local;
  visitante: Local;
  torneo_id: TorneoID;
  fecha: Date;
  estado: string;
  exist_ganador: boolean;
  tipo: string;
  is_draw: boolean;
  goles: number;
  asistencias: number;

  estadio: string;
  __v?: number;
}

export interface Local {
  _id: string;
  nombre: string;
  logo: string;
}

export interface TorneoID {
  _id: string;
  nombre: string;
  foto: string;
}
