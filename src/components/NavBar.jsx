import React, { useState, useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { Card, Drawer } from '@rewind-ui/core';
import { CineContext } from '../context/CineContext';
import ShoppingCart from './ShoppingCart';
import { FaCartShopping } from "react-icons/fa6";
import './NavBar.css'

export default function NavBar() {
  const { openShoppingCart, setOpenShoppingCart } = useContext(CineContext);
  return (
    <>
      <nav className='navBar'>
        <Link to={''}><h2 className='navBar--link'>CinePacho</h2></Link>
        <section className='navBar--options'>
          <Link to={''}><h2 className='navBar--link'>Inicio</h2></Link>
          <Link to={'cartelera'}><h2 className='navBar--link'>Cartelera</h2></Link>
          <Link to={'snacks'}><h2 className='navBar--link'>Snacks</h2></Link>
        </section>
        <section className='navBar--profile'>
          <button onClick={() => setOpenShoppingCart(true)}><h2 className='shoppingCartIcon'><FaCartShopping /></h2></button>
          <Link to={'login'}><h2 className='navBar--link'>Iniciar sesión</h2></Link>
        </section>
      </nav>
      <Outlet />

      {/* MODAL */}
      <ShoppingCart></ShoppingCart>
    </>
  )
}
