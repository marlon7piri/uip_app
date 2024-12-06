export interface Torneos {
  _id:                  string;
  nombre:               string;
  logo:                 string;
  estadisticasGlobales: Estadisticas;
  estadisticasTorneo:   EstadisticasTorneo;
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

export interface EstadisticasTorneo {
  estadisticas: Estadisticas;
  torneoId:     string;
  _id:          string;
}
