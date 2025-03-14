import React, { useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useRouter } from "next/navigation";
import './formlogin.css';
import axios from "axios";
import Link from 'next/link';
import toast from 'react-hot-toast';
import { CircularProgress } from '@mui/material';

export const FormRegister = () => {
    const [user, setUser] = useState({
        nameUser: "",
        email: "",
        password: "",
        rol: "client",
        clasificacion: ""
    });

    const [loginInProgress, setLoginInProgress] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    async function handleFormSubmit(ev:HTMLFormElement) {
        ev.preventDefault();

        try {
            setLoginInProgress(true);

            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/create`, user);

            if (res?.status == 201) {
                toast.success('Usuario creado correctamente');
                router.push("/auth/login");
                setLoginInProgress(false);
            }
            setError(res?.data?.messages);
        } catch (error) {
            setLoginInProgress(false);
            setError(error?.response?.data?.messages);
            throw new Error("Error server", error);
        }
    }

    const handlerShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="p-4">
            <h1 className="text-center text-primary text-4xl mb-4 text-slate-50 font-bold">
                Registro
            </h1>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    required
                    name="username"
                    placeholder="Usuario"
                    value={user.nameUser}
                    disabled={loginInProgress}
                    onChange={(ev) => setUser({ ...user, nameUser: ev.target.value.trim() })}
                    onBlur={(ev) => setUser({ ...user, nameUser: ev.target.value.trim() })}
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
                        onChange={(ev) => setUser({ ...user, password: ev.target.value.trim() })}
                        onBlur={(ev) => setUser({ ...user, password: ev.target.value.trim() })}
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
                    onChange={(ev) => setUser({ ...user, email: ev.target.value.trim() })}
                    onBlur={(ev) => setUser({ ...user, email: ev.target.value.trim() })}
                />
                <label htmlFor="" className='text-slate-50'>Categoría</label>
                <select 
                    required 
                    onChange={(ev) => setUser({ ...user, clasificacion: ev.target.value })} 
                    value={user.clasificacion} 
                    className='p-2 rounded-md'
                >
                    <option value="">Seleccione</option>
                    <option value="jugador">Jugador</option>
                    <option value="entrenador">Entrenador</option>
                </select>
                {error && <p className='bg-red-500 p-4 w-full text-slate-50'>{error}</p>}
                <button disabled={loginInProgress} type="submit">
                    {loginInProgress ? <CircularProgress color='inherit' size={18} /> : "Registrarse"}
                </button>
                <Link href={'/auth/login'} className=" p-2 text-slate-50 text-center hover:text-sky-500">
                    Login
                </Link>
            </form>
        </div>
    );
};
