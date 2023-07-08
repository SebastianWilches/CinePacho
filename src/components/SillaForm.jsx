import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { DotSpinner } from '@uiball/loaders';
import { CineContext } from '../context/CineContext';
import Silla from './Silla';

import './SillaForm.css'

export default function SillaForm({ idPelicula }) {
    const { register, handleSubmit } = useForm(); //State del form
    const urlBase = 'http://localhost:3001/';
    const [listFunciones, setListFunciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const { selectedMultiplex_ID } = useContext(CineContext);
    const [listSillasDisponibles, setListSillasDisponibles] = useState([]);



    useEffect(() => {
        GET_Funciones(idPelicula);
    }, [])

    const GET_Funciones = async (idPelicula) => {
        const response = await fetch(`${urlBase}pelicula/${idPelicula}`);
        const { pelicula } = await response.json();

        // console.log(pelicula);
        setListFunciones(pelicula);
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
        console.log(listaSillasDisponibles);
        setListSillasDisponibles(listaSillasDisponibles);
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


                    <div className='container-sillas'>

                        {listSillasDisponibles.map((silla, index) => {
                            return (
                                <Silla key={index}></Silla>
                            )
                        })}
                    </div>

                )
            }
        </>

    )
}
