import React, { useEffect, useState } from 'react'
import { DotSpinner } from '@uiball/loaders'
import Footer from '../components/Footer'
import MovieCartelera from '../components/MovieCartelera'

import './CarteleraPage.css'

export const CarteleraPage = () => {

  const urlBase = 'https://cinepachoapi.azurewebsites.net/';
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GET_Movies();
  }, [])


  const GET_Movies = async () => {
    const response = await fetch(`${urlBase}listaPeliculasCartelera`);
    const { listaPeliculas } = await response.json();

    setMovies(listaPeliculas);
    setLoading(false);
  }

  return (
    <>
      <article className='container'>
        <h2 className='title-container'>¡Encuentra los mejores estrenos aquí!</h2>
        <div className="container-movies">
          {
            loading ?
              (<DotSpinner
                size={40}
                speed={0.9}
                color="black"
              />)
              :
              (movies.map((movie, index) => {
                return <MovieCartelera infoPelicula={movie} key={index} />
              }))
          }
        </div>
      </article>

      <Footer />
    </>
  )
}
