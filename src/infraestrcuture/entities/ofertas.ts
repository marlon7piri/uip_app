export interface Ofertas {
  _id: string;
  jugador: Jugador;
  author: Author;
  monto: number;
  descripcion: string;
  fechaCreacion: Date;
  __v: number;
}

export interface Author {
  _id: string;
  nameUser: string;
  email: string;
  password: string;
  rol: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Jugador {
  _id: string;
  nombre: string;
  apellido: string;
  edad: number;
  estatura: number;
  foto: string;
  club: Club;
  __v: number;
}


interface Club{
  logo:string;
  nombre:string
}
