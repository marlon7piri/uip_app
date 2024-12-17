'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginAuth } from '@/actions/auth-login';
import  './formlogin.css'



export const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [error, setError] = useState("");

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);
    setError("");

    try {

      const credential = {
        username:email,
        password:password

      }

      
      const res = await loginAuth(credential)

    

      if (res?.error) {
        setError(res.error); // Esto mostrará errores enviados desde NextAuth
        setEmail("");
        setPassword("");
      }

    } catch (err) {
      console.error("Error during login:", err);
      setError("Ocurrió un error inesperado. Inténtalo de nuevo.");
    } finally {
      setLoginInProgress(false);
    }
  }



  return (
    
        
    <div className="p-4">

        <form
         
          onSubmit={handleFormSubmit}

        >
          <h1 className="text-center text-primary text-4xl mb-4 text-slate-50 font-bold">
          Login
        </h1>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={email}
            disabled={loginInProgress}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            disabled={loginInProgress}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          {error && (
            <span className="bg-red-500 p-2 text-salte-50 text-center">
              {error}
            </span>
          )}
          <button
            disabled={loginInProgress}
            type="submit"
           
          >
            {loginInProgress ? "loading..." : "Login"}
          </button>
          <Link href={'/auth/register'} className=" p-2 text-slate-50 text-center">
            Registrarse
          </Link>
        </form>
        </div>

    
  )
}

