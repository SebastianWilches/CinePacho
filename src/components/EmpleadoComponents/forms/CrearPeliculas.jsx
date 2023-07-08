import axios from "axios";
import React, { useState } from "react";

const CrearPeliculas = () => {
  let crearPeliculaURL = "http://localhost:3001/crearPelicula";
  const [datosPelicula, setDatosPelicula] = useState({
    titulo: null,
    genero: null,
    descripcion: null,
    clasificacionEdad: null,
    duracion: null,
    image: null,
  });

  const handleChangePelicula = (e) => {
    if (e.target.name === "image") {
      setDatosPelicula({
        ...datosPelicula,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setDatosPelicula({
        ...datosPelicula,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("titulo", datosPelicula.titulo)
    formData.append("genero", datosPelicula.genero)
    formData.append("descripcion", datosPelicula.descripcion)
    formData.append("clasificacionEdad", datosPelicula.clasificacionEdad)
    formData.append("duracion", datosPelicula.duracion)
    formData.append("image", datosPelicula.image)
    axios
      .post(crearPeliculaURL, formData)
      .then((response) => {
        // Manejar la respuesta del servidor
        if (response.data.mensaje==="Se ha creado la pelicula exitosamente") {
          alert('Se creo con exito la pelicula')
        }
      })
      .catch((error) => {
        // Manejar errores
        if (error.response.data.error==="ER_DUP_ENTRY") {
          alert('Ya existe la pelicula con ese nombre')
        }else{
          alert(error.response.data.mensaje)
        }
      });
  };

  return (
    <div className="empleado-div-control">
      <h2>Crear Pelicula</h2>
      <form className="funcion-form" onSubmit={handleSubmit}>
        <div className="funcion-form-div">
          <label>Escriba el nombre</label>
          <input
            type="text"
            name="titulo"
            required
            onChange={handleChangePelicula}
          />
        </div>
        <div className="funcion-form-div">
          <label>Escriba el genero</label>
          <input
            type="text"
            name="genero"
            required
            onChange={handleChangePelicula}
          />
        </div>
        <div className="funcion-form-div">
          <label>Escriba una descripción</label>
          <input
            type="text"
            name="descripcion"
            required
            onChange={handleChangePelicula}
          />
        </div>
        <div className="funcion-form-div">
          <label>Escriba la edad minima para visualizar</label>
          <input
            type="number"
            name="clasificacionEdad"
            required
            onChange={handleChangePelicula}
          />
        </div>
        <div className="funcion-form-div">
          <label>Escriba la duración en minutos</label>
          <input
            type="number"
            name="duracion"
            required
            onChange={handleChangePelicula}
          />
        </div>
        <div className="funcion-form-div">
          <label>Seleccione la imagen de portada</label>
          <div className="form-div-input-file">
            <input
              type="file"
              name="image"
              onChange={handleChangePelicula}
            />
          </div>
        </div>
        <div className="funcion-form-div">
          <button className="button-submit empleado-btn-form" type="submit">
            Crear Pelicula
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrearPeliculas;
