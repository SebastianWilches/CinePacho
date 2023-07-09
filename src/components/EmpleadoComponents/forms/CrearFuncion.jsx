import React, { useContext, useEffect, useState } from "react";
import { CineContext } from "../../../context/CineContext";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CrearFuncion = () => {
  
  let listaSalasURL = "https://cinepachoapi.azurewebsites.net/listaSalasMultiplex";
  let listaPeliculasURL = "https://cinepachoapi.azurewebsites.net/listaPeliculas";
  let crearFuncionURL = "https://cinepachoapi.azurewebsites.net/crearFuncion";

  const { infoCliente } = useContext(CineContext);

  const [datosFuncion, setDatosFuncion] = useState({
    idSala: null,
    idPelicula: null,
    horario: null,
    idMultiplex: infoCliente.idMultiplex,
  });
  const [fechaHora, setfechaHora] = useState(null);

  const [listaSalas, setListaSalas] = useState([]);

  const [listaPeliculas, setListaPeliculas] = useState([]);

  const handleFechaHoraChange = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    setDatosFuncion({
      ...datosFuncion,
      horario: formattedDate,
    });
    setfechaHora(date);
  };

  const handleChangeFuncion = (e) => {
    setDatosFuncion({
      ...datosFuncion,
      [e.target.name]: e.target.value,
    });
  };

  // para listar peliculas y salas de un multiplex
  useEffect(() => {
    fetch(listaSalasURL, {
      type: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idMultiplex: 2 }),
    })
      .then((respuesta) => respuesta.json())
      .then((respuesta) => {
        // console.log(respuesta);
        setListaSalas([...respuesta.listadoSalas]);
      });

    fetch(listaPeliculasURL, {
      type: "no-cors",
      method: "GET",
    })
      .then((respuesta) => respuesta.json())
      .then((respuesta) => {
        console.log(respuesta);
        setListaPeliculas([...respuesta.listaPeliculas]);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(datosFuncion);

    fetch(crearFuncionURL, {
      type: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosFuncion),
    })
      .then((respuesta) => respuesta.json())
      .then((respuesta) => {
        console.log(respuesta);
        if (respuesta.error && respuesta.error === "ER_DUP_ENTRY") {
          alert("Ya hay una funcion en ese horario");
        } else {
          if (respuesta.mensaje === "Se ha creado correctamente la funcion") {
            alert("Se creo la funcion con exito");
          }
        }
      });
  };

  return (
    <div className="empleado-div-control">
      <h2>Registrar Función</h2>
      <form className="funcion-form" onSubmit={handleSubmit}>
        <div className="funcion-form-div">
          <label>Seleccione una sala</label>
          <select onChange={handleChangeFuncion} name="idSala" required>
            <option value=""></option>
            {listaSalas.map((sala, index) => {
              return (
                <option key={index} value={sala.sala_id}>
                  {sala.sala_id}
                </option>
              );
            })}
          </select>
        </div>
        <div className="funcion-form-div">
          <label>Seleccione una una pelicula</label>
          <select onChange={handleChangeFuncion} name="idPelicula" required>
            <option value=""></option>
            {listaPeliculas.map((pelicula, index) => {
              return (
                <option key={index} value={pelicula.pelicula_id}>
                  {pelicula.titulo}
                </option>
              );
            })}
          </select>
        </div>
        <div className="funcion-form-div">
          <label>Seleccione un horario</label>

          <ReactDatePicker
            selected={fechaHora}
            onChange={handleFechaHoraChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="yyyy-MM-dd HH:mm:ss"
            placeholderText="Selecciona una fecha y hora"
            className="input-horario"
          />
        </div>
        <div className="funcion-form-div">
          <button className="button-submit empleado-btn-form" type="submit">
            Crear Función
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearFuncion;
