
export interface Equipos {
  _id?:                string;
  nombre:             string;
  logo:               string;
  goles_favor?:        number;
  goles_contra?:       number;
  asistencias?:        number;
  puntos?:             number;
  partidos_jugados?:   number;
  partidos_ganados?:   number;
  partidos_perdidos?:  number;
  partidos_empatados?: number;
  diferencia_goles?:   number;
}
