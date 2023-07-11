import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import "./RegisterForm.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function RegisterForm() {
  //State del form

  const [redirectLogin, setRedirectLogin] = useState(false)
  const { register, handleSubmit } = useForm();
  const urlBase = "http://localhost:3001/";

  const POST_RegistrarSesionCliente = async (user) => {
    console.log(user);
    
    
    
    const response = await fetch(`${urlBase}registrarSesion`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (data?.mensaje==="Usuario registrado con exito, debe validar la creacion de usuario en su correo") {
      setRedirectLogin(true);
    }
    if (data?.mensaje === "Hubo un error en el registro") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error en el registro",
      });
    } else {
      Swal.fire({
        title: "¡Usuario registrado!",
        text: "Se le ha enviado una confirmación por medio de correo electrónico",
        icon: "success",
      });
    }
  };

  return (
    <>
      <form
        className="container-registerForm"
        onSubmit={handleSubmit((data) => {
          POST_RegistrarSesionCliente(data);
        })}
      >
        <div className="div-data-register">
          <div>
            <label>Nombres y apellidos:</label>
            <input
              {...register("nombre")}
              // placeholder='Nombres'
              type="text"
              required
            ></input>
          </div>
          <div>
            <label>Número de documento:</label>
            <input
              {...register("cedula")}
              // placeholder='Número de documento'
              type="number"
              min={0}
              required
            ></input>
          </div>
          <div>
            <label>Correo electrónico:</label>
            <input
              {...register("correo")}
              // placeholder='Correo electrónico'
              type="email"
              required
            ></input>
          </div>
          <div>
            <label>Teléfono:</label>
            <input
              {...register("telefono")}
              // placeholder='Teléfono'
              type="number"
              min={0}
              required
            ></input>
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              {...register("contrasena")}
              // placeholder='Contraseña'
              type="password"
              required
            ></input>
          </div>
          <div>
            <label>Imagen:</label>
            <input
              {...register("image")}
              type="file"
              required
            ></input>
          </div>
        </div>

        <input className="button-submit btn-sub-register" type="submit" />
      </form>
      {
        redirectLogin && <Navigate to='/login' />
      }
    </>
  );
}
