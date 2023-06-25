import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

import './HomePage.css'

import img from '../img/Movie.png'
import star from '../img/Star.png'

export const HomePage = () => {
  return (
    <>
      <Header></Header>
      <article className='container'>
        <h2 className='title-container'>¡Encuentra los mejores estrenos aquí!</h2>
        <section>
          <article className='container--FeaturedMovie'>
            <img src={img} alt="Poster pelicula destacada" className='imgFeaturedMovie'/>
            <div>
              <h3>WALK ALONE</h3>
              <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae tincidunt tellus. Donec semper odio sit amet ante efficitur tristique. Mauris volutpat convallis dui dictum maximus. Phasellus elementum ac tortor ut varius. Curabitur et tempus sapien, quis accumsan ante. Quisque lacus eros, molestie et nibh eu, tempor hendrerit metus.”</p>
              <div className='container--star'>
                <img src={star} alt="Icono Estrella" className='imgStar' />
                <img src={star} alt="Icono Estrella" className='imgStar' />
                <img src={star} alt="Icono Estrella" className='imgStar' />
                <img src={star} alt="Icono Estrella" className='imgStar' />
                <img src={star} alt="Icono Estrella" className='imgStar' />
              </div>
            </div>
            <div></div>
          </article>

          <article className='container--FeaturedMovie'>
            <div></div>
            <div>
              <h3>WALK ALONE</h3>
              <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae tincidunt tellus. Donec semper odio sit amet ante efficitur tristique. Mauris volutpat convallis dui dictum maximus. Phasellus elementum ac tortor ut varius. Curabitur et tempus sapien, quis accumsan ante. Quisque lacus eros, molestie et nibh eu, tempor hendrerit metus.”</p>
              <div className='container--star'>
                <img src={star} alt="Icono Estrella" className='imgStar' />
                <img src={star} alt="Icono Estrella" className='imgStar' />
                <img src={star} alt="Icono Estrella" className='imgStar' />
                <img src={star} alt="Icono Estrella" className='imgStar' />
                <img src={star} alt="Icono Estrella" className='imgStar' />
              </div>
            </div>
            <img src={img} alt="Poster pelicula destacada" className='imgFeaturedMovie'/>
          </article>

          
          <article className='container--FeaturedMovie'>
            <img src={img} alt="Poster pelicula destacada" className='imgFeaturedMovie'/>
            <div>
              <h3>WALK ALONE</h3>
              <p>“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae tincidunt tellus. Donec semper odio sit amet ante efficitur tristique. Mauris volutpat convallis dui dictum maximus. Phasellus elementum ac tortor ut varius. Curabitur et tempus sapien, quis accumsan ante. Quisque lacus eros, molestie et nibh eu, tempor hendrerit metus.”</p>
              <div className='container--star'>
                <img src={star} alt="Icono Estrella" className='imgStar' />
                <img src={star} alt="Icono Estrella" className='imgStar' />
                <img src={star} alt="Icono Estrella" className='imgStar' />
                <img src={star} alt="Icono Estrella" className='imgStar' />
                <img src={star} alt="Icono Estrella" className='imgStar' />
              </div>
            </div>
            <div></div>
          </article>
        </section>
      </article>
      <Footer/>
      
    </>
  )
}
