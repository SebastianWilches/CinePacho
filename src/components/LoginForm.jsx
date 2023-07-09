import React, { useState, useContext } from "react";
import { CineContext } from "../context/CineContext";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import "./LoginForm.css";
import { Navigate } from "react-router-dom";

export default function LoginForm() {



  const { register, handleSubmit } = useForm(); //State del form
  const [credenciales1, setCredenciales1] = useState([]);
  const { setInfoCliente, setTokenCliente, setIsLog, isLog, setAuth, infoCliente } = useContext(CineContext);
  const urlBase = 'https://cinepachoapi.azurewebsites.net/';


  const POST_validarCredenciales = async (credenciales) => {
    const response = await fetch(`${urlBase}validarCredencialesSesion`, {
      method: "POST",
      body: JSON.stringify(credenciales),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
  };

  const POST_iniciarSesion = async (credenciales2) => {
    const response = await fetch(`${urlBase}iniciarSesion`, {
      method: "POST",
      body: JSON.stringify(credenciales2),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (
      data.mensaje === "No se ha podido iniciar sesion, ha ocurrido un error"
    ) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Código incorrecto",
      });
    }

    if (data.mensaje == 'Se ha iniciado sesion correctamente') {
      setInfoCliente(data.usuario);
      setTokenCliente(data.token);
      setIsLog(true);
      setAuth(data.auth)
      Swal.fire({
        title: "¡Usuario logeado!",
        icon: "success",
      });
    }

  }


  const validacionCodigo = async (credenciales) => {
    Swal.fire({
      title: "Ingresa el código para la verificación en dos pasos",
      input: "number",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Ingresar",
      showLoaderOnConfirm: true,
      preConfirm: (codigo) => {
        let userValidado = {
          correo: credenciales.correo,
          codigo,
        };

        POST_iniciarSesion(userValidado);
      },
    });
  };
  const handleLogin = async (user) => {
    await setCredenciales1(user);
    await POST_validarCredenciales(user);
    await validacionCodigo(user);
  };

  return (
    <>
      <form
        className="container-loginForm"
        onSubmit={handleSubmit((data) => {
          handleLogin(data);
        })}
      >
        <div className="div-data-login">
          <div>
            <label>Correo electrónico:</label>
            <input
              {...register("correo")}
              // placeholder='Correo electrónico'
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
        </div>

        <input className="button-submit btn-sub-login" type="submit" />
      </form>
      {
        infoCliente && infoCliente.nombrerol && infoCliente.nombrerol === 'admin' && <Navigate to='/sesionEmpleado' />
      }
    </>
  );

};