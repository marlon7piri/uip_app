"use client";

import { FormRegister } from "@/components/forms/FormRegister";


/* 

{
  "nameUser": "marlon",
  "email": "marlon7piri@gmail.com",
  "password": "password123",
  "rol":"admin"
}*/
export default function Register() {
  
  return (
    <section className="w-full h-screen ">
     <FormRegister/>

    </section>
  );
}