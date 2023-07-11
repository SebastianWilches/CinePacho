import React from "react";
import { CineContext } from "../context/CineContext";
import { useContext } from "react";
import "../components/compras.css";
import Footer from "./Footer";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const Compras = () => {
  const { infoCliente } = useContext(CineContext);
  const [listaComprasRealizadas, setListaComprasRealizadas] = useState([]);
  const [calificacionPelicula, setCalificacionPelicula] = useState(0);
  const [calificacionMultiplex, setCalificacionMultiplex] = useState(0);
  const [disableSelect, setDisableSelect] = useState(false);

  useEffect(() => {
    const urlBase = "http://localhost:3001/";
    axios
      .get(`${urlBase}listaComprasRealizadas/${infoCliente.cliente_id}`)
      .then((response) => {
        // Handle the response data
        console.log(response.data);
        response.data && setListaComprasRealizadas(response.data.listaPagadas);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  }, []);

  const handlePeli = (e) => {
    console.log(e.target.value);
    setCalificacionPelicula(e.target.value);
  };

  const handleMulti = (e) => {
    setCalificacionMultiplex(e.target.value);
  };

  const enviarDatos = (idPelicula, idMultiplex) => {
    setDisableSelect(true);
    const objCalificacionPelicula = {
      idCliente: infoCliente.cliente_id,
      puntaje: calificacionPelicula,
      idPelicula,
    };
    const objCalificacionMultiplex = {
      idCliente: infoCliente.cliente_id,
      puntaje: calificacionPelicula,
      idMultiplex,
    };
    const urlBase = "http://localhost:3001/";
    axios
      .post(`${urlBase}calificaMultiplexCliente`, objCalificacionMultiplex)
      .then((response) => {
        // Manejar la respuesta del servidor
        if (response?.data?.mensaje) {
          alert(response.data.mensaje);
        }
      })
      .catch((error) => {
        // Manejar errores
        console.log(error);
      });

    axios
      .post(`${urlBase}calificarPelicula`, objCalificacionPelicula)
      .then((response) => {
        // Manejar la respuesta del servidor
        console.log(response.data);
        if (response?.data?.mensaje) {
          alert(response.data.mensaje);
        }
      })
      .catch((error) => {
        // Manejar errores
        console.log(error);
      });
  };

  return (
    <div className="div-contenedor-compras-realizadas">
      <div className="compras-list">
        {/* {infoCliente.cliente_id} */}
        {listaComprasRealizadas?.map((c, i) => {
          return (
            <div className="compra-realizada" key={i}>
              <p>
                <span># Compra: </span>
                {c.idCompra}
              </p>
              <p>
                <span>Nombre Pelicula: </span>
                {c.titulo}
              </p>
              <p>
                <span>Nombre Multiplex: </span>
                {c.nombreMultiplex}
              </p>
              <div>
                <label>Calificar Pelicula: </label>
                <select onChange={handlePeli} disabled={disableSelect}>
                  <option value=""></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <div>
                <label>Calificar Multiplex: </label>
                <select onChange={handleMulti} disabled={disableSelect}>
                  <option value=""></option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
              <button
                onClick={() => enviarDatos(c.idPelicula, c.idMultiplex)}
                className="button-submit btn-submit-producto-usuario"
                disabled={disableSelect}
              >
                Enviar Calificaciones
              </button>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Compras;
