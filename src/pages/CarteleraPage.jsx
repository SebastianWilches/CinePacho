import React from 'react'
import Footer from '../components/Footer'
import MovieCartelera from '../components/MovieCartelera'

import './CarteleraPage.css'

import imgJoker from '../img/MovieCartelera2.jpg'
import imgToy from '../img/Pelicula.jpg'

export const CarteleraPage = () => {
  const test = {
    img: imgJoker,
    title: "Joker"
  }
  const test2 = {
    img: imgToy,
    title: "Toy story"
  }

  return (
    <>
      <article className='container'>
        <h2 className='title-container'>¡Encuentra los mejores estrenos aquí!</h2>
        <div className="container-movies">
          <MovieCartelera infoPelicula={test}></MovieCartelera>
          <MovieCartelera infoPelicula={test2}></MovieCartelera>
          <MovieCartelera infoPelicula={test}></MovieCartelera>
          <MovieCartelera infoPelicula={test2}></MovieCartelera>
        </div>
      </article>

      <Footer />
    </>
  )
}
