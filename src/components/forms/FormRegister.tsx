import React from 'react'
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./register.module.css";
import axios from "axios";

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

            router.push("/auth/login");
            setLoginInProgress(false);
        }






    }
    return (
        <div className={styles.containerLogin}>


            <div className="p-4">
                <h1 className="text-center text-primary text-4xl mb-4 text-slate-50 font-bold">
                    Register
                </h1>
                <form
                    className=" max-w-xs mx-auto flex flex-col p-4 bg-slate-50  gap-4 rounded-md"
                    onSubmit={handleFormSubmit}
                >
                    <label htmlFor="">Usuario</label>

                    <input
                        type="text"
                        name="username"
                        placeholder=""
                        value={user.nameUser}
                        disabled={loginInProgress}
                        onChange={(ev) => setUser({ ...user, nameUser: ev.target.value })}
                    />
                    <label htmlFor="">Contraseña</label>
                    
                    <input
                        type="password"
                        name="password"
                        placeholder=""
                        value={user.password}
                        disabled={loginInProgress}
                        onChange={(ev) => setUser({ ...user, password: ev.target.value })}
                    />
                    <label htmlFor="">Email</label>

                    <input
                        type="email"
                        name="email"
                        placeholder=""
                        value={user.email}
                        disabled={loginInProgress}
                        onChange={(ev) => setUser({ ...user, email: ev.target.value })}
                    />
                    {error && (
                        <span className="bg-red-500 p-2 text-salte-50 text-center">
                            {error}
                        </span>
                    )}
                    <label htmlFor="">Categoria</label>
                    <select name="" id="" onChange={(ev) => setUser({ ...user, clasificacion: ev.target.value })} value={user.clasificacion}>
                        <option value="jugador">jugador</option>
                        <option value="entrenador">entrenador</option>
                    </select>
                    <button
                        disabled={loginInProgress}
                        type="submit"
                        className="bg-sky-500 hover:bg-sky-900 px-8  py-2 rounded-md w-max m-auto"
                    >
                        {loginInProgress ? "loading..." : "Register"}
                    </button>
                </form>
            </div>
            <div className={styles.section}></div>
        </div>
    )
}
