import React from 'react'
import { Link } from 'react-router-dom'
import RegisterForm from '../components/RegisterForm'

import perfil from '../img/Perfil.png'
import './RegisterPage.css'

export const RegisterPage = () => {
  return (
    <>
      <section className='container-loginPage'>
        <aside className='header-loginPage'>
          <img src={perfil} alt="Imagen perfil login" className='imgLogin' />
        </aside>
        <article className='body-loginPage'>
          <p className='titleLoginForm'>UNETE A CINEPACHO</p>
          <RegisterForm />
          <Link to={'/login'}><h3 className='link-login'>¿Ya tienes una cuenta?</h3></Link>
        </article>
      </section>
      <div>RegisterPage</div>
    </>
  )
}
