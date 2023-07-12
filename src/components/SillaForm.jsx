import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DotSpinner } from "@uiball/loaders";
import { CineContext } from "../context/CineContext";
import { FaCircleCheck } from "react-icons/fa6";
import Silla from "./Silla";

import "./SillaForm.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
// import Swal from 'sweetalert2';

export default function SillaForm({ idPelicula }) {
  //Constantes y utils
  const urlBase = "https://cinepachoapi.azurewebsites.net/";

  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  //Form
  const { register, handleSubmit } = useForm(); //State del form
  const [listFunciones, setListFunciones] = useState([]);
  const [listSillasDisponibles, setListSillasDisponibles] = useState([]); //Mapeo completo
  const [listSillasSeleccionadas, setListSillasSeleccionadas] = useState([]);
  const [peliculaID, setPeliculaID] = useState();
  const [idSalaSelect, setIdSalaSelect] = useState();
  const [nombrePelicula, setNombrePelicula] = useState("");
  const [dataSeleccion, setDataSeleccion] = useState(null)

  let totalPagarSillas = 0;

  //Contexto
  const {
    selectedMultiplex_ID,
    infoCliente,
    tokenCliente,
    setListaCompraID,
    listaCompraID,
    isLog,
    idCompraUsuarioCliente,
    setIdCompraUsuarioCliente,
    selectedSnacks,
    setSelectedSnacks,
  } = useContext(CineContext);

  useEffect(() => {
    GET_Funciones(idPelicula);
  }, []);

  const GET_Funciones = async (idPelicula) => {
    const response = await fetch(`${urlBase}pelicula/${idPelicula}`);
    const { pelicula } = await response.json();
    console.log(pelicula);
    setNombrePelicula(pelicula[0].titulo)
    console.log(pelicula);
    setListFunciones(pelicula);
    setPeliculaID(pelicula.pelicula_id);
    setLoading(false);
  };

  const POST_SillasDisponibles = async (configFuncion) => {
    console.log(configFuncion);
    const response = await fetch(
      `${urlBase}listarSillasDisponiblesSalaMultiplex`,
      {
        method: "POST",
        body: JSON.stringify(configFuncion),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { listaSillasDisponibles } = await response.json();
    console.log("configSillasDisponibles", configFuncion);
    console.log(listaSillasDisponibles);
    setListSillasDisponibles(listaSillasDisponibles);
  };

  const POST_CrearCompraCliente = async (object, token) => {
    object.idMultiplex = selectedMultiplex_ID;
    console.log(object);
    const response = await fetch(`${urlBase}crearCompraCliente`, {
      method: "POST",
      body: JSON.stringify(object),
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });
    const { idCompra } = await response.json();

    let factura = {
      idCompra,
      descripcion: "Tickets de película",
      listSillasSeleccionadas,
      idPelicula,
      tipoProducto: "silla",
    };

    return idCompra;
  };

  useEffect(() => {
    console.log(selectedSnacks);
  }, [selectedSnacks]);

  const POST_CrearCompraNoRegistrado = async (object) => {
    const response = await fetch(`${urlBase}crearCompraNoRegistrado`, {
      method: "POST",
      body: JSON.stringify(object),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { idCompra } = await response.json();

    let factura = {
      idCompra,
      descripcion: "Tickets de película",
      listSillasSeleccionadas,
      idPelicula,
    };

    return idCompra;
  };

  const POST_EnviarSillas = async (object) => {
    console.log(object);
    axios
      .post(`${urlBase}seleccionarSillasCompra`, object)
      .then((response) => {
        // Manejar la respuesta del servidor
        console.log(response.data);
        if (response.data.mensaje.includes("Se han agregado")) {
          POST_SillasDisponibles(dataSeleccion)
          setListSillasSeleccionadas([])
          totalPagarSillas = 0;

        }
        //   setListaSillasFuncion(response.data.listaSillasDisponibles);
      })
      .catch((error) => {
        // Manejar errores
        console.log(error);
      });
    // const response = await fetch(`${urlBase}seleccionarSillasCompra`, {
    //   method: "POST",
    //   body: JSON.stringify(object),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // const data = await response.json();
    // console.log(data);
  };

  const btnAgregarCarrito = async () => {
    let crearCompra = {
      idCliente: infoCliente.cliente_id,
      correo: infoCliente.correo,
    };

    

    console.log(idCompraUsuarioCliente);
    if (isLog) {
      if (idCompraUsuarioCliente === null) {
        let idCompraRes = await POST_CrearCompraCliente(
          crearCompra,
          tokenCliente
        ); //Crear ID de compra si el usuario esta logeado
        setIdCompraUsuarioCliente(idCompraRes);
        enviarSillasSeleccionadas(idCompraRes, configuracionSillasSeleccionadas(idCompraRes));
      } else {
        enviarSillasSeleccionadas(
          idCompraUsuarioCliente,
          configuracionSillasSeleccionadas(idCompraUsuarioCliente)
        );
      }
    } else {
      let noLogin = {
        idMultiplex: selectedMultiplex_ID,
      };
      if (idCompraUsuarioCliente === null) {
        console.log("creando compra por que es null");
        let idCompraRes = await POST_CrearCompraNoRegistrado(noLogin); //Crear el ID de compra si el usuario no está logeado
        setIdCompraUsuarioCliente(idCompraRes);
        enviarSillasSeleccionadas(idCompraRes, configuracionSillasSeleccionadas(idCompraRes));
      } else {
        enviarSillasSeleccionadas(
          idCompraUsuarioCliente,
          configuracionSillasSeleccionadas(idCompraUsuarioCliente)
        );
      }
    }

    //Anexar los tickets de compra al ID de compra
    // Swal.fire({
    //     title: "¡Tickets añadidos al carrito de compras!",
    //     icon: "success",
    //   });
  };

  const configuracionSillasSeleccionadas = (idC)  => {
    let modSillasSeleccionadas = listSillasSeleccionadas.map((item) => {
      // const date = new Date(item.horario);
      // const year = date.getFullYear();
      // const month = String(date.getMonth() + 1).padStart(2, "0");
      // const day = String(date.getDate()).padStart(2, "0");
      // const hours = String(date.getHours()).padStart(2, "0");
      // const minutes = String(date.getMinutes()).padStart(2, "0");
      // const seconds = String(date.getSeconds()).padStart(2, "0");

      // const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      let formattedDate = item.horario.replace("T", " ").replace("Z", "").slice(0, -4);
      return {
        idSala: item.idSala,
        idMultiplex: item.idMultiplex,
        idPelicula: item.idPelicula,
        horario: formattedDate,
        idSilla: item.idSilla,
        disponible: item.disponible,
        nombrePelicula:nombrePelicula,
        tipoProducto:'silla',
        idCompra:idC
      };
    });

    setListSillasSeleccionadas(modSillasSeleccionadas);
    return modSillasSeleccionadas;
  }

  const enviarSillasSeleccionadas = async (idc, sillasSel) => {
    let objectEnviarSillas = {
      idCompra: parseInt(idc),
      // sillasSeleccionadas: listSillasSeleccionadas,
      sillasSeleccionadas: sillasSel,
      idMultiplex: parseInt(selectedMultiplex_ID),
    };
    console.log(objectEnviarSillas);

    await POST_EnviarSillas(objectEnviarSillas);

    sillasSel.forEach((silla) => {
        setSelectedSnacks([
            ...selectedSnacks,
            silla
        ])
      console.log(silla, "silla seleccionada");
    });
  };

  return (
    <>
      {loading ? (
        <DotSpinner size={40} speed={0.9} color="black" />
      ) : (
        <form
          onSubmit={handleSubmit((data) => {
            data.idPelicula = parseInt(idPelicula);
            data.idMultiplex = parseInt(selectedMultiplex_ID);
            data.idSala = parseInt(data.horario.split(" | ")[1]);
            data.horario = data.horario.split(" | ")[0];
            // console.log(data, 'datos horario')
            POST_SillasDisponibles(data);
            setDataSeleccion(data);
            setLoading2(false);
          })}
        >
          {/* <label>Sala:</label> */}
          {/* <select {...register("idSala", { required: true })}>
                                {
                                    listFunciones.map((funcion, index) => {
                                        return <option value={funcion.Sala_sala_id} key={index}>{funcion.Sala_sala_id}</option>
                                    })
                                }
                            </select> */}
          <div className="funcion-form-div">
            <label>Horario:</label>
            <select {...register("horario", { required: true })}>
              {listFunciones.map((funcion, index) => {
                // const date = new Date(funcion.horario);
                // const year = date.getFullYear();
                // const month = String(date.getMonth() + 1).padStart(2, "0");
                // const day = String(date.getDate()).padStart(2, "0");
                // const hours = String(date.getHours()).padStart(2, "0");
                // const minutes = String(date.getMinutes()).padStart(2, "0");
                // const seconds = String(date.getSeconds()).padStart(2, "0");

                // const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

                let formattedDate = funcion.horario.replace("T", " ").replace("Z", "").slice(0, -4);
                return (
                  <option
                    value={formattedDate
                      .concat(" | ")
                      .concat(funcion.Sala_sala_id.toString())}
                    key={index}
                  >
                    {formattedDate}
                  </option>
                );
              })}
            </select>
          </div>
          <input className="button-submit btn-sub-login" type="submit" />
        </form>
      )}
      {loading2 ? (
        <></>
      ) : (
        <section className="container-comprar">
          <hr />
          <div className="container-sillas">
            {listSillasDisponibles?.map((silla, index) => {
              return (
                <Silla
                  key={index}
                  infoSilla={silla}
                  numSilla={index}
                  setListSillasSeleccionadas={setListSillasSeleccionadas}
                  listSillasSeleccionadas={listSillasSeleccionadas}
                ></Silla>
              );
            })}
          </div>

          <article>
            <p>
              <b>Entradas seleccionadas:</b>
              {listSillasSeleccionadas.map((silla) => {
                return silla.idSilla + ", ";
              })}
            </p>
            <p>
              {listSillasSeleccionadas?.map((s, index) => {
                totalPagarSillas += s.precio;
                return "";
              })}
              <b>Total:{totalPagarSillas} </b>
            </p>
            <button className="btn-carrito" onClick={btnAgregarCarrito}>
              Agregar al carrito <FaCircleCheck className="icon-carrito" />
            </button>
          </article>
        </section>
      )}
    </>
  );
}
