export interface GrupoResponse {
  data: GrupoData[];
}

export interface GrupoData {
  _id: string;
  nombre: string;
  cantidad_equipos: number;
  cantidad_grupos: number;
  grupos: Grupo[];
  __v: number;
}

export interface Grupo {
  equipos: Equipo[];
  grupoName: string;
  _id: string;
}

export interface Equipo {
  _id: string;
  nombre: string;
  torneos: Torneo[];
}

export interface Torneo {
  estadisticas: Estadisticas;
  torneoId: string;
  _id: string;
}

export interface Estadisticas {
  puntos: number;
  asistencias: number;
  goles_favor: number;
  goles_contra: number;
  partidos_jugados: number;
  partidos_ganados: number;
  partidos_perdidos: number;
  partidos_empatados: number;
}
