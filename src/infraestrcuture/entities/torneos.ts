export interface Torneos {
  _id:                  string;
  nombre:               string;
  logo:                 string;
  estadisticasGlobales: EstadisticasGlobales;
  estadisticasTorneo:   EstadisticasTorneo;
}

export interface EstadisticasGlobales {
  goles_favor:        number;
  goles_contra:       number;
  asistencias:        number;
  partidos_jugados:   number;
  partidos_ganados:   number;
  partidos_perdidos:  number;
  partidos_empatados: number;
}

export interface EstadisticasTorneo {
  estadisticas: Estadisticas;
  torneoId:     string;
  _id:          string;
}

export interface Estadisticas {
  goles:       number;
  asistencias: number;
  puntos:      number;
}
