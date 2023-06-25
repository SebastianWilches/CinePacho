import React from 'react'
import Footer from '../components/Footer'

import './CarteleraPage.css'
import img from '../img/MovieCartelera2.jpg'
import star from '../img/Star.png'

export const CarteleraPage = () => {
  return (
    <>
      <article className='container'>
        <h2 className='title-container'>¡Encuentra los mejores estrenos aquí!</h2>
        <div className="container-movies">
          <section className='item-movies'>
            <img src={img} alt="Poster pelicula" className='imgMovie' />
            <h2 className='title-movie'>JOKER</h2>
            <div className='container--star'>
              <img src={star} alt="Icono Estrella" className='imgStar' />
              <img src={star} alt="Icono Estrella" className='imgStar' />
              <img src={star} alt="Icono Estrella" className='imgStar' />
              <img src={star} alt="Icono Estrella" className='imgStar' />
              <img src={star} alt="Icono Estrella" className='imgStar' />
            </div>
          </section>
          <section className='item-movies'>
            <img src={img} alt="Poster pelicula" className='imgMovie' />
            <h2 className='title-movie'>JOKER</h2>
            <div className='container--star'>
              <img src={star} alt="Icono Estrella" className='imgStar' />
              <img src={star} alt="Icono Estrella" className='imgStar' />
              <img src={star} alt="Icono Estrella" className='imgStar' />
              <img src={star} alt="Icono Estrella" className='imgStar' />
              <img src={star} alt="Icono Estrella" className='imgStar' />
            </div>
          </section>
          <section className='item-movies'>
            <img src={img} alt="Poster pelicula" className='imgMovie' />
            <h2 className='title-movie'>JOKER</h2>
            <div className='container--star'>
              <img src={star} alt="Icono Estrella" className='imgStar' />
              <img src={star} alt="Icono Estrella" className='imgStar' />
              <img src={star} alt="Icono Estrella" className='imgStar' />
              <img src={star} alt="Icono Estrella" className='imgStar' />
              <img src={star} alt="Icono Estrella" className='imgStar' />
            </div>
          </section>
          <section className='item-movies'>
            <img src={img} alt="Poster pelicula" className='imgMovie' />
            <h2 className='title-movie'>JOKER</h2>
            <div className='container--star'>
              <img src={star} alt="Icono Estrella" className='imgStar' />
              <img src={star} alt="Icono Estrella" className='imgStar' />
              <img src={star} alt="Icono Estrella" className='imgStar' />
              <img src={star} alt="Icono Estrella" className='imgStar' />
              <img src={star} alt="Icono Estrella" className='imgStar' />
            </div>
          </section>
        </div>
      </article>

      <Footer />
    </>
  )
}
