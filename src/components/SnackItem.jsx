import React, { useContext } from 'react'
import { useForm } from 'react-hook-form'


import './SnackItem.css'
import { CineContext } from '../context/CineContext';

export default function SnackItem({ infoSnack}) {

  const { register, handleSubmit } = useForm(); //State del form
  const urlBase = 'https://cinepachoapi.azurewebsites.net/';
  //Contexto
  const { isLog, tokenCliente, infoCliente, selectedMultiplex_ID, selectedSnacks, setSelectedSnacks } = useContext(CineContext);

  const POST_CrearCompraCliente = async (object, token) => {
    const response = await fetch(`${urlBase}crearCompraCliente`, {
      method: 'POST',
      body: JSON.stringify(object),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    })
    const { idCompra } = await response.json();
    return idCompra
  }

  const POST_CrearCompraNoRegistrado = async (object) => {
    const response = await fetch(`${urlBase}crearCompraNoRegistrado`, {
      method: 'POST',
      body: JSON.stringify(object),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const { idCompra } = await response.json();
    return idCompra;

  }

  const POST_AgregarSnackCompra = async (object) => {
    const response = await fetch(`${urlBase}agregarSnackCompra`, {
      method: 'POST',
      body: JSON.stringify(object),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    console.log(data);
  }


  const btnComprarSnack = async (snack) => {

    //Crear un nuevo ID para compra
    let idCompra = 0;
    let crearCompra = {
      idCliente: infoCliente.cliente_id,
      correo: infoCliente.correo
    }

    if (isLog) {
      idCompra = await POST_CrearCompraCliente(crearCompra, tokenCliente);   //Crear ID de compra si el usuario esta logeado
    } else {
      let noLogin = {
        idMultiplex: selectedMultiplex_ID
      }
      idCompra = await POST_CrearCompraNoRegistrado(noLogin);   //Crear el ID de compra si el usuario no está logeado
    }


    let objectAgregarSnackCompra = {
      idCompra,
      idSnack: infoSnack.idSnack,
      cantidad: parseInt(snack.cantidad),

    }

    console.log(objectAgregarSnackCompra);

    //Agregamos el snack con su cantidad al ID de la compra
    await POST_AgregarSnackCompra(objectAgregarSnackCompra);




    //Para renderizarlo en el carrito
    let objectSnackCarrito = {
      idCompra,
      idSnack: infoSnack.idSnack,
      cantidad: parseInt(snack.cantidad),
      nombre: infoSnack.nombresnack, 

    }
    setSelectedSnacks(selectedSnacks => selectedSnacks.concat(objectSnackCarrito));
    console.log(selectedSnacks);
  }

  return (
    <section className='CardSnack'>
      <div className='CardImage'><img src={infoSnack.direccionFoto} alt='Snack item' /></div>
      <div className='CardInfo'>
        <h3 className='CardTitle'>{infoSnack.nombresnack}</h3>
        <p className='PrecioSnack'>${infoSnack.precio}</p>
        <form onSubmit={handleSubmit((data) => {
          console.log('asd');
          btnComprarSnack(data);
        })}>
          <input
            {...register('cantidad')}
            placeholder='Cantidad'
            required>
          </input>
          <input className='CardBtn' type='submit'></input>
        </form>
      </div>


    </section>
  )
}
