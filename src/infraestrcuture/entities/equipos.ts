export interface Equipos {
  estadisticasGlobales: Estadisticas;
  _id:                  string;
  nombre:               string;
  logo:                 string;
  torneos:              Torneo[];
}

export interface Estadisticas {
  goles_favor:        number;
  goles_contra:       number;
  asistencias:        number;
  partidos_jugados:   number;
  partidos_ganados:   number;
  partidos_perdidos:  number;
  partidos_empatados: number;
  puntos?:            number;
}

export interface Torneo {
  estadisticas: Estadisticas;
  torneoId:     TorneoID;
  _id:          string;
}

export enum TorneoID {
  The677227753Ef85Dabdefe6B5A = "677227753ef85dabdefe6b5a",
}
