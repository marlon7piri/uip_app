"use client";

import { FormRegister } from "@/components/forms/FormRegister";
import styles from '../login/login.module.css'



export default function Register() {

  return (
    <main className={styles.containerLogin}>
      <div className="w-2/4 bg-yellow-300 p-4 mt-10">
        <p className="w-auto">
          La página está en mantenimiento, disculpen
          las molestias que puede ocasionar,
          estamos trabajando en activarla lo mas pronto posible

        </p>
      </div>
      <FormRegister />
      <div className={styles.image} />


    </main>
  );
}