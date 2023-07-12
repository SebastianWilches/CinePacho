import React, { useContext } from "react";
import { Button, Card, Drawer } from "@rewind-ui/core";
import { CineContext } from "../context/CineContext";
import { FaCartShopping } from "react-icons/fa6";
import "./ShoppingCart.css";
import Swal from "sweetalert2";

export default function ShoppingCart() {
  const {
    openShoppingCart,
    setOpenShoppingCart,
    listaCompraID,
    setListaCompraID,
    isLog,
    selectedSnacks,
    setSelectedSnacks,
    infoCliente,
    selectedMultiplex_ID,
    idCompraUsuarioCliente,
    setIdCompraUsuarioCliente
  } = useContext(CineContext);
  const urlBase = "https://cinepachoapi.azurewebsites.net/";

  console.log(selectedSnacks);

  const calificarPelicula = (idPelicula) => {
    Swal.fire({
      title: "¡Califica la película con una puntuación del 1 al 5!",
      input: "number",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Ingresar",
      showLoaderOnConfirm: true,
      preConfirm: (calificacion) => {
        let objectCalificar = {
          idCliente: infoCliente.cliente_id,
          idPelicula: idPelicula,
          puntaje: calificacion,
        };
        console.log("Objecto a calificar", objectCalificar);
        POST_CalificarPelicula(objectCalificar);
      },
    });
  };

  const POST_CalificarPelicula = async (object) => {
    const response = await fetch(`${urlBase}calificarPelicula`, {
      method: "POST",
      body: JSON.stringify(object),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  const POST_ProcesarCompra = async (object) => {
    const response = await fetch(`${urlBase}realizarPago`, {
      method: "POST",
      body: JSON.stringify(object),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.urlPago) {
      setSelectedSnacks([])
      setListaCompraID([])
      window.open(data.urlPago, '_blank')
    }
  };

  const POST_CancelarCompra = async (object) => {
    const response = await fetch(`${urlBase}cancelarCompra`, {
      method: "POST",
      body: JSON.stringify(object),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (data?.mensaje=== 'Se han liberado las sillas y los snack') {
      setSelectedSnacks([])
      setIdCompraUsuarioCliente(null)
    }
  };

  const POST_PagoPasarela = async (object) => {
    const response = await fetch(`${urlBase}realizarPago`, {
      method: "POST",
      body: JSON.stringify(object),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    window.open(data.urlPago, "_blank");
    console.log("POST_PagoPasarela", data);
  };

  const btnPasarelaPago = () => {
    if (idCompraUsuarioCliente !== null) {
      const objCompra = {
      idMultiplex:selectedMultiplex_ID,
      arregloCompras:[idCompraUsuarioCliente]
    }
      POST_ProcesarCompra(objCompra);
    }
    // let idPasarela = [];

    // //ID de compras de peliculas
    // listaCompraID.map((item) => {
    //   let objectCompra = {
    //     idCompra: item.idCompra,
    //     respuestaPasarela: true,
    //     pagoPuntos: [],
    //   };
    //   POST_ProcesarCompra(objectCompra);
    //   if (isLog) {
    //     calificarPelicula(item.idPelicula);
    //   }

    //   idPasarela.push(objectCompra.idCompra);
    // });
    // //ID de compras de snacks
    // selectedSnacks.map((item) => {
    //   let objectCompra = {
    //     idCompra: item.idCompra,
    //     respuestaPasarela: true,
    //     pagoPuntos: [],
    //   };

    //   idPasarela.push(objectCompra.idCompra);
    // });
    // // Swal.fire({
    // //   title: "¡Pago completado!",
    // //   icon: "success",
    // // });

    // //Pasarela de pago conjunta
    // console.log("IDS de toda la factura", idPasarela);
    // let objectPasarela = {
    //   idMultiplex: selectedMultiplex_ID,
    //   arregloCompras: idPasarela,
    // };
    // POST_PagoPasarela(objectPasarela);

    // // Limpiar carrito
    // setListaCompraID([]);
    // setSelectedSnacks([]);
  };

  const btnCancelarPago = () => {
    // TICKETS DE CINE
    const objCancelarCompra = {
      idMultiplex:selectedMultiplex_ID,
      idCompra:idCompraUsuarioCliente
    }
    POST_CancelarCompra(objCancelarCompra)
  };

  return (
    <>
      <Drawer
        open={openShoppingCart}
        onClose={() => setOpenShoppingCart(false)}
      >
        <Card className="w-full" bordered={false}>
          <Card.Header className="bg-slate-50">
            <div className="headerCarrito">
              <h3 className="text-lg text-slate-800 font-medium">
                Carrito de compras
              </h3>
              <FaCartShopping className="iconHeaderCarrito" />
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => setOpenShoppingCart(false)}
              icon
            >
              <p>X</p>
            </Button>
          </Card.Header>

          {selectedSnacks.map((item, index) => {
            return (
              <Card.Body key={index}>
                {/* <p>{item.idCompra}</p> */}
                {item.tipoProducto === "snack" ? (
                  <>
                    <p>
                      <b>Factura: </b>
                      {item.idCompra}
                    </p>
                    <p>
                      <b>Descripción: </b>
                      {item.nombre}
                    </p>
                    <p>
                      <b>Cantidad: </b>
                      {item.cantidad}
                    </p>
                  </>
                ) : (
                  item.tipoProducto === "silla" && (
                    <>
                      <p>
                        <b>Factura: </b>
                        {item.idCompra}
                      </p>
                      <p>
                        <b>Descripción: </b>
                        {item.nombrePelicula}
                      </p>
                      <p>
                        <b>Sala: </b>
                        {item.idSala}
                      </p>
                      <p>
                        <b>Silla: </b>
                        {item.idSilla}
                      </p>
                      <p>
                        <b>Horario: </b>
                        {item.horario}
                      </p>
                    </>
                  )
                )}
              </Card.Body>
            );
          })}

          <Card.Footer>
            <div className="flex w-full space-x-2">
              <Button
                className="w-full"
                color="green"
                onClick={btnPasarelaPago}
              >
                Comprar
              </Button>
              <Button className="w-full" color="red" onClick={btnCancelarPago}>
                Cancelar
              </Button>
            </div>
          </Card.Footer>
        </Card>
      </Drawer>
    </>
  );
}
