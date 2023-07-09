import React, { useContext } from 'react'
import { Button, Card, Drawer } from '@rewind-ui/core';
import { CineContext } from '../context/CineContext';
import { FaCartShopping } from 'react-icons/fa6';
import './ShoppingCart.css'
import Swal from 'sweetalert2';

export default function ShoppingCart() {
  const { openShoppingCart, setOpenShoppingCart, listaCompraID, setListaCompraID, isLog, selectedSnacks, setSelectedSnacks } = useContext(CineContext);
  const urlBase = 'https://cinepachoapi.azurewebsites.net/';


  const POST_ProcesarCompra = async (object) => {
    const response = await fetch(`${urlBase}procesarCompra`, {
      method: 'POST',
      body: JSON.stringify(object),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log(data);
  }

  const POST_CancelarCompra = async (object) => {
    const response = await fetch(`${urlBase}cancelarCompra`, {
      method: 'POST',
      body: JSON.stringify(object),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log(data);
  }

  const btnPasarelaPago = () => {
    listaCompraID.map(item => {
      let objectCompra = {
        idCompra: item.idCompra,
        respuestaPasarela: true,
        pagoPuntos: [],
      }
      POST_ProcesarCompra(objectCompra);
    })
    selectedSnacks.map(item => {
      let objectCompra = {
        idCompra: item.idCompra,
        respuestaPasarela: true,
        pagoPuntos: [],
      }
      POST_ProcesarCompra(objectCompra);
    })
    Swal.fire({
      title: "¡Pago completado!",
      icon: "success",
    });

    // Limpiar carrito
    setListaCompraID([]);
    setSelectedSnacks([]);
  }

  const btnCancelarPago = () => {
    // TICKETS DE CINE
    listaCompraID.map(item => {
      let objectCompra = {
        idCompra: item.idCompra,
      }
      POST_CancelarCompra(objectCompra);
    })
    // SNACKS
    selectedSnacks.map(item => {
      let objectCompra = {
        idCompra: item.idCompra,
      }
      POST_CancelarCompra(objectCompra);
    })
    Swal.fire({
      title: "¡Transacciones canceladas!",
      icon: "warning",
    });



    // Limpiar carrito
    setListaCompraID([]);
    setSelectedSnacks([]);
  }

  return (
    <>
      <Drawer open={openShoppingCart} onClose={() => setOpenShoppingCart(false)}>
        <Card className="w-full" bordered={false}>
          <Card.Header className="bg-slate-50">
            <div className='headerCarrito'>
              <h3 className="text-lg text-slate-800 font-medium">Carrito de compras</h3>
              <FaCartShopping className='iconHeaderCarrito' />
            </div>

            <Button variant="secondary" size="sm" onClick={() => setOpenShoppingCart(false)} icon>
              <p>X</p>
            </Button>
          </Card.Header>


          {/* Renderizar todos los tickets de cine */}
          {
            !selectedSnacks ? (<></>) : selectedSnacks.map(item => {
              return (
                <Card.Body>
                  <p><b>Factura: </b>{item.idCompra}</p>
                  <p><b>Descripción: </b>{item.nombre}</p>
                  <p><b>Cantidad: </b>{item.cantidad}</p>
                </Card.Body>
              )
            })
          }

          {/* Renderizar todos los snacks */}
          {
            !listaCompraID ? (<></>) : listaCompraID.map(item => {
              return (
                <Card.Body>
                  <p><b>Factura: </b>{item.idCompra} <b>Descripción: </b>{item.descripcion}</p>
                </Card.Body>
              )
            })
          }


          <Card.Footer>
            <div className="flex w-full space-x-2">
              <Button className="w-full" color="green" onClick={btnPasarelaPago}>
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
  )
}
