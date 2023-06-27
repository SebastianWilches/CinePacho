import React from 'react'
import { Link } from 'react-router-dom'
import RegisterForm from '../components/RegisterForm'

import './RegisterPage.css'

export const RegisterPage = () => {
  return (
    <>
      <div>RegisterPage</div>
      <RegisterForm />
      <Link to={'/login'}><h3 className='link-login'>¿Ya tienes una cuenta?</h3></Link>
    </>
  )
}
