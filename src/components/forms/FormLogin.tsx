'use client'
import React, { useState } from 'react'
import { signIn } from "@/auth";
import styles from "./login.module.css";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginAuth } from '@/actions/auth-login';



export const FormLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

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
      } else {
        router.push("/home/torneos");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Ocurrió un error inesperado. Inténtalo de nuevo.");
    } finally {
      setLoginInProgress(false);
    }
  }



  return (
    <div className={styles.containerLogin}>


      <div className="p-4">
        <h1 className="text-center text-primary text-4xl mb-4 text-slate-50 font-bold">
          Login
        </h1>

        <form
          className=" max-w-xs mx-auto flex flex-col p-4 bg-slate-50  gap-4 rounded-md"
          onSubmit={handleFormSubmit}

        >
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
            className="bg-sky-500 hover:bg-sky-900 px-8  py-2 rounded-md w-max m-auto"
          >
            {loginInProgress ? "loading..." : "Login"}
          </button>
          <Link href={'/auth/register'} className=" p-2 text-sky-500 text-center">
            Registrarse
          </Link>
        </form>

      </div>
      <div className={styles.section}></div>

    </div>
  )
}

