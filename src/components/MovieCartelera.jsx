import React from 'react'

import './MovieCartelera.css'
import img from '../img/MovieCartelera2.jpg'
import star from '../img/Star.png'

export default function MovieCartelera() {
    return (
        <>
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
        </>
    )
}
