import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { DotSpinner } from '@uiball/loaders';
import { CineContext } from '../context/CineContext';
import { FaCircleCheck } from "react-icons/fa6";
import Silla from './Silla';

import './SillaForm.css'
// import Swal from 'sweetalert2';

export default function SillaForm({ idPelicula }) {




    //Constantes y utils
    const urlBase = 'https://cinepachoapi.azurewebsites.net/';


    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);

    //Form
    const { register, handleSubmit } = useForm(); //State del form
    const [listFunciones, setListFunciones] = useState([]);
    const [listSillasDisponibles, setListSillasDisponibles] = useState([]); //Mapeo completo
    const [listSillasSeleccionadas, setListSillasSeleccionadas] = useState([]);
    const [peliculaID, setPeliculaID] = useState();

    //Contexto
    const { selectedMultiplex_ID, infoCliente, tokenCliente, setListaCompraID, listaCompraID, isLog } = useContext(CineContext);



    useEffect(() => {
        GET_Funciones(idPelicula);
    }, [])

    const GET_Funciones = async (idPelicula) => {
        const response = await fetch(`${urlBase}pelicula/${idPelicula}`);
        const { pelicula } = await response.json();

        // console.log(pelicula);
        setListFunciones(pelicula);
        setPeliculaID(pelicula.pelicula_id)
        setLoading(false);
    }

    const POST_SillasDisponibles = async (configFuncion) => {
        const response = await fetch(`${urlBase}listarSillasDisponiblesSalaMultiplex`, {
            method: 'POST',
            body: JSON.stringify(configFuncion),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const { listaSillasDisponibles } = await response.json()
        console.log("configSillasDisponibles", configFuncion);
        console.log(listaSillasDisponibles);
        setListSillasDisponibles(listaSillasDisponibles);
    }

    const POST_CrearCompraCliente = async (object, token) => {
        const response = await fetch(`${urlBase}crearCompraCliente`, {
            method: 'POST',
            body: JSON.stringify(object),
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
        const { idCompra } = await response.json()

        let factura = {
            idCompra,
            descripcion: "Tickets de película",
            listSillasSeleccionadas,
            idPelicula
        }

        setListaCompraID(listaCompraID => listaCompraID.concat(factura))

        return idCompra;
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

        let factura = {
            idCompra,
            descripcion: "Tickets de película",
            listSillasSeleccionadas,
            idPelicula
        }

        setListaCompraID(listaCompraID => listaCompraID.concat(factura))

        return idCompra;
    }

    const POST_EnviarSillas = async (object) => {
        const response = await fetch(`${urlBase}seleccionarSillasCompra`, {
            method: 'POST',
            body: JSON.stringify(object),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await response.json()
        console.log(data);
    }

    const btnAgregarCarrito = async () => {
        let crearCompra = {
            idCliente: infoCliente.cliente_id,
            correo: infoCliente.correo
        }

        let idCompra = 0;

        if (isLog) {
            idCompra = await POST_CrearCompraCliente(crearCompra, tokenCliente);   //Crear ID de compra si el usuario esta logeado
        } else {
            let noLogin = {
                idMultiplex: selectedMultiplex_ID
            }
            idCompra = await POST_CrearCompraNoRegistrado(noLogin);   //Crear el ID de compra si el usuario no está logeado
        }



        let modSillasSeleccionadas = listSillasSeleccionadas.map(item => {
            return {
                idSala: item.idSala,
                idMultiplex: item.idMultiplex,
                idPelicula: item.idPelicula,
                horario: item.horario.replace("T", " ").replace("Z", "").slice(0, -4),
                idSilla: item.idSilla,
                disponible: item.disponible
            }
        })

        let objectEnviarSillas = {
            idCompra,
            // sillasSeleccionadas: listSillasSeleccionadas,
            sillasSeleccionadas: modSillasSeleccionadas,
            idMultiplex: parseInt(selectedMultiplex_ID),
        }
        console.log(objectEnviarSillas);



        await POST_EnviarSillas(objectEnviarSillas);   //Anexar los tickets de compra al ID de compra
        // Swal.fire({
        //     title: "¡Tickets añadidos al carrito de compras!",
        //     icon: "success",
        //   });


    }

    return (
        <>
            {
                loading ? (<DotSpinner size={40} speed={0.9} color="black" />) :
                    (
                        <form onSubmit={handleSubmit((data) => {
                            data.idPelicula = parseInt(idPelicula);
                            data.idMultiplex = parseInt(selectedMultiplex_ID);

                            POST_SillasDisponibles(data);
                            setLoading2(false)
                        })}>

                            <label>Sala:</label>
                            <select {...register("idSala", { required: true })}>
                                {
                                    listFunciones.map((funcion, index) => {
                                        return <option value={funcion.Sala_sala_id} key={index}>{funcion.Sala_sala_id}</option>
                                    })
                                }
                            </select>
                            <label>Horario:</label>
                            <select {...register("horario", { required: true })}>
                                {
                                    listFunciones.map((funcion, index) => {
                                        return <option value={funcion.horario} key={index}>{funcion.horario}</option>
                                    })
                                }
                            </select>
                            <input className='button-submit btn-sub-login' type="submit" />
                        </form>



                    )
            }
            {
                loading2 ? (<></>) : (
                    <section className='container-comprar'>
                        <hr />
                        <div className='container-sillas'>

                            {listSillasDisponibles.map((silla, index) => {
                                return (
                                    <Silla key={index} infoSilla={silla} numSilla={index} setListSillasSeleccionadas={setListSillasSeleccionadas} listSillasSeleccionadas={listSillasSeleccionadas}></Silla>
                                )
                            })}
                        </div>

                        <article>
                            <p><b>Entradas seleccionadas:</b>
                                {
                                    listSillasSeleccionadas.map(silla => {
                                        return (silla.idSilla + ', ')
                                    })
                                }
                            </p>
                            <p><b>Precio: </b>
                                {`$${listSillasSeleccionadas.length * 100}`}
                            </p>
                            <button className='btn-carrito' onClick={btnAgregarCarrito}>Agregar al carrito <FaCircleCheck className='icon-carrito' /></button>

                        </article>
                    </section>
                )
            }
        </>

    )
}
