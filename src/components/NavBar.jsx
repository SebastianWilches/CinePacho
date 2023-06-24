import React from 'react'
import { Outlet, Link } from 'react-router-dom'

import './NavBar.css'

export default function NavBar() {
  return (
    <>
      <nav className='navBar'>
        <Link to={''}><h2 className='navBar--link'>CinePacho</h2></Link>
        <section className='navBar--options'>
          <Link to={''}><h2 className='navBar--link'>Inicio</h2></Link>
          <Link to={'cartelera'}><h2 className='navBar--link'>Cartelera</h2></Link>
          <Link to={'snacks'}><h2 className='navBar--link'>Snacks</h2></Link>
        </section>
        <section>
          <Link to={'login'}><h2 className='navBar--link'>Iniciar sesión</h2></Link>
        </section>
      </nav>
      <Outlet />
    </>
  )
}
