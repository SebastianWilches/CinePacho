import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../components/LoginForm'


// import perfil from '../img/Perfil.png'
import './LoginPage.css'

export const LoginPage = () => {
  return (
    <div className='div-contenedor-login'>
      <section className='container-loginPage'>
        <aside className='header-loginPage'>
          <img src='https://cinepachoapi.azurewebsites.net/uploads/loginfoto.jpeg' alt="Imagen perfil login" className='imgLogin' />
        </aside>
        <article className='body-loginPage'>
          <p className='titleLoginForm'>ÚNETE A CINEPACHO</p>
          <LoginForm />
          <Link to={'/register'}><h3 className='link-register'>¿No tienes cuenta aún?</h3></Link>
        </article>
      </section>
    </div>
  )
}
