import React, { useState } from "react";
import HeaderEmpleado from "../pures/HeaderEmpleado.jsx";
import CrearCompraEmpleado from "../forms/CrearCompraEmpleado.jsx";
import CrearPeliculas from "../forms/CrearPeliculas.jsx";
import CrearFuncion from "../forms/CrearFuncion.jsx";
import CrearSanck from "../forms/CrearSanck.jsx";
import DatosEmpleado from "../pures/DatosEmpleado.jsx";
import '../styles/sesionEmpleado.css'
import Footer from "../../Footer.jsx";

const CrearConsumible = () => {
  const [accion, setAccion] = useState(null);

  return (
    <div className="Empleado-div-contenedor">
      <HeaderEmpleado mostrar={setAccion} />
      {accion === null || accion === "btnDatosEmpleado" ? (
        <DatosEmpleado />
      ) : accion === "btnCreaCompra" ? (
        <CrearCompraEmpleado accion={setAccion}/>
      ) : accion === "btnCreaPelicula" ? (
        <CrearPeliculas />
      ) : accion === "btnCreaFuncion" ? (
        <CrearFuncion />
      ) : (
        accion === "btnCreaSnack" && <CrearSanck />
      )}
      <Footer />
    </div>
  );
};

export default CrearConsumible;
