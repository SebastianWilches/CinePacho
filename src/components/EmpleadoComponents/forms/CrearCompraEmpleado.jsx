import React, { useContext, useEffect, useState } from "react";
import { CineContext } from "../../../context/CineContext";
import ListaSillas from "../containers/ListaSillas";
import axios from "axios";
import ListaSnacksEmpleado from "../containers/ListaSnacksEmpleado";
import { Navigate } from "react-router-dom";

const CrearCompraEmpleado = ({ accion }) => {
  const { infoCliente } = useContext(CineContext);

  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRvIjoiamVhc3NvbnN1YXJlekBvdXRsb29rLmVzIiwiaWF0IjoxNjg4ODMxODMwLCJleHAiOjE3MTk5MzU4MzB9.jpFCpAwQ4knD72IsrcbVLdqy6vv1seZtoSuGft0ZleM";

  const [datosCompra, setDatosCompra] = useState({
    idMultiplex: infoCliente.idMultiplex, //ACA IRA EL MULTIPLEX QUE TIENE ASISNADO EL EMPLEADO
    idEmpleado: infoCliente.empleado_id, //ACA IRA EL ID DEL EMPLEADO EXTRAIDO DEL CONTEXTO
    idCompra: null,
    cedulaCliente: null, //ACA IRA EL CC DEL CLIENTE INGRESADA EN EL FORM
    sillasSeleccionadas: [],
    snackSeleccionados: [],
    idPelicula: null,
    funcion: null,
  });

  const [listaPeliculasCartelera, setListaPeliculasCartelera] = useState([]);

  const [funcionesHorarios, setFuncionesHorarios] = useState([]);

  const [listaSillasFuncion, setListaSillasFuncion] = useState([]);

  const [listaSnackMultiplex, setListaSnackMultiplex] = useState([]);

  const handleChangeCompra = (e) => {
    setDatosCompra({
      ...datosCompra,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(datosCompra);
    let crearCompraEmpleadoURL = "http://localhost:3001/crearCompraEmpleado";
    const axiosInstance = axios.create({
      baseURL: crearCompraEmpleadoURL, // Reemplaza con la URL base de tu API
      headers: {
        "x-access-token": token,
      },
    });

    // Ejemplo de solicitud GET utilizando axiosInstance
    axiosInstance
      .post(crearCompraEmpleadoURL, {
        idMultiplex: datosCompra.idMultiplex,
        cedulaCliente: datosCompra.cedulaCliente,
        idEmpleado: datosCompra.idEmpleado,
      })
      .then((response) => {
        // Manejar la respuesta del servidor
        console.log(response.data);
        if (response.data.mensaje === "Se ha creado la compra con exito") {
          setDatosCompra({
            ...datosCompra,
            idCompra: response.data.idCompra,
          });
          agregarSillasACompra(response.data.idCompra);
          agregarSnacksACompra(response.data.idCompra);
          alert("Se creo con exito la compra");
          // accion(null);
        }
      })
      .catch((error) => {
        // Manejar errores
        console.error(error);
      });
  };

  const agregarSillasACompra = (idCompra) => {
    const { sillasSeleccionadas, idMultiplex } = {
      sillasSeleccionadas: datosCompra.sillasSeleccionadas,
      idMultiplex: parseInt(datosCompra.idMultiplex),
    };
    let enviarSillasCompraURL = "http://localhost:3001/seleccionarSillasCompra";
    axios
      .post(enviarSillasCompraURL, {
        idCompra,
        sillasSeleccionadas,
        idMultiplex,
      })
      .then((response) => {
        // Manejar la respuesta del servidor
        console.log(response.data);
        return true;
        // setListaSillasFuncion(response.data.listaSillasDisponibles);
      })
      .catch((error) => {
        // Manejar errores
        console.log(error);
        return false;
      });

    console.log(sillasSeleccionadas, idCompra, idMultiplex);

    // return true;
  };

  const agregarSnacksACompra = async (idCompra) => {
    const idMultiplex = parseInt(datosCompra.idMultiplex);
    const arrSnacks = datosCompra.snackSeleccionados;
    console.log(idMultiplex, arrSnacks, idCompra);
    let agregarSnackCompraURL = "http://localhost:3001/agregarSnackCompra";
    for (let i = 0; i < arrSnacks.length; i++) {
      await axios
        .post(agregarSnackCompraURL, {
          idSnack: arrSnacks[i].idSnack,
          idCompra,
          cantidad: arrSnacks[i].cantidad,
          idMultiplex,
        })
        .then((response) => {
          // Manejar la respuesta del servidor
          console.log(response.data);
          return true;
          // setListaSillasFuncion(response.data.listaSillasDisponibles);
        })
        .catch((error) => {
          // Manejar errores
          console.log(error);
          return false;
        });
    }
  };

  useEffect(() => {
    let listaCarteleraURL = "http://localhost:3001/listaPeliculasCartelera";
    let listaSnackMultiplexURL = `http://localhost:3001/listaSnackMultiplex/${datosCompra.idMultiplex}`;
    axios
      .get(listaCarteleraURL)
      .then((response) => {
        // Handle the response data
        // console.log(response.data);
        setListaPeliculasCartelera([...response.data.listaPeliculas]);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        // console.error(error);
      });
    axios
      .get(listaSnackMultiplexURL)
      .then((response) => {
        // Handle the response data
        // console.log(response.data.listarSnacksM);
        setListaSnackMultiplex([...response.data.listarSnacksM]);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        // console.error(error);
      });
  }, []);

  useEffect(() => {
    if (datosCompra.idPelicula !== null) {
      let listaCartelera = `http://localhost:3001/pelicula/${datosCompra.idPelicula}`;
      axios
        .get(listaCartelera)
        .then((response) => {
          // Handle the response data
          // console.log(response.data);
          setFuncionesHorarios([...response.data.pelicula]);
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error(error);
        });
    }
  }, [datosCompra.idPelicula]);

  useEffect(() => {
    if (datosCompra.funcion) {
      let arr = datosCompra.funcion.split(" | ");
      let date = arr[0];
      let idSala = arr[1];
      let listaSillasFuncionURL =
        "http://localhost:3001/listarSillasDisponiblesSalaMultiplex";
      // console.log(date, idSala);
      axios
        .post(listaSillasFuncionURL, {
          idSala,
          idMultiplex: datosCompra.idMultiplex,
          idPelicula: datosCompra.idPelicula,
          horario: date,
        })
        .then((response) => {
          // Manejar la respuesta del servidor
          // console.log(response.data);
          setListaSillasFuncion(response.data.listaSillasDisponibles);
        })
        .catch((error) => {
          // Manejar errores
          console.log(error);
        });
    }
  }, [datosCompra.funcion]);

  const agregarSillaASeleccion = (silla) => {
    console.log(silla);
    setDatosCompra({
      ...datosCompra,
      sillasSeleccionadas: [...datosCompra.sillasSeleccionadas, silla],
    });
  };

  const eliminarSillaDeSeleccion = (silla) => {
    let index = datosCompra.sillasSeleccionadas.indexOf(silla);
    console.log(index);
    if (index !== -1) {
      datosCompra.sillasSeleccionadas.splice(index, 1);
      setDatosCompra({
        ...datosCompra,
        sillasSeleccionadas: datosCompra.sillasSeleccionadas,
      });
    }
  };

  const agregarSnack = (snack) => {
    console.log(snack);
    setDatosCompra({
      ...datosCompra,
      snackSeleccionados: [...datosCompra.snackSeleccionados, snack],
    });
  };

  const eliminarSnack = (snack) => {
    console.log(datosCompra.snackSeleccionados);

    const nuevosSnacks = datosCompra.snackSeleccionados.filter(
      (item) => item.idSnack !== snack.idSnack
    );

    setDatosCompra({
      ...datosCompra,
      snackSeleccionados: nuevosSnacks,
    });
  };

  // useEffect(() => {
  //   console.log(datosCompra);
  // }, [datosCompra]);

  const handleCancelarCompra = () => {
    console.log(datosCompra.idCompra);
    let cancelaCompraURL = "http://localhost:3001/cancelarCompra";
    axios
      .post(cancelaCompraURL, {
        idCompra: datosCompra.idCompra,
        idMultiplex: datosCompra.idMultiplex,
      })
      .then((response) => {
        // Manejar la respuesta del servidor
        console.log(response.data);
        // setListaSillasFuncion(response.data.listaSillasDisponibles);
      })
      .catch((error) => {
        // Manejar errores
        console.log(error);
      });
  };

  const handlePagarCompra = () => {
    let obtenerLinkPagoURL = "http://localhost:3001/realizarPago";
    axios
      .post(obtenerLinkPagoURL, {
        idMultiplex: datosCompra.idMultiplex,
        arregloCompras: [datosCompra.idCompra]
      })
      .then((response) => {
        // Manejar la respuesta del servidor
        console.log(response.data);
        // setListaSillasFuncion(response.data.listaSillasDisponibles);
        window.open(response.data.urlPago, '_blank')
      })
      .catch((error) => {
        // Manejar errores
        console.log(error);
      });
  };

  return (
    <div className="empleado-div-control">
      <h2>Crear Compra</h2>
      <form className="funcion-form" onSubmit={handleSubmit}>
        <div className="funcion-form-div">
          <label>N° Documento Cliente</label>
          <input
            type="number"
            name="cedulaCliente"
            required
            onChange={handleChangeCompra}
          />
        </div>
        <div className="funcion-form-div">
          <label>Seleccione una pelicula</label>
          <select name="idPelicula" required onChange={handleChangeCompra}>
            <option value=""></option>
            {listaPeliculasCartelera.map((pelicula, index) => {
              return (
                <option key={index} value={pelicula.pelicula_id}>
                  {pelicula.titulo}
                </option>
              );
            })}
          </select>
        </div>
        <div className="funcion-form-div">
          <label>Seleccione el horario</label>
          <select name="funcion" required onChange={handleChangeCompra}>
            <option value=""></option>
            {funcionesHorarios.map((pelicula, index) => {
              let date = new Date(pelicula.horario);
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, "0");
              const day = String(date.getDate()).padStart(2, "0");
              const hours = String(date.getHours()).padStart(2, "0");
              const minutes = String(date.getMinutes()).padStart(2, "0");
              const seconds = String(date.getSeconds()).padStart(2, "0");

              const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
              return (
                <option
                  key={index}
                  value={formattedDate
                    .toString()
                    .concat(" | ")
                    .concat(pelicula.Sala_sala_id.toString())}
                >
                  {formattedDate}
                </option>
              );
            })}
          </select>
        </div>
        <div className="funcion-form-div">
          <label>Seleccione los snack que desea</label>
          <p onClick={() => console.log(datosCompra.snackSeleccionados)}>
            ver actuales en compra
          </p>
          <ListaSnacksEmpleado
            dataSillasFuncion={listaSnackMultiplex}
            agregarSnack={agregarSnack}
            eliminarSnack={eliminarSnack}
          />
        </div>
        <div className="funcion-form-div">
          <label>Seleccione las sillas que desea</label>
          <ListaSillas
            dataSillasFuncion={listaSillasFuncion}
            agregarSilla={agregarSillaASeleccion}
            eliminarSilla={eliminarSillaDeSeleccion}
          />
        </div>

        <div className="funcion-form-div empleado-buttons-compra">
          <button
            className="button-submit empleado-btn-form btn-compra-empleado-crear"
            type="submit"
          >
            Crear Compra
          </button>

          <span
            className="button-submit empleado-btn-form btn-compra-empleado-pagar"
            onClick={handlePagarCompra}
          >
            Pagar Compra
          </span>
          
          <span
            className="button-submit empleado-btn-form btn-compra-empleado-cancelar"
            onClick={handleCancelarCompra}
          >
            Cancelar Compra
          </span>
        </div>
      </form>
    </div>
  );
};

export default CrearCompraEmpleado;
