import React from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { useRouter } from "next/navigation";
import './formlogin.css'

import axios from "axios";
import Link from 'next/link';
import toast from 'react-hot-toast';

export const FormRegister = () => {

    const [user, setUser] = useState({
        nameUser: "",
        email: "",
        password: "",
        rol: "client",
        clasificacion: ''
    });

    const [loginInProgress, setLoginInProgress] = useState(false);
    const [showPassword, setShowPassword] = useState(false)

    const [error, setError] = useState("");
    const router = useRouter();

    async function handleFormSubmit(ev) {



        ev.preventDefault();

        try {
            if (!user.clasificacion) {
                alert("Debe seleccionar una categoria")
                return
            }

            setLoginInProgress(true);

            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/create`, user)



            if (res?.status == 200) {
                toast.success('Usuario creado correctamente')
                router.push("/auth/login");
                setLoginInProgress(false);
            }





        } catch (error) {
            throw new Error("Error server", error)
        }

    }

    const handlerShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (


        <div className="p-4">
            <h1 className="text-center text-primary text-4xl mb-4 text-slate-50 font-bold">
                Registro
            </h1>
            <form
                onSubmit={handleFormSubmit}
            >


                <input
                    type="text"
                    required
                    name="username"
                    placeholder="Usuario"
                    value={user.nameUser}
                    disabled={loginInProgress}
                    onChange={(ev) => setUser({ ...user, nameUser: ev.target.value })}
                />
                <div className='relative w-full'>

                    <input
                        type={!showPassword ? "password" : "text"}
                        name="password"
                        placeholder="Contraseña"
                        required
                        className='w-full'
                        value={user.password}
                        disabled={loginInProgress}
                        onChange={(ev) => setUser({ ...user, password: ev.target.value })}
                    />

                    {showPassword
                        ? <RemoveRedEyeIcon onClick={handlerShowPassword} className='text-slate-900 absolute right-4 top-4 hover:text-sky-900 cursor-pointer' />
                        : <VisibilityOffIcon onClick={handlerShowPassword} className='text-slate-900 absolute right-4 top-4 hover:text-sky-900 cursor-pointer' />}
                </div>


                <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email"
                    value={user.email}
                    disabled={loginInProgress}
                    onChange={(ev) => setUser({ ...user, email: ev.target.value })}
                />
                {error && (
                    <span className="bg-red-500 p-2 text-salte-50 text-center">
                        {error}
                    </span>
                )}
                <label htmlFor="" className='text-slate-50'>Categoria</label>
                <select name="" id="" required onChange={(ev) => setUser({ ...user, clasificacion: ev.target.value })} value={user.clasificacion} className='p-2 rounded-md'>
                    <option value="">Seleccione</option>
                    <option value="jugador">jugador</option>
                    <option value="entrenador">entrenador</option>
                </select>
                <button
                    disabled={loginInProgress}
                    type="submit"
                >
                    {loginInProgress ? "loading..." : "Registrarse"}
                </button>
                <Link href={'/auth/login'} className=" p-2 text-slate-50 text-center hover:text-sky-500">
                    Login
                </Link>
            </form>
        </div>
    )
}
