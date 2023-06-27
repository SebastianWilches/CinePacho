import React from 'react'
import { useForm } from 'react-hook-form'

import './RegisterForm.css'

export default function RegisterForm() {
    //State del form
    const { register, handleSubmit } = useForm();


    return (
        <>
            <form className='container-register' onSubmit={handleSubmit((data) => { console.log(data) })}>
                <label>Nombres:</label>
                <input
                    {...register('nombre')}
                    placeholder='Nombres'
                    type='text'
                    required>
                </input>

                <label>Apellidos:</label>
                <input
                    {...register('apellido')}
                    placeholder='Apellidos'
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
                    {...register('email')}
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
                    {...register('password')}
                    placeholder='Contraseña'
                    type='password'
                    required>
                </input>

                <input className='button-submit' type="submit" />
            </form>
        </>
    )
}
