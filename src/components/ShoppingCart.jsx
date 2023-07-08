import React, { useContext } from 'react'
import { Button, Card, Drawer } from '@rewind-ui/core';
import { CineContext } from '../context/CineContext';
import { FaCartShopping } from 'react-icons/fa6';
import './ShoppingCart.css'
import Swal from 'sweetalert2';

export default function ShoppingCart() {
  const { openShoppingCart, setOpenShoppingCart, listaCompraID, setListaCompraID, isLog } = useContext(CineContext);
  const urlBase = 'https://cinepachoapi.azurewebsites.net/';

  const test = () => {
    console.log(listaCompraID);
  }

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

  const btnPasarelaPago = () => {
    listaCompraID.map(item => {
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

          {
            !listaCompraID ? (<></>) : listaCompraID.map(item => {
              return (
                <Card.Body>
                  <p><b>Factura: </b>{item.idCompra} <b>Descripción: </b>{item.descripcion}</p>
                </Card.Body>
              )
            })
          }
          <button onClick={test}>ver</button>

          <Card.Footer>
            <div className="flex w-full space-x-2">
              <Button className="w-full" color="green" onClick={btnPasarelaPago}>
                Comprar
              </Button>
            </div>
          </Card.Footer>
        </Card>
      </Drawer>
    </>
  )
}
