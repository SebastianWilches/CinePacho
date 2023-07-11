import React from 'react'
import { Link } from 'react-router-dom'
import RegisterForm from '../components/RegisterForm'

import './RegisterPage.css'

export const RegisterPage = () => {
  return (
    <>
    <div className="div-contenedor-login">
      <section className='container-loginPage'>
        {/* <aside className='header-regitroPage'> */}
          <img src='https://cinepachoapi.azurewebsites.net/uploads/loginfoto.jpeg' alt="Imagen perfil login" className='imgRegistro-usuario' />
          {/* <div alt="Imagen rfil login" className='imgRegister' /> */}
        {/* </aside> */}
        <article className='body-loginPage'>
          <p className='titleLoginForm'>ÚNETE A CINEPACHO</p>
          <RegisterForm />
          <Link to={'/login'}><h3 className='link-login'>¿Ya tienes una cuenta?</h3></Link>
        </article>
      </section>
    </div>
    </>
  )
}
