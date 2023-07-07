import React from 'react'
import { Link } from 'react-router-dom'

import './MovieCartelera.css'
import imgJoker from '../img/MovieCartelera2.jpg'

import star from '../img/Star.png'

export default function MovieCartelera({ infoPelicula: { titulo, puntajePromedio, pelicula_id, direccionFoto } }) {
    return (
        <>
            <Link to={'../movie/' + pelicula_id} relative='path'>
                <section className='item-movies'>
                    <img src={direccionFoto} alt="Poster pelicula" className='imgMovie' />
                    <h2 className='title-movie'>{titulo}</h2>
                    <div className='container--star'>
                        <p className='text-rating'>{puntajePromedio} / 5
                            <img src={star} alt="Icono Estrella" className='imgStar' />
                        </p>
                        {/* <img src={star} alt="Icono Estrella" className='imgStar' />
                    <img src={star} alt="Icono Estrella" className='imgStar' />
                    <img src={star} alt="Icono Estrella" className='imgStar' />
                    <img src={star} alt="Icono Estrella" className='imgStar' /> */}
                    </div>
                </section>
            </Link>
        </>
    )
}
