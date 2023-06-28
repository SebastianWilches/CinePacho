import React from 'react'

import './MovieCartelera.css'

import star from '../img/Star.png'

export default function MovieCartelera({infoPelicula:{img, title}}) {
    return (
        <>
            <section className='item-movies'>
                <img src={img} alt="Poster pelicula" className='imgMovie' />
                <h2 className='title-movie'>{title}</h2>
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
