import React from 'react'
import Footer from '../components/Footer'
import MovieCartelera from '../components/MovieCartelera'

import './CarteleraPage.css'
import img from '../img/MovieCartelera2.jpg'
import star from '../img/Star.png'

export const CarteleraPage = () => {
  return (
    <>
      <article className='container'>
        <h2 className='title-container'>¡Encuentra los mejores estrenos aquí!</h2>
        <div className="container-movies">
          <MovieCartelera></MovieCartelera>
          <MovieCartelera></MovieCartelera>
          <MovieCartelera></MovieCartelera>
          <MovieCartelera></MovieCartelera>
        </div>
      </article>

      <Footer />
    </>
  )
}
