import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import MovieCartelera from '../components/MovieCartelera'

import './CarteleraPage.css'


export const CarteleraPage = () => {

  const urlBase = 'http://localhost:3001/';
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    GET_Movies();
  }, [])


  const GET_Movies = async () => {
    const response = await fetch(`${urlBase}listaPeliculas`);
    const { listaPeliculas } = await response.json();

    console.log(listaPeliculas);
    setMovies(listaPeliculas);
  }

  return (
    <>
      <article className='container'>
        <h2 className='title-container'>¡Encuentra los mejores estrenos aquí!</h2>
        <div className="container-movies">
          {!movies ? 'CARGANDO' :
            movies.map((movie, index) => {
              return <MovieCartelera infoPelicula={movie} key={index}/>
            })}
        </div>
      </article>

      <Footer />
    </>
  )
}
