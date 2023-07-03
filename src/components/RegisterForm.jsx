import React from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2';

import './RegisterForm.css'

export default function RegisterForm() {
    //State del form
    const { register, handleSubmit } = useForm();
    const urlBase = 'http://localhost:3001/';

    const POST_RegistrarSesionCliente = async (user) => {
        try {
            const response = await fetch(`${urlBase}registrarSesion`, {
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            Swal.fire({
                title: "¡Usuario registrado!",
                icon: "success",
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error en el registro'
            })
        }

    }


    return (
        <>
            <form className='container-register' onSubmit={handleSubmit((data) => {
                POST_RegistrarSesionCliente(data);
            })}>
                <label>Nombres y apellidos:</label>
                <input
                    {...register('nombre')}
                    placeholder='Nombres'
                    type='text'
                    required>
                </input>

                <label>Número de documento:</label>
                <input
                    {...register('cedula')}
                    placeholder='Número de documento'
                    type='number'
                    min={0}
                    required>
                </input>

                <label>Correo electrónico:</label>
                <input
                    {...register('correo')}
                    placeholder='Correo electrónico'
                    type='email'
                    required>
                </input>

                <label>Teléfono:</label>
                <input {...register('telefono')}
                    placeholder='Teléfono'
                    type='number'
                    min={0}
                    required>
                </input>

                <label>Contraseña:</label>
                <input
                    {...register('contrasena')}
                    placeholder='Contraseña'
                    type='password'
                    required>
                </input>

                <input className='button-submit' type="submit" />
            </form>
        </>
    )
}
