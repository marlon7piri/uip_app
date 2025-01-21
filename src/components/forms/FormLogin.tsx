'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginAuth } from '@/actions/auth-login';
import './formlogin.css'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { CircularProgress } from '@mui/material';




export const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [error, setError] = useState("");

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);
    setError("");

    try {

      const credential = {
        username: email,
        password: password

      }


      const res = await loginAuth(credential)



      if (res?.error) {
        setError(res.error); // Esto mostrará errores enviados desde NextAuth
        setEmail("");
        setPassword("");
      }

    } catch (err) {
      setError(err);
    } finally {
      setLoginInProgress(false);
    }
  }

  const handlerShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (


    <div className="p-4">

      <form

        onSubmit={handleFormSubmit}

      >
        <h1 className="text-center text-primary text-4xl mb-4 text-slate-50 font-bold">
          Inicio de Session
        </h1>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={email}
          disabled={loginInProgress}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <div className='relative w-full'>
          <input
            type={!showPassword ? "password" : "text"}
            name="password"
            placeholder="password"
            value={password}
            disabled={loginInProgress}
            className='w-full'
            onChange={(ev) => setPassword(ev.target.value)}
          />


          {showPassword
            ? <RemoveRedEyeIcon onClick={handlerShowPassword} className='text-slate-900 absolute right-4 top-4 hover:text-sky-900 cursor-pointer' />
            : <VisibilityOffIcon onClick={handlerShowPassword} className='text-slate-900 absolute right-4 top-4 hover:text-sky-900 cursor-pointer' />}
        </div>
        {error && (
          <span className="bg-red-500 p-2 text-salte-50 text-center">
            {error}
          </span>
        )}
        <button
          disabled={loginInProgress}
          type="submit"

        >
          {loginInProgress ? <CircularProgress size={24} color='inherit' /> : "Iniciar"}
        </button>
        <Link href={'/auth/register'} className=" p-2 text-slate-50 text-center hover:text-sky-500">
          Registrarse
        </Link>
      </form>
    </div>


  )
}

