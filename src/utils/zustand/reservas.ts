import {create} from 'zustand'


interface IStore{
    showModalResserva:boolean
    openModal:()=>void
    closeModal:()=>void
}

export const authReserva = create<IStore>()((set,get)=>({
    showModalResserva:false,
    openModal:()=>{
        set({showModalResserva:true})
    },
    closeModal:()=>{
        set({showModalResserva:false})
    },

}))