import React from 'react'

import './MovieCartelera.css'
import imgJoker from '../img/MovieCartelera2.jpg'

import star from '../img/Star.png'

export default function MovieCartelera({ infoPelicula: { titulo, puntajePromedio } }) {
    return (
        <>
            <section className='item-movies'>
                <img src={imgJoker} alt="Poster pelicula" className='imgMovie' />
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
        </>
    )
}
