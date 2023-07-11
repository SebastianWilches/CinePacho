import React, { useContext } from "react";
import { useForm } from "react-hook-form";

import "./SnackItem.css";
import { CineContext } from "../context/CineContext";
import axios from "axios";

export default function SnackItem({ infoSnack }) {
  const { register, handleSubmit } = useForm(); //State del form
  const urlBase = "http://localhost:3001/";
  //Contexto
  const {
    isLog,
    tokenCliente,
    infoCliente,
    selectedMultiplex_ID,
    selectedSnacks,
    setSelectedSnacks,
    idCompraUsuarioCliente,
    setIdCompraUsuarioCliente,
  } = useContext(CineContext);

  const POST_CrearCompraCliente = async (object, token) => {
    object.idMultiplex = selectedMultiplex_ID;
    const response = await fetch(`${urlBase}crearCompraCliente`, {
      method: "POST",
      body: JSON.stringify(object),
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    });
    const { idCompra } = await response.json();
    return idCompra;
  };

  const POST_CrearCompraNoRegistrado = async (object) => {
    object.idMultiplex = selectedMultiplex_ID;
    const response = await fetch(`${urlBase}crearCompraNoRegistrado`, {
      method: "POST",
      body: JSON.stringify(object),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { idCompra } = await response.json();
    return idCompra;
  };

  const POST_AgregarSnackCompra = async (object) => {
    console.log(object);
    axios
      .post(`${urlBase}agregarSnackCompra`, object)
      .then((response) => {
        // Manejar la respuesta del servidor
        console.log(response.data);
        // if (response.data.mensaje==='Se han agregado 2 sillas a su compra') {
        //   setRedirectSnack(true);
        // }
        //   setListaSillasFuncion(response.data.listaSillasDisponibles);
      })
      .catch((error) => {
        // Manejar errores
        console.log(error);
      });
    // const response = await fetch(`${urlBase}agregarSnackCompra`, {
    //   method: "POST",
    //   body: JSON.stringify(object),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // const data = await response.json();
    // console.log(data);
  };

  const btnComprarSnack = async (snack) => {
    //Crear un nuevo ID para compra
    let idCompra = 0;
    let crearCompra = {
      idCliente: infoCliente.cliente_id,
      correo: infoCliente.correo,
    };

    //Agregamos el snack con su cantidad al ID de la compra

    if (isLog) {
      if (idCompraUsuarioCliente === null) {
        let idCompraRes = await POST_CrearCompraCliente(
          crearCompra,
          tokenCliente
        ); //Crear ID de compra si el usuario esta logeado
        setIdCompraUsuarioCliente(idCompraRes);
        enviarSnackSeleccionado(
          idCompraRes,
          infoSnack.idSnack,
          parseInt(snack.cantidad),
          infoSnack.nombresnack
        );
      } else {
        enviarSnackSeleccionado(
          idCompraUsuarioCliente,
          infoSnack.idSnack,
          parseInt(snack.cantidad),
          infoSnack.nombresnack
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
        enviarSnackSeleccionado(
          idCompraRes,
          infoSnack.idSnack,
          parseInt(snack.cantidad),
          infoSnack.nombresnack
        );
      } else {
        enviarSnackSeleccionado(
          idCompraUsuarioCliente,
          infoSnack.idSnack,
          parseInt(snack.cantidad),
          infoSnack.nombresnack
        );
      }
    }
  };

  const enviarSnackSeleccionado = async (idc, ids, can, nombresn) => {
    let objectAgregarSnackCompra = {
      idCompra: idc,
      idSnack: ids,
      cantidad: can,
      idMultiplex: parseInt(selectedMultiplex_ID),
    };

    console.log(objectAgregarSnackCompra);
    await POST_AgregarSnackCompra(objectAgregarSnackCompra);

    //Para renderizarlo en el carrito
    let objectSnackCarrito = {
      idCompra: idc,
      idSnack: ids,
      cantidad: can,
      nombre: nombresn,
      tipoProducto:'snack'
    };
    setSelectedSnacks([...selectedSnacks, objectSnackCarrito]);
    console.log(selectedSnacks);
  };

  return (
    <section className="CardSnack">
      <div className="CardImage">
        <img src={infoSnack.direccionFoto} alt="Snack item" />
      </div>
      <div className="CardInfo">
        <h3 className="CardTitle">{infoSnack.nombresnack}</h3>
        <p className="PrecioSnack">${infoSnack.precio}</p>
        <div className="snackBuy">
          <form
            onSubmit={handleSubmit((data) => {
              btnComprarSnack(data);
            })}
          >
            <input
              {...register("cantidad")}
              placeholder="Cantidad"
              required
              className="input-snack-usuarionormal"
            ></input>
            <button className="button-submit btn-submit-producto-usuario" type="submit">Agregar</button>
          </form>
        </div>
      </div>
    </section>
  );
}
