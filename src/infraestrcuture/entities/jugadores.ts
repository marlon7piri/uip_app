export interface Jugadores {
  estadisticasGlobales: EstadisticasGlobales;
  _id?: string;
  nombre: string;
  apellido: string;
  edad: number;
  estatura: number;
  foto: string;
  rol: string;
  email: string;
  estudiante: string;
  status: string;
  club: Club;
}

export interface Club {
  _id?: string;
  nombre?: string;
  logo?: string;
}

export interface EstadisticasGlobales {
  valor_mercado: number;
  posicion: string;
  velocidad: number;
  ataque: number;
  defensa: number;
  regate: number;
  goles: number;
  asistencias: number;
  tarjetas_amarillas: number;
  tarjetas_rojas: number;
}


export interface JugadorWithVerification extends Jugadores {
  used_same_picture: boolean
  posicion:string
}