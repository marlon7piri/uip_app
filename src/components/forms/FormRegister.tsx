import React from 'react'
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
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
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleFormSubmit(ev) {

        ev.preventDefault();

        setLoginInProgress(true);

        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/create`, user)



        if (res?.status == 200) {
            toast.success('Usuario creado correctamente')
            router.push("/auth/login");
            setLoginInProgress(false);
        }






    }
    return (


        <div className="p-4">
            <h1 className="text-center text-primary text-4xl mb-4 text-slate-50 font-bold">
                Register
            </h1>
            <form
                onSubmit={handleFormSubmit}
            >


                <input
                    type="text"

                    name="username"
                    placeholder="Usuario"
                    value={user.nameUser}
                    disabled={loginInProgress}
                    onChange={(ev) => setUser({ ...user, nameUser: ev.target.value })}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={user.password}
                    disabled={loginInProgress}
                    onChange={(ev) => setUser({ ...user, password: ev.target.value })}
                />

                <input
                    type="email"
                    name="email"
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
                <select name="" id="" onChange={(ev) => setUser({ ...user, clasificacion: ev.target.value })} value={user.clasificacion} className='p-2 rounded-md'>
                    <option value="jugador">jugador</option>
                    <option value="entrenador">entrenador</option>
                </select>
                <button
                    disabled={loginInProgress}
                    type="submit"
                >
                    {loginInProgress ? "loading..." : "Register"}
                </button>
                <Link href={'/auth/login'} className=" p-2 text-slate-50 text-center">
                    Login
                </Link>
            </form>
        </div>
    )
}
