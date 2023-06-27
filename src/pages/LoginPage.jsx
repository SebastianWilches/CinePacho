import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../components/LoginForm'

import './LoginPage.css'

export const LoginPage = () => {
  return (
    <>
      <div>LoginPage</div>
      <LoginForm/>
      <Link to={'/register'}><h3 className='link-register'>¿No tienes cuenta aún?</h3></Link>
    </>
  )
}
