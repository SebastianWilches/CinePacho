import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { CineContext } from "../../../context/CineContext";

const HeaderEmpleado = ({ mostrar }) => {
  const { setInfoCliente, setTokenCliente, setAuth, setIsLog } =
    useContext(CineContext);

  const handleButton = (e) => {
    console.log(e.target.classList[1]);
    mostrar(e.target.classList[1]);
  };

  const handleButtonCerrarSesion = (e) => {
    //TODO eliminar datos de sesion
    setInfoCliente([]);
    setAuth(false);
    setTokenCliente([]);
    setIsLog(false);
  };

  return (
    <>
      <nav className="navBar">
        <Link to={"#"}>
          <h2 className="navBar--link">CinePacho</h2>
        </Link>
        <section className="navBar--options">
          <button onClick={handleButton}>
            <h4 className="navBar--link btnCreaFuncion">Crear función</h4>
          </button>
          <button onClick={handleButton}>
            <h4 className="navBar--link btnCreaPelicula">Crear Pelicula</h4>
          </button>
          <button onClick={handleButton}>
            <h4 className="navBar--link btnCreaSnack">Crear Snack</h4>
          </button>
          <button onClick={handleButton}>
            <h4 className="navBar--link btnCreaCompra">Iniciar Compra</h4>
          </button>
        </section>
        <div className="div-empleado-control-sesion">
          <button onClick={handleButton}>
            <h4 className="navBar--link btnDatosEmpleado">Mis Datos</h4>
          </button>
          <Link to={"/"} onClick={handleButtonCerrarSesion}>
            <h4 className="navBar--link btnCerrarSesion">Cerrar Sesion</h4>
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default HeaderEmpleado;
