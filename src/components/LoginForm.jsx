import React from 'react'
import { useForm } from 'react-hook-form'

import './LoginForm.css'

export default function LoginForm() {
    //State del form
    const { register, handleSubmit } = useForm();


    return (
        <>
            <form className='container-login' onSubmit={handleSubmit((data) => { console.log(data) })}>
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
